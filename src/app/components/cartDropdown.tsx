"use client";

import { useCart } from "@/app/cart/cartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CartDropdown = () => {
  const { cart, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* 🛒 Cart Icon */}
      <button onClick={() => setIsOpen(!isOpen)} className="relative">
        <ShoppingCart size={28} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {cart.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md p-4">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 rounded"
                    />
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <Link href="/cart">
                <button className="mt-3 w-full bg-green-600 text-white py-2 rounded">
                  View Cart
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
