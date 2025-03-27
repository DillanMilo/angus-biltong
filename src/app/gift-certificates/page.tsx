"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NavMini from "@/app/components/NavMini";

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
        // Reset form
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
    <>
      <NavMini />
      <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-8 font-playfair">
          Gift Certificates
        </h1>

        <div className="flex justify-center space-x-8 mb-12">
          <button
            className={`font-semibold ${
              mode === "purchase"
                ? "border-b-2 border-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setMode("purchase")}
          >
            Purchase Gift Certificate
          </button>
          <button
            className={`${
              mode === "redeem"
                ? "border-b-2 border-black font-semibold"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setMode("redeem")}
          >
            Redeem Gift Certificate
          </button>
          <button
            className={`${
              mode === "check"
                ? "border-b-2 border-black font-semibold"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setMode("check")}
          >
            Check Gift Certificate Balance
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        {mode === "purchase" ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Purchaser Details */}
              <div>
                <label className="block mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.yourName}
                  onChange={(e) =>
                    setFormData({ ...formData, yourName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.yourEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, yourEmail: e.target.value })
                  }
                />
              </div>

              {/* Recipient Details */}
              <div>
                <label className="block mb-2">
                  Recipient's Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.recipientName}
                  onChange={(e) =>
                    setFormData({ ...formData, recipientName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">
                  Recipient's Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.recipientEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, recipientEmail: e.target.value })
                  }
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block mb-2">
                  Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full p-2 border rounded"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>

              {/* Theme */}
              <div>
                <label className="block mb-2">
                  Gift Certificate Theme <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {["Birthday", "Christmas", "General"].map((theme) => (
                    <label key={theme} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="theme"
                        value={theme.toLowerCase()}
                        checked={formData.theme === theme.toLowerCase()}
                        onChange={(e) =>
                          setFormData({ ...formData, theme: e.target.value })
                        }
                      />
                      <span>{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2">Optional Message</label>
              <textarea
                className="w-full p-2 border rounded h-32"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            {/* Terms */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  required
                  checked={formData.understand}
                  onChange={(e) =>
                    setFormData({ ...formData, understand: e.target.checked })
                  }
                  className="form-checkbox"
                />
                <span className="text-gray-700">
                  I understand that Gift Certificates expire after 1825 days
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  required
                  checked={formData.agree}
                  onChange={(e) =>
                    setFormData({ ...formData, agree: e.target.checked })
                  }
                  className="form-checkbox"
                />
                <span className="text-gray-700">
                  I agree that Gift Certificates are nonrefundable
                </span>
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!formData.understand || !formData.agree}
                className={`px-8 py-3 rounded transition ${
                  formData.understand && formData.agree
                    ? "bg-[#0BDA51] text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Purchase Gift Certificate
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2">
                Gift Certificate Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded"
                value={giftCode}
                onChange={(e) => setGiftCode(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#0BDA51] text-white px-8 py-3 rounded hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : mode === "redeem"
                  ? "Redeem Certificate"
                  : "Check Balance"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
