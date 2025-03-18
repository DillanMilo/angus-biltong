"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";

const NavMini: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const bannerTimeout = setTimeout(() => {
      setShowBanner(true);
    }, 1000);

    const handleScroll = () => {
      setScrolling(window.scrollY > 50); // Navbar gets solid color after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(bannerTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
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
            className="bg-black text-white py-2 text-center text-sm font-semibold uppercase"
          >
            FREE SHIPPING ON ALL ORDERS OVER $79
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Transparent Navbar */}
      <nav
        className={`w-full flex justify-between items-center px-6 py-3 transition-all duration-300 ${
          scrolling ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        {/* Left - Angus Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-28"
        >
          <Image
            src="/AB-Logo-300dpi-Alpha-Only-2.png"
            alt="Angus Biltong Logo"
            width={100}
            height={40}
            priority
          />
        </motion.div>

        {/* Right - Menu Icon */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="cursor-pointer hover:text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={32} />
        </motion.div>

        {/* 🌟 Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full right-6 w-48 bg-white shadow-lg rounded-lg py-2 mt-2"
            >
              {["Shop All", "Cart", "Sign In", "Logout"].map((item, index) => (
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

export default NavMini;
