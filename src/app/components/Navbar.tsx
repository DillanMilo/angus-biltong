"use client"; // Needed for animations in Next.js

import { motion } from "framer-motion";
import { Search, User, Gift, ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 50 }} // Start off-screen to the right
      animate={{ opacity: 1, x: 0 }} // Move into place
      transition={{ delay: 1.5, duration: 2, ease: "easeOut" }} // Matches mission statement timing
      className="fixed top-5 right-10 flex items-center space-x-6 text-gray-800 z-10"
    >
      {/* Search Icon */}
      <Search
        size={30}
        className="cursor-pointer hover:text-[#47B6A5] transition-colors"
      />

      {/* Profile Icon */}
      <User
        size={30}
        className="cursor-pointer hover:text-[#47B6A5] transition-colors"
      />

      {/* Gift Box Icon */}
      <Gift
        size={30}
        className="cursor-pointer hover:text-[#47B6A5] transition-colors"
      />

      {/* Shopping Cart Icon */}
      <ShoppingCart
        size={30}
        className="cursor-pointer hover:text-[#47B6A5] transition-colors"
      />

      {/* Menu Icon (with dropdown) */}
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none"
        >
          <Menu
            size={28}
            className="cursor-pointer hover:text-[#C7E4DC] transition-colors"
          />
        </button>

        {/* Dropdown (Hidden by default) */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-md p-3"
          >
            <p className="text-gray-700">Menu Item 1</p>
            <p className="text-gray-700">Menu Item 2</p>
            <p className="text-gray-700">Menu Item 3</p>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
