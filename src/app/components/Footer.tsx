"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      {/* Newsletter Section */}
      <div className="bg-gray-100 py-6 text-center">
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
      </div>

      {/* Footer Links Section */}
      <div className="container mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Navigate */}
        <div>
          <h3 className="text-lg font-semibold mb-4">NAVIGATE</h3>
          <ul className="space-y-2">
            {[
              "Shop All Products",
              "Recipes",
              "Shipping & Returns",
              "Contact Us",
              "Terms of Service",
              "Privacy Policy",
              "About Us",
              "Sign In or Register",
              "Sitemap",
            ].map((item, index) => (
              <li
                key={index}
                className="hover:text-gray-400 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CATEGORIES</h3>
          <ul className="space-y-2">
            {["Shop All", "Dried Meats", "Sausage", "Groceries"].map(
              (item, index) => (
                <li
                  key={index}
                  className="hover:text-gray-400 transition cursor-pointer"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Popular Brands */}
        <div>
          <h3 className="text-lg font-semibold mb-4">POPULAR BRANDS</h3>
          <ul className="space-y-2">
            {["Angus Biltong", "View All"].map((item, index) => (
              <li
                key={index}
                className="hover:text-gray-400 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONNECT WITH US</h3>
          <div className="flex space-x-4">
            {[
              { Icon: Facebook, link: "#" },
              { Icon: Instagram, link: "#" },
              { Icon: Twitter, link: "#" },
            ].map(({ Icon, link }, index) => (
              <motion.a
                key={index}
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
        </div>
      </div>

      {/* Payment & Location Section */}
      <div className="border-t border-gray-700 mt-12 py-6 text-center text-sm">
        <div className="flex justify-center space-x-6 mb-4">
          <span className="text-gray-400">American Express</span>
          <span className="text-gray-400">Apple Pay</span>
          <span className="text-gray-400">Discover</span>
          <span className="text-gray-400">Mastercard</span>
          <span className="text-gray-400">Visa</span>
        </div>
        <p className="text-gray-400">255 Sawdust Rd, Spring, TX 77380</p>
        <p className="text-gray-400">281-719-8577</p>
        <p className="text-gray-400 mt-4">&copy; 2025 Angus Biltong</p>
      </div>
    </footer>
  );
};

export default Footer;
