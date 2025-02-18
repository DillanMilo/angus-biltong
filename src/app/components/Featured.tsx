"use client"; // Needed for animations in Next.js

import { motion } from "framer-motion";
import { Star, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

// Dummy product placeholders
const featuredProducts = [
  { id: 1, name: "Product 1", price: "$19.99", image: "/placeholder.png" },
  { id: 2, name: "Product 2", price: "$24.99", image: "/placeholder.png" },
  { id: 3, name: "Product 3", price: "$29.99", image: "/placeholder.png" },
  { id: 4, name: "Product 4", price: "$34.99", image: "/placeholder.png" },
  { id: 5, name: "Product 5", price: "$39.99", image: "/placeholder.png" },
];

const mostPopularProducts = [
  { id: 6, name: "Popular 1", price: "$14.99", image: "/placeholder.png" },
  { id: 7, name: "Popular 2", price: "$18.99", image: "/placeholder.png" },
  { id: 8, name: "Popular 3", price: "$22.99", image: "/placeholder.png" },
  { id: 9, name: "Popular 4", price: "$26.99", image: "/placeholder.png" },
  { id: 10, name: "Popular 5", price: "$30.99", image: "/placeholder.png" },
];

const Featured: React.FC = () => {
  const [showBackArrow, setShowBackArrow] = useState(false); // Controls left arrow

  // Placeholder function for scrolling logic
  const handleScrollForward = () => {
    setShowBackArrow(true); // When scrolled, show back arrow
    console.log("Scroll Forward Clicked!");
  };

  const handleScrollBack = () => {
    setShowBackArrow(false); // Hide back arrow when back to start
    console.log("Scroll Back Clicked!");
  };

  return (
    <motion.section
      className="py-16 text-center relative bg-[#f4f8f1]" // Added background color here
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
          <div className="grid grid-cols-5 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-4"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
                {/* Star Rating */}
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-500" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Left Arrow (Appears Only When Scrolled) */}
          {showBackArrow && (
            <button
              onClick={handleScrollBack}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
            >
              <ArrowLeft size={30} className="text-gray-600" />
            </button>
          )}

          {/* Scroll Right Arrow */}
          <button
            onClick={handleScrollForward}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
          >
            <ArrowRight size={30} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Most Popular Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12 relative">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Most Popular</h2>
        <div className="relative">
          <div className="grid grid-cols-5 gap-6">
            {mostPopularProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-4"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
                {/* Star Rating */}
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-500" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Left Arrow (Appears Only When Scrolled) */}
          {showBackArrow && (
            <button
              onClick={handleScrollBack}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
            >
              <ArrowLeft size={30} className="text-gray-600" />
            </button>
          )}

          {/* Scroll Right Arrow */}
          <button
            onClick={handleScrollForward}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
          >
            <ArrowRight size={30} className="text-gray-600" />
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default Featured;
