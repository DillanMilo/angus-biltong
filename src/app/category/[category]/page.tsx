"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProducts } from "@/app/lib/bigcommerce";
import { motion } from "framer-motion";

const Page = () => {
  const params = useParams();
  const category =
    typeof params.category === "string"
      ? params.category
      : params.category?.[0];
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const allProducts = await fetchProducts();

      const filtered = allProducts.filter((product: any) => {
        const name = product.name.toLowerCase();
        if (category === "dried-meats") return name.includes("biltong");
        if (category === "sausage") return name.includes("boerewors");
        if (category === "groceries")
          return !name.includes("boerewors") && !name.includes("biltong");
        return false;
      });

      setFilteredProducts(filtered);
    }

    load();
  }, [category]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 capitalize text-center">
        {category?.replace("-", " ")}
      </h2>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}
      >
        {filteredProducts.map((product, index) => (
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

export default Page;
