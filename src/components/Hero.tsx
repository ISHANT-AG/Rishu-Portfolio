import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLenis } from '../hooks/useLenis';
import { ALL_PHOTOS } from '../config/manifest';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollTo } = useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const heroPhoto = ALL_PHOTOS.find((p) => p.id === 'hero-editorial-black') || ALL_PHOTOS[0];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(textRef.current, {
        opacity: 0,
        y: 28,
        duration: 1,
      }).from(
        imageRef.current,
        {
          opacity: 0,
          scale: 1.04,
          duration: 1.2,
        },
        '-=0.7'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (targetId: string) => {
    scrollTo(targetId, { offset: -70 });
  };

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative bg-white text-ink pt-6 pb-16 sm:py-20 lg:py-24 px-6 sm:px-12 flex flex-col justify-center min-h-[calc(100vh-5rem)] border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Mobile & Desktop Responsive Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Identity & Actions */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            <span className="text-xs uppercase tracking-mega-wide text-ink-muted font-medium mb-2 sm:mb-4">
              Model · Ahmedabad
            </span>

            <h1 className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-light leading-[0.88] tracking-tight text-ink mb-6 sm:mb-8">
              RISHU
            </h1>

            <p className="font-editorial italic text-lg sm:text-2xl text-ink-muted max-w-lg mb-8 sm:mb-10 font-light leading-snug">
              Presence in every frame. Editorial fashion, bridal couture, and contemporary elegance.
            </p>

            {/* Actions: View Work & Enquire */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={() => handleScrollTo('#work')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-ink text-white hover:bg-crimson transition-all rounded-full text-xs uppercase tracking-ultra-wide font-medium shadow-sm active:scale-95"
              >
                <span>View work</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleScrollTo('#contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-black/20 hover:border-black transition-all rounded-full text-xs uppercase tracking-ultra-wide font-medium active:scale-95 text-ink"
              >
                <span>Enquire</span>
              </button>
            </div>
          </div>

          {/* Hero Portrait */}
          <div ref={imageRef} className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative mx-auto max-w-[280px] sm:max-w-sm lg:max-w-none aspect-[3/4] sm:aspect-[3/4.2] overflow-hidden bg-stage-subtle shadow-xl border border-black/10">
              <picture>
                <source srcSet={heroPhoto.src} type="image/webp" />
                <img
                  src={heroPhoto.srcJpg}
                  alt={heroPhoto.alt}
                  loading="eager"
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: `${heroPhoto.focalPoint.x}% ${heroPhoto.focalPoint.y}%`,
                  }}
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};