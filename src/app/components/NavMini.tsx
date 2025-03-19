"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";

const NavMini: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const bannerTimeout = setTimeout(() => {
      setShowBanner(true);
    }, 1000);

    return () => clearTimeout(bannerTimeout);
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
            className="bg-black text-white py-2 text-center text-xs sm:text-sm font-semibold uppercase px-4"
          >
            <span className="hidden sm:inline">
              FREE SHIPPING ON ALL ORDERS OVER $79
            </span>
            <span className="sm:hidden">FREE SHIPPING OVER $79</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Navbar */}
      <nav className="w-full flex justify-between items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/80 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none">
        {/* Left - Angus Logo */}
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

        {/* Right - Menu Icon */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="cursor-pointer hover:text-gray-600 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={28} />
        </motion.button>

        {/* 🌟 Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full right-2 sm:right-6 w-56 bg-white shadow-lg rounded-lg py-2 mt-2"
            >
              {["Shop All", "Cart", "Sign In", "Logout"].map((item, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-200 transition text-sm sm:text-base"
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
