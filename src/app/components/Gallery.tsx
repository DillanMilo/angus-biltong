"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const Gallery: React.FC = () => {
  return (
    <section className="relative w-full text-center py-16">
      {/* Moving Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="overflow-hidden bg-[#0BDA51] text-black py-4 text-7xl font-bold"
      >
        <motion.div
          className="flex space-x-64 whitespace-nowrap"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        >
          <span>Family</span>
          <span>Integrity</span>
          <span>Quality</span>
          <span>Community</span>
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
