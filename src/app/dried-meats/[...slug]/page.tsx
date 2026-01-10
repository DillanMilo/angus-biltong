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

interface Product {
    id: number;
    name: string;
    price: number;
    images?: {
        url_standard: string;
    }[];
}

// Map URL slugs to filter keywords and display titles
const categoryConfig: Record<string, { title: string; keywords: string[] }> = {
    // Biltong categories
    "biltong": { title: "All Biltong", keywords: ["biltong"] },
    "biltong/traditional/lean": { title: "Lean Traditional Biltong", keywords: ["biltong", "lean"] },
    "biltong/traditional/normal": { title: "Traditional Biltong", keywords: ["biltong", "traditional"] },
    "biltong/traditional/more-dry": { title: "More Dry Traditional Biltong", keywords: ["biltong", "more dry", "dry"] },
    "biltong/traditional/lean-more-dry": { title: "Lean More Dry Biltong", keywords: ["biltong", "lean", "dry"] },
    "biltong/flavored/bbq": { title: "BBQ Biltong", keywords: ["biltong", "bbq"] },
    "biltong/flavored/chutney": { title: "Chutney Biltong", keywords: ["biltong", "chutney"] },
    "biltong/flavored/mango-habanero": { title: "Mango Habanero Biltong", keywords: ["biltong", "mango", "habanero"] },

    // Chilli Bites categories
    "chilli-bites": { title: "All Chilli Bites", keywords: ["chilli", "chili", "bites"] },
    "chilli-bites/inferno": { title: "Inferno Chilli Bites", keywords: ["chilli", "chili", "bites", "inferno"] },
    "chilli-bites/mango-habanero": { title: "Mango Habanero Chilli Bites", keywords: ["chilli", "chili", "bites", "mango", "habanero"] },
    "chilli-bites/mild": { title: "Mild Chilli Bites", keywords: ["chilli", "chili", "bites", "mild"] },
    "chilli-bites/spicy": { title: "Spicy Chilli Bites", keywords: ["chilli", "chili", "bites", "spicy"] },
    "chilli-bites/teriyaki": { title: "Teriyaki Chilli Bites", keywords: ["chilli", "chili", "bites", "teriyaki"] },

    // Droewors categories
    "droewors": { title: "All Droewors", keywords: ["droewors", "drywors"] },
    "droewors/more-dry": { title: "More Dry Droewors", keywords: ["droewors", "drywors", "dry"] },
    "droewors/regular": { title: "Regular Droewors", keywords: ["droewors", "drywors", "regular"] },
    "droewors/peri-peri": { title: "Peri Peri Droewors", keywords: ["droewors", "drywors", "peri"] },
};

// Breadcrumb helper
function generateBreadcrumbs(slug: string[]): { label: string; href: string }[] {
    const breadcrumbs: { label: string; href: string }[] = [
        { label: "Home", href: "/" },
        { label: "Dried Meats", href: "/dried-meats" },
    ];

    let path = "";
    for (let i = 0; i < slug.length; i++) {
        path += (i === 0 ? "" : "/") + slug[i];
        const config = categoryConfig[path];
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

    const config = categoryConfig[slugPath] || { title: "Products", keywords: [] };
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

                // Filter products based on keywords
                const keywords = config.keywords;
                const filteredProducts = allProducts.filter((product: Product) => {
                    const name = product.name.toLowerCase();

                    // For "All" categories, just check the main keyword
                    if (keywords.length === 1) {
                        return name.includes(keywords[0].toLowerCase());
                    }

                    // For specific flavors/types, check that all keywords are present
                    // The first keyword is the category (biltong, chilli, droewors)
                    const categoryMatch = name.includes(keywords[0].toLowerCase()) ||
                        (keywords[1] && name.includes(keywords[1].toLowerCase()));

                    // Check for specific flavor/type (keywords after the first two)
                    const specificKeywords = keywords.slice(keywords.length > 2 ? 2 : 1);
                    const specificMatch = specificKeywords.some(keyword =>
                        name.includes(keyword.toLowerCase())
                    );

                    return categoryMatch && specificMatch;
                });

                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error loading products:", error);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        }

        if (slugPath && categoryConfig[slugPath]) {
            load();
        } else {
            setError("Category not found");
            setLoading(false);
        }
    }, [slugPath, config.keywords]);

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
            <section className="relative h-[30vh] min-h-[240px] overflow-hidden mt-24 sm:mt-28">
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
