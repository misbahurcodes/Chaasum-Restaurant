export type MenuCategory = 
  | 'all'
  | 'momos'
  | 'tibetan-asian'
  | 'main-course'
  | 'snacks'
  | 'desserts-beverages';

export type DietType = 'all' | 'veg' | 'non-veg';

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: MenuCategory;
  price: number;
  diet: 'veg' | 'non-veg';
  description: string;
  image: string;
  isSignature?: boolean;
  spicyLevel?: 1 | 2 | 3;
}

export interface ReviewItem {
  id: string;
  author: string;
  source: 'Google Review' | 'Verified Guest';
  rating: number;
  timeAgo: string;
  excerpt: string;
  verifiedVisit: string;
}

export interface ReservationPayload {
  name: string;
  phone: string;
  email?: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: 'indoor-forest-view' | 'terrace' | 'private-dining' | 'standard';
  specialRequests?: string;
}

export interface ConfirmedReservation {
  code: string;
  name: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: string;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled';
  specialRequests?: string;
}
