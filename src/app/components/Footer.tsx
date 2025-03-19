"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Phone } from "lucide-react"; // ✅ Added Mail & Phone icons
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const navigationLinks = [
    { label: "Shop All Products", href: "/shop" },
    { label: "Recipes", href: "/recipes" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "About Us", href: "/about" },
    { label: "Sign In or Register", href: "/login" },
    { label: "Sitemap", href: "/sitemap" },
  ];

  const categoryLinks = [
    { label: "Shop All", href: "/shop" },
    { label: "Dried Meats", href: "/category/dried-meats" },
    { label: "Sausage", href: "/category/sausage" },
    { label: "Groceries", href: "/category/groceries" },
  ];

  const brandLinks = [
    { label: "Angus Biltong", href: "/brand/angus-biltong" },
    { label: "View All", href: "/brands" },
  ];

  return (
    <footer
      id="footer" // Added ID here
      className="bg-black text-white py-12"
    >
      {/* Newsletter Section - Loads in from Left to Right */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-gray-100 py-6 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          JOIN OUR NEWSLETTER
        </h2>
        <div className="flex justify-center items-center max-w-lg mx-auto">
          <input
            type="email"
            placeholder="email address"
            className="p-3 w-full text-gray-700 rounded-l-md focus:outline-none"
          />
          <button className="bg-[#0BDA51] text-white font-semibold px-6 py-3 rounded-r-md hover:bg-green-700 transition">
            SUBSCRIBE
          </button>
        </div>
      </motion.div>

      {/* Footer Links Section - Staggered Animations */}
      <div className="container mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {[
          {
            title: "NAVIGATE",
            links: navigationLinks,
          },
          {
            title: "CATEGORIES",
            links: categoryLinks,
          },
          {
            title: "POPULAR BRANDS",
            links: brandLinks,
          },
          {
            title: "CONNECT WITH US",
            socialIcons: [
              { Icon: Facebook, link: "#" },
              { Icon: Instagram, link: "#" },
              { Icon: Mail, link: "mailto:info@angusbiltong.com" }, // ✅ Mail icon with mailto
              { Icon: Phone, link: "tel:+12817198577" }, // ✅ Phone icon with tel
            ],
          },
        ].map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
            {section.links && (
              <ul className="space-y-2">
                {section.links.map((item, idx) => (
                  <li
                    key={idx}
                    className="hover:text-gray-400 transition cursor-pointer"
                  >
                    <Link href={item.href} className="block w-full">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {section.socialIcons && (
              <div className="flex space-x-4">
                {section.socialIcons.map(({ Icon, link }, idx) => (
                  <motion.a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-white hover:text-gray-400 transition"
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Payment & Location Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-gray-700 mt-12 py-6 text-center text-sm"
      >
        <div className="flex justify-center space-x-6 mb-4">
          <span className="text-gray-400">American Express</span>
          <span className="text-gray-400">Apple Pay</span>
          <span className="text-gray-400">Discover</span>
          <span className="text-gray-400">Mastercard</span>
          <span className="text-gray-400">Visa</span>
        </div>
        <p className="text-gray-400">255 Sawdust Rd, Spring, TX 77380</p>
        <p className="text-gray-400">281-719-8577</p>
        <p className="text-gray-400 mt-4">© 2025 Angus Biltong</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
