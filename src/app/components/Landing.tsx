"use client"; // Needed for animations in Next.js

import Image from "next/image";
import { motion } from "framer-motion"; // Install if not added
import React from "react";

const Landing: React.FC = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-white">
      {/* Motion effect for flickering logo animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0.8, 1], scale: [0.8, 1, 0.9, 1] }}
        transition={{ duration: 1.5, ease: "easeInOut", repeat: 0 }}
      >
        <Image
          src="/AB-Logo-300dpi-Alpha-Only-2.png"
          alt="Angus Biltong Logo"
          width={500} // Adjust width
          height={500} // Adjust height
          className="drop-shadow-lg" // Optional Tailwind styling
          priority
        />
      </motion.div>
    </section>
  );
};

export default Landing;
