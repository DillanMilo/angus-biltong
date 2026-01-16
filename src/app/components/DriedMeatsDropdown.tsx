"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";

interface MenuItem {
    label: string;
    href?: string;
    children?: MenuItem[];
}

const menuStructure: MenuItem[] = [
    {
        label: "Biltong",
        children: [
            { label: "All", href: "/dried-meats/biltong" },
            {
                label: "Traditional",
                children: [
                    { label: "Lean", href: "/dried-meats/biltong/traditional/lean" },
                    { label: "Normal", href: "/dried-meats/biltong/traditional/normal" },
                    { label: "More Dry", href: "/dried-meats/biltong/traditional/more-dry" },
                    { label: "Lean/More Dry", href: "/dried-meats/biltong/traditional/lean-more-dry" },
                ],
            },
            {
                label: "Flavored",
                children: [
                    { label: "Chutney", href: "/dried-meats/biltong/flavored/chutney" },
                    { label: "Peri Peri", href: "/dried-meats/biltong/flavored/peri-peri" },
                ],
            },
        ],
    },
    {
        label: "Chilli Bites",
        children: [
            { label: "All", href: "/dried-meats/chilli-bites" },
            {
                label: "Flavors",
                children: [
                    { label: "Inferno", href: "/dried-meats/chilli-bites/inferno" },
                    { label: "Mango Habanero", href: "/dried-meats/chilli-bites/mango-habanero" },
                    { label: "Mild", href: "/dried-meats/chilli-bites/mild" },
                    { label: "Spicy", href: "/dried-meats/chilli-bites/spicy" },
                ],
            },
        ],
    },
    {
        label: "Droewors",
        children: [
            { label: "All", href: "/dried-meats/droewors" },
            {
                label: "Flavors",
                children: [
                    { label: "More Dry", href: "/dried-meats/droewors/more-dry" },
                    { label: "Regular", href: "/dried-meats/droewors/regular" },
                    { label: "Peri Peri", href: "/dried-meats/droewors/peri-peri" },
                ],
            },
        ],
    },
];

interface SubMenuProps {
    items: MenuItem[];
    onNavigate: () => void;
    level?: number;
    isMobile?: boolean;
}

const SubMenu: React.FC<SubMenuProps> = ({ items, onNavigate, level = 0, isMobile = false }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (isMobile) {
        return (
            <div className="pl-4 border-l border-[#D4A853]/30">
                {items.map((item, index) => (
                    <div key={item.label}>
                        {item.href ? (
                            <Link
                                href={item.href}
                                onClick={onNavigate}
                                className="block py-2 font-condensed text-base text-[#F8F3E8]/80 hover:text-[#D4A853] transition-colors uppercase tracking-wider"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <>
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="flex items-center justify-between w-full py-2 font-condensed text-base text-[#F8F3E8]/80 hover:text-[#D4A853] transition-colors uppercase tracking-wider"
                                >
                                    {item.label}
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && item.children && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <SubMenu items={item.children} onNavigate={onNavigate} level={level + 1} isMobile />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    // Desktop submenu
    return (
        <div className={`${level === 0 ? "" : "absolute left-full top-0"} min-w-[180px]`}>
            {items.map((item, index) => (
                <div
                    key={item.label}
                    className="relative group/sub"
                    onMouseEnter={() => setOpenIndex(index)}
                    onMouseLeave={() => setOpenIndex(null)}
                >
                    {item.href ? (
                        <Link
                            href={item.href}
                            onClick={onNavigate}
                            className="block px-4 py-2.5 font-condensed text-sm text-[#2C2420] hover:bg-[#D4A853]/20 hover:text-[#C25A3E] transition-colors uppercase tracking-wider whitespace-nowrap"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <>
                            <div className="flex items-center justify-between px-4 py-2.5 font-condensed text-sm text-[#2C2420] hover:bg-[#D4A853]/20 hover:text-[#C25A3E] transition-colors uppercase tracking-wider cursor-pointer whitespace-nowrap">
                                {item.label}
                                <ChevronRight size={14} className="ml-2" />
                            </div>
                            <AnimatePresence>
                                {openIndex === index && item.children && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute left-full top-0 bg-[#F8F3E8] shadow-lg border border-[#2C2420]/10 min-w-[160px]"
                                    >
                                        <SubMenu items={item.children} onNavigate={onNavigate} level={level + 1} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

interface DriedMeatsDropdownProps {
    variant?: "hero" | "mini" | "mobile";
    onNavigate?: () => void;
}

const DriedMeatsDropdown: React.FC<DriedMeatsDropdownProps> = ({ variant = "hero", onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setOpenCategoryIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNavigate = () => {
        setIsOpen(false);
        setOpenCategoryIndex(null);
        onNavigate?.();
    };

    // Mobile full-screen menu version
    if (variant === "mobile") {
        return (
            <div className="w-full">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="font-display text-[1.4rem] sm:text-[1.75rem] md:text-[2.25rem] text-[#F8F3E8] hover:text-[#D4A853] transition-colors relative group uppercase tracking-wide flex items-center gap-2"
                >
                    Dried Meats
                    <ChevronDown
                        size={20}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mt-2"
                        >
                            <div className="pl-4 space-y-1">
                                {menuStructure.map((category, catIndex) => (
                                    <div key={category.label}>
                                        <button
                                            onClick={() => setOpenCategoryIndex(openCategoryIndex === catIndex ? null : catIndex)}
                                            className="flex items-center justify-between w-full py-2 font-display text-lg text-[#D4A853] hover:text-[#F8F3E8] transition-colors uppercase tracking-wide"
                                        >
                                            {category.label}
                                            <ChevronDown
                                                size={18}
                                                className={`transition-transform duration-200 ${openCategoryIndex === catIndex ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {openCategoryIndex === catIndex && category.children && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <SubMenu items={category.children} onNavigate={handleNavigate} isMobile />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // Desktop dropdown for hero and mini variants
    const textColorClass = variant === "hero" ? "text-white hover:text-[#D4A853]" : "text-[#2C2420] hover:text-[#C25A3E]";

    return (
        <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => {
                setIsOpen(false);
                setOpenCategoryIndex(null);
            }}
        >
            <Link
                href="/dried-meats"
                className={`font-condensed text-xs xl:text-sm tracking-[0.08em] xl:tracking-[0.1em] uppercase transition-colors relative group whitespace-nowrap flex items-center gap-1 ${textColorClass}`}
            >
                Dried Meats
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${variant === "hero" ? "bg-[#D4A853]" : "bg-[#C25A3E]"}`} />
            </Link>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 bg-[#F8F3E8] shadow-lg border border-[#2C2420]/10 min-w-[180px] z-50"
                    >
                        {menuStructure.map((category, catIndex) => (
                            <div
                                key={category.label}
                                className="relative"
                                onMouseEnter={() => setOpenCategoryIndex(catIndex)}
                                onMouseLeave={() => setOpenCategoryIndex(null)}
                            >
                                <div className="flex items-center justify-between px-4 py-2.5 font-condensed text-sm text-[#2C2420] hover:bg-[#D4A853]/20 hover:text-[#C25A3E] transition-colors uppercase tracking-wider cursor-pointer whitespace-nowrap">
                                    {category.label}
                                    <ChevronRight size={14} className="ml-2" />
                                </div>
                                <AnimatePresence>
                                    {openCategoryIndex === catIndex && category.children && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute left-full top-0 bg-[#F8F3E8] shadow-lg border border-[#2C2420]/10 min-w-[160px]"
                                        >
                                            <SubMenu items={category.children} onNavigate={handleNavigate} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DriedMeatsDropdown;
