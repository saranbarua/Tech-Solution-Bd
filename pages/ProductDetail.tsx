import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  MessageCircle,
  Package,
  Cpu,
  FileText,
  Phone,
} from "lucide-react";
import apiurl from "@/src/apiUrl/apiUrl";
import { dataService } from "../services/dataService";
import { Layout, SEO } from "../components/Layout";
import { Button, Breadcrumbs } from "../components/UI";
import { Product } from "../types";
import { AnimatePresence, motion } from "framer-motion";
import ProductBottomSection from "./Products/Productdetailbottom";

const fullImg = (url?: string) => {
  if (!url) return "/placeholder.png";
  return `${apiurl.imgUrl}${url}`;
};

const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-4 w-56 bg-slate-100 rounded mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-2xl bg-slate-100 border border-slate-200" />
          <div className="mt-4 flex gap-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200"
              />
            ))}
          </div>
        </div>

        <div>
          <div className="h-8 w-3/4 bg-slate-100 rounded mb-4" />
          <div className="h-5 w-48 bg-slate-100 rounded mb-6" />
          <div className="h-10 w-40 bg-slate-100 rounded mb-6" />
          <div className="space-y-3 mb-8">
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-5/6 bg-slate-100 rounded" />
            <div className="h-4 w-2/3 bg-slate-100 rounded" />
          </div>
          <div className="flex gap-3">
            <div className="h-11 w-40 bg-slate-100 rounded-xl" />
            <div className="h-11 w-32 bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
