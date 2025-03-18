"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProducts } from "@/app/lib/bigcommerce";
import { ChevronDown } from "lucide-react";

// Define interface for product type
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("featured");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  // Close dropdown when clicking outside
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

  // Sorting Function
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

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6 relative">
        <h2 className="text-3xl font-bold text-gray-900">All Products</h2>

        {/* Sorting Dropdown */}
        <div className="relative z-50" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="bg-white border border-gray-300 rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-50 focus:outline-none"
          >
            <span>
              Sort by:{" "}
              {sortOptions.find((opt) => opt.value === sortOption)?.label}
            </span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
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
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortOption(option.value);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                      sortOption === option.value ? "bg-gray-100" : ""
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

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}
      >
        {sortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: index * 0.2 },
              },
            }}
            className="bg-white rounded-lg shadow-lg p-4"
          >
            <img
              src={product.images?.[0]?.url_standard || ""}
              alt={product.name}
              className="h-40 w-full object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
            <p className="text-gray-600">${Number(product.price).toFixed(2)}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AllProducts;
