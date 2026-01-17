"use client";

import NavMini from "@/app/components/NavMini";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";
import { useState } from "react";
import Image from "next/image";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    orderNumber: "",
    companyName: "",
    rmaNumber: "",
    comments: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      orderNumber: "",
      companyName: "",
      rmaNumber: "",
      comments: "",
    });
  };

  return (
    <div className="min-h-screen bg-sand">
      <NavMini />

      {/* Hero Section */}
      <section className="relative h-[35vh] min-h-[280px] overflow-hidden mt-32 sm:mt-36">
        <Image
          src="/image-5.jpg"
          alt="Contact Us"
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
            <h1 className="heading-xl text-white mb-4">Contact Us</h1>
            <div className="w-24 h-1 bg-amber mx-auto" />
          </motion.div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-espresso/80 text-lg mb-4 max-w-2xl mx-auto">
            We&apos;re happy to answer questions or help you with returns.
            Please fill out the form below if you need assistance.
          </p>
          <p className="font-body text-espresso/80">
            If you are local, our store is located at{" "}
            <span className="font-semibold text-espresso">
              255 Sawdust Road in Spring Texas
            </span>
            , come on in and see for yourself. Or call us at{" "}
            <a
              href="tel:281-719-8577"
              className="text-terracotta hover:text-terracotta-dark font-semibold transition-colors"
            >
              281-719-8577
            </a>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Location Card */}
            <div className="card-product bg-cream p-6">
              <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-espresso mb-2">LOCATION</h3>
              <p className="font-body text-espresso/80">
                255 Sawdust Rd<br />
                Spring Texas, 77380
              </p>
            </div>

            {/* Phone Card */}
            <div className="card-product bg-cream p-6">
              <div className="w-12 h-12 bg-olive rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-espresso mb-2">PHONE</h3>
              <a
                href="tel:281-719-8577"
                className="font-body text-terracotta hover:text-terracotta-dark transition-colors text-lg font-semibold"
              >
                281-719-8577
              </a>
            </div>

            {/* Hours Card */}
            <div className="card-product bg-cream p-6">
              <div className="w-12 h-12 bg-amber rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-espresso mb-2">HOURS</h3>
              <div className="font-body text-espresso/80 text-sm space-y-1">
                <p>Mon - Fri: 10am - 6pm</p>
                <p>Saturday: 10am - 5pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 bg-cream p-8 border border-[#2C2420]/8"
            onSubmit={handleSubmit}
          >
            <h2 className="heading-md text-espresso mb-8">Send Us a Message</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2" htmlFor="fullName">
                  Full Name <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors font-body"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2" htmlFor="phone">
                  Phone Number <span className="text-terracotta">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors font-body"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2" htmlFor="email">
                  Email Address <span className="text-terracotta">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors font-body"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2" htmlFor="orderNumber">
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors font-body"
                  value={formData.orderNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, orderNumber: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2" htmlFor="companyName">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors font-body"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2" htmlFor="rmaNumber">
                  RMA Number
                </label>
                <input
                  type="text"
                  id="rmaNumber"
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors font-body"
                  value={formData.rmaNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, rmaNumber: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2" htmlFor="comments">
                Comments/Questions <span className="text-terracotta">*</span>
              </label>
              <textarea
                id="comments"
                required
                rows={5}
                className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors font-body resize-none"
                value={formData.comments}
                onChange={(e) =>
                  setFormData({ ...formData, comments: e.target.value })
                }
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full mt-8"
              type="submit"
            >
              Submit Form
            </motion.button>
          </motion.form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
