"use client";

import NavMini from "@/app/components/NavMini";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-sand">
      <NavMini />

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden mt-24 sm:mt-28">
        <Image
          src="/image-5.jpg"
          alt="South African Landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C2420]/60 via-[#2C2420]/40 to-[#C25A3E]/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="heading-xl text-white mb-4">Our Story</h1>
            <div className="w-24 h-1 bg-amber mx-auto" />
          </motion.div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-cream p-8 md:p-12 border border-[#2C2420]/8 mb-12"
        >
          <div className="geo-border pb-8 mb-8">
            <h2 className="heading-md text-espresso text-center">
              A Taste of Home
            </h2>
          </div>

          <div className="space-y-6 font-body text-espresso/90 leading-relaxed">
            <p>
              We are based out of Spring Texas. We have been making and
              experimenting with biltong and droëwors in the USA for 20+ years,
              treating our friends to these special delicacies. After years of
              encouragement from friends and family we took the leap of faith
              and started Angus Biltong.
            </p>
            <p>
              Our goal is to provide a quality product at a price everyone can
              afford and feel good about.
            </p>
            <p className="text-terracotta font-semibold">
              We also carry a large selection of South African groceries in store
              and will soon be selling them online too.
            </p>
          </div>
        </motion.div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Store Hours */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-product bg-cream p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-terracotta rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="heading-md text-espresso">Store Hours</h2>
            </div>
            <div className="space-y-3 font-body text-espresso/80">
              <div className="flex justify-between items-center py-2 border-b border-espresso/10">
                <span className="font-condensed uppercase tracking-wider text-sm">Monday - Friday</span>
                <span className="text-terracotta font-semibold">10am - 6pm</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-espresso/10">
                <span className="font-condensed uppercase tracking-wider text-sm">Saturday</span>
                <span className="text-terracotta font-semibold">10am - 5pm</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-condensed uppercase tracking-wider text-sm">Sunday</span>
                <span className="text-olive font-semibold">Closed</span>
              </div>
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card-product bg-cream p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-olive rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="heading-md text-espresso">Visit Us</h2>
            </div>
            <div className="space-y-4 font-body text-espresso/80">
              <div>
                <p className="font-condensed uppercase tracking-wider text-sm text-espresso/60 mb-1">Address</p>
                <p className="text-espresso">255 Sawdust Rd, Spring Texas, 77380</p>
              </div>
              <div>
                <p className="font-condensed uppercase tracking-wider text-sm text-espresso/60 mb-1">Phone</p>
                <a
                  href="tel:281-719-8577"
                  className="text-terracotta hover:text-terracotta-dark transition-colors text-lg font-semibold"
                >
                  281-719-8577
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
