import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  CheckCircle2,
  FileText,
  MessageSquare,
  Zap,
  ShieldCheck,
  ThumbsUp,
  Send,
} from "lucide-react";
import apiurl from "@/src/apiUrl/apiUrl";

/* ─────────────────────────────────────────────
   TYPES (matching API response)
───────────────────────────────────────────── */
export interface ProductSpec {
  id: string;
  key: string;
  value: string;
}
export interface ProductDoc {
  id: string;
  title: string;
  fileUrl: string;
}

export interface ProductTerm {
  id: string;
  title: string;
  content: string;
}

export interface ProductReview {
  id: string;
  clientName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

interface Props {
  productSlug: string;
  specs: ProductSpec[];
  terms: ProductTerm[];
  reviews: ProductReview[];
  files?: ProductDoc[];
}

type Tab = "specs" | "terms" | "reviews";

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

const AvatarCircle = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
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

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

/* ─────────────────────────────────────────────
   TAB: SPECIFICATIONS
   ✅ FIX: files prop now properly rendered
   outside the dashed flex container
───────────────────────────────────────────── */
const SpecsTab = ({
  specs,
  files = [],
}: {
  specs: ProductSpec[];
  files?: ProductDoc[];
}) => {
  if (!specs.length) {
    return (
      <div className="py-12 text-center text-slate-400 text-sm">
        No specifications available for this product.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Specs table */}
      <div className="rounded-2xl border border-slate-100 overflow-hidden">
        {specs.map((s, i) => (
          <div
            key={s.id}
            className={`flex items-start justify-between px-5 py-3 gap-4 ${
              i % 2 === 0 ? "bg-slate-50/60" : "bg-white"
            }`}
          >
            <span className="text-[12px] text-slate-500 font-medium shrink-0">
              {s.key}
            </span>
            <span className="text-[12px] font-bold text-slate-800 text-right whitespace-pre-line">
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* ✅ FIX: Datasheets section is now its own block, not nested in a flex container */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-[12px] font-bold text-slate-800 px-1">
            Datasheets &amp; Documents
          </p>

          {files.map((doc) => {
            const fullUrl = `${apiurl.imgUrl}${doc.fileUrl}`;
            const isPDF = doc.fileUrl.toLowerCase().endsWith(".pdf");
            const isDOCX = doc.fileUrl.toLowerCase().endsWith(".docx");

            return (
              <div
                key={doc.id}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-[12px] font-semibold text-slate-800">
                    {doc.title}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {isPDF ? "PDF Document" : isDOCX ? "Word Document" : "File"}
                  </p>
                </div>

                <a
                  href={
                    isDOCX
                      ? `https://docs.google.com/gview?url=${encodeURIComponent(fullUrl)}&embedded=true`
                      : fullUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl transition-colors"
                >
                  <FileText size={13} />
                  View
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   TAB: TERMS & CONDITIONS
───────────────────────────────────────────── */
const TERM_ICONS = [ShieldCheck, Zap, CheckCircle2, FileText, MessageSquare];

const TermsTab = ({ terms }: { terms: ProductTerm[] }) => {
  if (!terms.length) {
    return (
      <div className="py-12 text-center text-slate-400 text-sm">
        No terms available for this product.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {terms.map((t, i) => {
        const Icon = TERM_ICONS[i % TERM_ICONS.length];
        return (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 hover:border-slate-200 transition-colors"
          >
            <div className="mt-0.5 w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <Icon size={15} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-slate-900">{t.title}</p>
              <p className="text-[12px] text-slate-500 leading-relaxed mt-1">
                {t.content}
              </p>
            </div>
          </motion.div>
        );
      })}

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
};

/* ─────────────────────────────────────────────
   TAB: REVIEWS
───────────────────────────────────────────── */
const ReviewsTab = ({
  initialReviews,
  productSlug,
}: {
  initialReviews: ProductReview[];
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);
  const [helpedIds, setHelpedIds] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clientName: "", comment: "", rating: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const avg = reviews.reduce((a, r) => a + r.rating, 0) / (reviews.length || 1);
  const dist = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => r.rating === s).length,
  }));

  const markHelpful = (id: string) => {
    if (helpedIds.has(id)) return;
    setHelpedIds((prev) => new Set([...prev, id]));
  };

  const buildUrl = (path: string) => {
    const base = apiurl.mainUrl.endsWith("/")
      ? apiurl.mainUrl
      : `${apiurl.mainUrl}/`;
    return `${base}${path.startsWith("/") ? path.slice(1) : path}`;
  };

  const submitReview = async () => {
    if (!form.clientName || form.rating === 0) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(
        buildUrl(`customer-panel/products/${productSlug}/reviews`),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientName: form.clientName,
            rating: form.rating,
            comment: form.comment || undefined,
          }),
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as any)?.message || "Failed to submit review");
      }

      setForm({ clientName: "", comment: "", rating: 0 });
      setSubmitted(true);
      setShowForm(false);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (e: any) {
      setSubmitError(e.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Summary bar */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col items-center justify-center sm:min-w-[100px] text-center">
          <p className="text-5xl font-black text-slate-900 leading-none">
            {reviews.length ? avg.toFixed(1) : "—"}
          </p>
          <RatingStars value={Math.round(avg)} size={13} />
          <p className="text-[11px] text-slate-400 mt-1">
            {reviews.length} reviews
          </p>
        </div>
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
                    width: `${reviews.length ? (count / reviews.length) * 100 : 0}%`,
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
        <p className="text-[12px] font-semibold text-slate-500">
          {reviews.length
            ? "Approved reviews"
            : "No reviews yet — be the first!"}
        </p>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl transition-colors"
        >
          <Star size={12} /> Write a Review
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
              Thank you! Your review has been submitted and is awaiting
              approval.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review form */}
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

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  Your Name *
                </label>
                <input
                  value={form.clientName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, clientName: e.target.value }))
                  }
                  placeholder="e.g. Karim Hossain"
                  className="w-full text-[13px] bg-white border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  Your Comment{" "}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={form.comment}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, comment: e.target.value }))
                  }
                  rows={3}
                  placeholder="Tell us what you liked or disliked about this product..."
                  className="w-full text-[13px] bg-white border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition resize-none"
                />
              </div>

              {submitError && (
                <p className="text-[12px] text-red-600 font-medium">
                  {submitError}
                </p>
              )}

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setSubmitError("");
                  }}
                  className="text-[12px] font-semibold text-slate-500 hover:text-slate-700 px-4 py-2 rounded-xl border border-slate-200 bg-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReview}
                  disabled={!form.clientName || form.rating === 0 || submitting}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl transition-colors"
                >
                  {submitting ? (
                    <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={12} />
                  )}
                  {submitting ? "Submitting…" : "Submit Review"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review cards */}
      {reviews.length === 0 ? (
        <div className="py-10 text-center text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-2xl">
          No approved reviews yet.
        </div>
      ) : (
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
                  <AvatarCircle name={r.clientName} />
                  <div>
                    <p className="text-[13px] font-bold text-slate-900">
                      {r.clientName}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {formatDate(r.createdAt)}
                    </p>
                  </div>
                </div>
                <RatingStars value={r.rating} size={12} />
              </div>

              {r.comment && (
                <p className="mt-3 text-[12px] text-slate-500 leading-relaxed">
                  {r.comment}
                </p>
              )}

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
                  Helpful
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN EXPORT
   ✅ FIX: files prop is now passed to SpecsTab
───────────────────────────────────────────── */
export const ProductBottomSection = ({
  productSlug,
  specs,
  terms,
  reviews,
  files = [],
}: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>("specs");

  const tabs: { id: Tab; label: string; icon: React.FC<any> }[] = [
    { id: "specs", label: "Specifications", icon: Zap },
    { id: "terms", label: "Terms & Conditions", icon: ShieldCheck },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-16 mt-6">
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
              {/* ✅ FIX: files prop passed here */}
              {activeTab === "specs" && (
                <SpecsTab specs={specs} files={files} />
              )}
              {activeTab === "terms" && <TermsTab terms={terms} />}
              {activeTab === "reviews" && (
                <ReviewsTab
                  initialReviews={reviews}
                  productSlug={productSlug}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductBottomSection;
