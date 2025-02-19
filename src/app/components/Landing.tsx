"use client"; // Needed for animations in Next.js

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";
import Stars from "./Stars";
import SocialIcons from "./SocialIcons";

const missionStatementLines = [
  "Bringing authentic South African flavors to Houston,",
  "one family recipe at a time.",
  "We're more than a store –",
  "we're a taste of home for expats and a delicious adventure for locals.",
];

const Landing: React.FC = () => {
  const missionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll(); // Track scroll progress
  const fadeOut = useTransform(scrollYProgress, [0.3, 1], [1, 0]); // Fades out at 30% scroll

  useEffect(() => {
    if (missionRef.current) {
      missionRef.current
        .querySelectorAll(".animate-pullText span")
        .forEach((span, index) => {
          (span as HTMLElement).style.animationDelay = `${1.5 + index * 0.2}s`; // Ensure staggered effect
        });
    }
  }, []);

  return (
    <motion.section
      className="relative h-screen flex flex-col items-center justify-center text-center bg-[#f4f8f1]"
      style={{ opacity: fadeOut }} // Delayed fade out
    >
      {/* Background Image with 0.75s Fade-In Covering Entire Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.75 }} // 0.75-second delay before fading in
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/image-5.jpg')" }}
      />

      {/* Dim Overlay to Improve Contrast */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 2.5 }} // Slight delay after image loads
        className="absolute inset-0 bg-black"
      />

      {/* Logo Animation - Slow Fade-in & Scale-Up */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }} // Starts smaller & invisible
        animate={{ opacity: 1, scale: [0.5, 1.05, 1] }} // Slowly fades in & grows to full size
        transition={{ duration: 1.5, ease: "easeInOut" }} // Slow fade-in, smooth scaling
        className="relative z-10" // Ensure logo stays visible
      >
        <Image
          src="/AB-Logo-300dpi-Alpha-Only-2.png"
          alt="Angus Biltong Logo"
          width={500}
          height={500}
          className="drop-shadow-lg"
          priority
        />
      </motion.div>

      {/* Mission Statement - Each Line Pulled Up Together */}
      <div
        ref={missionRef}
        className="mt-6 text-xl text-[#fdfbd4] max-w-lg leading-relaxed font-bold relative z-10"
      >
        {missionStatementLines.map((line, i) => (
          <p key={i} className="animate-pullText">
            <span>{line}</span>
          </p>
        ))}
      </div>
      <br />

      {/* 5 Stars Animation Below Mission Statement */}
      <Stars />

      {/* Social Icons with Exit Animation */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }} // Moves out in opposite direction on scroll
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SocialIcons />
      </motion.div>
    </motion.section>
  );
};

export default Landing;
