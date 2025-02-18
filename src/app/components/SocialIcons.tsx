"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import React from "react";

const socialLinks = [
  {
    id: "facebook",
    icon: <Facebook size={35} />,
    link: "https://www.facebook.com/angusbiltong",
  },
  {
    id: "instagram",
    icon: <Instagram size={35} />,
    link: "https://www.instagram.com/angusbiltong",
  },
  {
    id: "email",
    icon: <Mail size={35} />,
    link: "mailto:info@angusbiltong.com",
  },
  { id: "phone", icon: <Phone size={35} />, link: "tel:+12817198577" },
];

const SocialIcons: React.FC = () => {
  return (
    <div className="fixed top-6 left-6 flex flex-col space-y-4">
      {socialLinks.map((item, index) => (
        <motion.a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 2.7 + index * 0.3,
            duration: 0.8,
            ease: "easeOut",
          }} // Delayed for last effect
          className="text-gray-800 hover:text-[#47B6A5] transition-colors"
        >
          {item.icon}
        </motion.a>
      ))}
    </div>
  );
};

export default SocialIcons;
