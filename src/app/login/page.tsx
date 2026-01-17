"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import NavMini from "@/app/components/NavMini";
import Footer from "@/app/components/Footer";

interface LoginError extends Error {
  message: string;
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("customer", JSON.stringify(data.customer));
      router.push("/account");
    } catch (err) {
      const error = err as LoginError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand">
      <NavMini />
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] pt-36 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-cream p-8 md:p-10 border border-[#2C2420]/8 max-w-md w-full"
        >
          {/* Logo or Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-terracotta rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          <h2 className="heading-lg text-espresso text-center mb-2">Welcome Back</h2>
          <p className="font-body text-espresso/70 text-center mb-8">
            Please sign in to your account
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-terracotta/10 border border-terracotta/30 text-terracotta p-3 text-sm mb-6 font-body"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-condensed uppercase tracking-wider text-sm text-espresso/70 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 bg-sand border border-espresso/20 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition font-body"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center pt-4 border-t border-espresso/10">
              <Link
                href="/register"
                className="font-body text-terracotta hover:text-terracotta-dark transition-colors text-sm"
              >
                Don&apos;t have an account? <span className="font-semibold">Create one here</span>
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
