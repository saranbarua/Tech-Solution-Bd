import fetchData from "@/src/utils/fetchData";
import { PRODUCTS, BRANDS, TESTIMONIALS } from "../data/mockData";
import { Product, Category, Brand, Testimonial, CategoryNode } from "../types";
import apiurl from "@/src/apiUrl/apiUrl";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dataService = {
  getProducts: async (): Promise<Product[]> => {
    await delay(300);
    return PRODUCTS;
  },
  getProductById: async (id: string): Promise<Product | undefined> => {
    await delay(200);
    return PRODUCTS.find((p) => p.id === id);
  },

  getBrands: async (): Promise<Brand[]> => {
    return BRANDS;
  },
  getTestimonials: async (): Promise<Testimonial[]> => {
    return TESTIMONIALS;
  },
  getCategories(): Promise<CategoryNode[]> {
    return fetchData(`${apiurl.mainUrl}customer-panel/categories`);
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    await delay(100);
    const q = query.toLowerCase();

    return PRODUCTS.filter((p: any) => {
      const name = (p.name || "").toLowerCase();
      const brand = (p.brand || "").toLowerCase();
      const catName =
        typeof p.category === "string"
          ? p.category.toLowerCase()
          : (p.category?.name || "").toLowerCase();

      return name.includes(q) || brand.includes(q) || catName.includes(q);
    });
  },
};
