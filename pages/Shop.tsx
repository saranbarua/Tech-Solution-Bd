import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SEO, Layout } from "../components/Layout";
import { ProductCard, Breadcrumbs, Button } from "../components/UI";
import { dataService } from "../services/dataService";
import { Product, Category, Brand } from "../types";

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedCat, setSelectedCat] = useState(
    searchParams.get("category") || "All",
  );
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250000]);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      dataService.getProducts(),
      dataService.getCategories(),
      dataService.getBrands(),
    ]).then(([p, c, b]) => {
      setProducts(p);
      setCategories(c);
      setBrands(b);
      setLoading(false);
    });
  }, []);

  const filteredProducts = products
    .filter((p) => {
      const catMatch =
        selectedCat === "All" || p.category?.slug === selectedCat;

      const brandMatch = selectedBrand === "All" || p.brand === selectedBrand;
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
      return catMatch && brandMatch && priceMatch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "popular") return b.rating - a.rating;
      return 0; // newest/default
    });

  return (
    <Layout>
      <SEO
        title="Shop"
        description="Explore our huge collection of laptops, desktops, and accessories."
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Shop" }]} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <Button variant="outline" className="flex-1 gap-2">
                <Filter size={18} /> Filter
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <SlidersHorizontal size={18} /> Sort
              </Button>
            </div>

            <div className="hidden lg:block space-y-8 sticky top-24">
              {/* Category Filter */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 pb-2 border-b">
                  Categories
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCat("All")}
                    className={`block w-full text-left text-sm py-1 transition-colors ${selectedCat === "All" ? "text-emerald-600 font-bold" : "text-slate-500 hover:text-emerald-600"}`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.slug)}
                      className={`block w-full text-left text-sm py-1 transition-colors ${selectedCat === cat.slug ? "text-emerald-600 font-bold" : "text-slate-500 hover:text-emerald-600"}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 pb-2 border-b">
                  Price Range
                </h4>
                <input
                  type="range"
                  min="0"
                  max="250000"
                  step="5000"
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 mb-2"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                />
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>0 BDT</span>
                  <span>{priceRange[1].toLocaleString()} BDT</span>
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 pb-2 border-b">
                  Brands
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedBrand("All")}
                    className={`text-xs px-2 py-1.5 rounded-md border transition-all ${selectedBrand === "All" ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300"}`}
                  >
                    All
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => setSelectedBrand(brand.name)}
                      className={`text-xs px-2 py-1.5 rounded-md border transition-all ${selectedBrand === brand.name ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300"}`}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-black text-slate-900">
                  {selectedCat === "All" ? "All Products" : selectedCat}
                </h1>
                <p className="text-sm text-slate-500 font-medium">
                  {filteredProducts.length} items found
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-1 bg-slate-50">
                  <button className="p-1.5 rounded hover:bg-white text-slate-600">
                    <LayoutGrid size={18} />
                  </button>
                  <button className="p-1.5 rounded hover:bg-white text-slate-400">
                    <List size={18} />
                  </button>
                </div>
                <select
                  className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:border-emerald-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-slate-100 h-80 rounded-xl" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  No matching products
                </h3>
                <p className="text-slate-500 mb-6">
                  Try adjusting your filters or search criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCat("All");
                    setSelectedBrand("All");
                    setPriceRange([0, 250000]);
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                className="p-2 rounded-lg border border-slate-200 disabled:opacity-30"
                disabled
              >
                <ChevronLeft size={20} />
              </button>
              <button className="w-10 h-10 rounded-lg bg-emerald-600 text-white font-bold">
                1
              </button>
              <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                3
              </button>
              <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                <ChevronRight size={20} />
              </button>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};
