"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchProducts } from "@/app/lib/bigcommerce";

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
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("featured");

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

  // Sorting Function
  const sortProducts = (productsList: any[]) => {
    switch (sortOption) {
      case "a-z":
        return [...productsList].sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":
        return [...productsList].sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return [...productsList].sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
      case "price-desc":
        return [...productsList].sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
      default:
        return productsList;
    }
  };

  const sortedProducts = sortProducts(products);

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
        {/* Sorting Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
