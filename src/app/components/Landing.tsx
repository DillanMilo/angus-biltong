"use client"; // Needed for animations in Next.js

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import Stars from "./Stars"; // Import Stars component

const missionStatement =
  "Bringing authentic South African flavors to Houston, one family recipe at a time. At Angus Biltong, we're more than a store – we're a taste of home for expats and a delicious adventure for locals.";

const Landing: React.FC = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-white text-center">
      {/* Logo Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0.8, 1], scale: [0.8, 1, 0.9, 1] }}
        transition={{ duration: 1.5, ease: "easeInOut", repeat: 0 }}
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

      {/* Mission Statement Animation */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}
        className="mt-6 text-lg font-bold text-gray-800 max-w-lg leading-relaxed"
      >
        {missionStatement}
      </motion.p>

      {/* 5 Stars Animation Below Mission Statement */}
      <Stars />
    </section>
  );
};

export default Landing;
