import React from "react";
import { Layout, SEO } from "../components/Layout";

export default function PublicPolicy() {
  return (
    <Layout>
      <SEO
        title="Public Policy"
        description="Governance, compliance and ethical standards of Arcthos Advisory."
      />

      <div className="relative bg-gradient-to-b from-stone-50 via-white to-stone-100 text-stone-900 overflow-hidden">
        {/* floating glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-200/30 blur-3xl rounded-full animate-pulse" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-amber-200/30 blur-3xl rounded-full animate-pulse" />

        {/* HERO */}
        <section className="px-8 md:px-14 py-28 relative">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-6 animate-fadeUp">
            Governance • Transparency • Trust
          </p>

          <h1
            className="text-6xl md:text-8xl font-light leading-[0.9] animate-fadeUp"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Public
            <br />
            <span className="italic text-emerald-600">Policy</span>
          </h1>

          <p className="max-w-2xl mt-8 text-stone-600 text-sm leading-relaxed animate-fadeUp delay-150">
            Our governance framework ensures ethical integrity, regulatory
            compliance, and responsible advisory practices across global
            markets.
          </p>

          {/* animated line */}
          <div className="mt-10 h-[1px] w-0 bg-gradient-to-r from-emerald-500 to-amber-400 animate-lineGrow" />
        </section>

        {/* CONTENT */}
        <section className="px-8 md:px-14 py-20 grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* SIDE NAV */}
          <div className="space-y-5 text-xs tracking-[0.25em] uppercase text-stone-500">
            {[
              "Compliance",
              "Data Protection",
              "Ethics",
              "Risk Governance",
              "Third Party",
            ].map((item, i) => (
              <div
                key={item}
                className="hover:text-emerald-600 cursor-pointer transition-all duration-300 hover:translate-x-2 animate-fadeUp"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* POLICY BLOCKS */}
          <div className="lg:col-span-2 space-y-12">
            <PolicyBlock
              title="Compliance Standards"
              text="We comply with global regulatory frameworks ensuring transparent and accountable advisory operations."
            />
            <PolicyBlock
              title="Data Protection"
              text="Client data is encrypted, protected, and handled under strict confidentiality and governance protocols."
            />
            <PolicyBlock
              title="Ethical Conduct"
              text="Integrity and fiduciary responsibility guide all advisory decisions and client interactions."
            />
            <PolicyBlock
              title="Risk Governance"
              text="Structured risk frameworks ensure balanced, informed, and responsible decision-making."
            />
          </div>
        </section>

        {/* FOOTER */}
        <section className="px-8 md:px-14 py-16 border-t border-stone-200">
          <p className="text-xs text-stone-500 animate-fadeUp">
            This policy evolves continuously to reflect global regulatory
            standards and best practices.
          </p>
        </section>

        {/* animations */}
        <style>
          {`
            @keyframes fadeUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0px);
              }
            }

            .animate-fadeUp {
              animation: fadeUp 0.8s ease forwards;
            }

            .delay-150 {
              animation-delay: 150ms;
            }

            @keyframes lineGrow {
              from { width: 0; }
              to { width: 140px; }
            }

            .animate-lineGrow {
              animation: lineGrow 1.2s ease forwards;
            }
          `}
        </style>
      </div>
    </Layout>
  );
}

/* BLOCK */
const PolicyBlock = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="group relative p-6 rounded-xl hover:bg-white/60 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-stone-200">
      {/* glow hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl" />

      <h3
        className="relative text-2xl font-light mb-3 group-hover:text-emerald-700 transition-all duration-300"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        {title}
      </h3>

      <p className="relative text-sm text-stone-600 leading-relaxed">{text}</p>

      <div className="relative mt-4 h-[2px] w-0 group-hover:w-28 bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500" />
    </div>
  );
};