// const SpecPill = ({ k, v }: { k: string; v: string }) => (
//   <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
//     <span className="text-[11px] font-semibold text-slate-500">{k}</span>
//     <span className="text-[11px] font-bold text-slate-900">{v}</span>
//   </div>
// );
const SpecPill = ({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div
    className={`rounded-xl p-3 border transition-colors ${
      accent
        ? "bg-emerald-50 border-emerald-200"
        : "bg-slate-50 border-slate-200 hover:border-slate-300"
    }`}
  >
    <p
      className={`text-[10px] font-semibold uppercase tracking-wide mb-1 ${
        accent ? "text-emerald-700" : "text-slate-400"
      }`}
    >
      {label}
    </p>
    <p
      className={`text-[13px] font-semibold leading-snug ${
        accent ? "text-emerald-900" : "text-slate-800"
      }`}
    >
      {value}
    </p>
  </div>
);

const Bullet = ({ text }: { text: string }) => (
  <li className="flex gap-2.5">
    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
    <span className="text-sm text-slate-700 leading-relaxed">{text}</span>
  </li>
);

const ZoomModal = ({
  open,
  src,
  onClose,
}: {
  open: boolean;
  src: string;
  onClose: () => void;
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <p className="text-sm font-semibold text-slate-800">Preview</p>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="bg-slate-50">
          <img
            src={src}
            alt=""
            className="w-full max-h-[78vh] object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

const Thumbs = ({
  images,
  active,
  onPick,
}: {
  images: string[];
  active: number;
  onPick: (i: number) => void;
}) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = wrapRef.current;
    if (!el) return;
    const amount = 220;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-4">
      <button
        onClick={() => scrollBy("left")}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10
          w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm
          flex items-center justify-center text-slate-700 hover:bg-slate-50"
        aria-label="Scroll thumbnails left"
        type="button"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={wrapRef}
        className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth px-6"
      >
        {images.map((src, i) => {
          const isActive = i === active;
          return (
            // <button
            //   key={src + i}
            //   onClick={() => onPick(i)}
            //   className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border transition
            //     ${isActive ? "border-emerald-600 ring-2 ring-emerald-600/15" : "border-slate-200 hover:border-slate-300"}`}
            //   type="button"
            //   aria-label={`Thumbnail ${i + 1}`}
            // >
            //   <img src={src} alt="" className="w-full h-full object-cover" />
            // </button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              key={src + i}
              onClick={() => onPick(i)}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border transition
    ${isActive ? "border-emerald-600 ring-2 ring-emerald-600/15" : "border-slate-200 hover:border-slate-300"}`}
              type="button"
              aria-label={`Thumbnail ${i + 1}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={() => scrollBy("right")}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10
          w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm
          flex items-center justify-center text-slate-700 hover:bg-slate-50"
        aria-label="Scroll thumbnails right"
        type="button"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export const ProductDetail = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  // Hover zoom state
  const [zoomXY, setZoomXY] = useState({ x: 50, y: 50 });
  const [zooming, setZooming] = useState(false);

  useEffect(() => {
    if (!slug) return;

    (async () => {
      try {
        setLoading(true);
        const p = await dataService.getProductBySlug(slug);
        setProduct(p);
        setActiveIndex(0);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const images = useMemo(() => {
    const list = (product?.images || [])
      .map((img: any) => fullImg(img?.url))
      .filter(Boolean);

    // fallback placeholder
    return list.length ? list : ["/placeholder.png"];
  }, [product]);

  const activeSrc = images[activeIndex] || images[0];

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomXY({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  if (loading) {
    return (
      <Layout>
        <SEO title="Product" description="Product details" />
        <ProductDetailsSkeleton />
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <SEO title="Not Found" description="Product not found" />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-bold text-slate-900 mb-2">
              Product not found
            </p>
            <p className="text-slate-500 mb-6">
              This product might be inactive or removed.
            </p>
            <Link to="/shop">
              <Button variant="outline">Back to Shop</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const reviews = (product as any).reviews ?? [];

  const avgRating =
    reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
    (reviews.length || 1);

  return (
    <Layout>
      <SEO
        title={product.name}
        description={product.description || "Product details"}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Shop", path: "/shop" },
            {
              label: product.category?.name || "Category",
              path: `/shop?category=${product.category?.slug}`,
            },
            { label: "Product" },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Gallery */}
          <div>
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_80px_-55px_rgba(15,23,42,0.55)]">
              <div
                className="relative aspect-square bg-slate-50 cursor-zoom-in"
                onMouseMove={onMove}
                onMouseEnter={() => setZooming(true)}
                onMouseLeave={() => setZooming(false)}
                onClick={() => setZoomOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeSrc} // ✅ key changes = triggers animation
                    src={activeSrc}
                    alt={product.name}
                    draggable={false}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0, scale: 1.02, filter: "blur(2px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.99, filter: "blur(2px)" }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  />
                </AnimatePresence>

                {/* Hover Zoom Lens */}
                {zooming ? (
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute right-4 bottom-4 w-40 h-40 rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden"
                      style={{
                        backgroundImage: `url(${activeSrc})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "220%",
                        backgroundPosition: `${zoomXY.x}% ${zoomXY.y}%`,
                      }}
                    />
                    <div className="absolute left-4 top-4 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white/90 border border-slate-200 text-slate-700">
                      Hover to zoom • Click to preview
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="p-4 bg-white">
                <Thumbs
                  images={images}
                  active={activeIndex}
                  onPick={(i) => setActiveIndex(i)}
                />
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 shadow-sm">
              <div>
                <p className="text-[13px] font-black text-slate-900">
                  Interested in this product?
                </p>
                <p className="text-[12px] text-slate-500 mt-0.5">
                  Contact us for bulk pricing, lead time, and availability.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  to={"/contact"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-800 transition-colors"
                >
                  Ask for Price
                </Link>
                <a
                  href="tel:+8801700000000"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-[13px] font-semibold hover:bg-slate-50 transition-colors"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Details — premium redesign */}
          <div className="lg:pt-2">
            {/* Category label with leading dash */}
            <div className="flex items-center gap-2">
              <span className="w-4 h-px bg-slate-400 opacity-50 shrink-0" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-medium">
                {product.category?.name || "Category"}
              </p>
            </div>

            {/* Title */}
            <h1 className="mt-2.5 text-[26px] font-medium text-slate-900 leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Stars + meta chips */}
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={13}
                    className={
                      i <= Math.round(avgRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200 fill-slate-200"
                    }
                  />
                ))}
                <span className="ml-1.5 text-[12px] text-slate-400">
                  {avgRating.toFixed(1)} ·{" "}
                  {(product as any).reviews?.length || 0} reviews
                </span>
              </div>

              <span className="w-px h-3 bg-slate-200 shrink-0" />

              <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                <Package size={13} className="opacity-60" />
                {(product as any).stock
                  ? `In stock · ${(product as any).stock} units`
                  : "Check availability"}
              </div>
            </div>

            {/* Divider */}
            <div className="mt-5 border-t border-slate-100" />

            {/* Price block */}
            <div className="mt-5 flex items-end gap-3">
              <span className="text-sm text-slate-400 mb-1">BDT</span>
              <span className="text-[32px] font-medium text-slate-900 leading-none tracking-tight">
                {Number(product.price || 0).toLocaleString()}
              </span>
              {(product as any).oldPrice && (
                <>
                  <span className="text-sm text-slate-300 line-through mb-1">
                    {Number((product as any).oldPrice).toLocaleString()}
                  </span>
                  <span className="mb-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                    −
                    {Math.round(
                      (1 - product.price / (product as any).oldPrice) * 100,
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            {/* Model number tag */}
            {(product as any).modelNumber && (
              <div className="mt-3.5 inline-flex items-center gap-1.5 border border-slate-200 rounded-md px-2.5 py-1.5 text-[12px] text-slate-500">
                <Cpu size={13} className="opacity-60" />
                Model{" "}
                <span className="font-medium text-slate-800">
                  {(product as any).modelNumber}
                </span>
              </div>
            )}

            {/* About card */}
            <div className="mt-5 rounded-xl border border-slate-200 bg-white overflow-hidden">
              {/* Card header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-slate-50/60">
                <div>
                  <p className="text-[13px] font-medium text-slate-900">
                    Product details
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Specs, features &amp; warranty
                  </p>
                </div>
                <FileText size={16} className="text-slate-300 shrink-0" />
              </div>

              {/* Description body */}
              <div className="p-4">
                {product.description ? (
                  <div>
                    {product.description.split("\n").map((line, i) => {
                      const trimmed = line.trim();

                      if (trimmed.endsWith(":") && !trimmed.startsWith("-")) {
                        return (
                          <p
                            key={i}
                            className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-medium mt-4 mb-2 first:mt-0"
                          >
                            {trimmed.slice(0, -1)}
                          </p>
                        );
                      }

                      if (trimmed.startsWith("- ")) {
                        const text = trimmed
                          .replace(/^-\s+\[[ x]\]\s*/i, "")
                          .replace(/^-\s+/, "")
                          .trim();

                        if (!text) return null;

                        return (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 py-1.5 border-b border-slate-50 last:border-0"
                          >
                            <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-emerald-400 opacity-80" />
                            <span className="text-[13px] text-slate-600 leading-snug">
                              {text}
                            </span>
                          </div>
                        );
                      }

                      if (!trimmed) return <div key={i} className="h-1" />;

                      return (
                        <p
                          key={i}
                          className="text-[13px] text-slate-600 leading-relaxed"
                        >
                          {trimmed}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-slate-300 italic">
                    No description available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <ProductBottomSection
          productSlug={product.slug}
          specs={(product as any).specs ?? []}
          terms={(product as any).terms ?? []}
          reviews={(product as any).reviews ?? []}
          files={(product as any).docs ?? []}
        />
      </div>

      <ZoomModal
        open={zoomOpen}
        src={activeSrc}
        onClose={() => setZoomOpen(false)}
      />
    </Layout>
  );
};

export default ProductDetail;
