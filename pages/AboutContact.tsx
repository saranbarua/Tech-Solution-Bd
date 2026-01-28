import React, { useMemo, useState } from "react";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  Factory,
  Wrench,
  ShieldCheck,
  Cpu,
  Gauge,
  Settings,
  Building2,
  BadgeCheck,
  Clock,
  FileText,
} from "lucide-react";
import { SEO, Layout } from "../components/Layout";
import { Button } from "../components/UI";

/* ----------------------------- ABOUT (BTech-style) ----------------------------- */

export const About = () => {
  const stats = useMemo(
    () => [
      { label: "Projects Delivered", value: "300+", tone: "text-emerald-600" },
      { label: "Industry Segments", value: "10+", tone: "text-indigo-600" },
      { label: "Service Response", value: "24–48h", tone: "text-amber-600" },
    ],
    [],
  );

  const pillars = useMemo(
    () => [
      {
        icon: <ShieldCheck className="text-emerald-700" />,
        title: "Quality & Reliability",
        desc: "Genuine parts, proper engineering practice, and clear documentation—no shortcuts.",
      },
      {
        icon: <Cpu className="text-indigo-700" />,
        title: "Automation Expertise",
        desc: "PLC, HMI, VFD, servo & control integration—designed for stable operations.",
      },
      {
        icon: <Wrench className="text-amber-700" />,
        title: "Service & Support",
        desc: "Troubleshooting, maintenance, and on-site support with practical solutions.",
      },
      {
        icon: <BadgeCheck className="text-slate-700" />,
        title: "Trust & Transparency",
        desc: "Accurate specs, clear scope, and honest recommendations to protect your ROI.",
      },
    ],
    [],
  );

  const services = useMemo(
    () => [
      {
        icon: <Settings className="text-emerald-700" />,
        title: "Industrial Automation",
        desc: "PLC programming, panel design, system integration & commissioning.",
      },
      {
        icon: <Gauge className="text-indigo-700" />,
        title: "Drives & Motion",
        desc: "VFD, inverter, servo selection, setup, tuning & optimization.",
      },
      {
        icon: <Factory className="text-amber-700" />,
        title: "Plant Solutions",
        desc: "Electrical distribution, SDB, control panels, retrofit & upgrades.",
      },
      {
        icon: <FileText className="text-slate-700" />,
        title: "Maintenance & Repair",
        desc: "Preventive maintenance, fault diagnosis, component repair & replacement.",
      },
    ],
    [],
  );

  const industries = useMemo(
    () => [
      "Pharmaceutical",
      "Textile & Garments",
      "Steel & Metal",
      "Food & Beverage",
      "Packaging",
      "Power & Utilities",
      "Cement",
      "Printing",
    ],
    [],
  );

  return (
    <Layout>
      <SEO
        title="About Us"
        description="Industrial automation & engineering solutions—mission, vision, services and industries we support."
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-200/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/30 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-14">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-bold">
              <Building2 size={16} />
              Industrial Automation & Engineering
            </div>

            <h1 className="mt-6 text-5xl md:text-6xl font-black text-slate-900 leading-tight">
              Engineering that{" "}
              <span className="text-emerald-600">keeps plants running</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
              We deliver automation, electrical and control solutions with a
              focus on uptime, safety, and long-term reliability—so your
              operation stays stable and scalable.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="px-7 py-4 rounded-2xl">Request a Quote</Button>
              <Button variant="outline" className="px-7 py-4 rounded-2xl">
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About + Image */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <img
              src="https://picsum.photos/seed/automation/1200/900"
              alt="Industrial Automation"
              className="rounded-3xl shadow-2xl border border-slate-200"
            />
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                Who We Are
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                We are an engineering-focused team providing industrial
                automation, control systems, and electrical solutions. Our
                approach is simple: understand the plant requirements, design
                clean solutions, and support you after delivery.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-6 bg-slate-50 rounded-3xl border border-slate-200"
                >
                  <div className={`text-3xl font-black ${s.tone}`}>
                    {s.value}
                  </div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40">
              <h4 className="text-lg font-black text-slate-900">
                What we optimize for
              </h4>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 text-emerald-600">•</span>Reduced
                  downtime and stable operations
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-emerald-600">•</span>Safer control
                  systems and clean wiring standards
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 text-emerald-600">•</span>Maintainable
                  solutions with proper documentation
                </li>
              </ul>
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
                <ShieldCheck />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Vision</h3>
            </div>
            <p className="mt-4 text-slate-600 leading-relaxed">
              To be a trusted automation and engineering partner in
              Bangladesh—recognized for reliability, innovation, and strong
              service culture.
            </p>
          </div>

          <div className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Factory />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Mission</h3>
            </div>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Deliver robust automation, control and electrical solutions with
              quality components, proper engineering, and responsive
              support—ensuring uptime and operational efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            Core Services
          </h2>
          <p className="mt-3 text-slate-600">
            End-to-end support—from design and integration to commissioning and
            maintenance.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">
                    {s.title}
                  </h4>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            Why Choose Us
          </h2>
          <p className="mt-3 text-slate-600">
            We focus on engineering clarity, long-term reliability, and strong
            after-sales support.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-white transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="p-10 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">
            Industries We Serve
          </h2>
          <p className="mt-3 text-slate-600">
            We work across multiple sectors where uptime, safety and efficiency
            matter.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {industries.map((i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm"
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

/* ----------------------------- CONTACT (BTech-style) ----------------------------- */

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
        description="Contact for automation solutions, service support, and quotations."
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          {/* Left Info */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <h1 className="text-4xl font-black text-slate-900">Contact</h1>
              <p className="mt-3 text-slate-600">
                For quotation, project discussion, on-site support, or spare
                parts—reach out anytime.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MapPin />
                </div>
                <div>
                  <h4 className="font-black text-slate-900">Office</h4>
                  <p className="text-sm text-slate-600">
                    Your Office Address, Dhaka, Bangladesh
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
                    +880 17XX XXXXXX <br /> +880 17XX XXXXXX
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
                    info@yourcompany.com <br /> support@yourcompany.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <Globe />
                </div>
                <div>
                  <h4 className="font-black text-slate-900">Website</h4>
                  <p className="text-sm text-slate-600">www.yourcompany.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Clock />
                </div>
                <div>
                  <h4 className="font-black text-slate-900">Business Hours</h4>
                  <p className="text-sm text-slate-600">
                    Sat–Thu: 10:00 AM – 7:00 PM <br />
                    Friday: Closed / On Call
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <h4 className="font-black text-slate-900">For faster response</h4>
              <p className="mt-2 text-sm text-slate-600">
                Please mention: project location, required service
                (PLC/HMI/VFD/Panel), and urgency level.
              </p>
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
                    Request Submitted
                  </h3>
                  <p className="text-slate-600">
                    We will contact you within 24–48 business hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700">
                        Full Name
                      </label>
                      <input
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors"
                        placeholder="Your name"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700">
                        Phone
                      </label>
                      <input
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors"
                        placeholder="+880 1XXX XXXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700">
                        Service Type
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors bg-white"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option>PLC / HMI Programming</option>
                        <option>VFD / Inverter Setup</option>
                        <option>Servo & Motion</option>
                        <option>Control Panel / SDB</option>
                        <option>Maintenance / Repair</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">
                      Subject
                    </label>
                    <input
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors"
                      placeholder="Project / quotation / support"
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
                      placeholder="Write details (location, machine type, requirements, timeline)..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-4 rounded-2xl gap-2"
                  >
                    Submit Request <Send size={18} />
                  </Button>
                </form>
              )}
            </div>

            {/* Map */}
            <div className="mt-12 w-full h-80 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100">
              <iframe
                title="Google Map"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Dhaka%20Bangladesh&output=embed"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
