import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShieldCheck, Truck } from "lucide-react";
import { SEO, Layout } from "../components/Layout";
import { Button, Breadcrumbs } from "../components/UI";
import { dataService } from "../services/dataService";
import { Product } from "../types";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    if (id)
      dataService.getProductById(id).then((res) => setProduct(res || null));
  }, [id]);

  if (!product)
    return (
      <Layout>
        <div className="max-w-7xl mx-auto p-20 text-center">
          Loading product...
        </div>
      </Layout>
    );

  return (
    <Layout>
      <SEO title={product.name} description={product.description} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[{ label: "Shop", path: "/shop" }, { label: product.name }]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square bg-white border border-slate-200 rounded-2xl overflow-hidden p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex gap-4">
              {[...Array(3)].map((_, i) => (
                <button
                  key={i}
                  className="w-24 h-24 border-2 border-slate-100 rounded-lg overflow-hidden hover:border-emerald-500 transition-all p-2 bg-white"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${product.stock > 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
              <span className="text-sm font-bold text-slate-400">
                Brand:{" "}
                <Link to="/shop" className="text-emerald-600 hover:underline">
                  {product.brand}
                </Link>
              </span>
              <span className="text-sm font-bold text-slate-400">
                ID: {product.id}
              </span>
            </div>

            <h1 className="text-3xl font-black text-slate-900 mb-6 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div>
                <span className="text-4xl font-black text-slate-900">
                  {product.price.toLocaleString()} BDT
                </span>
                {product.oldPrice && (
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-slate-400 line-through">
                      {product.oldPrice.toLocaleString()} BDT
                    </span>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      SAVE{" "}
                      {((1 - product.price / product.oldPrice) * 100).toFixed(
                        0,
                      )}
                      %
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-slate-100 rounded-xl flex items-center gap-3">
                <ShieldCheck className="text-emerald-500" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Warranty</p>
                  <p className="text-slate-500">2 Years Official</p>
                </div>
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-xl flex items-center gap-3">
                <Truck className="text-amber-500" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Delivery</p>
                  <p className="text-slate-500">Inside Dhaka 48h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="mb-20">
          <div className="flex gap-8 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
            {["specs", "description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-3xl animate-fade-in">
            {activeTab === "specs" && (
              <div className="space-y-0 border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                {Object.entries(product.specs).map(([key, val], idx) => (
                  <div
                    key={key}
                    className={`grid grid-cols-3 p-4 text-sm ${idx % 2 === 0 ? "bg-slate-50" : "bg-white"}`}
                  >
                    <span className="font-bold text-slate-500">{key}</span>
                    <span className="col-span-2 text-slate-900 font-medium">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "description" && (
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
