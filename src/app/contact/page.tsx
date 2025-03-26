"use client";

import NavMini from "@/app/components/NavMini";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";
import { useState } from "react";

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
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      orderNumber: "",
      companyName: "",
      rmaNumber: "",
      comments: "",
    });
    // You could add a success message here
  };

  return (
    <div className="min-h-screen pt-20 bg-[#f4f8f1]">
      <NavMini />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Title and Introduction */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-6 playfair underline">
            Contact Us
          </h1>
          <p className="text-gray-700 mb-4">
            We&apos;re happy to answer questions or help you with returns.
            Please fill out the form below if you need assistance.
          </p>
          <p className="text-gray-700">
            If you are local, our store is located at{" "}
            <span className="font-semibold">
              255 Sawdust Road in Spring Texas
            </span>
            , come on in and see for yourself. or call us at{" "}
            <a
              href="tel:281-719-8577"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              281-719-8577
            </a>
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="fullName">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="phone">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="orderNumber">
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.orderNumber}
                onChange={(e) =>
                  setFormData({ ...formData, orderNumber: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="companyName">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="rmaNumber">
                RMA Number
              </label>
              <input
                type="text"
                id="rmaNumber"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.rmaNumber}
                onChange={(e) =>
                  setFormData({ ...formData, rmaNumber: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="comments">
              Comments/Questions *
            </label>
            <textarea
              id="comments"
              required
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.comments}
              onChange={(e) =>
                setFormData({ ...formData, comments: e.target.value })
              }
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-700 transition-colors"
            type="submit"
          >
            Submit Form
          </motion.button>
        </motion.form>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
