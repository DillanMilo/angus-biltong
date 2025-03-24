"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProducts } from "@/app/lib/bigcommerce";
import { X } from "lucide-react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const allProducts = await fetchProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    }

    if (isOpen) {
      loadProducts();
    }
  }, [isOpen]);

  useEffect(() => {
    const q = query.toLowerCase();
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(q)
    );
    setFiltered(results);
  }, [query, products]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white z-[100] p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Search Products</h2>
            <button onClick={onClose} aria-label="Close Search">
              <X size={24} />
            </button>
          </div>

          <input
            type="text"
            placeholder="Search for biltong, sausage, groceries..."
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded shadow-sm bg-[#f9f9f9]"
                >
                  <img
                    src={product.images?.[0]?.url_standard || ""}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded"
                  />
                  <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : query ? (
            <p className="text-gray-500">No products match your search.</p>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
