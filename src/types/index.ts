// Product Types
export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  categories: string[];
  options?: ProductOption[];
  stock: number;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductOption {
  name: string; // e.g., "Size", "Metal Type"
  values: string[]; // e.g., ["S", "M", "L"] or ["Gold", "Silver"]
  required: boolean;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  order: number;
  active: boolean;
}

// User Types
export interface User {
  uid: string;
  email: string;
  name: string;
  phone?: string;
  role: 'admin' | 'customer';
  createdAt: Date;
}

// Cart Types
export interface CartItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  selectedOptions?: Record<string, string>; // e.g., { "Size": "M", "Metal": "Gold" }
}

export interface Cart {
  id: string; // uid or sessionId
  items: CartItem[];
  totals: {
    subtotal: number;
    shipping: number;
    discount: number;
    grandTotal: number;
  };
  updatedAt: Date;
}

// Order Types
export interface Order {
  id: string;
  items: CartItem[];
  totals: {
    subtotal: number;
    shipping: number;
    discount: number;
    grandTotal: number;
  };
  customer: {
    uid?: string;
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Newsletter Types
export interface NewsletterLead {
  id: string;
  email: string;
  createdAt: Date;
}

// Homepage CMS Types
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  image?: string;
  order: number;
}

export interface HomepageContent {
  heroSlides: HeroSlide[];
  featuredCollectionIds: string[];
  testimonials: Testimonial[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Form Types
export interface CheckoutFormData {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
}

// Filter Types
export interface ProductFilters {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  search: string;
  sortBy: 'newest' | 'oldest' | 'price-low' | 'price-high' | 'name';
}
