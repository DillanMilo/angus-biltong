"use client";

import { useState } from "react";
import NavMini from "@/app/components/NavMini";
import Footer from "@/app/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

type FormMode = "purchase" | "redeem" | "check";

export default function GiftCertificates() {
  const [mode, setMode] = useState<FormMode>("purchase");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    yourName: "",
    yourEmail: "",
    recipientName: "",
    recipientEmail: "",
    amount: "",
    message: "",
    theme: "general",
    understand: false,
    agree: false,
  });

  const [giftCode, setGiftCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === "purchase") {
        const response = await fetch("/api/gift-certificates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to create gift certificate");
        }

        const data = await response.json();
        setSuccess(`Gift certificate created successfully! Code: ${data.code}`);
        setFormData({
          yourName: "",
          yourEmail: "",
          recipientName: "",
          recipientEmail: "",
          amount: "",
          message: "",
          theme: "general",
          understand: false,
          agree: false,
        });
      } else if (mode === "check" || mode === "redeem") {
        const response = await fetch(`/api/gift-certificates?code=${giftCode}`);

        if (!response.ok) {
          throw new Error("Invalid gift certificate code");
        }

        const data = await response.json();
        setSuccess(`Balance: $${data.balance}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand">
      <NavMini />

      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[240px] overflow-hidden mt-24 sm:mt-28">
        <Image
          src="/image-5.jpg"
          alt="Gift Certificates"
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
            <h1 className="heading-xl text-white mb-4">Gift Certificates</h1>
            <div className="w-24 h-1 bg-amber mx-auto" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: "purchase", label: "Purchase" },
            { key: "redeem", label: "Redeem" },
            { key: "check", label: "Check Balance" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`font-display text-lg px-6 py-2 transition-all ${
                mode === tab.key
                  ? "bg-terracotta text-white"
                  : "bg-cream text-espresso hover:bg-sand border border-espresso/10"
              }`}
              onClick={() => setMode(tab.key as FormMode)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-terracotta/10 border border-terracotta/30 text-terracotta p-4 mb-6 font-body"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-olive/10 border border-olive/30 text-olive p-4 mb-6 font-body font-semibold"
          >
            {success}
          </motion.div>
        )}

        {mode === "purchase" ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-cream p-8 border border-[#2C2420]/8 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Purchaser Details */}
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Your Name <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  value={formData.yourName}
                  onChange={(e) =>
                    setFormData({ ...formData, yourName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Your Email <span className="text-terracotta">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  value={formData.yourEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, yourEmail: e.target.value })
                  }
                />
              </div>

              {/* Recipient Details */}
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Recipient&apos;s Name <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  value={formData.recipientName}
                  onChange={(e) =>
                    setFormData({ ...formData, recipientName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Recipient&apos;s Email <span className="text-terracotta">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  value={formData.recipientEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, recipientEmail: e.target.value })
                  }
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Amount <span className="text-terracotta">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>

              {/* Theme */}
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Gift Certificate Theme <span className="text-terracotta">*</span>
                </label>
                <div className="space-y-2 font-body">
                  {["Birthday", "Christmas", "General"].map((theme) => (
                    <label key={theme} className="flex items-center space-x-3 text-espresso/80 cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        value={theme.toLowerCase()}
                        checked={formData.theme === theme.toLowerCase()}
                        onChange={(e) =>
                          setFormData({ ...formData, theme: e.target.value })
                        }
                        className="w-4 h-4 accent-terracotta"
                      />
                      <span>{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                Optional Message
              </label>
              <textarea
                className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body h-32 resize-none"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            {/* Terms */}
            <div className="space-y-3 font-body text-espresso/80">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.understand}
                  onChange={(e) =>
                    setFormData({ ...formData, understand: e.target.checked })
                  }
                  className="w-5 h-5 mt-0.5 accent-terracotta"
                />
                <span>
                  I understand that Gift Certificates expire after 1825 days
                </span>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agree}
                  onChange={(e) =>
                    setFormData({ ...formData, agree: e.target.checked })
                  }
                  className="w-5 h-5 mt-0.5 accent-terracotta"
                />
                <span>
                  I agree that Gift Certificates are nonrefundable
                </span>
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!formData.understand || !formData.agree || loading}
                className={`btn-primary px-8 ${
                  !formData.understand || !formData.agree
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading ? "Processing..." : "Purchase Gift Certificate"}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-cream p-8 border border-[#2C2420]/8 space-y-6"
          >
            <div>
              <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                Gift Certificate Code <span className="text-terracotta">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                value={giftCode}
                onChange={(e) => setGiftCode(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-8"
              >
                {loading
                  ? "Processing..."
                  : mode === "redeem"
                  ? "Redeem Certificate"
                  : "Check Balance"}
              </button>
            </div>
          </motion.form>
        )}
      </div>
      <Footer />
    </div>
  );
}
