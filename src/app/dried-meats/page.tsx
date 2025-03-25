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

const DriedMeatsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const allProducts = await fetchProducts();
        console.log("All products:", allProducts);

        if (!allProducts || allProducts.length === 0) {
          console.log("No products returned from API");
          return;
        }

        // Log each product name to see what we're getting
        console.log(
          "All product names:",
          allProducts.map((p: Product) => p.name)
        );

        const driedMeats = allProducts.filter((product: Product) => {
          const name = product.name.toLowerCase();
          // Add more variations of product names (all in lowercase to match name)
          const keywords = [
            "biltong",
            "drywors",
            "droewors",
            "chili bites",
            "chilli bites",
            "snap sticks",
            "beef sticks",
            "stokkies",
          ];

          return keywords.some((keyword) =>
            name.includes(keyword.toLowerCase())
          );
        });

        console.log(
          "Found dried meat products:",
          driedMeats.map((p: Product) => p.name)
        );
        setProducts(driedMeats);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    }

    load();
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <NavMini />
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 capitalize text-center">
          Dried Meats ({products.length} items)
        </h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
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
              <p className="text-gray-600">
                ${Number(product.price).toFixed(2)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default DriedMeatsPage;
