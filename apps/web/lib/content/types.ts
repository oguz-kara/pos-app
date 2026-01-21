/**
 * Content types for GBP categories and services
 * These match the business categories from Google Business Profile
 */

export interface GBPCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string; // Emoji or icon name
  isPrimary: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  benefits: string[];
  image?: string;
}

export interface GBPService {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  tags: string[]; // For filtering products
  image?: string; // Unsplash or local image URL
  rating?: number; // Service rating (1-5)
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: {
    street: string;
    district: string;
    city: string;
    postalCode: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    weekdays: string;
    weekend: string;
  };
  serviceAreas: string[];
}

export const CONTACT_INFO: ContactInfo = {
  phone: "+905456534599",
  whatsapp: "905456534599",
  email: "info@karaticaret.com.tr",
  address: {
    street: "Burcu Apt, Cengiz Han Cd No: 14",
    district: "evka 3, Bornova",
    city: "İzmir",
    postalCode: "35050",
  },
  coordinates: {
    lat: 38.4552, // Replace with actual coordinates
    lng: 27.2106,
  },
  hours: {
    weekdays: "09:00 - 22:00",
    weekend: "09:00 - 22:00",
  },
  serviceAreas: [
    "Bornova",
    "Bayraklı",
    "Karşıyaka",
    "Buca",
    "Konak",
    "Balçova",
    "Narlıdere",
    "Karabağlar",
  ],
};
