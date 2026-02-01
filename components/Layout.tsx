import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Trash2,
} from "lucide-react";
import { dataService } from "../services/dataService";
import { CategoryNode, Product } from "../types";

// SEO Helper
export const SEO = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  useEffect(() => {
    document.title = `${title} | ElectroBD`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
  }, [title, description]);
  return null;
};
const CategoryTreeLinks = ({ nodes }: { nodes: CategoryNode[] }) => {
  return (
    <ul className="space-y-1.5">
      {nodes.map((node) => (
        <li key={node.id}>
          <Link
            to={`/shop?category=${encodeURIComponent(node.slug)}`}
            className="text-sm text-slate-500 hover:text-emerald-600 hover:translate-x-1 transition-all block"
          >
            {node.name}
          </Link>

          {node.children?.length ? (
            <div className="ml-3 mt-1 border-l border-slate-100 pl-3">
              <CategoryTreeLinks nodes={node.children} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

// Search Modal
const SearchModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 1) {
      dataService.searchProducts(query).then(setResults);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4 border-b flex items-center gap-3">
          <Search className="text-slate-400 w-5 h-5" />
          <input
            autoFocus
            type="text"
            placeholder="Search for products, brands or categories..."
            className="flex-1 text-lg outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {results.length > 0 ? (
            <div className="grid gap-4">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-2 hover:bg-slate-50 rounded-lg text-left w-full transition-colors"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="w-12 h-12 object-cover rounded bg-slate-100"
                  />
                  <div>
                    <h4 className="font-medium text-slate-800">
                      {product.name}
                    </h4>
                    <p className="text-sm text-emerald-600 font-semibold">
                      {product.price.toLocaleString()} BDT
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : query.length > 1 ? (
            <div className="py-10 text-center text-slate-400">
              No products found for "{query}"
            </div>
          ) : (
            <div className="py-10 text-center text-slate-400">
              Start typing to search tech goodies...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await dataService.getCategories();
        console.log(data);
        setCategories(data);
      } catch (err: any) {
        setCategoryError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5">
              <Phone size={14} className="text-emerald-500" />
              +88 01714 169153
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-emerald-500" /> Sat–Thu 10AM–7PM
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-emerald-500" />{" "}
              techsolutionsengineers@gmail.com
            </span>
          </div>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
          <button
            className="md:hidden p-2 -ml-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              Electro<span className="text-emerald-600">BD</span>
            </span>
            <span className="text-[10px] hidden md:block text-slate-500 uppercase tracking-widest leading-none">
              Your Ultimate Tech Destination
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <div className="relative group px-4 py-2 cursor-pointer">
              <span className="flex items-center gap-1 font-medium text-slate-700 group-hover:text-emerald-600 transition-colors">
                Categories <ChevronDown size={16} />
              </span>
              {/* Mega Menu */}
              <div className="absolute top-full left-0 w-[600px] bg-white border border-slate-100 shadow-xl rounded-b-xl p-6 grid grid-cols-3 gap-8 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-2 group-hover:translate-y-0">
                {loadingCategories ? (
                  <div className="col-span-3 text-sm text-slate-400">
                    Loading...
                  </div>
                ) : categoryError ? (
                  <div className="col-span-3 text-sm text-red-500">
                    {categoryError}
                  </div>
                ) : (
                  categories.map((cat) => (
                    <div key={cat.id}>
                      <h4 className="font-bold text-slate-900 mb-3 border-b border-slate-50 pb-1">
                        {cat.name}
                      </h4>

                      <CategoryTreeLinks nodes={cat.children || []} />
                    </div>
                  ))
                )}
              </div>
            </div>
            <Link
              to="/shop"
              className="px-4 py-2 font-medium text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Offers
            </Link>
            <Link
              to="/shop"
              className="px-4 py-2 font-medium text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Brands
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 md:gap-4 flex-1 justify-end">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex-1 max-w-xs hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors group"
            >
              <Search size={18} className="group-hover:text-emerald-600" />
              <span className="text-sm">Search Tech...</span>
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 text-slate-600"
            >
              <Search size={22} />
            </button>

            <Link
              to="/account"
              className="p-2 text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <User size={22} />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <span className="font-bold text-emerald-600">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="p-4 space-y-6">
            <Link to="/" className="block text-lg font-medium">
              Home
            </Link>
            <div>
              <h4 className="text-xs uppercase text-slate-400 font-bold tracking-widest mb-3">
                Categories
              </h4>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.slug}`} // ✅ slug
                    className="block text-slate-700 hover:text-emerald-600 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/about" className="block text-lg font-medium">
              About Us
            </Link>
            <Link to="/contact" className="block text-lg font-medium">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1">{children}</main>

      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold text-white">
              Electro<span className="text-emerald-500">BD</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Techsolution & Engineers is considered to be masters in Automation
              System Integration, design, development, installation, testing,
              and commissioning for various industrial applications. We
              prioritize customer satisfaction above all.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Categories</h4>
            <ul className="space-y-3 text-sm">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.slug}`} // ✅ slug
                    className="hover:text-emerald-500 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-emerald-500 transition-colors"
                >
                  About ElectroBD
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-emerald-500 shrink-0" />
                <span>
                  P# 293, Jamtola Mor, Shadhinota Sarani Road, North Badda,
                  Dhaka-1212
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>+88 01714 169153</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span>techsolutionsengineers@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 ElectroBD. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="bg-slate-800 px-3 py-1 rounded">SSL Secure</span>
            <span className="bg-slate-800 px-3 py-1 rounded">
              Official Warranty
            </span>
          </div>
        </div>
      </footer>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};
