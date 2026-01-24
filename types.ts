
export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  specs: { [key: string]: string };
  stock: number;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isDeal?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  avatar: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
}
