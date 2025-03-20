"use client";

import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { fetchProducts } from "@/app/lib/bigcommerce";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/cart/cartContext";

// Define product type for the UI
interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl?: string;
  raw_price: number;
}

// Add type for the BigCommerce API response
interface BigCommerceProduct {
  id: number;
  name: string;
  price: number;
  images?: Array<{ url_standard: string }>;
}

const Featured: React.FC = () => {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [mostPopularProducts, setMostPopularProducts] = useState<Product[]>([]);
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());

  // Refs for scroll containers
  const featuredRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);

  // Add this near the top of the component with other hooks
  const router = useRouter();

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

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.raw_price,
      imageUrl: product.imageUrl || "",
      quantity: 1,
    });

    // Show "Added to cart" temporarily
    setAddedProducts((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedProducts((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        const bcProducts = await fetchProducts();
        if (bcProducts && bcProducts.length > 0) {
          setFeaturedProducts(
            bcProducts.slice(0, 10).map((product: BigCommerceProduct) => ({
              id: product.id,
              name: product.name,
              price: `$${Number(product.price).toFixed(2)}`,
              raw_price: Number(product.price),
              imageUrl: product?.images?.[0]?.url_standard || "",
            }))
          );
          setMostPopularProducts(
            bcProducts.slice(10, 20).map((product: BigCommerceProduct) => ({
              id: product.id,
              name: product.name,
              price: `$${Number(product.price).toFixed(2)}`,
              raw_price: Number(product.price),
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
              viewport={{ once: true }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  whileHover="hover"
                  variants={{
                    hover: {
                      scale: 1.05,
                      transition: { duration: 0.2 },
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

                  <div className="mt-3 space-y-2">
                    <h3 className="text-sm sm:text-lg font-semibold line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {product.price}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 
                        ${
                          addedProducts.has(product.id)
                            ? "bg-gray-600 hover:bg-gray-700"
                            : "bg-green-600 hover:bg-green-700"
                        } text-white`}
                      disabled={addedProducts.has(product.id)}
                    >
                      {addedProducts.has(product.id) ? (
                        "Added to Cart!"
                      ) : (
                        <>
                          <ShoppingCart size={18} />
                          Add to Cart
                        </>
                      )}
                    </button>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          strokeWidth={2}
                          className="text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
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
              viewport={{ once: true }}
            >
              {mostPopularProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  whileHover="hover"
                  variants={{
                    hover: {
                      scale: 1.05,
                      transition: { duration: 0.2 },
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

                  <div className="mt-3 space-y-2">
                    <h3 className="text-sm sm:text-lg font-semibold line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {product.price}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 
                        ${
                          addedProducts.has(product.id)
                            ? "bg-gray-600 hover:bg-gray-700"
                            : "bg-green-600 hover:bg-green-700"
                        } text-white`}
                      disabled={addedProducts.has(product.id)}
                    >
                      {addedProducts.has(product.id) ? (
                        "Added to Cart!"
                      ) : (
                        <>
                          <ShoppingCart size={18} />
                          Add to Cart
                        </>
                      )}
                    </button>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          strokeWidth={2}
                          className="text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
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
        <button
          className="bg-[#4B7B3F] text-white text-lg font-semibold py-3 px-8 rounded-md shadow-lg hover:bg-[#3a612f] transition"
          onClick={() => router.push("/products")}
        >
          Shop All
        </button>
      </motion.div>
    </motion.section>
  );
};

export default Featured;
