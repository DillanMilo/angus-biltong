"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fallbackCountries } from "@/utils/fallbackCountries";
import { motion } from "framer-motion";
import NavMini from "@/app/components/NavMini";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [countries] = useState(fallbackCountries);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    state: "",
    zip: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const phoneRegex = /^\+?[\d\s-]+$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      router.push("/login?registered=true");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand">
      <NavMini />
      <section className="max-w-4xl mx-auto py-12 px-6 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="heading-lg text-espresso mb-4">Create Account</h2>
            <div className="w-24 h-1 bg-amber mx-auto" />
          </div>

          <div className="bg-cream p-6 md:p-8 border border-[#2C2420]/8 mb-8">
            <h3 className="font-display text-xl text-espresso mb-4">
              CREATE AN ACCOUNT WITH US AND YOU&apos;LL BE ABLE TO:
            </h3>
            <ul className="space-y-2 font-body text-espresso/80">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                Check out faster
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                Save multiple shipping addresses
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                Access your order history
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                Track new orders
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                Save items to your Wish List
              </li>
            </ul>
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

          <form
            onSubmit={handleSubmit}
            className="bg-cream p-6 md:p-8 border border-[#2C2420]/8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  First Name <span className="text-terracotta">*</span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Last Name <span className="text-terracotta">*</span>
                </label>
                <input
                  name="lastName"
                  type="text"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Password <span className="text-terracotta">*</span>
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Confirm Password <span className="text-terracotta">*</span>
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Email Address <span className="text-terracotta">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Phone Number <span className="text-terracotta">*</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Address Line 1 <span className="text-terracotta">*</span>
                </label>
                <input
                  name="address1"
                  type="text"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Address Line 2 (Optional)
                </label>
                <input
                  name="address2"
                  type="text"
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  City <span className="text-terracotta">*</span>
                </label>
                <input
                  name="city"
                  type="text"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  State <span className="text-terracotta">*</span>
                </label>
                <input
                  name="state"
                  type="text"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  ZIP Code <span className="text-terracotta">*</span>
                </label>
                <input
                  name="zip"
                  type="text"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                  Country <span className="text-terracotta">*</span>
                </label>
                <select
                  name="country"
                  required
                  className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                  onChange={handleChange}
                  value={formData.country}
                >
                  <option value="">Select a Country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-8"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center mt-6 pt-6 border-t border-espresso/10">
              <Link
                href="/login"
                className="font-body text-terracotta hover:text-terracotta-dark transition-colors text-sm"
              >
                Already have an account? <span className="font-semibold">Sign in here</span>
              </Link>
            </div>
          </form>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
