import React, { useState } from "react";
import { Package, Heart, LogOut, Settings, Eye } from "lucide-react";
import { SEO, Layout } from "../components/Layout";
import { Button } from "../components/UI";

export const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");

  const orders = [
    {
      id: "#EBD-1001",
      date: "Oct 12, 2023",
      total: 185000,
      status: "Delivered",
    },
    {
      id: "#EBD-1244",
      date: "Jan 05, 2024",
      total: 14500,
      status: "Processing",
    },
    {
      id: "#EBD-1300",
      date: "Feb 20, 2024",
      total: 76000,
      status: "Delivered",
    },
  ];

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-20">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
            <h1 className="text-3xl font-black text-slate-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-500 mb-8">
              Login to track orders and manage your account.
            </p>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="name@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-bold text-slate-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-bold text-emerald-600 hover:underline"
                  >
                    Forgot?
                  </a>
                </div>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <Button type="submit" className="w-full py-4 rounded-xl">
                Login to Account
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t text-center">
              <p className="text-sm text-slate-500 mb-4">New to ElectroBD?</p>
              <button className="text-sm font-bold text-emerald-600 hover:underline">
                Create an account
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="My Account"
        description="Manage your profile and track orders."
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 space-y-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  RH
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Rakib Hassan</h4>
                  <p className="text-xs text-slate-500">Premium Customer</p>
                </div>
              </div>
            </div>

            {[
              { id: "orders", icon: <Package size={18} />, label: "My Orders" },
              { id: "wishlist", icon: <Heart size={18} />, label: "Wishlist" },
              {
                id: "settings",
                icon: <Settings size={18} />,
                label: "Settings",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id ? "bg-emerald-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            <button
              onClick={() => setIsLoggedIn(false)}
              className="w-full flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-rose-500 hover:bg-rose-50 transition-all"
            >
              <LogOut size={18} /> Logout
            </button>
          </aside>

          {/* Content */}
          <main className="flex-1 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            {activeTab === "orders" && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-black text-slate-900 mb-8">
                  Recent Orders
                </h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border rounded-2xl gap-4"
                    >
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400">
                          Order ID
                        </p>
                        <p className="font-black text-slate-900">{order.id}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400">Date</p>
                        <p className="font-bold text-slate-600">{order.date}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400">
                          Status
                        </p>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${order.status === "Delivered" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400">
                          Total
                        </p>
                        <p className="font-black text-emerald-600">
                          {order.total.toLocaleString()} BDT
                        </p>
                      </div>
                      <Button variant="outline" className="gap-2 text-xs py-2">
                        <Eye size={14} /> View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab !== "orders" && (
              <div className="py-20 text-center text-slate-400">
                This section is under construction.
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};
