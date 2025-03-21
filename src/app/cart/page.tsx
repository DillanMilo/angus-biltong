"use client";

import { useCart } from "@/app/cart/cartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import NavMini from "@/app/components/NavMini";
import { Truck, PartyPopper, ChevronDown, ChevronUp } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  const FREE_SHIPPING_THRESHOLD = 79;
  const SHIPPING_RATE = 9.99;
  const [couponCode, setCouponCode] = useState("");
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
  const total = subtotal + shippingCost;

  const handleQuantityChange = async (id: number, quantity: number) => {
    if (quantity < 1) return;
    setIsUpdating(id);
    await updateQuantity(id, quantity);
    setIsUpdating(null);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      // Reset any previous errors
      setCouponError(null);

      const response = await fetch(`/api/cart/coupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          couponCode: couponCode.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to apply coupon");
      }

      setAppliedCoupon(couponCode);
      setCouponCode("");
      setIsCouponOpen(false);
    } catch (error: unknown) {
      // Type error as unknown
      if (error instanceof Error) {
        setCouponError(error.message || "Invalid coupon code");
      } else {
        setCouponError("Invalid coupon code");
      }
    }
  };

  // Notification components
  const FreeShippingAlert = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-green-100 border-l-4 border-green-500 p-4 mb-4 rounded-r"
    >
      <div className="flex items-center gap-2">
        <PartyPopper className="text-green-500" size={24} />
        <p className="text-green-700">
          Congratulations! Your order qualifies for FREE shipping!
        </p>
      </div>
    </motion.div>
  );

  const NearFreeShippingAlert = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4 rounded-r"
    >
      <div className="flex items-center gap-2">
        <Truck className="text-blue-500" size={24} />
        <p className="text-blue-700">
          Add just ${amountToFreeShipping.toFixed(2)} more to get FREE shipping!
        </p>
      </div>
    </motion.div>
  );

  return (
    <>
      <NavMini />
      <section className="max-w-6xl mx-auto px-4 py-12 mt-20">
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

        {/* Shipping Alerts */}
        <AnimatePresence>
          {subtotal >= FREE_SHIPPING_THRESHOLD && <FreeShippingAlert />}
          {subtotal > 0 &&
            subtotal < FREE_SHIPPING_THRESHOLD &&
            amountToFreeShipping <= 10 && <NearFreeShippingAlert />}
        </AnimatePresence>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="lg:col-span-2 space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.1 },
                    },
                  }}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="relative w-24 h-24">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                        disabled={isUpdating === item.id}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, Number(e.target.value))
                        }
                        className="w-12 text-center border-x py-1"
                        min="1"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                        disabled={isUpdating === item.id}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      disabled={isUpdating === item.id}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Shipping (US ONLY)</span>
                    <span>
                      {subtotal >= FREE_SHIPPING_THRESHOLD
                        ? "FREE"
                        : `$${SHIPPING_RATE.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="border-t pt-2">
                    <button
                      onClick={() => setIsCouponOpen(!isCouponOpen)}
                      className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-800"
                    >
                      <span>Add Coupon Code</span>
                      {isCouponOpen ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>

                    {isCouponOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) =>
                                setCouponCode(e.target.value.toUpperCase())
                              }
                              placeholder="Enter code"
                              className="flex-1 px-3 py-1 border rounded-md text-sm uppercase"
                            />
                            <button
                              onClick={handleApplyCoupon}
                              disabled={!couponCode.trim()}
                              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              Apply
                            </button>
                          </div>
                          {couponError && (
                            <p className="text-red-500 text-sm">
                              {couponError}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {appliedCoupon && (
                      <div className="flex items-center justify-between mt-2 text-green-600 text-sm">
                        <span>Coupon {appliedCoupon} applied!</span>
                        <button
                          onClick={() => setAppliedCoupon(null)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold mb-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    className="block w-full bg-green-600 text-white text-center py-3 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default CartPage;
