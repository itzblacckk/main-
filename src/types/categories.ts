export const TOUR_CATEGORIES = [
  'Mumbai Treks',
  'Pune Treks',
  'Camping',
  'Himachal Tours',
  'Uttarakhand Tours'
] as const;

export const EVENT_CATEGORIES = [
  'Adventure Workshops',
  'Training Programs',
  'Team Building',
  'Competitions',
  'Cultural Events'
] as const;

export type TourCategory = typeof TOUR_CATEGORIES[number];
export type EventCategory = typeof EVENT_CATEGORIES[number];

// Category background images
export const CATEGORY_BACKGROUNDS: Record<TourCategory, string> = {
  'Mumbai Treks': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80',
  'Pune Treks': 'https://images.unsplash.com/photo-1580311411017-a3c3758aea20?auto=format&fit=crop&q=80',
  'Camping': 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&q=80',
  'Himachal Tours': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80',
  'Uttarakhand Tours': 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?auto=format&fit=crop&q=80'
};