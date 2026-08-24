export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  location: string;
  description: string;
  image: string;
  googleMapsUrl?: string;
  tag?: string;
  iconName?: 'Heart' | 'Utensils' | 'Coffee' | 'Gift' | 'Sparkles' | 'Car' | 'Camera';
  lat?: number;
  lng?: number;
  distanceFromPrev?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  date: string;
  image: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  rotationAngle?: number; // e.g. -3, 4, -2
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}
