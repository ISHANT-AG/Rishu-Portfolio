export type Category = 'Beauty' | 'Bridal' | 'Lifestyle';

export interface PhotoAsset {
  id: string;
  cleanName: string;
  title: string;
  category: Category;
  focalPoint: {
    x: number;
    y: number;
  };
  alt: string;
  originalFile: string;
  aspectRatio: number;
  width: number;
  height: number;
  thumbWidth: number;
  thumbHeight: number;
  featured: boolean;
  src: string;
  srcJpg: string;
  thumb: string;
  thumbJpg: string;
}

export interface ModelProfile {
  name: string;
  headline: string;
  role: string;
  location: {
    city: string;
    state: string;
    country: string;
    hometown: string;
  };
  attributes: {
    height: string;
    weight: string;
    eyes: string;
    hair: string;
    dressSize: string;
    languages: string[];
    // Unconfirmed attributes retained internally but hidden from public display
    unconfirmed: {
      bust: string;
      waist: string;
      shoeSize: string;
    };
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    defaultWhatsAppMessage: string;
    instagram: {
      handle: string;
      url: string;
    };
  };
  bio: string;
}
