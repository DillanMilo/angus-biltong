"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/lib/bigcommerce";
import { motion } from "framer-motion";
import NavMini from "@/app/components/NavMini";

interface Product {
  id: number;
  name: string;
  price: number;
  images?: {
    url_standard: string;
  }[];
}

const SausagePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();

        if (!allProducts || !Array.isArray(allProducts)) {
          console.error(
            "Products data is not in expected format:",
            allProducts
          );
          setError("Failed to load products");
          return;
        }

        const sausages = allProducts.filter((product: Product) => {
          const name = product.name.toLowerCase();
          const keywords = ["sausage", "boerewors"];

          if (
            keywords.some((keyword) => name.includes(keyword.toLowerCase()))
          ) {
            console.log("Found sausage product:", product.name);
          }

          return keywords.some((keyword) =>
            name.includes(keyword.toLowerCase())
          );
        });

        console.log("All products:", allProducts);
        console.log("Filtered sausages:", sausages);
        setProducts(sausages);
      } catch (error) {
        console.error("Error loading products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <NavMini />
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20">
        <NavMini />
        <div className="max-w-6xl mx-auto px-4 py-12 text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <NavMini />
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 capitalize text-center">
          Sausages ({products.length} items)
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found</p>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  },
                }}
                className="bg-white rounded-lg shadow-lg p-4"
              >
                {product.images?.[0]?.url_standard ? (
                  <img
                    src={product.images[0].url_standard}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded-md"
                  />
                ) : (
                  <div className="h-40 w-full bg-gray-200 rounded-md flex items-center justify-center">
                    No image
                  </div>
                )}
                <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                <p className="text-gray-600">
                  ${Number(product.price).toFixed(2)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default SausagePage;
