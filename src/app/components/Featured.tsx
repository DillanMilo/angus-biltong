"use client";

import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  // Refs for scroll containers
  const featuredRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);

  // Function to handle scrolling
  const scroll = (
    direction: "left" | "right",
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const bcProducts = await fetchProducts();
        if (bcProducts && bcProducts.length > 0) {
          // Load all products instead of just 5
          setFeaturedProducts(
            bcProducts.slice(0, 10).map((product: any) => ({
              id: product.id,
              name: product.name,
              price: `$${Number(product.price).toFixed(2)}`,
              imageUrl: product?.images?.[0]?.url_standard || "",
            }))
          );
          setMostPopularProducts(
            bcProducts.slice(10, 20).map((product: any) => ({
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
        <div className="relative group">
          {/* Left scroll button */}
          <button
            onClick={() => scroll("left", featuredRef)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={featuredRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            <motion.div
              className="flex gap-6 min-w-max p-4"
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
                  className="bg-white rounded-lg shadow-lg p-4 w-[200px] flex-shrink-0"
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

          {/* Right scroll button */}
          <button
            onClick={() => scroll("right", featuredRef)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Most Popular Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12 relative">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 underline">
          Most Popular
        </h2>
        <div className="relative group">
          <button
            onClick={() => scroll("left", popularRef)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={popularRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            <motion.div
              className="flex gap-6 min-w-max p-4"
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
                  className="bg-white rounded-lg shadow-lg p-4 w-[200px] flex-shrink-0"
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

          <button
            onClick={() => scroll("right", popularRef)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
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
