"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import React, { useState, useEffect } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < (isMobile ? 1 : 1) ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6 underline">
          Featured Products
        </h2>
        <div className="relative">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.2 }} // ✅ Staggered animation
            viewport={{ once: true }}
          >
            {featuredProducts
              .slice(0, isMobile ? 4 : 5)
              .map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: index * 0.2 },
                    },
                  }}
                  className="bg-white rounded-lg shadow-lg p-4"
                >
                  {/* Placeholder for Image */}
                  <div className="w-full h-32 md:h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                    Image Placeholder
                  </div>

                  <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        strokeWidth={2}
                        className="text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Scroll Dots - Visible on ALL Screens */}
          <div className="flex justify-center mt-4">
            {[...Array(2)].map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 mx-1 rounded-full ${
                  currentIndex === i ? "bg-gray-900" : "bg-gray-400"
                } transition-colors duration-300`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Most Popular Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12 relative">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 underline">
          Most Popular
        </h2>
        <div className="relative">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.2 }} // ✅ Staggered animation
            viewport={{ once: true }}
          >
            {mostPopularProducts
              .slice(0, isMobile ? 4 : 5)
              .map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: index * 0.2 },
                    },
                  }}
                  className="bg-white rounded-lg shadow-lg p-4"
                >
                  {/* Placeholder for Image */}
                  <div className="w-full h-32 md:h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                    Image Placeholder
                  </div>

                  <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        strokeWidth={2}
                        className="text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Scroll Dots - Visible on ALL Screens */}
          <div className="flex justify-center mt-4">
            {[...Array(2)].map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 mx-1 rounded-full ${
                  currentIndex === i ? "bg-gray-900" : "bg-gray-400"
                } transition-colors duration-300`}
              />
            ))}
          </div>
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
