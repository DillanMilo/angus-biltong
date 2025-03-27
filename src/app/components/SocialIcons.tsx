"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";

const socialLinks = [
  {
    id: "facebook",
    icon: <Facebook size={28} />,
    link: "https://www.facebook.com/angusbiltong",
  },
  {
    id: "instagram",
    icon: <Instagram size={28} />,
    link: "https://www.instagram.com/angusbiltong",
  },
  {
    id: "email",
    icon: <Mail size={28} />,
    link: "mailto:info@angusbiltong.com",
  },
  {
    id: "phone",
    icon: <Phone size={28} />,
    link: "tel:+12817198577",
  },
];

const SocialIcons: React.FC = () => {
  const [hideSocials, setHideSocials] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        setHideSocials(true);
      } else {
        setHideSocials(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: hideSocials ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-9 left-6 flex-col space-y-5 transition-opacity hidden sm:flex z-50 ${
        hideSocials ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
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
          }}
          className="text-gray-800 hover:text-[#C7E4DC] transition-colors"
        >
          {item.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialIcons;
