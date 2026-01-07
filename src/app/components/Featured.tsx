"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, Check } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { fetchProducts } from "@/app/lib/bigcommerce";
import { useCart } from "@/app/cart/cartContext";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl?: string;
  raw_price: number;
}

interface BigCommerceProduct {
  id: number;
  name: string;
  price: number;
  images?: Array<{ url_standard: string }>;
}

const ProductCard: React.FC<{
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  isAdded: boolean;
  isMobileGrid?: boolean;
}> = ({ product, index, onAddToCart, isAdded, isMobileGrid = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true }}
      className={`card-product rounded-none group ${
        isMobileGrid 
          ? "w-[160px] flex-shrink-0" 
          : "w-[260px] md:w-[280px] flex-shrink-0"
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden bg-[#EDE5D4] ${isMobileGrid ? "aspect-square" : "aspect-[4/5]"}`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#2C2420]/30 font-condensed text-sm uppercase tracking-wider">
            No Image
          </div>
        )}

        {/* Quick Add Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-[#2C2420]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button
            onClick={() => onAddToCart(product)}
            disabled={isAdded}
            className={`font-condensed tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
              isMobileGrid ? "px-3 py-2 text-xs" : "px-6 py-3 text-sm"
            } ${
              isAdded
                ? "bg-[#3D4A3A] text-white"
                : "bg-[#F8F3E8] text-[#2C2420] hover:bg-[#D4A853] hover:text-white"
            }`}
          >
            {isAdded ? (
              <>
                <Check size={isMobileGrid ? 12 : 16} />
                Added
              </>
            ) : (
              <>
                <ShoppingCart size={isMobileGrid ? 12 : 16} />
                Quick Add
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className={isMobileGrid ? "p-3 space-y-1.5" : "p-5 space-y-3"}>
        <h3 className={`font-body text-[#2C2420] font-semibold leading-tight line-clamp-2 ${
          isMobileGrid ? "text-sm min-h-[2rem]" : "text-base min-h-[2.5rem]"
        }`}>
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <p className={`font-display text-[#C25A3E] ${isMobileGrid ? "text-lg" : "text-2xl"}`}>
            {product.price}
          </p>

          {/* Star Rating - Hide on mobile grid for space */}
          {!isMobileGrid && (
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-[#D4A853] fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Featured: React.FC = () => {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [mostPopularProducts, setMostPopularProducts] = useState<Product[]>([]);
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());

  const featuredRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);

  const scroll = (
    direction: "left" | "right",
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
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
    <section id="featured" className="py-24 relative bg-[#F8F3E8]">
      {/* Subtle Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2C2420 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative">
        {/* Featured Products Section */}
        <div className="mb-20">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto px-6 mb-10"
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="font-condensed text-[#C25A3E] text-sm tracking-[0.2em] uppercase mb-3">
                  Handcrafted Selection
                </p>
                <h2 className="heading-xl text-[#2C2420]">Featured Products</h2>
              </div>

              {/* Navigation Arrows */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => scroll("left", featuredRef)}
                  className="w-12 h-12 rounded-full border-2 border-[#2C2420] flex items-center justify-center text-[#2C2420] hover:bg-[#2C2420] hover:text-[#F8F3E8] transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll("right", featuredRef)}
                  className="w-12 h-12 rounded-full border-2 border-[#2C2420] flex items-center justify-center text-[#2C2420] hover:bg-[#2C2420] hover:text-[#F8F3E8] transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Decorative Line */}
            <div className="mt-6 flex items-center gap-4">
              <div className="h-px bg-[#C25A3E] w-20" />
              <div className="h-px bg-[#D4A853] w-10" />
              <div className="h-px bg-[#3D4A3A] w-5" />
            </div>
          </motion.div>

          {/* Mobile Carousel - 2 rows */}
          <div className="md:hidden overflow-x-auto scrollbar-hide pl-4">
            <div className="grid grid-rows-2 grid-flow-col gap-3 pb-4 pr-4">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={handleAddToCart}
                  isAdded={addedProducts.has(product.id)}
                  isMobileGrid={true}
                />
              ))}
            </div>
          </div>

          {/* Desktop Carousel */}
          <div
            ref={featuredRef}
            className="hidden md:block overflow-x-auto scrollbar-hide pl-6 md:pl-[calc((100vw-72rem)/2+1.5rem)]"
          >
            <div className="flex gap-6 pb-4 pr-6">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={handleAddToCart}
                  isAdded={addedProducts.has(product.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Divider with African Pattern */}
        <div className="max-w-4xl mx-auto px-6 mb-20">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4A853]/50 to-transparent flex-1" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#C25A3E] rotate-45" />
              <div className="w-4 h-4 border-2 border-[#D4A853] rotate-45" />
              <div className="w-3 h-3 bg-[#3D4A3A] rotate-45" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4A853]/50 to-transparent flex-1" />
          </div>
        </div>

        {/* Most Popular Section */}
        <div className="mb-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto px-6 mb-10"
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="font-condensed text-[#3D4A3A] text-sm tracking-[0.2em] uppercase mb-3">
                  Customer Favorites
                </p>
                <h2 className="heading-xl text-[#2C2420]">Most Popular</h2>
              </div>

              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => scroll("left", popularRef)}
                  className="w-12 h-12 rounded-full border-2 border-[#2C2420] flex items-center justify-center text-[#2C2420] hover:bg-[#2C2420] hover:text-[#F8F3E8] transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll("right", popularRef)}
                  className="w-12 h-12 rounded-full border-2 border-[#2C2420] flex items-center justify-center text-[#2C2420] hover:bg-[#2C2420] hover:text-[#F8F3E8] transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px bg-[#3D4A3A] w-20" />
              <div className="h-px bg-[#D4A853] w-10" />
              <div className="h-px bg-[#C25A3E] w-5" />
            </div>
          </motion.div>

          {/* Mobile Carousel - 2 rows */}
          <div className="md:hidden overflow-x-auto scrollbar-hide pl-4">
            <div className="grid grid-rows-2 grid-flow-col gap-3 pb-4 pr-4">
              {mostPopularProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={handleAddToCart}
                  isAdded={addedProducts.has(product.id)}
                  isMobileGrid={true}
                />
              ))}
            </div>
          </div>

          {/* Desktop Carousel */}
          <div
            ref={popularRef}
            className="hidden md:block overflow-x-auto scrollbar-hide pl-6 md:pl-[calc((100vw-72rem)/2+1.5rem)]"
          >
            <div className="flex gap-6 pb-4 pr-6">
              {mostPopularProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={handleAddToCart}
                  isAdded={addedProducts.has(product.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Shop All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/products">
            <button className="btn-primary text-lg px-12 py-4">
              View All Products
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Featured;
