"use client";

import { useCart } from "@/app/cart/cartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import NavMini from "@/app/components/NavMini";
import Footer from "@/app/components/Footer";
import { Truck, PartyPopper, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";

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
      if (error instanceof Error) {
        setCouponError(error.message || "Invalid coupon code");
      } else {
        setCouponError("Invalid coupon code");
      }
    }
  };

  const FreeShippingAlert = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-olive/10 border-l-4 border-olive p-4 mb-6"
    >
      <div className="flex items-center gap-3">
        <PartyPopper className="text-olive" size={24} />
        <p className="font-body text-olive font-semibold">
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
      className="bg-amber/10 border-l-4 border-amber p-4 mb-6"
    >
      <div className="flex items-center gap-3">
        <Truck className="text-amber-dark" size={24} />
        <p className="font-body text-espresso">
          Add just <span className="text-terracotta font-semibold">${amountToFreeShipping.toFixed(2)}</span> more to get FREE shipping!
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-sand">
      <NavMini />
      <section className="max-w-6xl mx-auto px-4 py-12 pt-32">
        <div className="text-center mb-8">
          <h2 className="heading-lg text-espresso mb-4">Shopping Cart</h2>
          <div className="w-24 h-1 bg-amber mx-auto" />
        </div>

        <AnimatePresence>
          {subtotal >= FREE_SHIPPING_THRESHOLD && <FreeShippingAlert />}
          {subtotal > 0 &&
            subtotal < FREE_SHIPPING_THRESHOLD &&
            amountToFreeShipping <= 10 && <NearFreeShippingAlert />}
        </AnimatePresence>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-cream border border-[#2C2420]/8"
          >
            <div className="w-20 h-20 bg-espresso/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-espresso/40" />
            </div>
            <p className="font-body text-espresso/70 mb-6 text-lg">Your cart is empty.</p>
            <Link href="/products" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </motion.div>
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
                  className="flex flex-col sm:flex-row items-center gap-4 bg-cream p-4 border border-[#2C2420]/8"
                >
                  <div className="relative w-24 h-24">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-display text-lg text-espresso">{item.name}</h3>
                    <p className="font-body text-terracotta font-semibold">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-espresso/20">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 hover:bg-sand transition-colors font-body"
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
                        className="w-12 text-center border-x border-espresso/20 py-1 bg-transparent font-body"
                        min="1"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-sand transition-colors font-body"
                        disabled={isUpdating === item.id}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-terracotta hover:text-terracotta-dark transition-colors font-condensed uppercase tracking-wider text-sm"
                      disabled={isUpdating === item.id}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="lg:col-span-1">
              <div className="bg-cream p-6 border border-[#2C2420]/8 sticky top-28">
                <h3 className="heading-md text-espresso mb-6">Order Summary</h3>
                <div className="space-y-3 font-body text-espresso/80 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-espresso font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-espresso/10 pt-3">
                    <span>Shipping (US ONLY)</span>
                    <span className={subtotal >= FREE_SHIPPING_THRESHOLD ? "text-olive font-semibold" : "text-espresso font-semibold"}>
                      {subtotal >= FREE_SHIPPING_THRESHOLD
                        ? "FREE"
                        : `$${SHIPPING_RATE.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="border-t border-espresso/10 pt-3">
                    <button
                      onClick={() => setIsCouponOpen(!isCouponOpen)}
                      className="flex items-center justify-between w-full text-left text-espresso/70 hover:text-espresso transition-colors"
                    >
                      <span className="font-condensed uppercase tracking-wider text-sm">Add Coupon Code</span>
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
                        className="mt-3"
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
                              className="flex-1 px-3 py-2 bg-sand border border-espresso/20 text-sm uppercase font-body focus:outline-none focus:border-terracotta"
                            />
                            <button
                              onClick={handleApplyCoupon}
                              disabled={!couponCode.trim()}
                              className="btn-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Apply
                            </button>
                          </div>
                          {couponError && (
                            <p className="text-terracotta text-sm">
                              {couponError}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {appliedCoupon && (
                      <div className="flex items-center justify-between mt-3 text-olive text-sm">
                        <span className="font-semibold">Coupon {appliedCoupon} applied!</span>
                        <button
                          onClick={() => setAppliedCoupon(null)}
                          className="text-terracotta hover:text-terracotta-dark"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-t border-espresso/10 pt-4">
                  <div className="flex justify-between font-display text-xl text-espresso mb-6">
                    <span>TOTAL</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    className="btn-primary block w-full text-center"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default CartPage;
