"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Search, User, ShoppingCart, Gift, Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const [showStickyLogo, setShowStickyLogo] = useState(false);
  const [showIcons, setShowIcons] = useState(false); // Controls delay for icons
  const [menuOpen, setMenuOpen] = useState(false); // State for dropdown menu
  const [hideIcons, setHideIcons] = useState(false); // Controls icon visibility except menu
  const [showBanner, setShowBanner] = useState(false); // Changed to false initially

  useEffect(() => {
    // Delay banner appearance by 1.5 seconds on page load
    const bannerTimeout = setTimeout(() => {
      setShowBanner(true);
    }, 1000); // 1 seconds

    const handleScroll = () => {
      const gallerySection = document.getElementById("gallery");
      const footerSection = document.getElementById("footer");
      const featuredSection = document.getElementById("featured");
      const landingSection = document.getElementById("landing");

      if (
        gallerySection &&
        footerSection &&
        featuredSection &&
        landingSection
      ) {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        // Check if we're in gallery or footer sections
        const inGallerySection = scrollPosition >= gallerySection.offsetTop;
        const inFooterSection = scrollPosition >= footerSection.offsetTop;

        // Check if we're in featured or landing sections
        const inFeaturedSection =
          scrollPosition >= featuredSection.offsetTop &&
          scrollPosition < gallerySection.offsetTop;
        const inLandingSection = scrollPosition < featuredSection.offsetTop;

        // Show banner only in landing and featured sections, after initial delay
        setShowBanner(inLandingSection || inFeaturedSection);
      }

      if (window.scrollY > window.innerHeight * 0.6) {
        setShowStickyLogo(true);
        setHideIcons(true); // Hide all icons except menu
      } else {
        setShowStickyLogo(false);
        setHideIcons(false); // Show all icons when on landing
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(bannerTimeout); // Clean up timeout
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Adds a 1s delay before navbar icons start appearing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIcons(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timeout);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">
      {/* 📢 Free Shipping Banner with Curtain Load-In & Out */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ scaleX: 0 }} // Curtain effect (open from center)
            animate={{ scaleX: 1 }} // Opens to full width
            exit={{ scaleX: 0 }} // Closes back to center when disappearing
            transition={{ duration: 0.5, ease: "easeOut" }} // Smooth enter/exit
            className="origin-center overflow-hidden bg-black text-white py-3 text-lg font-semibold uppercase"
            style={{
              height: "25px", // Adjust banner height
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
        {/* Left Side - Logo (Appears Only After Scrolling) */}
        <motion.div
          className="w-32"
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

          {/* Menu Icon (Remains Visible) */}
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
          </motion.div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
