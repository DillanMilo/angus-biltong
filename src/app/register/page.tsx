"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to create account");
      }

      router.push("/login"); // Redirect to login page after successful registration
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Account</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="email"
          type="email"
          placeholder="Email Address"
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
        >
          <option value="">Choose a Country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          {/* Add more country options */}
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
