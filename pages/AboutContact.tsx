import React, { useMemo, useState } from "react";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  Target,
  Eye,
  Sparkles,
  ShieldCheck,
  Truck,
  Headphones,
  BadgeCheck,
  Clock,
} from "lucide-react";
import { SEO, Layout } from "../components/Layout";
import { Button } from "../components/UI";

/* ----------------------------- About Page ----------------------------- */

export const About = () => {
  const highlights = useMemo(
    () => [
      {
        icon: <BadgeCheck className="text-emerald-600" />,
        title: "Authentic Products",
        desc: "We source only genuine components and verified accessories, so you buy with confidence.",
      },
      {
        icon: <Headphones className="text-indigo-600" />,
        title: "Expert Support",
        desc: "Friendly guidance from real tech people. From build advice to after-sales support.",
      },
      {
        icon: <Truck className="text-amber-600" />,
        title: "Fast Delivery",
        desc: "Reliable delivery across Bangladesh with careful packaging and clear tracking.",
      },
      {
        icon: <ShieldCheck className="text-slate-700" />,
        title: "Warranty & Trust",
        desc: "Transparent warranty policy, simple claims process, and honest recommendations.",
      },
    ],
    [],
  );

  const values = useMemo(
    () => [
      {
        title: "Transparency",
        desc: "Clear pricing, real specs, and honest advice.",
      },
      { title: "Reliability", desc: "We prioritize consistency over hype." },
      {
        title: "Customer First",
        desc: "Your long-term satisfaction matters most.",
      },
      {
        title: "Innovation",
        desc: "We bring trending tech without compromising quality.",
      },
    ],
    [],
  );

  return (
    <Layout>
      <SEO
        title="About Us"
        description="Learn about our vision, mission, and what makes us trusted."
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-200/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/40 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-bold">
              <Sparkles size={16} />
              Built for serious tech buyers
            </div>

            <h1 className="mt-6 text-5xl md:text-6xl font-black text-slate-900 leading-tight">
              Elegant. Reliable.{" "}
              <span className="text-emerald-600">Future-ready.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
              ElectroBD started with one goal: make premium computer hardware
              accessible with real support, authentic products, and a buying
              experience you can trust.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="px-7 py-4 rounded-2xl">
                Explore Products
              </Button>
              <Button variant="outline" className="px-7 py-4 rounded-2xl">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Story + Image */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <img
              src="https://picsum.photos/seed/about/1100/800"
              alt="Our Store"
              className="rounded-3xl shadow-2xl border border-slate-200"
            />
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                Our Story
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                We noticed a pattern in the market: great products existed, but
                trust was missing. People needed authenticity, proper guidance,
                and dependable after-sales service. That’s why ElectroBD focuses
                on clarity, quality control, and customer success.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                <div className="text-3xl font-black text-emerald-600">50k+</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Customers Served
                </div>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                <div className="text-3xl font-black text-indigo-600">10+</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Global Partners
                </div>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                <div className="text-3xl font-black text-amber-600">24/7</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Online Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="max-w-7xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Eye />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Our Vision</h3>
            </div>
            <p className="mt-4 text-slate-600 leading-relaxed">
              To become Bangladesh’s most trusted technology retailer, known for
              authenticity, premium customer experience, and future-ready
              innovation.
            </p>
          </div>

          <div className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Target />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Our Mission
              </h3>
            </div>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Deliver genuine tech products at fair value, provide expert
              guidance, and ensure dependable after-sales support—so every
              customer buys confidently.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            Our Values
          </h2>
          <p className="mt-3 text-slate-600">
            A good brand is built on consistent behavior. These values guide how
            we work daily.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-white transition-colors"
            >
              <h4 className="text-lg font-black text-slate-900">{v.title}</h4>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Why people choose ElectroBD
            </h2>
            <p className="mt-3 text-slate-600">
              Because buying tech is not just purchasing a product—it’s
              investing in performance.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  {h.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">
                    {h.title}
                  </h4>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

/* ---------------------------- Contact Page ---------------------------- */

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <SEO
        title="Contact Us"
        description="Get in touch with our support and sales team."
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          {/* Left Info */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <h1 className="text-4xl font-black text-slate-900">
                Get in Touch
              </h1>
              <p className="mt-3 text-slate-600">
                Need a build suggestion, a quotation, or after-sales support? We
                reply fast and clearly.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MapPin />
                </div>
                <div>
                  <h4 className="font-black text-slate-900">Showroom</h4>
                  <p className="text-sm text-slate-600">
                    123 Tech Tower, Multiplan Center, Elephant Road, Dhaka-1205
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Phone />
                </div>
                <div>
                  <h4 className="font-black text-slate-900">Phone</h4>
                  <p className="text-sm text-slate-600">
                    +880 1234 567890 <br /> +880 9876 543210
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Mail />
                </div>
                <div>
                  <h4 className="font-black text-slate-900">Email</h4>
                  <p className="text-sm text-slate-600">
                    support@electrobd.com <br /> info@electrobd.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <Globe />
                </div>
                <div>
                  <h4 className="font-black text-slate-900">Website</h4>
                  <p className="text-sm text-slate-600">www.electrobd.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Clock />
                </div>
                <div>
                  <h4 className="font-black text-slate-900">Business Hours</h4>
                  <p className="text-sm text-slate-600">
                    Sat–Thu: 10:00 AM – 9:00 PM <br />
                    Friday: 4:00 PM – 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50">
              {submitted ? (
                <div className="text-center py-20 animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    Message Received
                  </h3>
                  <p className="text-slate-600">
                    We’ll get back to you within 24 business hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700">
                        Name
                      </label>
                      <input
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">
                      Subject
                    </label>
                    <input
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors"
                      placeholder="What can we help with?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-4 rounded-2xl gap-2"
                  >
                    Send Message <Send size={18} />
                  </Button>
                </form>
              )}
            </div>

            {/* Map (Replace iframe src with your exact Google Maps embed link) */}
            <div className="mt-12 w-full h-80 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 relative">
              {/* Option A: real map embed */}
              <iframe
                title="Google Map"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Multiplan%20Center%20Dhaka&output=embed"
              />
              {/* Option B: If you want image placeholder, comment iframe and use image */}
              {/* 
              <img
                src="https://picsum.photos/seed/map/1200/500"
                alt="Map"
                className="w-full h-full object-cover"
              />
              */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
