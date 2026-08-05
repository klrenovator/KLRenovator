/**
 * Typed interfaces for config/site domain collections (P3-03).
 * These interfaces describe the full shape of area, kampung, and blog data
 * as used in sitemap generation and route rendering. They replace `as any`
 * casts with proper typed property access.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export interface AreaPage {
  slug: string;
  name: string;
  shortName: string;
  state: string;
  lat: number;
  lng: number;
  population: string;
  landmarks: string[];
  description: string;
  descriptionMS: string;
  descriptionZH: string;
  metaTitle: string;
  metaDesc: string;
  metaTitleMS: string;
  metaDescMS: string;
  metaTitleZH: string;
  metaDescZH: string;
  heroImage: string;
  faqs: FaqItem[];
  faqsBM: FaqItem[];
  faqsZH: FaqItem[];
}

export interface KampungPage {
  slug: string;
  parentSlug: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  housingNote: string;
  description: string;
  descriptionMS: string;
  descriptionZH: string;
  metaTitle: string;
  metaDesc: string;
  metaTitleMS: string;
  metaDescMS: string;
  metaTitleZH: string;
  metaDescZH: string;
  faqs: FaqItem[];
  faqsBM: FaqItem[];
  faqsZH: FaqItem[];
}
