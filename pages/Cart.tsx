
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { SEO, Layout } from '../components/Layout';
import { useCart } from '../context/CartContext';
import { Button } from '../components/UI';

export const Cart = () => {
  const { state: cart, dispatch } = useCart();

  return (
    <Layout>
      <SEO title="Your Shopping Cart" description="Review your selected tech items before checkout." />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
          <ShoppingBag className="text-emerald-600" /> Shopping Cart
        </h1>

        {cart.items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="hidden md:grid grid-cols-12 px-6 py-4 bg-slate-50 rounded-xl text-xs font-bold text-slate-400 uppercase tracking-widest">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              {cart.items.map(item => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 md:p-6 bg-white border border-slate-200 rounded-2xl group hover:border-emerald-200 transition-all">
                  <div className="col-span-6 flex items-center gap-4">
                    <img src={item.image} alt="" className="w-20 h-20 object-contain bg-slate-50 rounded-lg p-2" />
                    <div>
                      <Link to={`/product/${item.id}`} className="font-bold text-slate-800 hover:text-emerald-600 transition-colors line-clamp-1">{item.name}</Link>
                      <p className="text-xs text-slate-400">{item.brand}</p>
                      <button 
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                        className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-2 md:hidden"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="hidden md:block col-span-2 text-center font-bold text-slate-900">
                    {item.price.toLocaleString()}
                  </div>
                  
                  <div className="col-span-4 md:col-span-2 flex justify-center">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })} className="p-2 hover:bg-slate-200"><Minus size={14}/></button>
                      <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })} className="p-2 hover:bg-slate-200"><Plus size={14}/></button>
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-2 text-right">
                    <div className="flex flex-col md:items-end gap-1">
                      <span className="font-black text-emerald-600">{(item.price * item.quantity).toLocaleString()} BDT</span>
                      <button 
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                        className="hidden md:flex text-xs text-slate-300 hover:text-rose-500 font-bold items-center gap-1 transition-colors"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-6 flex justify-between">
                <Link to="/shop">
                  <Button variant="outline" className="text-xs">Continue Shopping</Button>
                </Link>
                <button 
                  onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors"
                >
                  Clear All Items
                </button>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-slate-900 rounded-2xl p-8 text-white sticky top-24 shadow-2xl">
                <h3 className="text-xl font-bold mb-8 border-b border-slate-800 pb-4">Order Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-bold text-white">{cart.total.toLocaleString()} BDT</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping</span>
                    <span className="text-emerald-400 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tax (Estimated)</span>
                    <span className="font-bold text-white">0 BDT</span>
                  </div>
                </div>
                <div className="flex justify-between items-end mb-10 pt-4 border-t border-slate-800">
                  <span className="text-slate-400 font-bold">Total</span>
                  <div className="text-right">
                    <div className="text-3xl font-black text-emerald-500">{cart.total.toLocaleString()} BDT</div>
                  </div>
                </div>
                <Link to="/checkout" className="block">
                  <Button variant="secondary" className="w-full py-4 rounded-xl shadow-lg shadow-amber-500/20">
                    Proceed to Checkout <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <div className="mt-6 flex flex-wrap gap-2 justify-center opacity-50 grayscale">
                  <img src="https://picsum.photos/seed/visa/40/24" alt="Visa" className="h-6 rounded" />
                  <img src="https://picsum.photos/seed/master/40/24" alt="Mastercard" className="h-6 rounded" />
                  <img src="https://picsum.photos/seed/bkash/40/24" alt="bKash" className="h-6 rounded" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-32 text-center bg-white border border-slate-200 rounded-3xl shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Looks like you haven't added any tech items to your cart yet.</p>
            <Link to="/shop">
              <Button variant="primary">Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};
