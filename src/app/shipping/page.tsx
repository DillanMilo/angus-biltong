"use client";

import NavMini from "@/app/components/NavMini";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";

const ShippingPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#f4f8f1]">
      <NavMini />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-center playfair underline"
        >
          Shipping & Returns
        </motion.h1>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Shipping Rates */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 playfair">Shipping Rates</h2>
            <p className="text-gray-700">
              Shipping is a flat rate of $9.99 per order up to $79. After that
              the shipping is free free free.
            </p>
          </motion.section>

          {/* Shipping Policy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 playfair">
              Shipping Policy
            </h2>
            <p className="text-gray-700 mb-6">
              Most order placed Monday through Thursday before 3PM Central Time
              ship the same day. We typically ship on Monday through Thursday to
              avoid you biltong being stuck in a 100F warehouse for the weekend.
            </p>
            <h3 className="text-xl font-bold mb-2">Fresh Sausages</h3>
            <p className="text-gray-700">
              We must ship fresh sausages 2nd day air which increases the
              shipping cost. Due to this all fresh sausages have the shipping
              cost included in the online sale price. In-store purchases do not
              incur this surcharge.
            </p>
          </motion.section>

          {/* Returns Policy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 playfair">Returns Policy</h2>
            <div className="space-y-4">
              <p className="text-gray-700 font-semibold">
                If goods are not fit for consumption on receipt of delivery
                date. PLEASE CONTACT US IMMEDIATELY (within 24 HRS of delivery).
              </p>
              <p className="text-gray-700 font-semibold">
                Product should not be consumed under any circumstances when
                there is doubt.
              </p>
              <div className="mt-6">
                <p className="text-gray-700 mb-2">
                  Angus Biltong has a money back guarantee Subject to:
                </p>
                <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                  <li>
                    Notification of defective/damaged product within 24 hrs. of
                    delivery
                  </li>
                  <li>
                    Pictures as proof must be send within 24 hrs. of delivery
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <p className="text-gray-700 mb-2">
                  Please use the contact us link to report any return.
                </p>
                <p className="text-gray-700 mb-2">
                  Include the following information:
                </p>
                <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                  <li>Order number</li>
                  <li>Delivery date</li>
                  <li>Pictures of product</li>
                  <li>Order date</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Refunds */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 playfair">Refunds</h2>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
              <li>Will be made in same method as payment</li>
              <li>
                Once refund is approved by Angus Biltong management refund will
                be done asap. (Allow 5 business day for refund to show on your
                account)
              </li>
            </ul>
            <p className="mt-6 text-gray-700">
              Angus Biltong is committed to service excellence and will deal
              with refunds as fairly and quickly as possible.
            </p>
            <p className="mt-6 text-gray-700 font-semibold italic">
              We want to affirm our commitment to delivering your favorite
              Treats to You!
            </p>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPage;
