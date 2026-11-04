import React, { useState } from 'react';
import { LenisContext, useLenisSetup } from './hooks/useLenis';
import { Landing } from './components/Landing';
import { FullWidthGallery } from './components/FullWidthGallery';
import { ContactSection } from './components/ContactSection';
import { Lightbox } from './components/Lightbox';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PhotoAsset } from './types';
import { CURATED_GALLERY_PHOTOS } from './config/manifest';

export const App: React.FC = () => {
  const lenisControls = useLenisSetup();

  // Lightbox State
  const [inspectedPhoto, setInspectedPhoto] = useState<PhotoAsset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenInspection = (photo: PhotoAsset) => {
    setInspectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseInspection = () => {
    setIsModalOpen(false);
  };

  const handleModalNavigate = (index: number) => {
    const nextPhoto = CURATED_GALLERY_PHOTOS[index];
    if (nextPhoto) {
      setInspectedPhoto(nextPhoto);
    }
  };

  return (
    <LenisContext.Provider value={lenisControls}>
      <div id="top" className="min-h-screen flex flex-col bg-white text-ink relative font-alegreya selection:bg-black selection:text-white">
        <ErrorBoundary fallback={<div className="p-12 text-center text-ink font-alegreya">Unable to load portfolio.</div>}>
          {/* 1. Full-Screen Landing (Adjany Reference) */}
          <Landing />

          {/* 2. Full-Width Photo Gallery (Kayla Arianne Reference expanded to 100% width, all 24 photos) */}
          <FullWidthGallery onOpenInspection={handleOpenInspection} />

          {/* 3 & 4. Contact (3 Options) & Small Footer */}
          <ContactSection />

          {/* Optional Accessible Lightbox */}
          <Lightbox
            photo={inspectedPhoto}
            photos={CURATED_GALLERY_PHOTOS}
            isOpen={isModalOpen}
            onClose={handleCloseInspection}
            onNavigate={handleModalNavigate}
          />
        </ErrorBoundary>
      </div>
    </LenisContext.Provider>
  );
};

export default App;
