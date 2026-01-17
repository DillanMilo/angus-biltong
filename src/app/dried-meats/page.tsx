"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/lib/bigcommerce";
import { motion } from "framer-motion";
import NavMini from "@/app/components/NavMini";
import Footer from "@/app/components/Footer";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/cart/cartContext";
import Image from "next/image";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());

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

        const driedMeats = allProducts.filter((product: Product) => {
          const name = product.name.toLowerCase();
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

        setProducts(driedMeats);
      } catch (error) {
        console.error("Error loading products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

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
        <NavMini />
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

  if (error) {
    return (
      <div className="min-h-screen bg-sand">
        <NavMini />
        <div className="max-w-6xl mx-auto px-4 py-12 pt-32 text-center">
          <p className="font-body text-terracotta">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand">
      <NavMini />

      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[240px] overflow-hidden mt-32 sm:mt-36">
        <Image
          src="/image-5.jpg"
          alt="Dried Meats - Biltong & Droewors"
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
            <h1 className="heading-xl text-white mb-2">Dried Meats</h1>
            <p className="font-condensed text-white/80 tracking-wider">{products.length} items</p>
            <div className="w-24 h-1 bg-amber mx-auto mt-4" />
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        {products.length === 0 ? (
          <p className="text-center font-body text-espresso/70">No products found</p>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
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
                    transition: { delay: index * 0.05 },
                  },
                }}
                className="card-product bg-cream p-4"
              >
                {product.images?.[0]?.url_standard ? (
                  <div className="relative pt-[100%] mb-4">
                    <Image
                      src={product.images[0].url_standard}
                      alt={product.name}
                      fill
                      className="object-cover absolute inset-0"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="pt-[100%] relative bg-sand flex items-center justify-center mb-4">
                    <span className="absolute inset-0 flex items-center justify-center font-body text-espresso/40">No image</span>
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="font-display text-sm md:text-base text-espresso line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                  <p className="font-body text-terracotta font-semibold">
                    ${Number(product.price).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-2 px-4 transition-all flex items-center justify-center gap-2 font-condensed uppercase tracking-wider text-sm
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
        )}
      </section>
      <Footer />
    </div>
  );
};

export default DriedMeatsPage;
