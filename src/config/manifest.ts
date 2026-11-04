import { PhotoAsset, Category } from '../types';

export const ALL_PHOTOS: PhotoAsset[] = [
  // --- BEAUTY ---
  {
    id: 'hero-editorial-black',
    cleanName: 'hero-editorial-black',
    title: 'Editorial Beauty I',
    category: 'Beauty',
    focalPoint: { x: 50, y: 35 },
    alt: 'Rishu Aggarwal in black ribbed top with emerald smokey eyes, hands framing face',
    originalFile: 'WhatsApp Image 2026-10-30 at 09.58.29.jpeg',
    aspectRatio: 0.563,
    width: 1080,
    height: 1920,
    thumbWidth: 450,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/hero-editorial-black.webp',
    srcJpg: '/images/optimized/hero-editorial-black.jpg',
    thumb: '/images/thumbs/hero-editorial-black.webp',
    thumbJpg: '/images/thumbs/hero-editorial-black.jpg'
  },
  {
    id: 'beauty-direct-editorial',
    cleanName: 'beauty-direct-editorial',
    title: 'Portrait Study',
    category: 'Beauty',
    focalPoint: { x: 50, y: 35 },
    alt: 'Close-up editorial portrait with direct piercing gaze and hand poised beneath chin',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.03.22.jpeg',
    aspectRatio: 0.563,
    width: 1080,
    height: 1920,
    thumbWidth: 450,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/beauty-direct-editorial.webp',
    srcJpg: '/images/optimized/beauty-direct-editorial.jpg',
    thumb: '/images/thumbs/beauty-direct-editorial.webp',
    thumbJpg: '/images/thumbs/beauty-direct-editorial.jpg'
  },
  {
    id: 'beauty-eyes-closed',
    cleanName: 'beauty-eyes-closed',
    title: 'Gilded Eyeshadow',
    category: 'Beauty',
    focalPoint: { x: 50, y: 35 },
    alt: 'Editorial beauty portrait showing delicate green and gold eyeshadow with eyes gently closed',
    originalFile: 'WhatsApp Image 2026-10-30 at 09.58.19.jpeg',
    aspectRatio: 0.563,
    width: 1080,
    height: 1920,
    thumbWidth: 450,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/beauty-eyes-closed.webp',
    srcJpg: '/images/optimized/beauty-eyes-closed.jpg',
    thumb: '/images/thumbs/beauty-eyes-closed.webp',
    thumbJpg: '/images/thumbs/beauty-eyes-closed.jpg'
  },
  {
    id: 'beauty-silver-saree-close',
    cleanName: 'beauty-silver-saree-close',
    title: 'Metallic Saree & Choker',
    category: 'Beauty',
    focalPoint: { x: 50, y: 35 },
    alt: 'Beauty close-up with diamond-cut choker, maang tikka, and metallic drape',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.01.07.jpeg',
    aspectRatio: 0.563,
    width: 1080,
    height: 1920,
    thumbWidth: 450,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/beauty-silver-saree-close.webp',
    srcJpg: '/images/optimized/beauty-silver-saree-close.jpg',
    thumb: '/images/thumbs/beauty-silver-saree-close.webp',
    thumbJpg: '/images/thumbs/beauty-silver-saree-close.jpg'
  },
  {
    id: 'beauty-traditional-red-green',
    cleanName: 'beauty-traditional-red-green',
    title: 'Kundan Jewelry Detail',
    category: 'Beauty',
    focalPoint: { x: 50, y: 35 },
    alt: 'Traditional ethnic close-up with gold jhumkas, emerald accents, and bindi',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.01.09.jpeg',
    aspectRatio: 0.569,
    width: 728,
    height: 1280,
    thumbWidth: 455,
    thumbHeight: 800,
    featured: false,
    src: '/images/optimized/beauty-traditional-red-green.webp',
    srcJpg: '/images/optimized/beauty-traditional-red-green.jpg',
    thumb: '/images/thumbs/beauty-traditional-red-green.webp',
    thumbJpg: '/images/thumbs/beauty-traditional-red-green.jpg'
  },

  // --- BRIDAL ---
  {
    id: 'bridal-red-standing-regal',
    cleanName: 'bridal-red-standing-regal',
    title: 'Scarlet Zardozi Lehenga',
    category: 'Bridal',
    focalPoint: { x: 50, y: 35 },
    alt: 'Standing bridal portrait in heavily embroidered scarlet lehenga against terracotta backdrop',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.02.59.jpeg',
    aspectRatio: 0.667,
    width: 1279,
    height: 1920,
    thumbWidth: 533,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/bridal-red-standing-regal.webp',
    srcJpg: '/images/optimized/bridal-red-standing-regal.jpg',
    thumb: '/images/thumbs/bridal-red-standing-regal.webp',
    thumbJpg: '/images/thumbs/bridal-red-standing-regal.jpg'
  },
  {
    id: 'bridal-red-intimate-choker',
    cleanName: 'bridal-red-intimate-choker',
    title: 'Kundan Choker Detail',
    category: 'Bridal',
    focalPoint: { x: 50, y: 35 },
    alt: 'Bridal beauty portrait with hand gracefully poised near intricate pearl and kundan necklace',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.03.08.jpeg',
    aspectRatio: 0.668,
    width: 1282,
    height: 1920,
    thumbWidth: 534,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/bridal-red-intimate-choker.webp',
    srcJpg: '/images/optimized/bridal-red-intimate-choker.jpg',
    thumb: '/images/thumbs/bridal-red-intimate-choker.webp',
    thumbJpg: '/images/thumbs/bridal-red-intimate-choker.jpg'
  },
  {
    id: 'bridal-red-profile-smile',
    cleanName: 'bridal-red-profile-smile',
    title: 'Veiled Side Profile',
    category: 'Bridal',
    focalPoint: { x: 50, y: 35 },
    alt: 'Side profile bridal composition featuring delicate nath, emerald kundan choker, and sheer red veil',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.05.02.jpeg',
    aspectRatio: 0.667,
    width: 1279,
    height: 1920,
    thumbWidth: 533,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/bridal-red-profile-smile.webp',
    srcJpg: '/images/optimized/bridal-red-profile-smile.jpg',
    thumb: '/images/thumbs/bridal-red-profile-smile.webp',
    thumbJpg: '/images/thumbs/bridal-red-profile-smile.jpg'
  },
  {
    id: 'bridal-red-side-veil-landscape',
    cleanName: 'bridal-red-side-veil-landscape',
    title: 'Veiled Silhouette',
    category: 'Bridal',
    focalPoint: { x: 45, y: 45 },
    alt: 'Cinematic horizontal bridal profile under translucent red veil against warm studio lighting',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.03.22 (1).jpeg',
    aspectRatio: 1.501,
    width: 1920,
    height: 1279,
    thumbWidth: 800,
    thumbHeight: 533,
    featured: true,
    src: '/images/optimized/bridal-red-side-veil-landscape.webp',
    srcJpg: '/images/optimized/bridal-red-side-veil-landscape.jpg',
    thumb: '/images/thumbs/bridal-red-side-veil-landscape.webp',
    thumbJpg: '/images/thumbs/bridal-red-side-veil-landscape.jpg'
  },
  {
    id: 'bridal-red-seated-smile',
    cleanName: 'bridal-red-seated-smile',
    title: 'Seated Lehenga Composition',
    category: 'Bridal',
    focalPoint: { x: 50, y: 35 },
    alt: 'Seated bridal portrait with circular lehenga skirt spread across the floor',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.02.15.jpeg',
    aspectRatio: 0.667,
    width: 1279,
    height: 1920,
    thumbWidth: 533,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/bridal-red-seated-smile.webp',
    srcJpg: '/images/optimized/bridal-red-seated-smile.jpg',
    thumb: '/images/thumbs/bridal-red-seated-smile.webp',
    thumbJpg: '/images/thumbs/bridal-red-seated-smile.jpg'
  },
  {
    id: 'ethnic-pink-palace',
    cleanName: 'ethnic-pink-palace',
    title: 'Palace Arch Lehenga',
    category: 'Bridal',
    focalPoint: { x: 50, y: 45 },
    alt: 'Full length portrait in soft pink embellished lehenga centered under palace archway',
    originalFile: 'WhatsApp Image 2026-10-30 at 09.58.31 (1).jpeg',
    aspectRatio: 0.574,
    width: 1102,
    height: 1920,
    thumbWidth: 459,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/ethnic-pink-palace.webp',
    srcJpg: '/images/optimized/ethnic-pink-palace.jpg',
    thumb: '/images/thumbs/ethnic-pink-palace.webp',
    thumbJpg: '/images/thumbs/ethnic-pink-palace.jpg'
  },
  {
    id: 'ethnic-regal-throne',
    cleanName: 'ethnic-regal-throne',
    title: 'Black & Gold Attire',
    category: 'Bridal',
    focalPoint: { x: 50, y: 40 },
    alt: 'Seated in carved antique armchair wearing black and gold royal Indian attire',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.03.08 (1).jpeg',
    aspectRatio: 0.572,
    width: 1098,
    height: 1920,
    thumbWidth: 457,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/ethnic-regal-throne.webp',
    srcJpg: '/images/optimized/ethnic-regal-throne.jpg',
    thumb: '/images/thumbs/ethnic-regal-throne.webp',
    thumbJpg: '/images/thumbs/ethnic-regal-throne.jpg'
  },
  {
    id: 'ethnic-emerald-veil',
    cleanName: 'ethnic-emerald-veil',
    title: 'Emerald Embellished Drape',
    category: 'Bridal',
    focalPoint: { x: 50, y: 35 },
    alt: 'Detailed ethnic portrait in emerald green blouse and veil with antique ruby jewelry',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.03.08 (2).jpeg',
    aspectRatio: 0.563,
    width: 1080,
    height: 1920,
    thumbWidth: 450,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/ethnic-emerald-veil.webp',
    srcJpg: '/images/optimized/ethnic-emerald-veil.jpg',
    thumb: '/images/thumbs/ethnic-emerald-veil.webp',
    thumbJpg: '/images/thumbs/ethnic-emerald-veil.jpg'
  },
  {
    id: 'ethnic-banarasi-heritage',
    cleanName: 'ethnic-banarasi-heritage',
    title: 'Crimson & Green Silk',
    category: 'Bridal',
    focalPoint: { x: 50, y: 40 },
    alt: 'Classic Indian ethnic portrait in red and green banarasi silk with floral gajra',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.01.35.jpeg',
    aspectRatio: 0.75,
    width: 960,
    height: 1280,
    thumbWidth: 600,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/ethnic-banarasi-heritage.webp',
    srcJpg: '/images/optimized/ethnic-banarasi-heritage.jpg',
    thumb: '/images/thumbs/ethnic-banarasi-heritage.webp',
    thumbJpg: '/images/thumbs/ethnic-banarasi-heritage.jpg'
  },

  // --- LIFESTYLE ---
  {
    id: 'lifestyle-counter-candid',
    cleanName: 'lifestyle-counter-candid',
    title: 'Café Candid',
    category: 'Lifestyle',
    focalPoint: { x: 50, y: 45 },
    alt: 'Candid lifestyle portrait smiling naturally at a mosaic café counter',
    originalFile: 'WhatsApp Image 2026-10-30 at 09.58.31.jpeg',
    aspectRatio: 0.75,
    width: 1440,
    height: 1920,
    thumbWidth: 600,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/lifestyle-counter-candid.webp',
    srcJpg: '/images/optimized/lifestyle-counter-candid.jpg',
    thumb: '/images/thumbs/lifestyle-counter-candid.webp',
    thumbJpg: '/images/thumbs/lifestyle-counter-candid.jpg'
  },
  {
    id: 'lifestyle-dessert-celebration',
    cleanName: 'lifestyle-dessert-celebration',
    title: 'Celebration Portrait',
    category: 'Lifestyle',
    focalPoint: { x: 50, y: 40 },
    alt: 'Joyful candid portrait holding a decorated dessert bowl against illuminated shelving',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.03.04.jpeg',
    aspectRatio: 0.75,
    width: 1440,
    height: 1920,
    thumbWidth: 600,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/lifestyle-dessert-celebration.webp',
    srcJpg: '/images/optimized/lifestyle-dessert-celebration.jpg',
    thumb: '/images/thumbs/lifestyle-dessert-celebration.webp',
    thumbJpg: '/images/thumbs/lifestyle-dessert-celebration.jpg'
  },
  {
    id: 'lifestyle-counter-beverage',
    cleanName: 'lifestyle-counter-beverage',
    title: 'Daylight Counter',
    category: 'Lifestyle',
    focalPoint: { x: 50, y: 40 },
    alt: 'Contemporary lifestyle portrait at stained-glass counter with glass beverage jar',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.03.07 (1).jpeg',
    aspectRatio: 0.75,
    width: 1440,
    height: 1920,
    thumbWidth: 600,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/lifestyle-counter-beverage.webp',
    srcJpg: '/images/optimized/lifestyle-counter-beverage.jpg',
    thumb: '/images/thumbs/lifestyle-counter-beverage.webp',
    thumbJpg: '/images/thumbs/lifestyle-counter-beverage.jpg'
  },
  {
    id: 'lifestyle-bbq-dining',
    cleanName: 'lifestyle-bbq-dining',
    title: 'Dining Feature',
    category: 'Lifestyle',
    focalPoint: { x: 50, y: 40 },
    alt: 'Vibrant dining feature with barbecue grill spread and spontaneous expression',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.03.07 (2).jpeg',
    aspectRatio: 0.75,
    width: 1440,
    height: 1920,
    thumbWidth: 600,
    thumbHeight: 800,
    featured: true,
    src: '/images/optimized/lifestyle-bbq-dining.webp',
    srcJpg: '/images/optimized/lifestyle-bbq-dining.jpg',
    thumb: '/images/thumbs/lifestyle-bbq-dining.webp',
    thumbJpg: '/images/thumbs/lifestyle-bbq-dining.jpg'
  },
  {
    id: 'lifestyle-candid-snack',
    cleanName: 'lifestyle-candid-snack',
    title: 'Casual Portrait',
    category: 'Lifestyle',
    focalPoint: { x: 50, y: 40 },
    alt: 'Warm candid lifestyle photograph enjoying chaat snacks',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.03.07.jpeg',
    aspectRatio: 0.75,
    width: 1440,
    height: 1920,
    thumbWidth: 600,
    thumbHeight: 800,
    featured: false,
    src: '/images/optimized/lifestyle-candid-snack.webp',
    srcJpg: '/images/optimized/lifestyle-candid-snack.jpg',
    thumb: '/images/thumbs/lifestyle-candid-snack.webp',
    thumbJpg: '/images/thumbs/lifestyle-candid-snack.jpg'
  },
  {
    id: 'lifestyle-evening-glasses',
    cleanName: 'lifestyle-evening-glasses',
    title: 'Evening Dining',
    category: 'Lifestyle',
    focalPoint: { x: 50, y: 45 },
    alt: 'Atmospheric night portrait in glasses at an outdoor rustic wooden table',
    originalFile: 'WhatsApp Image 2026-10-30 at 10.01.23.jpeg',
    aspectRatio: 0.571,
    width: 731,
    height: 1280,
    thumbWidth: 457,
    thumbHeight: 800,
    featured: false,
    src: '/images/optimized/lifestyle-evening-glasses.webp',
    srcJpg: '/images/optimized/lifestyle-evening-glasses.jpg',
    thumb: '/images/thumbs/lifestyle-evening-glasses.webp',
    thumbJpg: '/images/thumbs/lifestyle-evening-glasses.jpg'
  },
{"id": "bridal-red-seated-serene", "cleanName": "bridal-red-seated-serene", "title": "Seated bridal portrait with gaze lowered", "category": "Bridal", "focalPoint": {"x": 50, "y": 35}, "alt": "Seated bridal portrait with gaze lowered", "originalFile": "WhatsApp Image 2026-10-30 at 10.02.15 (1).jpeg", "aspectRatio": 0.6661458333333333, "width": 1279, "height": 1920, "thumbWidth": 450, "thumbHeight": 800, "featured": false, "src": "/images/optimized/bridal-red-seated-serene.webp", "srcJpg": "/images/optimized/bridal-red-seated-serene.jpg", "thumb": "/images/thumbs/bridal-red-seated-serene.webp", "thumbJpg": "/images/thumbs/bridal-red-seated-serene.jpg"},
{"id": "bridal-red-skirt-vertical", "cleanName": "bridal-red-skirt-vertical", "title": "Seated red bridal portrait with skirt arranged on the floor", "category": "Bridal", "focalPoint": {"x": 50, "y": 35}, "alt": "Seated red bridal portrait with skirt arranged on the floor", "originalFile": "WhatsApp Image 2026-10-30 at 10.05.04.jpeg", "aspectRatio": 0.6661458333333333, "width": 1279, "height": 1920, "thumbWidth": 450, "thumbHeight": 800, "featured": false, "src": "/images/optimized/bridal-red-skirt-vertical.webp", "srcJpg": "/images/optimized/bridal-red-skirt-vertical.jpg", "thumb": "/images/thumbs/bridal-red-skirt-vertical.webp", "thumbJpg": "/images/thumbs/bridal-red-skirt-vertical.jpg"},
{"id": "bridal-red-wide-spread", "cleanName": "bridal-red-wide-spread", "title": "Wide bridal portrait with the red skirt spread across the floor", "category": "Bridal", "focalPoint": {"x": 50, "y": 35}, "alt": "Wide bridal portrait with the red skirt spread across the floor", "originalFile": "WhatsApp Image 2026-10-30 at 10.05.03.jpeg", "aspectRatio": 1.5011727912431587, "width": 1920, "height": 1279, "thumbWidth": 450, "thumbHeight": 800, "featured": false, "src": "/images/optimized/bridal-red-wide-spread.webp", "srcJpg": "/images/optimized/bridal-red-wide-spread.jpg", "thumb": "/images/thumbs/bridal-red-wide-spread.webp", "thumbJpg": "/images/thumbs/bridal-red-wide-spread.jpg"},
{"id": "ethnic-black-silver-standing", "cleanName": "ethnic-black-silver-standing", "title": "Standing portrait in a contemporary black and silver outfit", "category": "Bridal", "focalPoint": {"x": 50, "y": 35}, "alt": "Standing portrait in a contemporary black and silver outfit", "originalFile": "WhatsApp Image 2026-10-30 at 10.01.08.jpeg", "aspectRatio": 0.5625, "width": 1080, "height": 1920, "thumbWidth": 450, "thumbHeight": 800, "featured": false, "src": "/images/optimized/ethnic-black-silver-standing.webp", "srcJpg": "/images/optimized/ethnic-black-silver-standing.jpg", "thumb": "/images/thumbs/ethnic-black-silver-standing.webp", "thumbJpg": "/images/thumbs/ethnic-black-silver-standing.jpg"}
];

