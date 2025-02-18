"use client"; // Needed for animations in Next.js

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

// Dummy products
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
  return (
    <section className="py-16 bg-white text-center">
      {/* Featured Products Section */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Featured Products
        </h2>
        <div className="relative">
          <div className="grid grid-cols-5 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: "easeOut",
                }}
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
          {/* Right Arrow Button (For Scrolling Later) */}
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full">
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Most Popular Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Most Popular</h2>
        <div className="relative">
          <div className="grid grid-cols-5 gap-6">
            {mostPopularProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: "easeOut",
                }}
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
          {/* Right Arrow Button (For Scrolling Later) */}
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full">
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
