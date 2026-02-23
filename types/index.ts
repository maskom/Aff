export interface Offer {
  id: number;
  brand: string;
  product: string;
  description: string;
  category: string;
  commission: string;
  lastUpdate: string;
  conversion: number;
}

export interface OfferCard extends Offer {
  brandInitials: string;
}

export interface Story {
  id: number;
  label: string;
  icon: string;
  change: string;
  trend: 'naik' | 'turun' | 'stabil';
}

export interface MenuItem {
  label: string;
  icon: string;
}
