"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import React from "react";

const reviews = [
  {
    id: 1,
    name: "John D.",
    review:
      "Absolutely love this place! The best biltong I’ve ever had. Great service and quality!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah L.",
    review:
      "Incredible flavors! The quality and authenticity are top-notch. Will be back for more!",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael R.",
    review:
      "If you’re looking for real South African biltong, this is the place. Highly recommend!",
    rating: 5,
  },
  {
    id: 4,
    name: "Emily T.",
    review:
      "Friendly staff and amazing products. The droëwors is my absolute favorite!",
    rating: 5,
  },
];

const Gallery: React.FC = () => {
  return (
    <section className="relative w-full text-center py-16">
      {/* Moving Banner - Seamless Loop */}
      <motion.div
        initial={{ scaleX: 0 }} // Curtain effect
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="origin-center overflow-hidden bg-[#cd1c18] text-white py-8 text-[100px] tracking-wider uppercase font-[600]"
        style={{
          height: "140px",
          display: "flex",
          alignItems: "center",
          fontFamily: "var(--font-roboto-condensed)",
        }}
      >
        <motion.div
          className="flex whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 10, // ✅ Adjusted for smooth looping
            ease: "linear",
          }}
        >
          {/* 🔥 DUPLICATE THE TEXT WITH NO GAPS */}
          {["FAMILY", "INTEGRITY", "QUALITY", "COMMUNITY"].map((word, i) => (
            <span
              key={i}
              className="text-[100px] font-semibold uppercase mx-16"
            >
              {word}
            </span>
          ))}
          {/* 🔁 DUPLICATE AGAIN TO ENSURE CONTINUITY */}
          {["FAMILY", "INTEGRITY", "QUALITY", "COMMUNITY"].map((word, i) => (
            <span
              key={`duplicate-${i}`}
              className="text-[100px] font-semibold uppercase mx-16"
            >
              {word}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Storefront Image (Unchanged) */}
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

      {/* 🏆 Review Cards - Load in from Left to Right */}
      <div className="mt-16 px-6 max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.3,
              duration: 1,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-left"
          >
            <p className="text-gray-700 italic">&quot;{review.review}&quot;</p>
            <p className="font-bold mt-4 text-[#0BDA51]">{review.name}</p>
            {/* ⭐ Star Rating */}
            <div className="flex justify-start mt-2">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="text-yellow-500 fill-current"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Google Maps Embed (Replacing Previous Image) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12 flex justify-center"
      >
        <div className="w-full max-w-4xl h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.9221842861866!2d-95.444892!3d30.1250401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8647350e8cc26001%3A0x2b866a67d149a31a!2sAngus%20Biltong!5e0!3m2!1sen!2sus!4v1740588759101!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>

      {/* Caption (Unchanged) */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 text-xl text-gray-700"
      >
        A Proud Supporter of{" "}
        <a
          href="https://www.spearheadmissions.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0BDA8F] font-semibold hover:underline"
        >
          Spearhead Missions
        </a>
      </motion.p>
    </section>
  );
};

export default Gallery;
