
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const styles = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800',
    secondary: 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700',
    outline: 'border-2 border-slate-200 text-slate-700 hover:bg-slate-50 active:bg-slate-100',
    ghost: 'text-slate-600 hover:bg-slate-100 active:bg-slate-200',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800',
  };

  return (
    <button 
      className={`inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Fix: Explicitly type as React.FC to allow 'key' and other standard React attributes in JSX
export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { dispatch } = useCart();

  return (
    <div className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.oldPrice && (
          <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded">
            SAVE {(product.oldPrice - product.price).toLocaleString()} BDT
          </span>
        )}
      </Link>
      
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} />
          ))}
          <span className="text-[10px] text-slate-400 ml-1">({product.reviewsCount})</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 min-h-[2.5rem] group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex flex-col gap-1 mb-4">
          <span className="text-lg font-bold text-slate-900">{product.price.toLocaleString()} BDT</span>
          {product.oldPrice && (
            <span className="text-xs text-slate-400 line-through">{product.oldPrice.toLocaleString()} BDT</span>
          )}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full py-2 text-xs gap-2 group/btn"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: 'ADD_TO_CART', payload: product });
          }}
        >
          <ShoppingCart size={14} className="group-hover/btn:text-emerald-600" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export const Breadcrumbs = ({ items }: { items: { label: string; path?: string }[] }) => (
  <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
    <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
    {items.map((item, idx) => (
      <React.Fragment key={idx}>
        <span>/</span>
        {item.path ? (
          <Link to={item.path} className="hover:text-emerald-600 transition-colors">{item.label}</Link>
        ) : (
          <span className="text-slate-600 font-medium">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);
