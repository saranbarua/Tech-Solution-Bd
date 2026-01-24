
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, CheckCircle2 } from 'lucide-react';
import { SEO, Layout } from '../components/Layout';
import { useCart } from '../context/CartContext';
import { Button } from '../components/UI';

export const Checkout = () => {
  const { state: cart, dispatch } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', city: 'Dhaka', paymentMethod: 'cod'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, call API
    setIsSuccess(true);
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      navigate('/');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-32 text-center animate-fade-in">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-lg text-slate-500 mb-8">Thank you for choosing ElectroBD. Your order #EBD-9210 is being processed. You will receive a confirmation call shortly.</p>
          <p className="text-sm text-slate-400">Redirecting to home...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title="Checkout" description="Securely complete your purchase." />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-8">
            <h1 className="text-3xl font-black text-slate-900 mb-8">Checkout</h1>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm">1</span>
                  Shipping Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name *</label>
                    <input required className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-emerald-500 transition-colors" placeholder="e.g. Rakib Hassan" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number *</label>
                    <input required className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-emerald-500 transition-colors" placeholder="e.g. 01712345678" />
                  </div>
                  <div className="col-span-full space-y-2">
                    <label className="text-sm font-bold text-slate-700">Detailed Address *</label>
                    <textarea required rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-emerald-500 transition-colors" placeholder="Apartment, Street, Area..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">City</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-emerald-500 transition-colors">
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                      <option>Sylhet</option>
                      <option>Rajshahi</option>
                    </select>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm">2</span>
                  Payment Method
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="relative flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:border-emerald-500 transition-all border-emerald-500 bg-emerald-50/50">
                    <input type="radio" name="pay" defaultChecked className="accent-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">Cash on Delivery</p>
                      <p className="text-xs text-slate-500">Pay when you receive the product</p>
                    </div>
                  </label>
                  <label className="relative flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:border-slate-300 transition-all border-slate-200">
                    <input type="radio" name="pay" className="accent-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">Online Payment</p>
                      <p className="text-xs text-slate-500">Credit Card, bKash, Rocket, Nagad</p>
                    </div>
                  </label>
                </div>
              </section>

              <Button type="submit" className="w-full py-4 text-lg rounded-xl shadow-xl shadow-emerald-600/20">Confirm My Order</Button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                {cart.items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt="" className="w-12 h-12 rounded bg-slate-50 object-contain p-1 border" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-900">{(item.price * item.quantity).toLocaleString()} BDT</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal</span>
                  <span>{cart.total.toLocaleString()} BDT</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-600 font-bold">
                  <span>Delivery Fee</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-xl font-black text-slate-900 pt-4">
                  <span>Total</span>
                  <span>{cart.total.toLocaleString()} BDT</span>
                </div>
              </div>
              <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <ShieldCheck className="text-emerald-500 shrink-0" size={18} />
                <p className="text-[10px] text-slate-500">Your personal data will be used to process your order, support your experience throughout this website.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
