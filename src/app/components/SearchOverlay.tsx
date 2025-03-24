"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../cart/cartContext";
import Link from "next/link";
import Image from "next/image";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { products } = useCart();
  const [filteredProducts, setFilteredProducts] = useState(products || []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const filtered = products?.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered || []);
  }, [searchQuery, products]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 p-4 overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto">
            {/* Search Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Search Products</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Start typing to search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 border-b-2 border-gray-200 focus:border-black outline-none text-xl bg-transparent"
                autoFocus
              />
            </div>

            {/* Search Results */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-8"
            >
              {searchQuery && (
                <p className="text-gray-500 mb-4">
                  {filteredProducts.length} results found
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    href={`/product/${product.id}`}
                    key={product.id}
                    className="group"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="relative w-16 h-16 overflow-hidden rounded">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 64px) 100vw, 64px"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-black/70 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.category && (
                          <span className="text-xs text-gray-500 capitalize">
                            {product.category.replace("-", " ")}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
