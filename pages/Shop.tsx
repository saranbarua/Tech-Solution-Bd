import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { SEO, Layout } from "../components/Layout";
import { ProductCard, Breadcrumbs, Button } from "../components/UI";
import { dataService } from "../services/dataService";
import { Product, Brand, CategoryNode } from "../types";

const collectSlugs = (node: CategoryNode): string[] => {
  const own = [node.slug];
  const kids = (node.children || []).flatMap(collectSlugs);
  return [...own, ...kids];
};

const findNodeBySlug = (
  nodes: CategoryNode[],
  slug: string,
): CategoryNode | null => {
  for (const n of nodes) {
    if (n.slug === slug) return n;
    const found = n.children?.length ? findNodeBySlug(n.children, slug) : null;
    if (found) return found;
  }
  return null;
};

const CategoryTreeButtons = ({
  nodes,
  selectedSlug,
  onSelect,
  openNodes,
  setOpenNodes,
  level = 0,
}: {
  nodes: CategoryNode[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
  openNodes: Set<string>;
  setOpenNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  level?: number;
}) => {
  const collectSlugs = (node: CategoryNode): string[] => [
    node.slug,
    ...(node.children || []).flatMap(collectSlugs),
  ];

  const isAncestorOfSelected = (node: CategoryNode) => {
    if (!selectedSlug || selectedSlug === "All") return false;
    const all = collectSlugs(node);
    return all.includes(selectedSlug) && node.slug !== selectedSlug;
  };

  const toggle = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    setOpenNodes((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  return (
    <div className="space-y-0.5">
      {nodes.map((node) => {
        const isActive = selectedSlug === node.slug;
        const isOpen = openNodes.has(node.slug);
        const isAncestor = isAncestorOfSelected(node);
        const hasChildren = !!node.children?.length;

        return (
          <div key={node.id}>
            <div
              onClick={() => {
                onSelect(node.slug);
                if (hasChildren) {
                  setOpenNodes((prev) => {
                    const next = new Set(prev);
                    next.add(node.slug); // auto-open when selected
                    return next;
                  });
                }
              }}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-all
                ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 font-medium"
                    : isAncestor
                      ? "text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
                }`}
              style={{ paddingLeft: level * 14 + 8 }}
            >
              {/* Toggle arrow */}
              {hasChildren ? (
                <span
                  onClick={(e) => toggle(e, node.slug)}
                  className="flex items-center justify-center w-5 h-5 rounded-md hover:bg-black/5 transition-colors flex-shrink-0"
                >
                  <ChevronRight
                    size={13}
                    className="transition-transform duration-200"
                    style={{
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  />
                </span>
              ) : (
                <span className="w-5 flex-shrink-0" />
              )}

              <span className="flex-1 leading-snug">{node.name}</span>

              {/* Optional: count badge — wire up real counts from your data */}
              {/* <span className="text-xs bg-slate-100 text-slate-400 rounded-full px-2 py-0.5">{node.count}</span> */}
            </div>

            {/* Children with CSS transition */}
            <div
              className="overflow-hidden transition-all duration-250 ease-in-out"
              style={{
                maxHeight: isOpen ? "600px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {hasChildren && (
                <CategoryTreeButtons
                  nodes={node.children!}
                  selectedSlug={selectedSlug}
                  onSelect={onSelect}
                  openNodes={openNodes}
                  setOpenNodes={setOpenNodes}
                  level={level + 1}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export const Shop = () => {
  const [searchParams] = useSearchParams();
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCat, setSelectedCat] = useState(
    searchParams.get("category") || "All",
  );
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const autoOpenAncestors = (
    nodes: CategoryNode[],
    targetSlug: string,
    open: Set<string>,
  ) => {
    for (const n of nodes) {
      const slugs = collectSlugs(n);
      if (slugs.includes(targetSlug) && n.slug !== targetSlug) {
        open.add(n.slug);
        if (n.children) autoOpenAncestors(n.children, targetSlug, open);
      }
    }
  };

  // Call inside your URL sync useEffect:
  useEffect(() => {
    const catFromUrl = searchParams.get("category") || "All";
    setSelectedCat(catFromUrl);
    if (catFromUrl !== "All") {
      setOpenNodes((prev) => {
        const next = new Set(prev);
        autoOpenAncestors(categories, catFromUrl, next);
        return next;
      });
    }
  }, [searchParams, categories]);

  // ✅ load categories + brands once
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [c, b] = await Promise.all([
          dataService.getCategories(),
          dataService.getBrands(),
        ]);
        setCategories(c);
        setBrands(b);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ load products (fetch all once; then filter locally for parent/child support)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const p = await dataService.getProducts();
        // console.log(p);
        // all products
        setProducts(p);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const allowedCategorySlugs = useMemo(() => {
    if (selectedCat === "All") return null;
    const node = findNodeBySlug(categories, selectedCat);
    if (!node) return new Set([selectedCat]); // fallback
    return new Set(collectSlugs(node)); // include children
  }, [categories, selectedCat]);

  const filteredProducts = useMemo(() => {
    const list = products
      .filter((p: any) => {
        const catOk =
          selectedCat === "All"
            ? true
            : allowedCategorySlugs
              ? allowedCategorySlugs.has(p.category?.slug)
              : p.category?.slug === selectedCat;

        const brandOk = selectedBrand === "All" || p.brand === selectedBrand;
        return catOk && brandOk;
      })
      .sort((a: any, b: any) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "popular") return (b.rating || 0) - (a.rating || 0);
        return 0;
      });

    return list;
  }, [products, selectedCat, selectedBrand, sortBy, allowedCategorySlugs]);

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
              {/* Category Filter (Tree) */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 pb-2 border-b">
                  Categories
                </h4>

                <button
                  onClick={() => setSelectedCat("All")}
                  className={`block w-full text-left text-sm py-1.5 rounded-lg px-2 transition-colors
                    ${selectedCat === "All" ? "text-emerald-700 font-bold bg-emerald-50" : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"}`}
                >
                  All Categories
                </button>

                <div className="mt-2">
                  <CategoryTreeButtons
                    nodes={categories}
                    selectedSlug={selectedCat}
                    onSelect={(slug) => setSelectedCat(slug)}
                    openNodes={openNodes}
                    setOpenNodes={setOpenNodes}
                  />
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
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}

            {/* Pagination (static for now) */}
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
