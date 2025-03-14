"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { fetchProducts } from "@/app/lib/bigcommerce";

// Define the product type
interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl?: string; // Optional in case images are not available
}

const Featured: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const bcProducts = await fetchProducts();
        if (bcProducts && bcProducts.length > 0) {
          setProducts(
            bcProducts.slice(0, 5).map((product: any) => ({
              id: product.id,
              name: product.name,
              price: `$${Number(product.price).toFixed(2)}`,
              imageUrl: product?.images?.[0]?.url_standard || "", // Use the first image or fallback
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    loadProducts();
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
            transition={{ staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {products.map((product, index) => (
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
                {/* Product Image or Placeholder */}
                <div className="w-full h-32 md:h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    "Image Placeholder"
                  )}
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

          {/* Scroll Dots */}
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
