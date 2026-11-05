import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLenis } from '../hooks/useLenis';
import { ALL_PHOTOS } from '../config/manifest';
import { PROFILE_DATA } from '../config/profile';
import { ArrowDown, Instagram } from 'lucide-react';

const NAME_LETTERS = ['R', 'I', 'S', 'H', 'U'];

export const Landing: React.FC = () => {
  const { scrollTo } = useLenis();
  const [isScrolled, setIsScrolled] = useState(false);

  // Animation Refs
  const landingRef = useRef<HTMLElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const centerMenuRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);

  // Use the verified bridal red wide portrait as requested
  const heroPhoto = ALL_PHOTOS.find((p) => p.id === 'bridal-red-wide-spread') || ALL_PHOTOS[0];

  // 1. Scroll-Aware Navbar Styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Name Dropping Animation (Adjany Reference)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !landingRef.current) return;

    const ctx = gsap.context(() => {
      const activeLetters = letterRefs.current.filter(Boolean);

      // Initial States
      gsap.set(activeLetters, { y: -80, opacity: 0 });
      if (centerMenuRef.current) {
        gsap.set(centerMenuRef.current, { y: 15, opacity: 0 });
      }
      if (navBarRef.current) {
        gsap.set(navBarRef.current, { opacity: 0 });
      }
      if (bottomMetaRef.current) {
        gsap.set(bottomMetaRef.current, { y: 15, opacity: 0 });
      }

      // Master Timeline
      const tl = gsap.timeline({ delay: 0.25 });

      // Staggered letter dropping cascade (R -> I -> S -> H -> U)
      tl.to(activeLetters, {
        y: 0,
        opacity: 1,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.16,
      })
        // Center pipe menu reveal
        .to(
          centerMenuRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
          },
          '-=0.35'
        )
        // Header & bottom meta reveal
        .to(
          [navBarRef.current, bottomMetaRef.current],
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4'
        );
    }, landingRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollTo(targetId, { offset: -20 });
  };

  return (
    <section
      ref={landingRef}
      id="top"
      className="relative w-full h-screen h-dvh overflow-hidden select-none bg-black"
    >
      {/* 1. Immersive Edge-to-Edge Photograph (Adjany Reference: dramatic monochrome high-contrast close-up) */}
      <div className="absolute inset-0 w-full h-full">
        <picture>
          <source srcSet={heroPhoto.src} type="image/webp" />
          <img
            src={heroPhoto.srcJpg}
            alt={heroPhoto.alt}
            loading="eager"
            className="w-full h-full object-cover object-[50%_35%] sm:object-[50%_30%] contrast-[1.05] brightness-[0.95]"
          />
        </picture>

        {/* Subtle tonal scrim tailored for warm bridal background contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* 2. Top Navigation Bar (Adjany Reference) */}
      <header
        ref={navBarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md text-ink py-4 px-5 sm:px-10 border-b border-black/5 shadow-sm'
            : 'bg-transparent text-[#FAF7F2] py-5 sm:py-7 px-5 sm:px-10'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Wordmark (Cormorant Garamond 600) */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="font-cormorant font-semibold text-lg sm:text-xl tracking-[0.16em] uppercase transition-opacity hover:opacity-80 [text-shadow:_0_1px_4px_rgba(20,10,5,0.7)]"
            aria-label="Rishu Aggarwal - Back to top"
          >
            {PROFILE_DATA.name}
          </a>

          {/* Top Right Navigation (Jost) */}
          <nav className="font-jost flex items-center gap-6 sm:gap-9 text-xs tracking-nav uppercase">
            <a
              href="#portfolio"
              onClick={(e) => handleNavClick(e, '#portfolio')}
              className="hover:text-[#F3D5A5] transition-colors [text-shadow:_0_1px_4px_rgba(20,10,5,0.7)]"
            >
              Portfolio
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hover:text-[#F3D5A5] transition-colors [text-shadow:_0_1px_4px_rgba(20,10,5,0.7)]"
            >
              Contact
            </a>
            <a
              href={PROFILE_DATA.contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @rishu.slayy"
              className="hover:text-[#F3D5A5] transition-colors flex items-center gap-1.5 [text-shadow:_0_1px_4px_rgba(20,10,5,0.7)]"
            >
              <Instagram className="w-3.5 h-3.5 text-[#DFC49C]" />
              <span className="hidden sm:inline normal-case text-xs">@rishu.slayy</span>
            </a>
          </nav>
        </div>
      </header>

      {/* 3. Center Signature Elements (Adjany Reference: Spaced Dropping Letters & Centered Pipe-Menu) */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-5 sm:px-10 py-8 sm:py-12 pointer-events-none text-white">
        {/* Spacer for top nav */}
        <div className="h-12 sm:h-16" />

        {/* Center Composition */}
        <div className="w-full flex flex-col items-center justify-center my-auto pointer-events-auto">
          {/* Name Dropping Animation (Adjany Reference: Staggered Cascade Letters in Editorial Serif) */}
          <div className="w-full flex items-center justify-center gap-5 sm:gap-10 md:gap-14 lg:gap-18 mb-6 select-none pointer-events-none">
            {NAME_LETTERS.map((letter, idx) => (
              <span
                key={idx}
                ref={(el) => (letterRefs.current[idx] = el)}
                className="font-cormorant font-semibold text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-[0.04em] text-[#FFFDF9] uppercase inline-block will-change-transform drop-shadow-[0_4px_18px_rgba(20,10,5,0.75)] [text-shadow:_0_2px_6px_rgba(20,10,5,0.65),_0_0_24px_rgba(255,245,230,0.3)]"
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Centered In-Image Navigation (Adjany Reference: HOME | ABOUT | VISUALS | CONTACT) */}
          <div
            ref={centerMenuRef}
            className="flex items-center justify-center gap-4 sm:gap-7 text-xs sm:text-sm font-jost uppercase tracking-[0.24em] text-[#FAF7F2] drop-shadow-[0_2px_8px_rgba(20,10,5,0.7)]"
          >
            <a
              href="#portfolio"
              onClick={(e) => handleNavClick(e, '#portfolio')}
              className="hover:text-[#F3D5A5] transition-colors py-1 font-medium"
            >
              Portfolio
            </a>
            <span className="text-[#DFC49C]/50 font-light select-none">|</span>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hover:text-[#F3D5A5] transition-colors py-1 font-medium"
            >
              Contact
            </a>
            <span className="text-[#DFC49C]/50 font-light select-none">|</span>
            <a
              href={PROFILE_DATA.contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F3D5A5] transition-colors py-1 normal-case tracking-normal font-normal"
            >
              @rishu.slayy
            </a>
          </div>
        </div>

        {/* 4. Bottom Meta: Model Identifier & Subtle Scroll Cue */}
        <div
          ref={bottomMetaRef}
          className="w-full flex items-end justify-between pointer-events-auto pt-4 text-[#F4EFE6]/90 [text-shadow:_0_1px_4px_rgba(20,10,5,0.7)]"
        >
          {/* Left: Identifier (Alegreya Sans) */}
          <div>
            <p className="font-alegreya text-xs sm:text-sm uppercase tracking-wider font-normal">
              Model · Ahmedabad, India
            </p>
          </div>

          {/* Right: Scroll Cue (Jost) */}
          <a
            href="#portfolio"
            onClick={(e) => handleNavClick(e, '#portfolio')}
            className="font-jost flex items-center gap-2 text-xs uppercase tracking-nav hover:text-[#F3D5A5] transition-colors group"
            aria-label="Scroll down to view portfolio"
          >
            <span>Scroll</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1 text-[#DFC49C]" />
          </a>
        </div>
      </div>
    </section>
  );
};
