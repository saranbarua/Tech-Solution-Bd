import fetchData from "@/src/utils/fetchData";
import { PRODUCTS, BRANDS, TESTIMONIALS } from "../data/mockData";
import { Product, Brand, Testimonial, CategoryNode } from "../types";
import apiurl from "@/src/apiUrl/apiUrl";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const buildUrl = (path: string) => {
  // ensure single slash
  const base = apiurl.mainUrl.endsWith("/")
    ? apiurl.mainUrl
    : `${apiurl.mainUrl}/`;
  return `${base}${path.startsWith("/") ? path.slice(1) : path}`;
};

export const dataService = {
  // getProducts: async (): Promise<Product[]> => {
  //   await delay(300);
  //   return PRODUCTS;
  // },
  getProductById: async (id: string): Promise<Product | undefined> => {
    await delay(200);
    return PRODUCTS.find((p) => p.id === id);
  },
  getProductBySlug: async (slug: string): Promise<Product> => {
    return fetchData(buildUrl(`customer-panel/products/${slug}`));
  },

  getProducts: async (categorySlug?: string): Promise<Product[]> => {
    const url = new URL(buildUrl("customer-panel/products"));
    if (categorySlug && categorySlug !== "All")
      url.searchParams.set("category", categorySlug);
    return fetchData(url.toString());
  },

  // ✅ API categories tree
  getCategories: async (): Promise<CategoryNode[]> => {
    return fetchData(buildUrl("customer-panel/categories"));
  },

  // (optional) keep mock brands/testimonials for now
  getBrands: async (): Promise<Brand[]> => BRANDS,
  getTestimonials: async (): Promise<Testimonial[]> => TESTIMONIALS,

  // ✅ Search: API endpoint নেই, তাই safest approach:
  // - all products fetch করে client-side filter
  // - (optional) পরে backend এ /products?search= যোগ করলে এটা server-side হবে
  searchProducts: async (query: string): Promise<Product[]> => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const all = await dataService.getProducts(); // fetch all
    return all.filter((p: any) => {
      const name = (p.name || "").toLowerCase();
      const brand = (p.brand || "").toLowerCase();
      const cat = (p.category?.name || "").toLowerCase();
      return name.includes(q) || brand.includes(q) || cat.includes(q);
    });
  },
};
