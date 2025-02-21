/*
"use client"; 

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import React from "react";

const reviews = [
  {
    id: 1,
    name: "John D.",
    text: "Absolutely love the biltong! The flavors are authentic and the texture is perfect. Highly recommend!",
  },
  {
    id: 2,
    name: "Sarah L.",
    text: "Best South African snacks in Houston! Brings back memories of home. Amazing quality!",
  },
  {
    id: 3,
    name: "Mark R.",
    text: "Angus Biltong delivers top-notch service and quality! The droewors is out of this world!",
  },
];

const Reviews: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, x: -50 }} // Starts off-screen to the left
      animate={{ opacity: 1, x: 0 }} // Moves into place
      transition={{ delay: 2.5, duration: 2, ease: "easeOut" }} // Loads after mission statement
      className="absolute top-1/2 left-10 transform -translate-y-1/2 max-w-sm text-left bg-white p-4 rounded-lg shadow-lg"
    >
      <motion.div
        className="flex items-center space-x-1 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 1, ease: "easeOut" }} // Stars fade in slightly after section
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 2.7 + i * 0.2,
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <Star size={24} className="text-yellow-500" />
          </motion.div>
        ))}
      </motion.div>

      {reviews.map((review) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 3 + review.id * 0.3,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="mb-4"
        >
          <p className="text-gray-700 italic">"{review.text}"</p>
          <p className="text-gray-800 font-semibold">- {review.name}</p>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default Reviews; */
