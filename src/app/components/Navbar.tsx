"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/cart/cartContext";
import SearchOverlay from "./SearchOverlay";

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

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

  useEffect(() => {
    const bannerTimeout = setTimeout(() => {
      setShowBanner(true);
    }, 800);

    const handleScroll = () => {
      // Check if scrolled past hero section (100vh)
      const heroHeight = window.innerHeight;
      setPastHero(window.scrollY > heroHeight * 0.9);

      // Hide banner in gallery/footer
      const gallerySection = document.getElementById("gallery");
      const footerSection = document.getElementById("footer");

      if (gallerySection && footerSection) {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        const inGalleryOrFooter =
          scrollPosition >= gallerySection.offsetTop ||
          scrollPosition >= footerSection.offsetTop;
        setShowBanner(!inGalleryOrFooter);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(bannerTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Full Navbar - Only shows in hero section */}
      <AnimatePresence>
        {!pastHero && (
          <motion.header
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 w-full z-50"
          >
            {/* Promotional Banner */}
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
                        animation: "marquee 30s linear infinite",
                      }}
                    >
                      {[...Array(20)].map((_, i) => (
                        <span
                          key={i}
                          className="font-condensed text-sm tracking-[0.15em] uppercase mx-12"
                        >
                          <span className="text-[#D4A853]">Free Shipping</span>
                          <span className="mx-3">on orders over $79</span>
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

            {/* Main Navbar in Hero */}
            <nav className="w-full bg-transparent">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
                {/* Left spacer */}
                <div className="w-10" />

                {/* Center - Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                  {menuItems.slice(0, 5).map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        className="font-condensed text-xs xl:text-sm tracking-[0.08em] xl:tracking-[0.1em] uppercase transition-colors relative group whitespace-nowrap text-white hover:text-[#D4A853]"
                      >
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-[#D4A853]" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Right - Icons */}
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Mobile Cart Icon */}
                  <Link href="/cart" className="relative">
                    <div className="p-1.5 text-white">
                      <ShoppingCart size={22} strokeWidth={1.5} />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-[#C25A3E] text-white text-[10px] font-condensed rounded-full h-4 w-4 flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Menu Toggle */}
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-1.5 sm:p-2 rounded-full transition-colors text-white hover:bg-white/10"
                  >
                    <Menu size={24} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
                  </button>
                </div>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Sticky Hamburger Menu Button - Shows after scrolling past hero */}
      <AnimatePresence>
        {pastHero && !menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2"
          >
            {/* Cart Button */}
            <Link href="/cart">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-[#2C2420] rounded-full flex items-center justify-center shadow-lg relative"
              >
                <ShoppingCart size={20} className="text-[#F8F3E8]" strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C25A3E] text-white text-[10px] font-condensed rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(true)}
              className="w-12 h-12 bg-[#C25A3E] rounded-full flex items-center justify-center shadow-lg"
            >
              <Menu size={22} className="text-white" strokeWidth={1.5} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#2C2420] z-50"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-[#C25A3E] rounded-full flex items-center justify-center z-10 hover:bg-[#A34832] transition-colors"
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

            <div className="relative h-full flex flex-col items-center justify-center px-6 py-20 overflow-y-auto">
              {/* Menu Items */}
              <nav className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.1 + index * 0.03, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-[#F8F3E8] hover:text-[#D4A853] transition-colors relative group uppercase tracking-wide"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C25A3E] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex items-center gap-6 sm:gap-8 mt-8 sm:mt-10"
              >
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setMenuOpen(false);
                  }}
                  className="text-[#F8F3E8] hover:text-[#D4A853] transition-colors"
                >
                  <Search size={24} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
                </button>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-[#F8F3E8] hover:text-[#D4A853] transition-colors"
                >
                  <User size={24} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="text-[#F8F3E8] hover:text-[#D4A853] transition-colors relative"
                >
                  <ShoppingCart size={24} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#C25A3E] text-white text-[10px] font-condensed rounded-full h-4 w-4 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 sm:bottom-10 left-0 right-0 text-center px-4"
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

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
