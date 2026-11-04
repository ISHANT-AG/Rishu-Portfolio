import { ModelProfile } from '../types';

export const PROFILE_DATA: ModelProfile = {
  name: 'Rishu Aggarwal',
  headline: 'RISHU',
  role: 'Model',
  location: {
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    hometown: 'Jaipur, Rajasthan',
  },
  attributes: {
    height: "5′1″",
    weight: '59 kg',
    eyes: 'Black',
    hair: 'Black',
    dressSize: 'L',
    languages: ['Hindi', 'English'],
    unconfirmed: {
      bust: '32', // Unit unconfirmed in source brief; retained internally, hidden from public display
      waist: '30', // Unit unconfirmed in source brief; retained internally, hidden from public display
      shoeSize: '6', // Sizing system unconfirmed; retained internally, hidden from public display
    },
  },
  contact: {
    phone: '+917073303645',
    phoneFormatted: '+91 7073303645',
    whatsappNumber: '917073303645',
    whatsappDisplay: '+91 7073303645',
    defaultWhatsAppMessage: "Hi Rishu, I would like to enquire about a modelling booking.\n\nProject type: \nTarget date: \nLocation: ",
    instagram: {
      handle: '@rishu.slayy',
      url: 'https://www.instagram.com/rishu.slayy/',
    },
  },
  bio: 'Rishu Aggarwal is a model based in Ahmedabad, originally from Jaipur. Explore her bridal, beauty, and lifestyle portfolio.',
};
