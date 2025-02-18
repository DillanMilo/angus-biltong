"use client"; // Needed for animations in Next.js

import Image from "next/image";
import { motion } from "framer-motion";
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
    <section className="h-screen flex flex-col items-center justify-center bg-[#47B6A5] text-center">
      {/* Logo Animation - Slow Fade-in & Scale-Up */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }} // Starts smaller & invisible
        animate={{ opacity: 1, scale: [0.5, 1.05, 1] }} // Slowly fades in & grows to full size
        transition={{ duration: 1.5, ease: "easeInOut" }} // Slow fade-in, smooth scaling
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
        className="mt-6 text-xl text-[#fdfbd4] max-w-lg leading-relaxed font-bold"
      >
        {missionStatementLines.map((line, i) => (
          <p key={i} className="animate-pullText">
            <span>{line}</span>
          </p>
        ))}
      </div>
      <br></br>
      {/* 5 Stars Animation Below Mission Statement */}
      <Stars />
      <SocialIcons />
    </section>
  );
};

export default Landing;
