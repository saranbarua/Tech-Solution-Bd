import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Factory,
  Layers,
  Activity,
  FileCheck2,
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
  ClipboardList,
  FileText,
  Cog,
  CheckCircle2,
  Building2,
  TrendingUp,
  ArrowUpRight,
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
      {/* Solutions / Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Solutions & Services
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                End-to-end industrial automation and electrical support—designed
                for uptime, safety, and long-term reliability.
              </p>
            </div>

            <div className="flex gap-3">
              <Link to="/contact">
                <Button className="rounded-full px-6">
                  Ask a Question <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Settings className="text-emerald-700" />,
                title: "PLC Programming & Commissioning",
                desc: "Program, test, and commission PLC systems with clean logic, safety interlocks and documentation.",
                points: [
                  "Siemens / Mitsubishi / Delta",
                  "On-site commissioning",
                  "I/O testing & FAT",
                ],
                to: "/services/plc",
              },
              {
                icon: <Layers className="text-indigo-700" />,
                title: "HMI / SCADA Integration",
                desc: "Operator-friendly screens, alarms, reporting and secure access for reliable plant monitoring.",
                points: [
                  "HMI design & mapping",
                  "Alarm strategy",
                  "Data logging & reports",
                ],
                to: "/services/hmi-scada",
              },
              {
                icon: <Activity className="text-amber-700" />,
                title: "VFD / Inverter Setup & Tuning",
                desc: "Drive setup, parameter tuning, motor protection and performance optimization for stable operation.",
                points: [
                  "Parameter tuning",
                  "Motor protection",
                  "Energy optimization",
                ],
                to: "/services/vfd",
              },
              {
                icon: <Cpu className="text-slate-800" />,
                title: "Servo & Motion Control",
                desc: "Servo selection, tuning and motion synchronization for precise speed, position, and repeatability.",
                points: [
                  "Servo sizing",
                  "Tuning & calibration",
                  "Motion sequence",
                ],
                to: "/services/servo",
              },
              {
                icon: <Factory className="text-emerald-700" />,
                title: "Control Panels / SDB / MCC",
                desc: "Panel design, build, wiring standards, labeling and handover documentation—done professionally.",
                points: [
                  "Panel design & build",
                  "Wiring standards",
                  "BOQ & drawings",
                ],
                to: "/services/panels",
              },
              {
                icon: <Wrench className="text-indigo-700" />,
                title: "Maintenance, Repair & AMC",
                desc: "Preventive maintenance, troubleshooting, and long-term service contracts to reduce downtime.",
                points: [
                  "Preventive maintenance",
                  "Troubleshooting",
                  "AMC support",
                ],
                to: "/services/amc",
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="group bg-white border border-slate-200 rounded-3xl p-7 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-slate-900 leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-slate-700">
                      <FileCheck2
                        className="mt-0.5 text-emerald-600"
                        size={16}
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How We Work */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              How We Work
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              A structured, engineering-driven process to ensure clarity,
              reliability, and long-term performance.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="relative bg-slate-50 border border-slate-200 rounded-3xl p-7">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black">
                01
              </span>

              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-5">
                <ClipboardList className="text-emerald-600" />
              </div>

              <h3 className="font-black text-slate-900 mb-2">
                Requirement & Site Visit
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We understand your process, machine condition, control
                requirements, and operational challenges through discussion or
                on-site inspection.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-slate-50 border border-slate-200 rounded-3xl p-7">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black">
                02
              </span>

              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-5">
                <FileText className="text-indigo-600" />
              </div>

              <h3 className="font-black text-slate-900 mb-2">Proposal & BOQ</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We prepare a clear technical proposal including solution
                approach, component list, timeline, and cost breakdown.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-slate-50 border border-slate-200 rounded-3xl p-7">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black">
                03
              </span>

              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-5">
                <Cog className="text-amber-600" />
              </div>

              <h3 className="font-black text-slate-900 mb-2">
                Installation & Commissioning
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Panel installation, wiring, PLC/HMI programming, testing, and
                commissioning are completed following safety and engineering
                standards.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative bg-slate-50 border border-slate-200 rounded-3xl p-7">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black">
                04
              </span>

              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-5">
                <CheckCircle2 className="text-emerald-600" />
              </div>

              <h3 className="font-black text-slate-900 mb-2">
                Handover & Support
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                System handover with documentation, basic training, and ongoing
                support for troubleshooting, upgrades, and AMC.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-slate-900 rounded-3xl p-8">
            <div className="max-w-2xl">
              <h4 className="text-xl font-black text-white">
                Looking for a reliable automation partner?
              </h4>
              <p className="mt-2 text-slate-300">
                Start with a discussion. We’ll guide you through the right
                solution—step by step.
              </p>
            </div>

            <div className="flex gap-3">
              <Link to="/contact">
                <Button className="rounded-full px-6">Book Site Visit</Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-white/40 text-white hover:bg-white/10"
                >
                  Request Proposal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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

      {/* Custom Procurement Strip – BTech Style */}

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Decorative shape */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 text-center md:text-left max-w-2xl">
            <span className="inline-block bg-emerald-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full mb-4 tracking-widest">
              Custom Procurement
            </span>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Product Not in Stock?
              <br />
              We Can Arrange It for You.
            </h2>

            <p className="text-slate-300 leading-relaxed">
              Some industrial components may not be readily available in stock.
              Upon confirmation, we source genuine products directly from our
              partners and deliver within an estimated{" "}
              <span className="font-bold text-emerald-400">
                15 working days
              </span>
              .
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" className="rounded-full px-8">
              Request a Product
            </Button>

            <Button
              variant="outline"
              className="rounded-full px-8 border-white/40 text-white hover:bg-white/10"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {/* Featured Projects / Case Studies */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Featured Projects & Case Studies
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                A few examples of how we deliver practical automation and
                electrical solutions—focused on stability, uptime, and
                maintainability.
              </p>
            </div>

            <Link to="/projects">
              <Button variant="outline" className="rounded-full px-6">
                View All Projects <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "PLC + HMI Upgrade for Production Line",
                industry: "Textile & Garments",
                scope: [
                  "PLC program rewrite",
                  "HMI screens & alarms",
                  "I/O testing & commissioning",
                ],
                resultTitle: "Outcome",
                result:
                  "Improved operational stability and reduced frequent stoppages with clear alarm diagnostics.",
                meta: [
                  {
                    icon: <Building2 className="text-slate-700" size={18} />,
                    label: "Dhaka, BD",
                  },
                  {
                    icon: (
                      <ShieldCheck className="text-emerald-700" size={18} />
                    ),
                    label: "Documentation Provided",
                  },
                ],
                highlight: {
                  icon: <TrendingUp className="text-amber-700" size={18} />,
                  text: "Downtime reduced (qualitative)",
                },
                to: "/projects/plc-hmi-upgrade",
              },
              {
                title: "VFD Tuning & Motor Protection Setup",
                industry: "Steel & Metal",
                scope: [
                  "Drive parameter tuning",
                  "Overload protection",
                  "Speed stability improvement",
                ],
                resultTitle: "Outcome",
                result:
                  "Smoother speed control and better motor safety with optimized parameters for load conditions.",
                meta: [
                  {
                    icon: <Building2 className="text-slate-700" size={18} />,
                    label: "Narayanganj, BD",
                  },
                  {
                    icon: (
                      <ShieldCheck className="text-emerald-700" size={18} />
                    ),
                    label: "Genuine Parts",
                  },
                ],
                highlight: {
                  icon: <TrendingUp className="text-amber-700" size={18} />,
                  text: "Performance optimized",
                },
                to: "/projects/vfd-tuning",
              },
              {
                title: "Control Panel Build + Site Commissioning",
                industry: "Food & Beverage",
                scope: [
                  "Panel design & wiring",
                  "Labeling & standards",
                  "On-site commissioning",
                ],
                resultTitle: "Outcome",
                result:
                  "Clean panel layout, easier troubleshooting, and reliable operation with standard wiring practice.",
                meta: [
                  {
                    icon: <Building2 className="text-slate-700" size={18} />,
                    label: "Chattogram, BD",
                  },
                  {
                    icon: (
                      <ShieldCheck className="text-emerald-700" size={18} />
                    ),
                    label: "After-Sales Support",
                  },
                ],
                highlight: {
                  icon: <TrendingUp className="text-amber-700" size={18} />,
                  text: "Maintainability improved",
                },
                to: "/projects/panel-commissioning",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-7 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-emerald-700">
                      {p.industry}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-slate-900 leading-snug">
                      {p.title}
                    </h3>
                  </div>

                  <Link
                    to={p.to}
                    className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all"
                    aria-label="Open case study"
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.meta.map((m, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700"
                    >
                      {m.icon} {m.label}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-black text-slate-900 mb-3">
                    Scope
                  </h4>
                  <ul className="space-y-2">
                    {p.scope.map((s) => (
                      <li key={s} className="text-sm text-slate-600 flex gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span className="leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                    {p.highlight.icon}
                    <span>{p.highlight.text}</span>
                  </div>
                  <h4 className="mt-3 text-sm font-black text-slate-900">
                    {p.resultTitle}
                  </h4>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                    {p.result}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Case Study
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 rounded-3xl bg-white border border-slate-200 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h4 className="text-lg font-black text-slate-900">
                Want similar results in your plant?
              </h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Share your requirements and current setup. We’ll suggest a
                practical solution with scope, timeline, and budget clarity.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/contact">
                <Button className="rounded-full px-6">
                  Discuss Your Project
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="rounded-full px-6">
                  Request BOQ
                </Button>
              </Link>
            </div>
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
