"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProducts } from "@/app/lib/bigcommerce";
import { ChevronDown, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/app/cart/cartContext";
import Footer from "@/app/components/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  images?: Array<{ url_standard: string }>;
  date_created?: string;
  rating?: number;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best Selling" },
  { value: "a-z", label: "A - Z" },
  { value: "z-a", label: "Z - A" },
  { value: "review", label: "By Review" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const AllProducts = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("featured");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function loadProducts() {
      try {
        const bcProducts = await fetchProducts();
        setProducts(bcProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortProducts = (productsList: Product[]) => {
    switch (sortOption) {
      case "a-z":
        return [...productsList].sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":
        return [...productsList].sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return [...productsList].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...productsList].sort((a, b) => b.price - a.price);
      default:
        return productsList;
    }
  };

  const sortedProducts = sortProducts(products);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.images?.[0]?.url_standard || "",
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

  if (loading) {
    return (
      <div className="min-h-screen bg-sand">
        <div className="max-w-6xl mx-auto px-4 py-12 pt-32 text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-terracotta/20 rounded-full mx-auto mb-4"></div>
            <p className="font-body text-espresso/70">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[240px] overflow-hidden mt-32 sm:mt-36">
        <Image
          src="/image-5.jpg"
          alt="All Products"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C2420]/60 via-[#2C2420]/40 to-[#C25A3E]/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="heading-xl text-white mb-2">All Products</h1>
            <p className="font-condensed text-white/80 tracking-wider">{products.length} items</p>
            <div className="w-24 h-1 bg-amber mx-auto mt-4" />
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Sort Dropdown */}
        <div className="flex justify-end mb-8">
          <div className="relative z-30" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="bg-cream border border-espresso/10 px-4 py-2 flex items-center gap-2 hover:bg-sand transition-colors font-condensed uppercase tracking-wider text-sm text-espresso"
            >
              <span>
                Sort: {sortOptions.find((opt) => opt.value === sortOption)?.label}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-cream border border-espresso/10 shadow-lg overflow-hidden"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortOption(option.value);
                        setDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-sand transition-colors font-body text-sm text-espresso/80 ${
                        sortOption === option.value ? "bg-sand text-espresso" : ""
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.05 }}
          viewport={{ once: true }}
        >
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, delay: index * 0.03 },
                },
              }}
              className="card-product bg-cream p-3 md:p-4"
            >
              <div className="relative pt-[85%] md:pt-[75%] lg:pt-[70%] mb-3">
                <Image
                  src={product.images?.[0]?.url_standard || ""}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover absolute inset-0"
                  priority={index < 4}
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display text-sm md:text-base text-espresso line-clamp-2 min-h-[2rem] md:min-h-[2.25rem]">
                  {product.name}
                </h3>
                <p className="font-body text-terracotta font-semibold text-sm md:text-base">
                  ${Number(product.price).toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-1.5 px-3 md:py-2 md:px-4 rounded-full transition-all flex items-center justify-center gap-1.5 font-condensed uppercase tracking-wider text-xs md:text-sm
                    ${
                      addedProducts.has(product.id)
                        ? "bg-olive text-white"
                        : "btn-primary"
                    }`}
                  disabled={addedProducts.has(product.id)}
                >
                  {addedProducts.has(product.id) ? (
                    "Added!"
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default AllProducts;
