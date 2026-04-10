import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  CheckCircle2,
  FileText,
  MessageSquare,
  Zap,
  ShieldCheck,
  ChevronDown,
  ThumbsUp,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
type Tab = "specs" | "terms" | "reviews";

interface ReviewItem {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  helpful: number;
  verified: boolean;
}

/* ─────────────────────────────────────────────
   MOCK DATA – swap with real data / props
───────────────────────────────────────────── */
const SPECS = [
  {
    group: "Electrical",
    rows: [
      { label: "Input Voltage", value: "1PH, 220–260V AC" },
      { label: "Output Voltage", value: "1PH, 0–260V AC" },
      { label: "Capacity", value: "0.75 KW" },
      { label: "Frequency Range", value: "0.2 – 500 Hz" },
      { label: "Output Current", value: "4.5 A" },
      { label: "Efficiency", value: "≥ 93%" },
    ],
  },
  {
    group: "Control & Interface",
    rows: [
      { label: "Control Mode", value: "PID / V/F / Sensorless Vector" },
      { label: "Communication", value: "RS485 (Modbus RTU)" },
      { label: "Display", value: "Removable LED Keypad" },
      { label: "Digital Input", value: "6 Channels" },
      { label: "Digital Output", value: "2 Channels" },
      { label: "Analog Input", value: "2 Channels (0–10V / 4–20mA)" },
      { label: "Analog Output", value: "2 Channels" },
      { label: "Relay Output", value: "2 NO + 2 NC" },
    ],
  },
  {
    group: "Physical",
    rows: [
      { label: "Brand", value: "Canroon" },
      { label: "Origin", value: "Made in China" },
      { label: "Protection Class", value: "IP20" },
      { label: "Cooling Method", value: "Forced Air Cooling" },
      { label: "Ambient Temp", value: "-10°C to +40°C" },
      { label: "Humidity", value: "≤ 95% RH, Non-condensing" },
    ],
  },
];

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 1,
    name: "Rafiul Islam",
    avatar: "RI",
    rating: 5,
    date: "12 Mar 2025",
    title: "Outstanding performance for the price",
    body: "We've been running this VFD on a 0.75 KW pump for 6 months without a single hiccup. RS485 integration was painless and the removable display is a game-changer for panel installations.",
    helpful: 14,
    verified: true,
  },
  {
    id: 2,
    name: "Nazmul Hasan",
    avatar: "NH",
    rating: 4,
    date: "28 Jan 2025",
    title: "Great build quality, minor documentation gap",
    body: "Solid unit overall. PID control is very responsive. Docked one star because the Bangla manual isn't available yet — had to rely on the English version. Support team was responsive though.",
    helpful: 7,
    verified: true,
  },
  {
    id: 3,
    name: "Sumaiya Akter",
    avatar: "SA",
    rating: 5,
    date: "5 Dec 2024",
    title: "Perfect for our CNC retrofit project",
    body: "Replaced an older drive and the 0.2–500 Hz range was exactly what we needed. Sink/Source flexibility saved us rewiring headaches. Highly recommended.",
    helpful: 22,
    verified: false,
  },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const RatingStars = ({
  value,
  size = 14,
  interactive = false,
  onChange,
}: {
  value: number;
  size?: number;
  interactive?: boolean;
  onChange?: (v: number) => void;
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={`transition-colors ${
            s <= (interactive ? hover || value : value)
              ? "fill-amber-400 text-amber-400"
              : "text-slate-200"
          } ${interactive ? "cursor-pointer hover:scale-110" : ""}`}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onChange?.(s)}
        />
      ))}
    </div>
  );
};

