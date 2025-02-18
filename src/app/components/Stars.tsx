"use client"; // Needed for animations in Next.js

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import React from "react";

const Stars: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
    >
      {/* Filled Star Icons with Delayed Animation */}
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2 + i * 0.2, duration: 0.4, ease: "easeOut" }}
          >
            <Star
              size={32}
              className="text-yellow-500 fill-current" // Fill the star completely
              fill="currentColor" // Ensure it takes the text color
              stroke="none" // Remove the stroke outline
            />
          </motion.div>
        ))}
      </div>

      {/* Text Appears After Stars */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8, ease: "easeOut" }}
        className="mt-2 text-lg font-semibold text-gray-800"
      >
        5 Stars on Google Reviews!
      </motion.p>
    </motion.div>
  );
};

export default Stars;
