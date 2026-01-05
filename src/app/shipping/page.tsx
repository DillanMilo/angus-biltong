"use client";

import NavMini from "@/app/components/NavMini";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";
import Image from "next/image";

const ShippingPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-sand">
      <NavMini />

      {/* Hero Section */}
      <section className="relative h-[35vh] min-h-[280px] overflow-hidden">
        <Image
          src="/image-5.jpg"
          alt="Shipping & Returns"
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
            <h1 className="heading-xl text-white mb-4">Shipping & Returns</h1>
            <div className="w-24 h-1 bg-amber mx-auto" />
          </motion.div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Content Sections */}
        <div className="space-y-8">
          {/* Shipping Rates */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-product bg-cream p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="heading-md text-espresso">Shipping Rates</h2>
            </div>
            <div className="font-body text-espresso/90">
              <p>
                Shipping is a flat rate of <span className="text-terracotta font-semibold">$9.99</span> per order up to $79. After that
                the shipping is <span className="text-olive font-bold">FREE FREE FREE</span>.
              </p>
            </div>
          </motion.section>

          {/* Shipping Policy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-product bg-cream p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-olive rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <h2 className="heading-md text-espresso">Shipping Policy</h2>
            </div>
            <div className="font-body text-espresso/90 space-y-6">
              <p>
                Most orders placed Monday through Thursday before <span className="text-terracotta font-semibold">3PM Central Time</span> ship the same day. We typically ship on Monday through Thursday to
                avoid your biltong being stuck in a 100°F warehouse for the weekend.
              </p>
              <div className="bg-sand p-4 border-l-4 border-amber">
                <h3 className="font-display text-lg text-espresso mb-2">FRESH SAUSAGES</h3>
                <p>
                  We must ship fresh sausages 2nd day air which increases the
                  shipping cost. Due to this all fresh sausages have the shipping
                  cost included in the online sale price. In-store purchases do not
                  incur this surcharge.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Returns Policy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-product bg-cream p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
              </div>
              <h2 className="heading-md text-espresso">Returns Policy</h2>
            </div>
            <div className="font-body text-espresso/90 space-y-6">
              <div className="bg-terracotta/10 border border-terracotta/30 p-4">
                <p className="font-semibold text-terracotta">
                  If goods are not fit for consumption on receipt of delivery
                  date. PLEASE CONTACT US IMMEDIATELY (within 24 HRS of delivery).
                </p>
              </div>
              <p className="font-semibold">
                Product should not be consumed under any circumstances when
                there is doubt.
              </p>
              <div>
                <p className="mb-3">
                  Angus Biltong has a money back guarantee subject to:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-terracotta rounded-full mt-2 flex-shrink-0"></span>
                    <span>Notification of defective/damaged product within 24 hrs. of delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-terracotta rounded-full mt-2 flex-shrink-0"></span>
                    <span>Pictures as proof must be sent within 24 hrs. of delivery</span>
                  </li>
                </ul>
              </div>
              <div className="bg-sand p-4">
                <p className="mb-3">
                  Please use the contact us link to report any return. Include the following information:
                </p>
                <ul className="grid grid-cols-2 gap-2 ml-4 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-olive rounded-full"></span>
                    Order number
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-olive rounded-full"></span>
                    Delivery date
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-olive rounded-full"></span>
                    Pictures of product
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-olive rounded-full"></span>
                    Order date
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Refunds */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card-product bg-cream p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-espresso rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="heading-md text-espresso">Refunds</h2>
            </div>
            <div className="font-body text-espresso/90 space-y-4">
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-olive rounded-full mt-2 flex-shrink-0"></span>
                  <span>Will be made in same method as payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-olive rounded-full mt-2 flex-shrink-0"></span>
                  <span>Once refund is approved by Angus Biltong management, refund will be processed ASAP. (Allow 5 business days for refund to show on your account)</span>
                </li>
              </ul>
              <p className="pt-4 border-t border-espresso/10">
                Angus Biltong is committed to service excellence and will deal
                with refunds as fairly and quickly as possible.
              </p>
              <p className="serif-heading text-lg text-terracotta italic">
                We want to affirm our commitment to delivering your favorite
                treats to you!
              </p>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPage;
