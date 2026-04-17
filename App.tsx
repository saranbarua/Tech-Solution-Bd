import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { Account } from "./pages/Account";
import { About, Contact } from "./pages/AboutContact";
import Clients from "./pages/Clients";
import { Toaster } from "react-hot-toast";
import PublicPolicy from "./pages/PublicPolicy";

const App: React.FC = () => {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/public-policy" element={<PublicPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;
