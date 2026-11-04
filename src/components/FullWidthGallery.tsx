import React from 'react';
import { PhotoAsset } from '../types';
import { CURATED_GALLERY_PHOTOS } from '../config/manifest';

interface FullWidthGalleryProps {
  onOpenInspection: (photo: PhotoAsset, index: number) => void;
}

export const FullWidthGallery: React.FC<FullWidthGalleryProps> = ({ onOpenInspection }) => {
  const photos = CURATED_GALLERY_PHOTOS;

  // Render an individual photograph tile
  const renderTile = (photo: PhotoAsset, index: number, aspectClass: string = 'aspect-[3/4]') => {
    return (
      <button
        key={photo.id}
        onClick={() => onOpenInspection(photo, index)}
        className="group relative block w-full text-left overflow-hidden bg-[#ece9e2] focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        aria-label={`View ${photo.title} in full resolution`}
      >
        <div className={`relative w-full ${aspectClass} overflow-hidden`}>
          <picture>
            <source srcSet={photo.src} type="image/webp" />
            <img
              src={photo.srcJpg}
              alt={photo.alt}
              loading={index < 4 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              style={{
                objectPosition: `${photo.focalPoint.x}% ${photo.focalPoint.y}%`,
              }}
            />
          </picture>
        </div>

        {/* Minimal hover caption (Alegreya Sans) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4 pointer-events-none">
          <span className="font-alegreya text-xs text-white tracking-wide font-normal bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm">
            {photo.title}
          </span>
        </div>
      </button>
    );
  };

  return (
    <section id="portfolio" className="w-full py-12 sm:py-16 bg-white text-ink">
      {/* Small "Portfolio" Label Above Collection */}
      <div className="px-3 sm:px-6 md:px-8 mb-6 sm:mb-8 text-center">
        <span className="font-alegreya text-xs uppercase tracking-wide text-ink-muted">
          Portfolio
        </span>
      </div>

      {/* FULL-WIDTH GALLERY (Kayla Arianne Mosaic Rhythm across the COMPLETE available page width) */}
      <div className="w-full px-2 sm:px-4 md:px-5 lg:px-6 space-y-2 sm:space-y-3 lg:space-y-3.5">
        {/* Row 1: Asymmetrical Opening Pair (7 cols / 5 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 lg:gap-3.5 items-stretch">
          <div className="md:col-span-7">
            {renderTile(photos[0], 0, 'aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4]')}
          </div>
          <div className="md:col-span-5">
            {renderTile(photos[1], 1, 'aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4]')}
          </div>
        </div>

        {/* Row 2: Trio of Contrasting Heritage & Beauty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-3.5">
          {renderTile(photos[2], 2, 'aspect-[3/4]')}
          {renderTile(photos[3], 3, 'aspect-[3/4]')}
          <div className="sm:col-span-2 lg:col-span-1">
            {renderTile(photos[4], 4, 'aspect-[3/4]')}
          </div>
        </div>

        {/* Row 3: Wide Full-Width Cinematic Landscape (Veiled Silhouette) */}
        <div className="w-full">
          {renderTile(photos[5], 5, 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9]')}
        </div>

        {/* Row 4: Balanced Portrait Pair */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-3.5">
          {renderTile(photos[6], 6, 'aspect-[3/4]')}
          {renderTile(photos[7], 7, 'aspect-[3/4]')}
        </div>

        {/* Row 5: Trio of Palace Arch & Elegance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-3.5">
          {renderTile(photos[8], 8, 'aspect-[3/4]')}
          {renderTile(photos[9], 9, 'aspect-[3/4]')}
          <div className="sm:col-span-2 lg:col-span-1">
            {renderTile(photos[10], 10, 'aspect-[3/4]')}
          </div>
        </div>

        {/* Row 6: Wide Full-Width Cinematic Landscape (Grand Lehenga Spread) */}
        <div className="w-full">
          {renderTile(photos[11], 11, 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9]')}
        </div>

        {/* Row 7: Asymmetrical Royal & Couture Pair (5 cols / 7 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 lg:gap-3.5 items-stretch">
          <div className="md:col-span-5">
            {renderTile(photos[12], 12, 'aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4]')}
          </div>
          <div className="md:col-span-7">
            {renderTile(photos[13], 13, 'aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4]')}
          </div>
        </div>

        {/* Row 8: Trio of Editorial Beauty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-3.5">
          {renderTile(photos[14], 14, 'aspect-[3/4]')}
          {renderTile(photos[15], 15, 'aspect-[3/4]')}
          <div className="sm:col-span-2 lg:col-span-1">
            {renderTile(photos[16], 16, 'aspect-[3/4]')}
          </div>
        </div>

        {/* Row 9: Lifestyle Pair */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-3.5">
          {renderTile(photos[17], 17, 'aspect-[4/3] sm:aspect-[3/4]')}
          {renderTile(photos[18], 18, 'aspect-[4/3] sm:aspect-[3/4]')}
        </div>

        {/* Row 10: Trio of Spontaneous Dining & Lifestyle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-3.5">
          {renderTile(photos[19], 19, 'aspect-[4/3] sm:aspect-[3/4]')}
          {renderTile(photos[20], 20, 'aspect-[4/3] sm:aspect-[3/4]')}
          <div className="sm:col-span-2 lg:col-span-1">
            {renderTile(photos[21], 21, 'aspect-[4/3] sm:aspect-[3/4]')}
          </div>
        </div>

        {/* Row 11: Final Closing Looks (Evening Dining & Editorial Beauty) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-3.5">
          {renderTile(photos[22], 22, 'aspect-[3/4]')}
          {renderTile(photos[23], 23, 'aspect-[3/4]')}
        </div>
      </div>
    </section>
  );
};

