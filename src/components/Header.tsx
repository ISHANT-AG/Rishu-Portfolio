import React from 'react';
import { useLenis } from '../hooks/useLenis';
import { PROFILE_DATA } from '../config/profile';

export const Header: React.FC = () => {
  const { scrollTo } = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollTo(targetId, { offset: -70 });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/5 transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, '#top')}
          className="font-editorial text-2xl sm:text-3xl tracking-wider text-ink hover:text-crimson transition-colors font-normal"
          aria-label="Rishu Aggarwal - Back to top"
        >
          {PROFILE_DATA.headline}
        </a>

        {/* Navigation */}
        <nav className="flex items-center gap-6 sm:gap-10">
          <a
            href="#work"
            onClick={(e) => handleNavClick(e, '#work')}
            className="text-xs uppercase tracking-ultra-wide text-ink/75 hover:text-ink transition-colors font-medium"
          >
            Work
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="text-xs uppercase tracking-ultra-wide text-ink/75 hover:text-ink transition-colors font-medium"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-xs uppercase tracking-ultra-wide px-4 py-2 bg-ink text-white hover:bg-crimson transition-all rounded-full font-medium active:scale-95 shadow-sm"
          >
            Enquire
          </a>
        </nav>
      </div>
    </header>
  );
};