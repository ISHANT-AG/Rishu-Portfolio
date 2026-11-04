import React from 'react';
import { useLenis } from '../hooks/useLenis';
import { PROFILE_DATA } from '../config/profile';
import { MessageCircle, Phone, Instagram, ArrowUp } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { scrollTo } = useLenis();

  const handleBackToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollTo('#top', { offset: 0 });
  };

  return (
    <section id="contact" className="w-full bg-[#fcfbfa] border-t border-black/10 text-ink pt-20 sm:pt-28 pb-12 sm:pb-16 px-5 sm:px-10">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading & Supporting Line */}
        <h2 className="font-assistant font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-ink">
          Bookings & collaborations
        </h2>
        <p className="font-alegreya text-sm sm:text-base text-ink-muted uppercase tracking-wide mt-2 mb-12 sm:mb-16 font-medium">
          Based in Ahmedabad, India.
        </p>

        {/* Three Balanced Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-20 sm:mb-28">
          {/* 1. WhatsApp (Clear booking role) */}
          <a
            href="https://wa.me/917073303645"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-5 bg-ink text-white hover:bg-black transition-all rounded-sm group shadow-sm active:scale-[0.99]"
            aria-label="WhatsApp enquiry with Rishu Aggarwal"
          >
            <MessageCircle className="w-4 h-4 text-white/90" />
            <span className="font-jost text-xs sm:text-sm tracking-nav uppercase font-medium">
              WhatsApp enquiry
            </span>
          </a>

          {/* 2. Phone */}
          <a
            href="tel:+917073303645"
            className="flex items-center justify-center gap-3 px-6 py-5 bg-white border border-black/15 hover:border-black transition-all rounded-sm group active:scale-[0.99]"
            aria-label="Call Rishu Aggarwal"
          >
            <Phone className="w-4 h-4 text-ink-muted group-hover:text-ink transition-colors" />
            <span className="font-jost text-xs sm:text-sm tracking-nav font-medium text-ink">
              +91 7073303645
            </span>
          </a>

          {/* 3. Instagram */}
          <a
            href="https://www.instagram.com/rishu.slayy/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-5 bg-white border border-black/15 hover:border-black transition-all rounded-sm group active:scale-[0.99]"
            aria-label="Instagram profile @rishu.slayy"
          >
            <Instagram className="w-4 h-4 text-ink-muted group-hover:text-ink transition-colors" />
            <span className="font-jost text-xs sm:text-sm tracking-nav font-medium text-ink">
              @rishu.slayy
            </span>
          </a>
        </div>

        {/* Small Footer */}
        <footer className="pt-10 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-alegreya text-ink-muted">
          <div className="font-medium text-ink">
            {PROFILE_DATA.name}
          </div>

          <div>
            &copy; {new Date().getFullYear()} {PROFILE_DATA.name}. All rights reserved.
          </div>

          <button
            onClick={handleBackToTop}
            className="font-jost uppercase tracking-nav text-xs flex items-center gap-1.5 hover:text-ink transition-colors active:scale-95"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </footer>
      </div>
    </section>
  );
};

