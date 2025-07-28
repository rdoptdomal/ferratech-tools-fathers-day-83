export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  variations?: any;
  stock: number;
  rating: number;
  reviews: number;
  brand: string;
  inStock?: boolean;
  category?: string;
  specifications?: string[];
  detailedSpecs?: {
    power?: string;
    voltage?: string;
    speed?: string;
    capacity?: string;
    weight?: string;
    dimensions?: string;
    warranty?: string;
    includes?: string[];
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  children?: Category[];
  _count?: {
    products: number;
  };
} 