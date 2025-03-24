"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define Cart Item Type
interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  sku?: string;
  variant_id?: number;
  product_id?: number;
}

// Add Product interface
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  category?: string;
}

// Define Context Type
interface CartContextType {
  cart: CartItem[];
  isLoading: boolean;
  error: Error | null;
  addToCart: (product: CartItem) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  products: Product[];
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Context Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Traditional Biltong",
      price: 15.99,
      imageUrl: "/products/biltong-traditional.jpg",
      category: "dried-meats",
    },
    {
      id: 2,
      name: "Peri-Peri Biltong",
      price: 16.99,
      imageUrl: "/products/biltong-peri.jpg",
      category: "dried-meats",
    },
    {
      id: 3,
      name: "Droewors",
      price: 14.99,
      imageUrl: "/products/droewors.jpg",
      category: "sausage",
    },
    {
      id: 4,
      name: "Boerewors",
      price: 18.99,
      imageUrl: "/products/boerewors.jpg",
      category: "sausage",
    },
    // Add more products as needed
  ]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      setIsLoading(true);
      const storedCart = localStorage.getItem("cart");
      if (storedCart) setCart(JSON.parse(storedCart));
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      setError(err as Error);
    }
  }, [cart]);

  // Update functions to return Promises
  const addToCart = async (product: CartItem) => {
    try {
      setIsLoading(true);
      setCart((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);
        if (existingItem) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      setIsLoading(true);
      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    try {
      setIsLoading(true);
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      setCart([]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    cart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    products,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom Hook to Use Cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
