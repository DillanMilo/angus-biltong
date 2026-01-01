"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const shopLinks = [
    { label: "Shop All", href: "/products" },
    { label: "Dried Meats", href: "/dried-meats" },
    { label: "Sausage", href: "/sausage" },
    { label: "Groceries", href: "/groceries" },
    { label: "Gift Certificates", href: "/gift-certificates" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Recipes", href: "/recipes" },
    { label: "Contact", href: "/contact" },
    { label: "Shipping & Returns", href: "/shipping" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/angusbiltong", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/angusbiltong", label: "Instagram" },
    { icon: Mail, href: "mailto:info@angusbiltong.com", label: "Email" },
    { icon: Phone, href: "tel:+12817198577", label: "Phone" },
  ];

  return (
    <footer id="footer" className="bg-[#2C2420]">
      {/* Newsletter Section */}
      <div className="border-b border-[#F8F3E8]/10">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="font-condensed text-[#D4A853] text-sm tracking-[0.2em] uppercase mb-3">
                Stay Connected
              </p>
              <h2 className="heading-lg text-[#F8F3E8] mb-4">
                Join Our Newsletter
              </h2>
              <p className="font-body text-[#F8F3E8]/60">
                Be the first to know about new products, recipes, and exclusive offers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-[#F8F3E8]/5 border border-[#F8F3E8]/20 px-5 py-4 text-[#F8F3E8] placeholder-[#F8F3E8]/40 font-body focus:outline-none focus:border-[#D4A853] transition-colors"
                />
                <button className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap">
                  Subscribe
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-4 lg:col-span-1"
          >
            <Link href="/">
              <Image
                src="/AB-Logo-300dpi-Alpha-Only-2.png"
                alt="Angus Biltong"
                width={100}
                height={100}
                className="mb-6"
              />
            </Link>
            <p className="font-body text-[#F8F3E8]/60 text-sm leading-relaxed mb-6">
              Authentic South African biltong & droëwors, crafted in Houston with 20+ years of family tradition.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-[#F8F3E8]/5 flex items-center justify-center text-[#F8F3E8]/60 hover:bg-[#C25A3E] hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-condensed text-[#F8F3E8] text-sm tracking-[0.15em] uppercase mb-6">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="font-body text-[#F8F3E8]/60 text-sm hover:text-[#D4A853] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-condensed text-[#F8F3E8] text-sm tracking-[0.15em] uppercase mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="font-body text-[#F8F3E8]/60 text-sm hover:text-[#D4A853] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-2 lg:col-span-2"
          >
            <h3 className="font-condensed text-[#F8F3E8] text-sm tracking-[0.15em] uppercase mb-6">
              Visit Us
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#D4A853] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-[#F8F3E8]/60 text-sm">
                    255 Sawdust Rd
                  </p>
                  <p className="font-body text-[#F8F3E8]/60 text-sm">
                    Spring, TX 77380
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#D4A853] flex-shrink-0" />
                <a
                  href="tel:+12817198577"
                  className="font-body text-[#F8F3E8]/60 text-sm hover:text-[#D4A853] transition-colors"
                >
                  281-719-8577
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#D4A853] flex-shrink-0" />
                <a
                  href="mailto:info@angusbiltong.com"
                  className="font-body text-[#F8F3E8]/60 text-sm hover:text-[#D4A853] transition-colors"
                >
                  info@angusbiltong.com
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="mt-6 pt-6 border-t border-[#F8F3E8]/10">
              <p className="font-condensed text-[#F8F3E8]/40 text-xs tracking-wider uppercase mb-2">
                Store Hours
              </p>
              <p className="font-body text-[#F8F3E8]/60 text-sm">
                Mon-Fri: 10am - 6pm
              </p>
              <p className="font-body text-[#F8F3E8]/60 text-sm">
                Sat: 10am - 5pm | Sun: Closed
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#F8F3E8]/10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Payment Methods */}
            <div className="flex items-center gap-4 text-[#F8F3E8]/40">
              <span className="font-condensed text-xs tracking-wider uppercase">
                We Accept
              </span>
              <div className="flex items-center gap-3">
                {["Visa", "Mastercard", "Amex", "Discover", "Apple Pay"].map((method) => (
                  <span
                    key={method}
                    className="font-condensed text-xs tracking-wider"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Legal Links & Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="flex items-center gap-4">
                {legalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="font-body text-[#F8F3E8]/40 text-xs hover:text-[#D4A853] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <p className="font-body text-[#F8F3E8]/40 text-xs">
                © 2025 Angus Biltong. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
