"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import React, { useState, useEffect } from "react";
import { fetchProducts } from "@/app/lib/bigcommerce";

// Define product type
interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl?: string;
}

const Featured: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [mostPopularProducts, setMostPopularProducts] = useState<Product[]>([]);
  const [currentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const bcProducts = await fetchProducts();
        if (bcProducts && bcProducts.length > 0) {
          // Divide products into "Featured" & "Most Popular" (first 5 for each)
          setFeaturedProducts(
            bcProducts.slice(0, 5).map((product: any) => ({
              id: product.id,
              name: product.name,
              price: `$${Number(product.price).toFixed(2)}`,
              imageUrl: product?.images?.[0]?.url_standard || "",
            }))
          );
          setMostPopularProducts(
            bcProducts.slice(5, 10).map((product: any) => ({
              id: product.id,
              name: product.name,
              price: `$${Number(product.price).toFixed(2)}`,
              imageUrl: product?.images?.[0]?.url_standard || "",
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    loadProducts();
  }, []);

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
            {featuredProducts.map((product, index) => (
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
                {/* Product Image */}
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
            transition={{ staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {mostPopularProducts.map((product, index) => (
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
                {/* Product Image */}
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
        </div>
      </div>

      {/* 🛒 "Shop All" Button */}
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
