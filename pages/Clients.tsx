import React, { useState } from "react";
import { SEO, Layout } from "../components/Layout";

const industries = [
  { name: "All sectors", key: "all" },
  { name: "Finance", key: "finance" },
  { name: "Technology", key: "technology" },
  { name: "Real estate", key: "realestate" },
  { name: "Infrastructure", key: "infrastructure" },
];

const industryItems = [
  {
    key: "finance",
    name: "Financial Services",
    count: "24",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="w-6 h-6"
      >
        <rect x="2" y="7" width="20" height="14" rx="1" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
      </svg>
    ),
  },
  {
    key: "technology",
    name: "Technology",
    count: "31",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="w-6 h-6"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    key: "realestate",
    name: "Real Estate",
    count: "18",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="w-6 h-6"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    key: "all",
    name: "Global Trade",
    count: "12",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    key: "infrastructure",
    name: "Infrastructure",
    count: "09",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="w-6 h-6"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    key: "finance",
    name: "Private Equity",
    count: "15",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="w-6 h-6"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    key: "finance",
    name: "Capital Markets",
    count: "20",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="w-6 h-6"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    key: "infrastructure",
    name: "Energy",
    count: "07",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  },
];

const clientLogos = [
  "Meridian",
  "Vantara",
  "Helion Group",
  "Stratis",
  "Aurelian",
  "Novaris",
];

const IndustryCell = ({ item }: { item: (typeof industryItems)[0] }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-stone-50 p-8 flex flex-col gap-4 cursor-pointer transition-colors duration-200 overflow-hidden group"
      style={{ background: hovered ? "#ece9e2" : "#f7f5f0" }}
    >
      <div className="text-stone-400 group-hover:text-stone-600 transition-colors duration-200">
        {item.icon}
      </div>
      <div className="text-xs tracking-wide text-stone-700 font-normal">
        {item.name}
      </div>
      <div
        className="mt-auto font-serif text-3xl font-light text-stone-300 group-hover:text-stone-400 transition-colors duration-200"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        {item.count}
      </div>
      {/* bottom bar reveal */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-800 transition-transform duration-300 origin-left"
        style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
      />
    </div>
  );
};

const Clients = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? industryItems
      : industryItems.filter((i) => i.key === activeTab);

  return (
    <Layout>
      <SEO
        title="Global Partnerships"
        description="Collaborating with industry leaders to bring innovative solutions across global markets."
      />

      {/* ── HERO ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[75vh]">
        <div className="flex flex-col justify-center px-8 md:px-14 py-20">
          <p
            className="text-[10px] tracking-[0.18em] uppercase text-stone-400 mb-8"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Arcthos Advisory
          </p>
          <h1
            className="text-6xl md:text-8xl font-light leading-[0.92] tracking-tight text-stone-900 mb-8"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Global
            <br />
            <em className="italic">Partnerships</em>
          </h1>
          <p className="text-sm leading-relaxed text-stone-400 max-w-sm font-light">
            Collaborating with industry leaders to bring innovative solutions
            across global markets — building relationships that endure beyond
            engagements.
          </p>
        </div>

        <div className="relative overflow-hidden min-h-[340px] lg:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"
            alt="Global partnerships"
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(100%) contrast(1.05)" }}
          />
          {/* left fade */}
          <div
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, #f7f5f0 0%, transparent 20%)",
            }}
          />
        </div>
      </section>

      {/* ── INDUSTRY FOCUS ── */}
      <section className="px-8 md:px-14 py-20 border-t border-stone-200">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <span
            className="text-[10px] tracking-[0.18em] uppercase text-stone-400"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Industry Focus
          </span>
          <div className="flex flex-wrap gap-1.5">
            {industries.map((tab) => (
              <button
                key={tab.key + tab.name}
                onClick={() => setActiveTab(tab.key)}
                className={`text-[11px] tracking-wide px-4 py-1.5 rounded-full border transition-all duration-200 font-normal
                  ${
                    activeTab === tab.key
                      ? "bg-stone-900 text-stone-50 border-stone-900"
                      : "bg-transparent text-stone-400 border-stone-200 hover:text-stone-700 hover:border-stone-300"
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* grid */}
        <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            background: "#d6d3cd",
          }}
        >
          {filtered.map((item, i) => (
            <IndustryCell key={i} item={item} />
          ))}
        </div>
      </section>

      {/* ── CLIENT LOGOS ── */}
      <section className="px-8 md:px-14 py-16 border-t border-stone-200">
        <div className="flex items-center gap-6 mb-10">
          <span
            className="text-[10px] tracking-[0.18em] uppercase text-stone-400 whitespace-nowrap"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Trusted by
          </span>
          <div className="flex-1 h-px bg-stone-200" />
          <span className="text-[11px] text-stone-300 whitespace-nowrap">
            136 organisations worldwide
          </span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 border border-stone-200 divide-x divide-stone-200">
          {clientLogos.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center px-4 py-7 group cursor-pointer hover:bg-stone-100 transition-colors duration-200"
            >
              <span
                className="text-base font-light text-stone-300 group-hover:text-stone-400 transition-colors duration-200 tracking-wide"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="px-8 md:px-14 py-24 border-t border-stone-200 grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
        {/* portrait */}
        <div className="lg:col-span-2">
          <div
            className="overflow-hidden aspect-[4/5] max-w-xs"
            style={{ filter: "grayscale(100%)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80"
              alt="Client"
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
        </div>

        {/* quote */}
        <div className="lg:col-span-3">
          <div
            className="text-8xl font-light leading-none text-stone-200 mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            "
          </div>
          <p
            className="text-2xl md:text-4xl font-light italic leading-snug text-stone-800 mb-10"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Their leadership team possesses a rare clarity of vision. We didn't
            just find a service provider; we found a strategic architect for our
            organisation's future.
          </p>
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 text-sm font-light"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              AT
            </div>
            <div>
              <div className="text-sm font-normal text-stone-700">
                Alasdair Thorne
              </div>
              <div className="text-[11px] text-stone-400 tracking-wide mt-0.5">
                Chief Executive · Helion Group
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Fonts loader */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
      />
    </Layout>
  );
};

export default Clients;
