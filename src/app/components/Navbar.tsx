"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Search, User, ShoppingCart, Gift, Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const [showStickyLogo, setShowStickyLogo] = useState(false);
  const [showIcons, setShowIcons] = useState(false); // Controls delay for icons
  const [menuOpen, setMenuOpen] = useState(false); // State for dropdown menu

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        setShowStickyLogo(true);
      } else {
        setShowStickyLogo(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Adds a 1s delay before navbar icons start appearing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIcons(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timeout);
  }, []);

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-3 z-50">
      {/* Left Side - Logo (Appears Only After Scrolling) */}
      <motion.div
        className="w-32"
        initial={{ opacity: 0, y: -20 }}
        animate={showStickyLogo ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
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

      {/* Right Side - Navbar Icons (Fade In One by One After 1s Delay) */}
      <div className="relative flex space-x-6 text-gray-800">
        {[
          { Icon: Search, delay: 1.3 },
          { Icon: User, delay: 1.5 },
          { Icon: Gift, delay: 1.7 },
          { Icon: ShoppingCart, delay: 1.9 },
        ].map(({ Icon, delay }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={showIcons ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay, duration: 0.6, ease: "easeOut" }}
          >
            <Icon size={28} className="cursor-pointer hover:text-gray-600" />
          </motion.div>
        ))}

        {/* Menu Icon with Dropdown Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={showIcons ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ delay: 2.1, duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <Menu
            size={32}
            className="cursor-pointer hover:text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {/* Dropdown Menu */}
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-2"
            >
              {[
                "Shop All",
                "Dried Meats",
                "Sausage",
                "Groceries",
                "Sign In",
                "Gift",
                "Cart",
                "Search",
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
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
