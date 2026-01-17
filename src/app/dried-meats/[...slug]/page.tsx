"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProducts } from "@/app/lib/bigcommerce";
import { motion } from "framer-motion";
import NavMini from "@/app/components/NavMini";
import Footer from "@/app/components/Footer";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/cart/cartContext";
import Image from "next/image";
import Link from "next/link";
import { productCategories } from "@/app/config/productCategories";

interface Product {
    id: number;
    name: string;
    price: number;
    images?: {
        url_standard: string;
    }[];
}

// Breadcrumb helper
function generateBreadcrumbs(slug: string[]): { label: string; href: string }[] {
    const breadcrumbs: { label: string; href: string }[] = [
        { label: "Home", href: "/" },
        { label: "Dried Meats", href: "/dried-meats" },
    ];

    let path = "";
    for (let i = 0; i < slug.length; i++) {
        path += (i === 0 ? "" : "/") + slug[i];
        const config = productCategories[path];
        if (config) {
            breadcrumbs.push({
                label: i === slug.length - 1 ? config.title : slug[i].charAt(0).toUpperCase() + slug[i].slice(1).replace(/-/g, " "),
                href: `/dried-meats/${path}`,
            });
        }
    }

    return breadcrumbs;
}

const FilteredProductsPage = () => {
    const params = useParams();
    const slug = params.slug as string[];
    const slugPath = slug?.join("/") || "";

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
    const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());

    const config = productCategories[slugPath] || { title: "Products", productIds: [] };
    const breadcrumbs = generateBreadcrumbs(slug || []);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const allProducts = await fetchProducts();

                if (!allProducts || !Array.isArray(allProducts)) {
                    console.error("Products data is not in expected format:", allProducts);
                    setError("Failed to load products");
                    return;
                }

                // Filter products based on product IDs
                const productIds = config.productIds;
                const filteredProducts = allProducts.filter((product: Product) =>
                    productIds.includes(product.id)
                );

                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error loading products:", error);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        }

        if (slugPath && productCategories[slugPath]) {
            load();
        } else {
            setError("Category not found");
            setLoading(false);
        }
    }, [slugPath, config.productIds]);

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
                    <Link href="/dried-meats" className="mt-4 inline-block text-[#C25A3E] hover:underline font-condensed uppercase tracking-wider">
                        ← Back to Dried Meats
                    </Link>
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
                    alt={config.title}
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
                        <h1 className="heading-xl text-white mb-2">{config.title}</h1>
                        <p className="font-condensed text-white/80 tracking-wider">{products.length} items</p>
                        <div className="w-24 h-1 bg-amber mx-auto mt-4" />
                    </motion.div>
                </div>
            </section>

            {/* Breadcrumbs */}
            <div className="max-w-6xl mx-auto px-4 pt-6">
                <nav className="flex items-center gap-2 text-sm font-condensed text-espresso/60 flex-wrap">
                    {breadcrumbs.map((crumb, index) => (
                        <span key={crumb.href} className="flex items-center gap-2">
                            {index > 0 && <span>/</span>}
                            {index === breadcrumbs.length - 1 ? (
                                <span className="text-espresso">{crumb.label}</span>
                            ) : (
                                <Link href={crumb.href} className="hover:text-[#C25A3E] transition-colors">
                                    {crumb.label}
                                </Link>
                            )}
                        </span>
                    ))}
                </nav>
            </div>

            <section className="max-w-6xl mx-auto px-4 py-8">
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="font-body text-espresso/70 mb-4">No products found in this category.</p>
                        <Link href="/dried-meats" className="text-[#C25A3E] hover:underline font-condensed uppercase tracking-wider">
                            ← Browse All Dried Meats
                        </Link>
                    </div>
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
                                className="card-product bg-cream p-3 md:p-4"
                            >
                                {product.images?.[0]?.url_standard ? (
                                    <div className="relative pt-[85%] md:pt-[75%] lg:pt-[70%] mb-3">
                                        <Image
                                            src={product.images[0].url_standard}
                                            alt={product.name}
                                            fill
                                            className="object-cover absolute inset-0"
                                            sizes="(max-width: 640px) 50vw, 25vw"
                                        />
                                    </div>
                                ) : (
                                    <div className="pt-[85%] md:pt-[75%] lg:pt-[70%] relative bg-sand flex items-center justify-center mb-3">
                                        <span className="absolute inset-0 flex items-center justify-center font-body text-espresso/40">No image</span>
                                    </div>
                                )}
                                <div className="space-y-1.5">
                                    <h3 className="font-display text-sm md:text-base text-espresso line-clamp-2 min-h-[2rem] md:min-h-[2.25rem]">{product.name}</h3>
                                    <p className="font-body text-terracotta font-semibold text-sm md:text-base">
                                        ${Number(product.price).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className={`w-full py-1.5 px-3 md:py-2 md:px-4 rounded-full transition-all flex items-center justify-center gap-1.5 font-condensed uppercase tracking-wider text-xs md:text-sm
                      ${addedProducts.has(product.id)
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

export default FilteredProductsPage;
