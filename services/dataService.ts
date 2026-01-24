
import { PRODUCTS, CATEGORIES, BRANDS, TESTIMONIALS } from '../data/mockData';
import { Product, Category, Brand, Testimonial } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dataService = {
  getProducts: async (): Promise<Product[]> => {
    await delay(300);
    return PRODUCTS;
  },
  getProductById: async (id: string): Promise<Product | undefined> => {
    await delay(200);
    return PRODUCTS.find(p => p.id === id);
  },
  getCategories: async (): Promise<Category[]> => {
    return CATEGORIES;
  },
  getBrands: async (): Promise<Brand[]> => {
    return BRANDS;
  },
  getTestimonials: async (): Promise<Testimonial[]> => {
    return TESTIMONIALS;
  },
  searchProducts: async (query: string): Promise<Product[]> => {
    await delay(100);
    const q = query.toLowerCase();
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  }
};
