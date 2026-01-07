"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import Link from "next/link";

const Landing: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <motion.section
      id="landing"
      className="relative h-screen flex flex-col items-center justify-between overflow-hidden pt-[100px] sm:pt-[110px] pb-16 sm:pb-20"
      style={{ opacity }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <Image
            src="/image-5.jpg"
            alt="South African Landscape"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        {/* Warm Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              180deg,
              rgba(44, 36, 32, 0.5) 0%,
              rgba(44, 36, 32, 0.3) 40%,
              rgba(194, 90, 62, 0.35) 100%
            )`,
          }}
        />
      </motion.div>

      {/* Decorative Corner Elements - Only on larger screens */}
      <div className="absolute top-[110px] left-6 w-16 h-16 lg:w-20 lg:h-20 border-l-2 border-t-2 border-[#D4A853] opacity-40 hidden lg:block" />
      <div className="absolute top-[110px] right-6 w-16 h-16 lg:w-20 lg:h-20 border-r-2 border-t-2 border-[#D4A853] opacity-40 hidden lg:block" />
      <div className="absolute bottom-20 left-6 w-16 h-16 lg:w-20 lg:h-20 border-l-2 border-b-2 border-[#D4A853] opacity-40 hidden lg:block" />
      <div className="absolute bottom-20 right-6 w-16 h-16 lg:w-20 lg:h-20 border-r-2 border-b-2 border-[#D4A853] opacity-40 hidden lg:block" />

      {/* Main Content - Centered in remaining space */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center">
        {/* HERO LOGO - Big with Bounce Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: [0.5, 1.08, 1] }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            times: [0, 0.7, 1],
          }}
          className="mb-2 sm:mb-4"
        >
          <Image
            src="/AB-Logo-300dpi-Alpha-Only-2.png"
            alt="Angus Biltong Logo"
            width={500}
            height={500}
            className="mx-auto drop-shadow-2xl w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px] xl:w-[380px] xl:h-[380px]"
            priority
          />
        </motion.div>

        {/* Tagline - Appears after logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-3 sm:mb-4"
        >
          <p className="font-condensed text-[#D4A853] text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2">
            Houston, Texas
          </p>
          <h1 className="font-display text-white drop-shadow-lg leading-[0.95] tracking-wide">
            <span className="block text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem]">Authentic South African</span>
            <span className="block text-[1.8rem] sm:text-[2.3rem] md:text-[2.8rem] lg:text-[3.3rem] xl:text-[3.8rem] text-[#D4A853]">Biltong & Droëwors</span>
          </h1>
        </motion.div>

        {/* Mission Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="font-body text-white/90 text-xs sm:text-sm md:text-base lg:text-lg max-w-lg mx-auto leading-relaxed mb-4 sm:mb-6 px-2"
        >
          20+ years of family recipes, crafted with integrity.
          <span className="hidden sm:inline"><br /></span>
          <span className="sm:hidden"> </span>
          A taste of home for expats, a delicious adventure for locals.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
        >
          <Link href="/products" className="w-full sm:w-auto">
            <button className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base">
              Shop Now
            </button>
          </Link>
          <Link href="/about" className="w-full sm:w-auto">
            <button className="btn-outline w-full sm:w-auto border-white text-white hover:bg-white hover:text-[#2C2420] px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base">
              Our Story
            </button>
          </Link>
        </motion.div>

        {/* 5-Star Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-white/80"
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4A853] fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="font-condensed text-[10px] sm:text-xs tracking-wider uppercase">
            5-Star Reviews on Google
          </span>
        </motion.div>
      </div>

      {/* Scroll Indicator - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        className="relative z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/50"
        >
          <span className="font-condensed text-[9px] sm:text-[10px] tracking-[0.15em] uppercase mb-1.5">
            Scroll
          </span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Ambient Floating Elements - Only on large screens */}
      <motion.div
        className="absolute top-1/3 left-10 w-2 h-2 bg-[#D4A853] rounded-full opacity-40 hidden xl:block"
        animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-16 w-3 h-3 bg-[#C25A3E] rounded-full opacity-30 hidden xl:block"
        animate={{ y: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </motion.section>
  );
};

export default Landing;
