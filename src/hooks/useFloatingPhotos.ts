import { RefObject, useEffect } from 'react';
import gsap from 'gsap';

/** Pointer parallax is decorative; document order and keyboard access stay stable. */
export function useFloatingPhotos(root: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const nodes = Array.from(root.current!.querySelectorAll<HTMLElement>('[data-floating]'));
      const visible = new Set<HTMLElement>();
      const controls = nodes.map((node) => ({
        node,
        depth: Number(node.dataset.floating) || 18,
        x: gsap.quickTo(node, 'x', { duration: 1.2, ease: 'power3.out' }),
        y: gsap.quickTo(node, 'y', { duration: 1.4, ease: 'power3.out' }),
        rx: gsap.quickTo(node, 'rotationX', { duration: 1.1, ease: 'power3.out' }),
        ry: gsap.quickTo(node, 'rotationY', { duration: 1.1, ease: 'power3.out' }),
      }));
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target as HTMLElement) : visible.delete(entry.target as HTMLElement));
      }, { rootMargin: '80px' });
      nodes.forEach(node => observer.observe(node));
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || document.querySelector('[aria-modal="true"]')) return;
        const x = (event.clientX / window.innerWidth - .5) * 2;
        const y = (event.clientY / window.innerHeight - .5) * 2;
        controls.forEach(c => {
          if (!visible.has(c.node)) return;
          c.x(x * c.depth); c.y(y * c.depth * .65); c.rx(-y * 1.5); c.ry(x * 2);
        });
      };
      const reset = () => controls.forEach(c => { c.x(0); c.y(0); c.rx(0); c.ry(0); });
      window.addEventListener('pointermove', move, { passive: true });
      document.documentElement.addEventListener('pointerleave', reset);
      window.addEventListener('blur', reset);
      return () => {
        observer.disconnect();
        window.removeEventListener('pointermove', move);
        document.documentElement.removeEventListener('pointerleave', reset);
        window.removeEventListener('blur', reset);
        controls.forEach(c => { c.x.tween.kill(); c.y.tween.kill(); c.rx.tween.kill(); c.ry.tween.kill(); });
        gsap.set(nodes, { clearProps: 'transform' });
      };
    });
    return () => media.revert();
  }, [root]);
}
