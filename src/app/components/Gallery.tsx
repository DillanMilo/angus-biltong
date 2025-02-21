"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
    <section
      id="gallery"
      className="relative w-full text-center py-16 bg-[#f4f8f1]"
    >
      {/* 🎯 Moving Banner - Expands from Center on Scroll */}
      <motion.div
        initial={{ scaleX: 0 }}
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
          className="flex space-x-64 whitespace-nowrap w-max"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 320,
            ease: "linear",
          }}
        >
          {[...Array(30)].flatMap((_, i) => [
            <span
              key={`family-${i}`}
              className="text-[100px] font-semibold uppercase"
            >
              FAMILY
            </span>,
            <span
              key={`integrity-${i}`}
              className="text-[100px] font-semibold uppercase"
            >
              INTEGRITY
            </span>,
            <span
              key={`quality-${i}`}
              className="text-[100px] font-semibold uppercase"
            >
              QUALITY
            </span>,
            <span
              key={`community-${i}`}
              className="text-[100px] font-semibold uppercase"
            >
              COMMUNITY
            </span>,
          ])}
        </motion.div>
      </motion.div>

      {/* 🖼️ Storefront Image */}
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
          className="rounded-lg shadow-lg w-full md:w-auto"
          priority
        />
      </motion.div>

      {/* ⭐ Reviews Section */}
      <div className="mt-16 px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
            <p className="text-gray-700 italic">"{review.review}"</p>
            <p className="font-bold mt-4 text-[#0BDA51]">{review.name}</p>
            {/* ⭐ Star Rating */}
            <div className="flex justify-start mt-2">
              {[...Array(review.rating)].map((_, i) => (
                <span key={i} className="text-yellow-500 text-lg">
                  ⭐
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 📸 Second Image */}
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
          className="rounded-lg shadow-lg w-full md:w-auto"
          priority
        />
      </motion.div>

      {/* 🏆 Caption with Link */}
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
