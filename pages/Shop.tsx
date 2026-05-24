import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Filter,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { SEO, Layout } from "../components/Layout";
import { ProductCard, Breadcrumbs, Button } from "../components/UI";
import { dataService } from "../services/dataService";
import { Product, Brand, CategoryNode } from "../types";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const collectSlugs = (node: CategoryNode): string[] => [
  node.slug,
  ...(node.children || []).flatMap(collectSlugs),
];

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

// ─── Category Tree ─────────────────────────────────────────────────────────────
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
  const toggle = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    setOpenNodes((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  const isAncestorOfSelected = (node: CategoryNode) => {
    if (!selectedSlug || selectedSlug === "All") return false;
    const all = collectSlugs(node);
    return all.includes(selectedSlug) && node.slug !== selectedSlug;
  };

  return (
    <div>
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
                if (hasChildren)
                  setOpenNodes((prev) => new Set([...prev, node.slug]));
              }}
              className={`
                flex items-center gap-1.5 rounded-xl cursor-pointer text-sm
                transition-all duration-150 select-none group
                ${
                  isActive
                    ? "bg-gradient-to-r from-orange-50 to-teal-50 text-orange-800 font-bold shadow-[inset_2px_0_0_#0d9488]"
                    : isAncestor
                      ? "text-orange-700 font-semibold"
                      : "text-slate-500 hover:bg-slate-50 hover:text-orange-700"
                }
              `}
              style={{ padding: `7px 8px 7px ${8 + level * 14}px` }}
            >
              {hasChildren ? (
                <span
                  onClick={(e) => toggle(e, node.slug)}
                  className="flex items-center justify-center w-[18px] h-[18px] rounded flex-shrink-0 text-slate-400 group-hover:text-slate-600 transition-transform duration-200"
                  style={{
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  <ChevronRight size={12} />
                </span>
              ) : (
                <span className="w-[18px] flex-shrink-0" />
              )}
              <span className="flex-1 leading-snug">{node.name}</span>
            </div>

            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: isOpen ? "800px" : "0px",
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

// ─── Shop Page ─────────────────────────────────────────────────────────────────
export const Shop = () => {
  const [searchParams] = useSearchParams();
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const [selectedCat, setSelectedCat] = useState(
    searchParams.get("category") || "All",
  );
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Sync URL param → selectedCat + auto-open ancestors
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

  // Load categories + brands once
  useEffect(() => {
    (async () => {
      try {
        const [c, b] = await Promise.all([
          dataService.getCategories(),
          dataService.getBrands(),
        ]);
        setCategories(c);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // Load all products once, filter locally
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const p = await dataService.getProducts();
        setProducts(p);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const allowedCategorySlugs = useMemo(() => {
    if (selectedCat === "All") return null;
    const node = findNodeBySlug(categories, selectedCat);
    return node ? new Set(collectSlugs(node)) : new Set([selectedCat]);
  }, [categories, selectedCat]);

  const filteredProducts = useMemo(() => {
    return products
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
  }, [products, selectedCat, selectedBrand, sortBy, allowedCategorySlugs]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  useEffect(() => {
    setPage(1);
  }, [selectedCat, selectedBrand, sortBy]);

  const catLabel =
    selectedCat === "All"
      ? "All Products"
      : findNodeBySlug(categories, selectedCat)?.name || selectedCat;

  const hasActiveFilters = selectedCat !== "All" || selectedBrand !== "All";

  const resetFilters = () => {
    setSelectedCat("All");
    setSelectedBrand("All");
  };

  // ─── Sidebar filter panel (shared desktop + mobile) ─────────────────────────
  const FilterPanel = () => (
    <div className="flex flex-col gap-7">
      {/* Categories */}
      <div>
        <p className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-3">
          Categories
        </p>
        <button
          onClick={() => setSelectedCat("All")}
          className={`w-full text-left text-sm py-[7px] px-2 rounded-xl transition-all duration-150 font-medium
            ${
              selectedCat === "All"
                ? "bg-gradient-to-r from-orange-50 to-teal-50 text-orange-800 font-bold shadow-[inset_2px_0_0_#0d9488]"
                : "text-slate-500 hover:bg-slate-50 hover:text-orange-700"
            }`}
        >
          All Categories
        </button>
        <div className="mt-1">
          <CategoryTreeButtons
            nodes={categories}
            selectedSlug={selectedCat}
            onSelect={(slug) => {
              setSelectedCat(slug);
              setIsFilterOpen(false);
            }}
            openNodes={openNodes}
            setOpenNodes={setOpenNodes}
          />
        </div>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
            border border-rose-200 bg-rose-50 text-rose-500 text-sm font-bold
            hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-200"
        >
          <X size={14} /> Reset Filters
        </button>
      )}
    </div>
  );

  return (
    <Layout>
      <SEO
        title="Shop"
        description="Explore our wide range of products across various categories and brands."
      />

      {/* Hero bar */}
      <div className="bg-gradient-to-r from-orange-700 to-teal-600 text py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Shop", href: "/shop" },
              ...(selectedCat !== "All" ? [{ label: catLabel }] : []),
            ]}
          />
          <h1 className="text-3xl font-black text-white mt-2 tracking-tight">
            {catLabel}
          </h1>
          <p className="text-orange-200 text-sm mt-1 font-medium">
            {filteredProducts.length} products found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6 items-start">
          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <FilterPanel />
            </div>
          </aside>

          {/* ── Main ── */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-4 py-3 mb-5 flex items-center gap-3 flex-wrap">
              {/* Mobile filter button */}
              <button
                className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 text-orange-700 font-bold text-sm border border-orange-200 hover:bg-orange-100 transition-colors"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter size={15} /> Filters
                {hasActiveFilters && (
                  <span className="w-4 h-4 bg-orange-600 text-white rounded-full text-[10px] flex items-center justify-center font-black">
                    !
                  </span>
                )}
              </button>

              {/* Active filter chips */}
              <div className="flex gap-2 flex-wrap flex-1">
                {selectedCat !== "All" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-bold border border-orange-200">
                    {catLabel}
                    <button
                      onClick={() => setSelectedCat("All")}
                      className="text-orange-500 hover:text-orange-800 transition-colors"
                    >
                      <X size={11} strokeWidth={3} />
                    </button>
                  </span>
                )}
                {selectedBrand !== "All" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-200">
                    {selectedBrand}
                    <button
                      onClick={() => setSelectedBrand("All")}
                      className="text-blue-400 hover:text-blue-700 transition-colors"
                    >
                      <X size={11} strokeWidth={3} />
                    </button>
                  </span>
                )}
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-2 ml-auto">
                {/* View toggle */}
                <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-1.5 rounded-lg transition-all ${view === "grid" ? "bg-white shadow-sm text-orange-700" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-1.5 rounded-lg transition-all ${view === "list" ? "bg-white shadow-sm text-orange-700" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <List size={16} />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-orange-400 cursor-pointer appearance-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div
                className={`grid gap-5 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-slate-100 rounded-2xl animate-pulse"
                    style={{ height: view === "grid" ? 320 : 100 }}
                  />
                ))}
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="py-24 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  No products found
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  Try adjusting or clearing your filters.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div
                className={`gap-5 ${
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col"
                }`}
                style={{ display: view === "grid" ? undefined : "flex" }}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center disabled:opacity-30 hover:bg-slate-50 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 rounded-xl font-bold text-sm transition-all ${
                      page === i + 1
                        ? "bg-gradient-to-br from-orange-500 to-teal-600 text-white shadow-md shadow-orange-200"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center disabled:opacity-30 hover:bg-slate-50 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${
          isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setIsFilterOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
            <h3 className="font-black text-slate-900 text-base">Filters</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-5 overflow-y-auto flex-1">
            <FilterPanel />
          </div>
        </div>
      </div>
    </Layout>
  );
};
