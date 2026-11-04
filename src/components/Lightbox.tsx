import React, { useEffect, useRef } from 'react';
import { PhotoAsset } from '../types';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLenis } from '../hooks/useLenis';

interface LightboxProps {
  photo: PhotoAsset | null;
  photos: PhotoAsset[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  photos,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { stop, start } = useLenis();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : 0;
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      stop();
      dialogRef.current?.focus();
    } else {
      start();
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || document.activeElement === dialogRef.current)) {
          e.preventDefault();
          first.focus();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNavigate((safeIndex + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onNavigate((safeIndex - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, safeIndex, photos.length, onClose, onNavigate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) {
      onNavigate((safeIndex - 1 + photos.length) % photos.length);
    } else if (diff < -50) {
      onNavigate((safeIndex + 1) % photos.length);
    }
    touchStartX.current = null;
  };

  if (!isOpen || !photo) return null;

  const formattedCurrent = String(safeIndex + 1).padStart(2, '0');
  const formattedTotal = String(photos.length).padStart(2, '0');

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded view: ${photo.title}`}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white outline-none select-none transition-all duration-300"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 sm:px-10 py-5 z-20">
        <div className="flex items-baseline gap-3">
          <span className="font-alegreya text-sm tracking-wide text-white/90 font-medium">
            {photo.title}
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* Discreet Image Counter (Jost tabular-nums) */}
          <span className="font-jost text-xs tracking-nav text-white/60 tabular-nums">
            {formattedCurrent} / {formattedTotal}
          </span>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 active:scale-95"
            aria-label="Close viewer (Escape)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage (Undistorted Original Proportions) */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={() => onNavigate((safeIndex - 1 + photos.length) % photos.length)}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/90 hover:text-white transition-all z-20 active:scale-90"
          aria-label="Previous photograph"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => onNavigate((safeIndex + 1) % photos.length)}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/90 hover:text-white transition-all z-20 active:scale-90"
          aria-label="Next photograph"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Center High-Res Image */}
        <div className="max-h-[82vh] max-w-[92vw] flex items-center justify-center">
          <picture>
            <source srcSet={photo.src} type="image/webp" />
            <img
              src={photo.srcJpg}
              alt={photo.alt}
              className="max-h-[82vh] max-w-[92vw] w-auto h-auto object-contain transition-opacity duration-300"
            />
          </picture>
        </div>
      </div>

      {/* Bottom Minimal Hint */}
      <div className="px-5 sm:px-10 py-4 flex items-center justify-between text-white/40 text-[11px] font-alegreya">
        <span>Rishu Aggarwal · Portfolio</span>
        <span className="hidden sm:inline">Use arrow keys to browse · Escape to exit</span>
      </div>
    </div>
  );
};

