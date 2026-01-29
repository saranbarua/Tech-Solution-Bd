import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  Headphones,
  RotateCcw,
  ArrowRight,
  Monitor,
  Laptop,
  Cpu,
  Mouse,
  Gamepad,
  Wifi,
  Terminal,
  Tv,
  Wrench,
  Settings,
  Clock,
} from "lucide-react";
import { SEO, Layout } from "../components/Layout";
import { ProductCard, Button } from "../components/UI";
import { dataService } from "../services/dataService";
import { Product, Category, Brand, Testimonial } from "../types";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      tag: "Industrial Automation",
      title: "Automation Solutions for Reliable Production",
      subtitle:
        "PLC, HMI, VFD, Servo and Control Panel integration with engineering-grade support.",
      cta: "Explore Shop",
      link: "/shop",
      bg: "bg-slate-900",
      img: "https://picsum.photos/seed/industrial/1400/700",
      text: "text-white",
      btnVariant: "secondary" as const,
    },
    {
      tag: "Service & Maintenance",
      title: "Fast Troubleshooting. Practical Fix. Minimal Downtime.",
      subtitle:
        "On-site support, preventive maintenance, repair and replacement for plant stability.",
      cta: "Request Service",
      link: "/contact",
      bg: "bg-emerald-50",
      img: "https://picsum.photos/seed/service/1400/700",
      text: "text-slate-900",
      btnVariant: "primary" as const,
    },
    {
      tag: "Electrical & Panels",
      title: "Control Panels & Power Distribution You Can Trust",
      subtitle:
        "SDB, MCC, control panels—built with clean wiring standards and proper documentation.",
      cta: "Request a Quote",
      link: "/contact",
      bg: "bg-indigo-50",
      img: "https://picsum.photos/seed/panel/1400/700",
      text: "text-slate-900",
      btnVariant: "primary" as const,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[420px] md:h-[520px] overflow-hidden rounded-3xl mx-4 mt-4 shadow-xl border border-slate-200">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${
            slide.bg
          } ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          {/* Background image */}
          <img
            src={slide.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />

          {/* Overlay (premium, readable) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-transparent" />
          {slide.text === "text-slate-900" && (
            <div className="absolute inset-0 bg-white/55" />
          )}

          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12">
            <div className={`max-w-2xl space-y-4 md:space-y-6 ${slide.text}`}>
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                  slide.text === "text-white"
                    ? "bg-white/10 text-white border border-white/15"
                    : "bg-slate-900 text-white"
                }`}
              >
                {slide.tag}
              </span>

              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                {slide.title}
              </h1>

              <p className="text-lg md:text-xl opacity-90 font-medium leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link to={slide.link}>
                  <Button
                    variant={slide.btnVariant}
                    className="rounded-full px-8 py-3 text-lg"
                  >
                    {slide.cta} <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>

                <Link to="/contact">
                  <Button
                    variant="outline"
                    className={`rounded-full px-8 py-3 text-lg ${
                      slide.text === "text-white"
                        ? "border-white/40 text-white hover:bg-white/10"
                        : ""
                    }`}
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentSlide ? "w-8 bg-emerald-500" : "w-2 bg-slate-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export const Home = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [deals, setDeals] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    dataService.getProducts().then((all) => {
      setFeatured(all.filter((p) => p.isFeatured));
      setDeals(all.filter((p) => p.isDeal));
    });
    dataService.getCategories().then(setCategories);
    dataService.getBrands().then(setBrands);
    dataService.getTestimonials().then(setTestimonials);
  }, []);

  const getCatIcon = (name: string) => {
    switch (name) {
      case "Desktops":
        return <Monitor />;
      case "Laptops":
        return <Laptop />;
      case "Components":
        return <Cpu />;
      case "Monitors":
        return <Tv />;
      case "Networking":
        return <Wifi />;
      case "Accessories":
        return <Mouse />;
      case "Software":
        return <Terminal />;
      case "Gaming":
        return <Gamepad />;
      default:
        return <Cpu />;
    }
  };

  return (
    <Layout>
      <SEO
        title="Home"
        description="Welcome to ElectroBD - Bangladesh's best tech shop for components and laptops."
      />

      <Hero />
      {/* Trust Badges – Industrial / Engineering */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <ShieldCheck />,
              label: "Genuine Components",
              sub: "Certified & authentic industrial parts",
            },
            {
              icon: <Wrench />,
              label: "On-Site Support",
              sub: "Troubleshooting & commissioning",
            },
            {
              icon: <Settings />,
              label: "Engineering Expertise",
              sub: "PLC, HMI, VFD & panel solutions",
            },
            {
              icon: <Clock />,
              label: "Fast Response Time",
              sub: "24–48h service availability",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 group p-4 rounded-2xl hover:bg-slate-50 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-black text-slate-900 leading-snug">
                  {item.label}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                Browse Categories
              </h2>
              <p className="text-slate-500">
                Find what you're looking for by department
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.name}`}
                className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:shadow-lg hover:border-emerald-300 transition-all group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-slate-400 group-hover:text-emerald-600 group-hover:scale-110 transition-all">
                  {getCatIcon(cat.name)}
                </div>
                <h3 className="text-sm font-bold text-slate-700">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900 border-l-4 border-amber-500 pl-4">
              Hot Deals of the Week
            </h2>
            <Link
              to="/shop"
              className="text-sm font-bold text-emerald-600 hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {deals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Offer Strip */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto bg-emerald-600 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 text-center md:text-left">
            <span className="inline-block bg-amber-400 text-slate-900 text-[10px] font-black uppercase px-3 py-1 rounded-full mb-4">
              Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Flat 10% Cashback on EMI
            </h2>
            <p className="text-emerald-50 max-w-md">
              Enjoy easy monthly installments with major banks and get instant
              cashback in your wallet.
            </p>
          </div>
          <Button
            variant="secondary"
            className="rounded-full shadow-xl shadow-slate-900/10"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900 border-l-4 border-emerald-500 pl-4">
              Featured Recommendations
            </h2>
            <Link
              to="/shop"
              className="text-sm font-bold text-emerald-600 hover:underline"
            >
              See Everything
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center font-bold text-slate-400 uppercase tracking-[0.2em] text-xs mb-10">
            Official Authorized Partners
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 hover:opacity-100 transition-opacity">
            {brands.map((brand) => (
              <img
                key={brand.id}
                src={brand.logo}
                alt={brand.name}
                className="h-10 md:h-12 grayscale hover:grayscale-0 transition-all cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-12">
            What Our Customers Say
          </h2>
          <div className="relative">
            <div className="text-slate-100 absolute -top-10 left-1/2 -translate-x-1/2 scale-[3]">
              "
            </div>
            {testimonials.map((t, idx) => (
              <div key={t.id} className={idx === 0 ? "block" : "hidden"}>
                <p className="text-xl text-slate-600 italic leading-relaxed mb-8 relative z-10">
                  {t.content}
                </p>
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-16 h-16 rounded-full border-4 border-emerald-100"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.author}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
