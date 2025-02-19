"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const Gallery: React.FC = () => {
  return (
    <section className="relative w-full text-center py-16">
      {/* Moving Banner - Stretched for Height & Enlarged Text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Pull-up animation
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="overflow-hidden bg-[#0BDA51] text-black py-8 text-[100px] font-medium tracking-wider uppercase"
        style={{
          height: "140px", // Increased height for better balance
          display: "flex",
          alignItems: "center", // Keep text centered
          fontFamily: "var(--font-schibsted-grotesk)", // ✅ Use the new font
        }}
      >
        <motion.div
          className="flex space-x-64 whitespace-nowrap w-max"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 32,
            ease: "linear",
          }}
        >
          {[...Array(3)].flatMap((_, i) => [
            <span key={`family-${i}`} className="text-[100px]">
              FAMILY
            </span>,
            <span key={`integrity-${i}`} className="text-[100px]">
              INTEGRITY
            </span>,
            <span key={`quality-${i}`} className="text-[100px]">
              QUALITY
            </span>,
            <span key={`community-${i}`} className="text-[100px]">
              COMMUNITY
            </span>,
          ])}
        </motion.div>
      </motion.div>

      {/* Storefront Image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-8 flex justify-center"
      >
        <Image
          src="/bb-shopfront-02.jpg"
          alt="Angus Biltong Storefront"
          width={1000}
          height={600}
          className="rounded-lg shadow-lg"
          priority
        />
      </motion.div>

      {/* Second Image Below */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12 flex justify-center"
      >
        <Image
          src="/IMG_621009C8E038-1.jpeg"
          alt="Spearhead Missions Support"
          width={200}
          height={175}
          className="rounded-lg shadow-lg"
          priority
        />
      </motion.div>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-4 text-xl text-gray-700"
      >
        A Proud Supporter of{" "}
        <a
          href="https://www.spearheadmissions.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0BDA51] font-semibold hover:underline"
        >
          Spearhead Missions
        </a>
      </motion.p>
    </section>
  );
};

export default Gallery;
