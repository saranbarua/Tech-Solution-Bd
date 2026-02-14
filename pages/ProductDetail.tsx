import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, Star } from "lucide-react";
import apiurl from "@/src/apiUrl/apiUrl";
import { dataService } from "../services/dataService";
import { Layout, SEO } from "../components/Layout";
import { Button, Breadcrumbs } from "../components/UI";
import { Product } from "../types";
import { AnimatePresence, motion } from "framer-motion";

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
const SpecPill = ({ k, v }: { k: string; v: string }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
    <span className="text-[11px] font-semibold text-slate-500">{k}</span>
    <span className="text-[11px] font-bold text-slate-900">{v}</span>
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
                {/* <img
                  src={activeSrc}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  draggable={false}
                /> */}

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
          </div>

          {/* RIGHT: Details */}
          <div className="lg:pt-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 font-semibold">
              {product.category?.name || "Category"}
            </p>

            <h1 className="mt-2 text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor((product as any).rating || 0)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400">
                ({(product as any).reviewsCount || 0} reviews)
              </span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">
                Stock: {(product as any).stock ?? "N/A"}
              </span>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs text-slate-500 font-semibold">Price</p>
              <p className="text-3xl font-black text-slate-900 mt-1">
                {Number(product.price || 0).toLocaleString()} BDT
              </p>

              {(product as any).oldPrice ? (
                <p className="text-sm text-slate-400 line-through mt-1">
                  {Number((product as any).oldPrice).toLocaleString()} BDT
                </p>
              ) : null}
            </div>

            <div className="mt-6">
              <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_28px_90px_-60px_rgba(15,23,42,0.6)]">
                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 tracking-tight">
                        About this product
                      </h3>
                      <p className="text-[12px] text-slate-500 mt-1">
                        Technical specs, key features, and warranty in one
                        place.
                      </p>
                    </div>

                    <div className="shrink-0 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1.5">
                      <span className="text-[11px] font-semibold tracking-wide">
                        CV900N
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* ✅ Spec Pills */}
                  <div className="flex flex-wrap gap-2.5">
                    <SpecPill k="Input" v="1PH, 220V–260V AC (+10%)" />
                    <SpecPill k="Output" v="1PH, 0–260V AC" />
                    <SpecPill k="Capacity" v="0.75KW" />
                    <SpecPill k="Frequency" v="0.2Hz – 500Hz" />
                    <SpecPill k="Brand" v="Canroon" />
                    <SpecPill k="Origin" v="Made in China" />
                  </div>

                  {/* Divider */}
                  <div className="my-5 h-px w-full bg-slate-200" />

                  {/* ✅ Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-900">
                        Control & Modes
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        <Bullet text="Sink/Source both mode available" />
                        <Bullet text="PID control" />
                        <Bullet text="RS485 communication" />
                        <Bullet text="Removable display" />
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-900">
                        I/O & Relay
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        <Bullet text="6 Digital Input" />
                        <Bullet text="2 Digital Output" />
                        <Bullet text="2 Analog Input" />
                        <Bullet text="2 Analog Output" />
                        <Bullet text="Relay: 2 NO & 2 NC" />
                      </ul>
                    </div>
                  </div>

                  {/* ✅ Warranty Strip */}
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Warranty
                        </p>
                        <p className="text-[12px] text-slate-500 mt-1">
                          01 Year warranty coverage (terms & conditions apply).
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                        <span className="text-[11px] font-semibold text-slate-600">
                          Suitable for
                        </span>
                        <span className="text-[11px] font-bold text-slate-900">
                          Industrial VFD use
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button className="rounded-xl">Add to Cart</Button>
              <Button variant="outline" className="rounded-xl">
                Ask for Price
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-900">
                  Official Warranty
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Genuine products, verified sourcing
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-900">
                  Secure Delivery
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Careful packaging, reliable dispatch
                </p>
              </div>
            </div>
          </div>
        </div>
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
