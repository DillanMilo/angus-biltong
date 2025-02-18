"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const Gallery: React.FC = () => {
  return (
    <section className="relative w-full text-center  py-16">
      {/* Moving Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="overflow-hidden bg-[#0BDA51] text-black py-4 text-7xl font-bold"
      >
        <motion.div
          className="flex space-x-12 whitespace-nowrap"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          <span>Family</span>
          <span>Integrity</span>
          <span>Quality</span>
          <span>Community</span>
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
    </section>
  );
};

export default Gallery;
