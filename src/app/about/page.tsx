"use client";

import NavMini from "@/app/components/NavMini";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#f4f8f1]">
      <NavMini />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-center playfair underline"
        >
          About Us
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 rounded-lg shadow-lg space-y-8"
        >
          {/* Company Description */}
          <section className="space-y-4">
            <p className="text-gray-700">
              We are based out of Spring Texas. We have been making and
              experimenting with biltong and droëwors in the USA for 20+ years,
              treating our friends to these special delicatesse. After years of
              encouragement from friends and family we took the leap of faith
              and started Angus Biltong. Our goal it to provide a quality
              product at a price everyone can afford and feel good about.
            </p>
            <p className="text-gray-700">
              We also carry a large selection South African groceries in store
              and will soon be selling them online too.
            </p>
          </section>

          {/* Store Hours */}
          <section>
            <h2 className="text-2xl font-bold mb-4 playfair">Store Hours:</h2>
            <div className="space-y-2 text-gray-700">
              <p>Monday - Friday - 10am - 6pm</p>
              <p>Saturday - 10am - 5pm</p>
              <p>Sunday - Closed</p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="text-gray-700">
              <p>
                <span className="font-semibold">Address:</span> 255 Sawdust rd,
                Spring Texas, 77380
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a
                  href="tel:281-719-8577"
                  className="text-green-600 hover:text-green-700"
                >
                  281-719-8577
                </a>
              </p>
            </div>
          </section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
