"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef } from "react";

// Dummy product placeholders
const featuredProducts = [
  { id: 1, name: "Product 1", price: "$19.99" },
  { id: 2, name: "Product 2", price: "$24.99" },
  { id: 3, name: "Product 3", price: "$29.99" },
  { id: 4, name: "Product 4", price: "$34.99" },
  { id: 5, name: "Product 5", price: "$39.99" },
];

const mostPopularProducts = [
  { id: 6, name: "Popular 1", price: "$14.99" },
  { id: 7, name: "Popular 2", price: "$18.99" },
  { id: 8, name: "Popular 3", price: "$22.99" },
  { id: 9, name: "Popular 4", price: "$26.99" },
  { id: 10, name: "Popular 5", price: "$30.99" },
];

const Featured: React.FC = () => {
  const [showBackArrow, setShowBackArrow] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollForward = () => {
    if (scrollIndex < featuredProducts.length - 2) {
      setScrollIndex((prev) => prev + 2);
      setShowBackArrow(true);
    }
  };

  const handleScrollBack = () => {
    if (scrollIndex > 0) {
      setScrollIndex((prev) => prev - 2);
    }
    if (scrollIndex <= 2) {
      setShowBackArrow(false);
    }
  };

  return (
    <motion.section
      id="featured"
      className="py-16 text-center relative bg-[#f4f8f1]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Featured Products Section */}
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Featured Products
        </h2>
        <div className="relative">
          <div
            ref={containerRef}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 overflow-hidden"
          >
            {featuredProducts
              .slice(
                scrollIndex,
                scrollIndex + (window.innerWidth < 768 ? 4 : 5)
              )
              .map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-4"
                >
                  <div className="w-full h-40 bg-gray-300 rounded-md flex items-center justify-center">
                    <span className="text-gray-600">Image Placeholder</span>
                  </div>
                  <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-500" />
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Scroll Right Arrow */}
          <button
            onClick={handleScrollForward}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
          >
            <ArrowRight size={30} className="text-gray-600" />
          </button>

          {/* Scroll Left Arrow (only shows after scrolling) */}
          {showBackArrow && (
            <button
              onClick={handleScrollBack}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
            >
              <ArrowLeft size={30} className="text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Most Popular Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12 relative">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Most Popular</h2>
        <div className="relative">
          <div
            ref={containerRef}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 overflow-hidden"
          >
            {mostPopularProducts
              .slice(
                scrollIndex,
                scrollIndex + (window.innerWidth < 768 ? 4 : 5)
              )
              .map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-4"
                >
                  <div className="w-full h-40 bg-gray-300 rounded-md flex items-center justify-center">
                    <span className="text-gray-600">Image Placeholder</span>
                  </div>
                  <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-500" />
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Scroll Right Arrow */}
          <button
            onClick={handleScrollForward}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
          >
            <ArrowRight size={30} className="text-gray-600" />
          </button>

          {/* Scroll Left Arrow (only shows after scrolling) */}
          {showBackArrow && (
            <button
              onClick={handleScrollBack}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
            >
              <ArrowLeft size={30} className="text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* 🛒 "Shop All" Button at the Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <button className="bg-[#4B7B3F] text-white text-lg font-semibold py-3 px-8 rounded-md shadow-lg hover:bg-[#3a612f] transition">
          Shop All
        </button>
      </motion.div>
    </motion.section>
  );
};

export default Featured;
