"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/cart/cartContext";
import SearchOverlay from "./SearchOverlay";
import DriedMeatsDropdown from "./DriedMeatsDropdown";

const NavMini: React.FC = () => {
  const { cart } = useCart();
  const [showBanner, setShowBanner] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const bannerTimeout = setTimeout(() => {
      setShowBanner(true);
    }, 1000);

    return () => clearTimeout(bannerTimeout);
  }, []);

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/products" },
    { label: "Dried Meats", href: "/dried-meats" },
    { label: "Sausage", href: "/sausage" },
    { label: "Groceries", href: "/groceries" },
    { label: "Gift Certificates", href: "/gift-certificates" },
    { label: "Recipes", href: "/recipes" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50">
        {/* 📢 Free Ground Shipping Banner */}
        <AnimatePresence>
          {showBanner && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="overflow-hidden bg-[#2C2420] text-[#F8F3E8]"
            >
              <div className="py-2 overflow-hidden">
                <div
                  className="flex whitespace-nowrap"
                  style={{
                    animation: "marquee 22s linear infinite",
                  }}
                >
                  {[...Array(20)].map((_, i) => (
                    <span
                      key={i}
                      className="font-condensed text-sm tracking-[0.15em] uppercase mx-12"
                    >
                      <span className="text-[#D4A853]">Free Ground Shipping</span>
                      <span className="mx-3">on orders over $129</span>
                      <span className="text-[#D4A853] mx-6">|</span>
                      <span>Authentic South African Flavors</span>
                      <span className="text-[#D4A853] mx-6">|</span>
                      <span>20+ Years of Family Recipes</span>
                      <span className="text-[#D4A853] mx-6">|</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔹 Navbar */}
        <nav className="w-full flex justify-between items-center px-6 sm:px-6 py-2 sm:py-3 bg-[#F8F3E8]/95 backdrop-blur-sm">
          {/* Left - Menu Toggle and Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Menu Toggle - Far Left */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-1.5 sm:p-2 rounded-full transition-colors text-[#2C2420] hover:bg-[#2C2420]/10"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={24} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
            </motion.button>

            {/* Angus Logo with Link */}
            <Link href="/">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-20 sm:w-28"
              >
                <Image
                  src="/AB-Logo-300dpi-Alpha-Only-2.png"
                  alt="Angus Biltong Logo"
                  width={100}
                  height={40}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Right - Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-[#2C2420] hover:text-[#C25A3E] transition-colors"
              aria-label="Search products"
            >
              <Search size={22} strokeWidth={1.5} />
            </button>

            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <div className="p-1.5 text-[#2C2420] hover:text-[#C25A3E] transition-colors">
                <ShoppingCart size={22} strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#C25A3E] text-white text-[10px] font-condensed rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </nav>
      </header>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#2C2420] z-[100]"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-[#C25A3E] rounded-full flex items-center justify-center z-10 hover:bg-[#A34832] transition-colors"
            >
              <X size={24} className="text-white" strokeWidth={1.5} />
            </button>

            {/* Decorative Pattern */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  #D4A853 20px,
                  #D4A853 21px
                )`,
              }}
            />

            <div className="relative h-full flex flex-col items-center px-6 py-12 overflow-y-auto">
              <div className="flex-1 flex flex-col items-center justify-center w-full">
                {/* Menu Items */}
                <nav className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.1 + index * 0.03, duration: 0.3 }}
                    >
                      {item.label === "Dried Meats" ? (
                        <DriedMeatsDropdown variant="mobile" onNavigate={() => setMenuOpen(false)} />
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="font-display text-[1.4rem] sm:text-[1.75rem] md:text-[2.25rem] text-[#F8F3E8] hover:text-[#D4A853] transition-colors relative group uppercase tracking-wide"
                        >
                          {item.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C25A3E] transition-all duration-300 group-hover:w-full" />
                        </Link>
                      )}
                    </motion.div>
                  ))}
                  {/* Search Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.1 + menuItems.length * 0.03, duration: 0.3 }}
                  >
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setIsSearchOpen(true);
                      }}
                      className="font-display text-[1.4rem] sm:text-[1.75rem] md:text-[2.25rem] text-[#F8F3E8] hover:text-[#D4A853] transition-colors relative group uppercase tracking-wide flex items-center gap-3"
                    >
                      <Search size={24} strokeWidth={1.5} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
                      Search
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C25A3E] transition-all duration-300 group-hover:w-full" />
                    </button>
                  </motion.div>
                </nav>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center px-4 pb-4 md:hidden"
              >
                <p className="font-condensed text-xs sm:text-sm text-[#F8F3E8]/60 tracking-wider uppercase mb-1">
                  255 Sawdust Rd, Spring, TX 77380
                </p>
                <p className="font-condensed text-xs sm:text-sm text-[#D4A853] tracking-wider">
                  281-719-8577
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add SearchOverlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default NavMini;
