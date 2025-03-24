"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProducts } from "@/app/lib/bigcommerce";
import { X, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/cart/cartContext";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());

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

  const handleAddToCart = (product: any) => {
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
                  <p className="text-sm text-gray-600 mb-3">
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
