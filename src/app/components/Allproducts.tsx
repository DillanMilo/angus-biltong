"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProducts } from "@/app/lib/bigcommerce";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/app/cart/cartContext";
import { ShoppingCart } from "lucide-react";

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

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.images?.[0]?.url_standard || "",
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

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 capitalize text-center playfair">
        All Products ({products.length} items)
      </h2>
      <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 relative">
        <div
          className="relative z-50 w-[160px] sm:w-auto self-center sm:self-auto"
          ref={dropdownRef}
        >
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-full sm:w-auto bg-white border border-gray-300 rounded px-2.5 sm:px-4 py-2 flex items-center justify-between sm:justify-start gap-2 hover:bg-gray-50 focus:outline-none text-xs sm:text-base"
          >
            <span className="truncate">
              Sort by:{" "}
              {sortOptions.find((opt) => opt.value === sortOption)?.label}
            </span>
            <ChevronDown
              className={`w-3 h-3 sm:w-5 sm:h-5 transition-transform duration-200 flex-shrink-0 ${
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
                className="absolute right-0 mt-2 w-[200px] sm:w-56 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortOption(option.value);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-100 transition-colors text-sm sm:text-base ${
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
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
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
                transition: { duration: 0.6, delay: index * 0.1 },
              },
            }}
            className="bg-white rounded-lg shadow-lg p-3 sm:p-4"
          >
            <div className="relative pt-[100%]">
              <Image
                src={product.images?.[0]?.url_standard || ""}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover rounded-md"
                priority={index < 4}
              />
            </div>
            <div className="mt-3 space-y-2">
              <h3 className="text-sm sm:text-lg font-semibold line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                ${Number(product.price).toFixed(2)}
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
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AllProducts;