export const getPhotosByCategory = (category: Category): PhotoAsset[] => {
  return ALL_PHOTOS.filter((p) => p.category === category);
};

export const CATEGORIES: Category[] = ['Beauty', 'Bridal', 'Lifestyle'];

export const CURATED_GALLERY_IDS = [
  'bridal-red-standing-regal',      // 1. Grand bridal standing (AR 0.667)
  'beauty-silver-saree-close',      // 2. Metallic saree close-up (AR 0.563)
  'ethnic-banarasi-heritage',       // 3. Crimson & green silk (AR 0.75)
  'beauty-eyes-closed',             // 4. Gilded eyeshadow beauty detail (AR 0.563)
  'ethnic-black-silver-standing',   // 5. Contemporary noir look (AR 0.563)
  'bridal-red-side-veil-landscape', // 6. Veiled silhouette landscape (AR 1.501)
  'bridal-red-intimate-choker',     // 7. Kundan choker detail (AR 0.668)
  'bridal-red-seated-serene',       // 8. Seated bridal serenity (AR 0.667)
  'ethnic-pink-palace',             // 9. Palace arch lehenga (AR 0.574)
  'beauty-traditional-red-green',   // 10. Kundan jewelry detail (AR 0.569)
  'bridal-red-profile-smile',       // 11. Veiled side profile (AR 0.667)
  'bridal-red-wide-spread',         // 12. Grand lehenga flare spread (AR 1.501)
  'ethnic-regal-throne',            // 13. Black & gold attire (AR 0.572)
  'bridal-red-skirt-vertical',      // 14. Bridal couture detail (AR 0.667)
  'beauty-direct-editorial',        // 15. Portrait study (AR 0.563)
  'ethnic-emerald-veil',            // 16. Emerald embellished drape (AR 0.563)
  'bridal-red-seated-smile',        // 17. Seated lehenga composition (AR 0.667)
  'lifestyle-counter-candid',       // 18. Café candid (AR 0.75)
  'lifestyle-counter-beverage',     // 19. Daylight counter (AR 0.75)
  'lifestyle-dessert-celebration',  // 20. Celebration portrait (AR 0.75)
  'lifestyle-bbq-dining',           // 21. Dining feature (AR 0.75)
  'lifestyle-candid-snack',         // 22. Casual portrait (AR 0.75)
  'lifestyle-evening-glasses',      // 23. Evening dining (AR 0.571)
  'hero-editorial-black',           // 24. Editorial beauty I (AR 0.563)
];

export const CURATED_GALLERY_PHOTOS: PhotoAsset[] = CURATED_GALLERY_IDS.map(
  (id) => ALL_PHOTOS.find((p) => p.id === id)!
).filter(Boolean);

