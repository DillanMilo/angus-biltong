"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, MapPin, Clock, Phone } from "lucide-react";
import React from "react";

const reviews = [
  {
    id: 1,
    name: "Jonathan K.",
    review:
      "Warm & Welcoming with a wide variety of fresh & exceptional quality products to choose from, including Malva Poeding, Melktert, Biltong, Droëwors etc.",
    rating: 5,
  },
  {
    id: 2,
    name: "Dirk D.",
    review:
      "Love this place!! Lots of South African goodies and since we were from out of town, we loaded up on biltong & dried sausage. Products were high quality.",
    rating: 5,
  },
  {
    id: 3,
    name: "Steven K.",
    review:
      "All the flavors are amazing, the staff is super nice and helpful. I've never had meat or jerky as good as this. The Chutney biltong is amazing!",
    rating: 5,
  },
  {
    id: 4,
    name: "Jenna S.",
    review:
      "Best place to shop for all your favorite South African treats. Now selling SA wine too. Absolutely love it!",
    rating: 5,
  },
];

const values = ["FAMILY", "INTEGRITY", "QUALITY", "COMMUNITY"];

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="relative w-full">
      {/* Values Banner - Dramatic Terracotta */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        className="origin-center overflow-hidden bg-[#C25A3E] py-6 md:py-8"
      >
        <div className="flex">
          <div
            className="flex whitespace-nowrap animate-marquee-seamless"
          >
            {Array.from({ length: 8 }, () => values)
              .flat()
              .map((word, i) => (
                <span
                  key={`a-${i}`}
                  className="font-display text-[40px] md:text-[60px] lg:text-[80px] text-white/90 mx-6 md:mx-12 tracking-wider"
                >
                  {word}
                  <span className="mx-6 md:mx-12 text-[#D4A853]">|</span>
                </span>
              ))}
          </div>
          <div
            className="flex whitespace-nowrap animate-marquee-seamless"
          >
            {Array.from({ length: 8 }, () => values)
              .flat()
              .map((word, i) => (
                <span
                  key={`b-${i}`}
                  className="font-display text-[40px] md:text-[60px] lg:text-[80px] text-white/90 mx-6 md:mx-12 tracking-wider"
                >
                  {word}
                  <span className="mx-6 md:mx-12 text-[#D4A853]">|</span>
                </span>
              ))}
          </div>
        </div>
      </motion.div>

      {/* Storefront Section */}
      <div className="relative py-20 md:py-32 bg-[#2C2420]">
        {/* Subtle Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 30px,
              #D4A853 30px,
              #D4A853 31px
            )`,
          }}
        />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#D4A853] opacity-30" />
              <Image
                src="/bb-shopfront-02.jpg"
                alt="Angus Biltong Storefront"
                width={600}
                height={400}
                className="w-full h-auto relative z-10"
                priority
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#C25A3E] opacity-20" />
            </motion.div>

            {/* Store Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[#F8F3E8]"
            >
              <p className="font-condensed text-[#D4A853] text-sm tracking-[0.3em] uppercase mb-4">
                Visit Our Store
              </p>
              <h2 className="heading-xl mb-6">Come See Us</h2>

              <p className="font-body text-lg text-[#F8F3E8]/80 leading-relaxed mb-8">
                Step into our store and experience the authentic taste of South
                Africa. Our friendly staff is always ready to help you discover
                your new favorite biltong flavor.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C25A3E]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#D4A853]" />
                  </div>
                  <div>
                    <p className="font-condensed text-sm uppercase tracking-wider text-[#F8F3E8]/60 mb-1">
                      Location
                    </p>
                    <p className="font-body">
                      255 Sawdust Rd, Spring, TX 77380
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C25A3E]/20 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-[#D4A853]" />
                  </div>
                  <div>
                    <p className="font-condensed text-sm uppercase tracking-wider text-[#F8F3E8]/60 mb-1">
                      Hours
                    </p>
                    <p className="font-body">Mon-Fri 10am-6pm | Sat 10am-5pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C25A3E]/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#D4A853]" />
                  </div>
                  <div>
                    <p className="font-condensed text-sm uppercase tracking-wider text-[#F8F3E8]/60 mb-1">
                      Phone
                    </p>
                    <p className="font-body">281-719-8577</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-20 md:py-28 bg-[#F8F3E8]">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-condensed text-[#C25A3E] text-sm tracking-[0.2em] uppercase mb-3">
              What Our Customers Say
            </p>
            <h2 className="heading-xl text-[#2C2420] mb-6">Loved By Many</h2>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-[#C25A3E] w-16" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#D4A853] fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <div className="h-px bg-[#C25A3E] w-16" />
            </div>
          </motion.div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: true }}
                className="bg-[#FFFCF5] p-6 border border-[#2C2420]/10 relative group hover:border-[#D4A853]/50 transition-colors duration-300"
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 left-6">
                  <div className="w-8 h-8 bg-[#C25A3E] flex items-center justify-center">
                    <Quote size={14} className="text-white" />
                  </div>
                </div>

                <div className="pt-4">
                  {/* Review Text */}
                  <p className="font-body text-[#2C2420]/80 text-sm leading-relaxed mb-6 line-clamp-4">
                    {review.review}
                  </p>

                  {/* Reviewer */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-condensed text-[#2C2420] font-semibold uppercase tracking-wider text-sm">
                        {review.name}
                      </p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-3 h-3 text-[#D4A853] fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#3D4A3A] flex items-center justify-center text-white font-condensed text-xs uppercase">
                      {review.name.charAt(0)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.9221842861866!2d-95.444892!3d30.1250401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8647350e8cc26001%3A0x2b866a67d149a31a!2sAngus%20Biltong!5e0!3m2!1sen!2sus!4v1740588759101!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Overlay Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 bg-[#2C2420] text-[#F8F3E8] px-8 py-6"
        >
          <p className="font-condensed text-[#D4A853] text-xs tracking-[0.2em] uppercase mb-2">
            Find Us
          </p>
          <p className="font-display text-2xl">Spring, Texas</p>
        </motion.div>
      </div>

      {/* Spearhead Missions */}
      <div className="py-12 bg-[#3D4A3A] text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-body text-[#F8F3E8]/80 text-lg"
        >
          A Proud Supporter of{" "}
          <a
            href="https://www.spearheadmissions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4A853] font-semibold hover:underline transition-colors"
          >
            Spearhead Missions
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default Gallery;