const AvatarCircle = ({ initials }: { initials: string }) => {
  const palette = [
    "bg-violet-100 text-violet-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-sky-100 text-sky-700",
    "bg-rose-100 text-rose-700",
  ];
  const idx = initials.charCodeAt(0) % palette.length;
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${palette[idx]}`}
    >
      {initials}
    </div>
  );
};

/* ─────────────────────────────────────────────
   TAB: SPECIFICATIONS
───────────────────────────────────────────── */
const SpecsTab = () => {
  const [openGroup, setOpenGroup] = useState<string | null>(SPECS[0].group);

  return (
    <div className="space-y-3">
      {SPECS.map((g) => {
        const isOpen = openGroup === g.group;
        return (
          <div
            key={g.group}
            className="rounded-2xl border border-slate-100 overflow-hidden"
          >
            <button
              onClick={() => setOpenGroup(isOpen ? null : g.group)}
              className="w-full flex items-center justify-between px-5 py-3.5 bg-white hover:bg-slate-50 transition-colors"
            >
              <span className="text-[13px] font-bold text-slate-800 tracking-tight">
                {g.group}
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-slate-100">
                    {g.rows.map((r, i) => (
                      <div
                        key={r.label}
                        className={`flex items-center justify-between px-5 py-3 ${
                          i % 2 === 0 ? "bg-slate-50/60" : "bg-white"
                        }`}
                      >
                        <span className="text-[12px] text-slate-500 font-medium">
                          {r.label}
                        </span>
                        <span className="text-[12px] font-bold text-slate-800 text-right max-w-[55%]">
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Download datasheet CTA */}
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-[12px] font-bold text-slate-800">Full Datasheet</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            PDF · 2.4 MB · CV900N Series
          </p>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl transition-colors"
        >
          <FileText size={13} />
          Download
        </a>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   TAB: TERMS & CONDITIONS
───────────────────────────────────────────── */
const TERMS = [
  {
    icon: ShieldCheck,
    title: "Warranty Coverage",
    body: "This product carries a 1-year limited warranty against manufacturing defects from the date of purchase. Warranty is non-transferable and applies to the original purchaser only.",
  },
  {
    icon: Zap,
    title: "Installation & Usage",
    body: "Installation must be performed by a qualified electrician. Improper wiring, overloading beyond rated capacity, or unauthorized modifications will void the warranty immediately.",
  },
  {
    icon: CheckCircle2,
    title: "Returns & Replacements",
    body: "Defective units may be returned within 7 days of delivery with original packaging intact. After 7 days, warranty service applies. Physically damaged units are not eligible for return.",
  },
  {
    icon: FileText,
    title: "Liability Limitation",
    body: "We are not liable for indirect, incidental, or consequential damages arising from product use or misuse. Our total liability shall not exceed the original purchase price of the product.",
  },
  {
    icon: MessageSquare,
    title: "Support & Service",
    body: "Technical support is available Monday–Saturday, 9AM–6PM. Remote diagnosis via RS485 logs may be requested. On-site service is available in Dhaka at additional cost.",
  },
];

const TermsTab = () => (
  <div className="space-y-3">
    {TERMS.map((t, i) => (
      <motion.div
        key={t.title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.06 }}
        className="flex gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 hover:border-slate-200 transition-colors"
      >
        <div className="mt-0.5 w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
          <t.icon size={15} className="text-emerald-600" />
        </div>
        <div>
          <p className="text-[13px] font-bold text-slate-900">{t.title}</p>
          <p className="text-[12px] text-slate-500 leading-relaxed mt-1">
            {t.body}
          </p>
        </div>
      </motion.div>
    ))}

    <div className="rounded-2xl bg-slate-900 px-5 py-4 text-center">
      <p className="text-[11px] text-slate-400">
        By placing an inquiry or order, you agree to our full{" "}
        <a href="#" className="text-emerald-400 underline underline-offset-2">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-emerald-400 underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   TAB: REVIEWS
───────────────────────────────────────────── */
const ReviewsTab = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [helpedIds, setHelpedIds] = useState<Set<number>>(new Set());
  const [showForm, setShowForm] = useState(false);

  // New review form state
  const [form, setForm] = useState({
    name: "",
    title: "",
    body: "",
    rating: 0,
  });
  const [submitted, setSubmitted] = useState(false);

  const avg = reviews.reduce((a, r) => a + r.rating, 0) / (reviews.length || 1);

  const dist = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => r.rating === s).length,
  }));

  const markHelpful = (id: number) => {
    if (helpedIds.has(id)) return;
    setHelpedIds((prev) => new Set([...prev, id]));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r)),
    );
  };

  const submitReview = () => {
    if (!form.name || !form.body || form.rating === 0) return;
    const newR: ReviewItem = {
      id: Date.now(),
      name: form.name,
      avatar: form.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      rating: form.rating,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      title: form.title || "Untitled Review",
      body: form.body,
      helpful: 0,
      verified: false,
    };
    setReviews((prev) => [newR, ...prev]);
    setForm({ name: "", title: "", body: "", rating: 0 });
    setSubmitted(true);
    setShowForm(false);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-5">
      {/* Summary bar */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 flex flex-col sm:flex-row gap-5">
        {/* Big number */}
        <div className="flex flex-col items-center justify-center sm:min-w-[100px] text-center">
          <p className="text-5xl font-black text-slate-900 leading-none">
            {avg.toFixed(1)}
          </p>
          <RatingStars value={Math.round(avg)} size={13} />
          <p className="text-[11px] text-slate-400 mt-1">
            {reviews.length} reviews
          </p>
        </div>

        {/* Bar chart */}
        <div className="flex-1 space-y-1.5">
          {dist.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500 w-4 text-right">
                {star}
              </span>
              <Star size={10} className="fill-amber-400 text-amber-400" />
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      reviews.length ? (count / reviews.length) * 100 : 0
                    }%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-amber-400"
                />
              </div>
              <span className="text-[11px] text-slate-400 w-4">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write review button */}
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-semibold text-slate-500">All reviews</p>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl transition-colors"
        >
          <Star size={12} />
          Write a Review
        </button>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3"
          >
            <CheckCircle2 size={15} className="text-emerald-600" />
            <p className="text-[12px] font-semibold text-emerald-800">
              Thank you! Your review has been submitted.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Write review form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
              <p className="text-[13px] font-bold text-slate-900">
                Share your experience
              </p>

              <div>
                <p className="text-[11px] font-semibold text-slate-500 mb-1.5">
                  Your Rating *
                </p>
                <RatingStars
                  value={form.rating}
                  size={22}
                  interactive
                  onChange={(v) => setForm((f) => ({ ...f, rating: v }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="e.g. Karim Hossain"
                    className="w-full text-[13px] bg-white border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                    Review Title
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    placeholder="Summarize your experience"
                    className="w-full text-[13px] bg-white border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  Your Review *
                </label>
                <textarea
                  value={form.body}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, body: e.target.value }))
                  }
                  rows={3}
                  placeholder="Tell us what you liked or disliked about this product..."
                  className="w-full text-[13px] bg-white border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition resize-none"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-[12px] font-semibold text-slate-500 hover:text-slate-700 px-4 py-2 rounded-xl border border-slate-200 bg-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReview}
                  disabled={!form.name || !form.body || form.rating === 0}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl transition-colors"
                >
                  <Send size={12} />
                  Submit Review
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review cards */}
      <div className="space-y-3">
        {reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-slate-100 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <AvatarCircle initials={r.avatar} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-bold text-slate-900">
                      {r.name}
                    </p>
                    {r.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 size={9} />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">{r.date}</p>
                </div>
              </div>
              <RatingStars value={r.rating} size={12} />
            </div>

            <p className="mt-3 text-[13px] font-bold text-slate-800">
              {r.title}
            </p>
            <p className="mt-1.5 text-[12px] text-slate-500 leading-relaxed">
              {r.body}
            </p>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => markHelpful(r.id)}
                className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
                  helpedIds.has(r.id)
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                <ThumbsUp size={11} />
                Helpful ({r.helpful})
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   Drop this below your gallery + detail grid.
───────────────────────────────────────────── */
export const ProductBottomSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>("specs");

  const tabs: { id: Tab; label: string; icon: React.FC<any> }[] = [
    { id: "specs", label: "Specifications", icon: Zap },
    { id: "terms", label: "Terms & Conditions", icon: ShieldCheck },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16 mt-10">
      {/* Tabs */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_20px_60px_-30px_rgba(15,23,42,0.12)]">
        {/* Tab header */}
        <div className="flex border-b border-slate-100 bg-slate-50/60">
          {tabs.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-4 text-[12px] font-semibold transition-colors ${
                  active
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <t.icon size={14} />
                <span className="hidden sm:inline">{t.label}</span>
                {active && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "specs" && <SpecsTab />}
              {activeTab === "terms" && <TermsTab />}
              {activeTab === "reviews" && <ReviewsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductBottomSection;
