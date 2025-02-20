"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Search, User, ShoppingCart, Gift, Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const [showStickyLogo, setShowStickyLogo] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideIcons, setHideIcons] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Delay banner appearance by 1.5 seconds on page load
    const bannerTimeout = setTimeout(() => {
      setShowBanner(true);
    }, 1000);

    const handleScroll = () => {
      const gallerySection = document.getElementById("gallery");
      const footerSection = document.getElementById("footer");

      if (gallerySection && footerSection) {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        const inGalleryOrFooter =
          scrollPosition >= gallerySection.offsetTop ||
          scrollPosition >= footerSection.offsetTop;
        setShowBanner(!inGalleryOrFooter);
      }

      if (window.scrollY > window.innerHeight * 0.6) {
        setShowStickyLogo(true);
        setHideIcons(true);
      } else {
        setShowStickyLogo(false);
        setHideIcons(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(bannerTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIcons(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">
      {/* 📢 Free Shipping Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="origin-center overflow-hidden bg-black text-white py-3 text-lg font-semibold uppercase"
            style={{
              height: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <motion.div
              className="flex space-x-32 whitespace-nowrap w-max"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 240,
                ease: "linear",
              }}
            >
              {[...Array(80)].flatMap((_, i) => (
                <span key={`shipping-${i}`} className="text-white">
                  FREE SHIPPING ON ALL ORDERS OVER $79
                </span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Navbar */}
      <nav className="w-full flex justify-between items-center px-6 py-3 bg-transparent">
        {/* Left Side - Menu Icon (Mobile Only) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:hidden flex"
        >
          <Menu
            size={32}
            className="cursor-pointer hover:text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </motion.div>

        {/* Center - Logo (Appears After Scrolling, Only Desktop) */}
        <motion.div
          className="w-32 hidden md:block"
          initial={{ opacity: 0, y: -20 }}
          animate={
            showStickyLogo ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {showStickyLogo && (
            <Image
              src="/AB-Logo-300dpi-Alpha-Only-2.png"
              alt="Angus Biltong Logo"
              width={100}
              height={110}
              priority
            />
          )}
        </motion.div>

        {/* Right Side - Navbar Icons (Aligned in a Row on Desktop) */}
        <div className="hidden md:flex items-center space-x-6 text-gray-800">
          {[
            { Icon: Search, delay: 1.3 },
            { Icon: User, delay: 1.5 },
            { Icon: Gift, delay: 1.7 },
            { Icon: ShoppingCart, delay: 1.9 },
          ].map(({ Icon, delay }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={
                showIcons && !hideIcons
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              transition={{ delay, duration: 0.6, ease: "easeOut" }}
            >
              <Icon size={28} className="cursor-pointer hover:text-gray-600" />
            </motion.div>
          ))}

          {/* Menu Icon (Now in Line with Other Icons on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="cursor-pointer hover:text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={32} />
          </motion.div>
        </div>

        {/* 🌟 Dropdown Menu (Opens on Click, Mobile & Desktop) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-16 left-4 md:right-4 md:left-auto w-48 bg-white shadow-lg rounded-lg py-2"
            >
              {[
                "Search",
                "Sign In",
                "Shop All",
                "Dried Meats",
                "Sausage",
                "Groceries",
                "Gift",
                "Cart",
                "Logout",
              ].map((item, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 transition"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
