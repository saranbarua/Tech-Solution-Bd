
import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Globe, CheckCircle2 } from 'lucide-react';
import { SEO, Layout } from '../components/Layout';
import { Button } from '../components/UI';

export const About = () => (
  <Layout>
    <SEO title="About Us" description="Learn about ElectroBD's mission and history." />
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-black text-slate-900 mb-6">Built for Tech Lovers</h1>
        <p className="text-xl text-slate-500 leading-relaxed">ElectroBD started in 2015 with a simple goal: to make premium computer hardware accessible and reliable for every Bangladeshi professional and gamer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <img src="https://picsum.photos/seed/about/800/600" alt="Our Store" className="rounded-3xl shadow-2xl" />
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">To be the most trusted technology retailer in Bangladesh, known for authenticity, unparalleled support, and the latest innovations.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl">
              <h4 className="text-3xl font-black text-emerald-600 mb-2">50k+</h4>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Happy Customers</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl">
              <h4 className="text-3xl font-black text-amber-500 mb-2">10+</h4>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Global Partners</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <SEO title="Contact Us" description="Get in touch with the ElectroBD team." />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h1 className="text-4xl font-black text-slate-900 mb-4">Get in Touch</h1>
              <p className="text-slate-500">We're here to help you with your tech needs. Visit us or reach out via email/phone.</p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><MapPin/></div>
                <div>
                  <h4 className="font-bold text-slate-900">Our Showroom</h4>
                  <p className="text-sm text-slate-500">123 Tech Tower, Multiplan Center, Elephant Road, Dhaka-1205</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><Phone/></div>
                <div>
                  <h4 className="font-bold text-slate-900">Phone & Hotline</h4>
                  <p className="text-sm text-slate-500">+880 1234 567890<br/>+880 9876 543210</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><Mail/></div>
                <div>
                  <h4 className="font-bold text-slate-900">Email Support</h4>
                  <p className="text-sm text-slate-500">support@electrobd.com<br/>info@electrobd.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50">
              {submitted ? (
                <div className="text-center py-20 animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Message Received!</h3>
                  <p className="text-slate-500">We'll get back to you within 24 business hours.</p>
                  <Button variant="outline" className="mt-8" onClick={() => setSubmitted(false)}>Send another message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Name</label>
                      <input required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Email</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Subject</label>
                    <input required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors" placeholder="What can we help with?" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Message</label>
                    <textarea required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors" placeholder="Write your message here..." />
                  </div>
                  <Button type="submit" className="w-full py-4 rounded-xl gap-2">Send Message <Send size={18}/></Button>
                </form>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 w-full h-80 bg-slate-200 rounded-3xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all" />
              <img src="https://picsum.photos/seed/map/1200/400" alt="Map" className="w-full h-full object-cover" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-3 rounded-full shadow-2xl font-black text-slate-900 flex items-center gap-2">
                <MapPin className="text-emerald-600" /> Multiplan Center, Dhaka
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
