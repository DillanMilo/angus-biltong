"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fallbackCountries } from "@/utils/fallbackCountries";

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
    <section className="max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Account</h2>

      <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
        <h3 className="text-lg font-semibold mb-3">
          Create an account with us and you&apos;ll be able to:
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Check out faster</li>
          <li>Save multiple shipping addresses</li>
          <li>Access your order history</li>
          <li>Track new orders</li>
          <li>Save items to your Wish List</li>
        </ul>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          required
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          required
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          className="border p-2"
          onChange={handleChange}
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          required
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="address1"
          type="text"
          placeholder="Address Line 1"
          required
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="address2"
          type="text"
          placeholder="Address Line 2 (Optional)"
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="city"
          type="text"
          placeholder="City"
          required
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="state"
          type="text"
          placeholder="State"
          required
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="zip"
          type="text"
          placeholder="ZIP Code"
          required
          className="border p-2"
          onChange={handleChange}
        />
        <select
          name="country"
          required
          className="border p-2"
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

        <button
          type="submit"
          className="col-span-2 bg-green-600 text-white p-3 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </section>
  );
}
