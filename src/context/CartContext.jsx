"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getCartByEmail, syncCartToSupabase } from "../lib/supabaseCart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Initial Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("pragati-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 2. Sync with Supabase on login (Merge Logic)
  useEffect(() => {
    const syncCloudCart = async () => {
      if (status === "authenticated" && session?.user?.email) {
        const cloudCart = await getCartByEmail(session.user.email);
        
        if (cloudCart.length > 0) {
          setCart((prevCart) => {
            const merged = [...prevCart];
            cloudCart.forEach((cloudItem) => {
              const existingIndex = merged.findIndex(item => item.id === cloudItem.id);
              if (existingIndex > -1) {
                merged[existingIndex].quantity = Math.max(merged[existingIndex].quantity, cloudItem.quantity);
              } else {
                merged.push(cloudItem);
              }
            });
            return merged;
          });
        }
        setIsInitialized(true);
      } else if (status === "unauthenticated") {
        setIsInitialized(true);
      }
    };

    syncCloudCart();
  }, [status, session]);

  // 3. Save changes to both localStorage and Supabase
  useEffect(() => {
    localStorage.setItem("pragati-cart", JSON.stringify(cart));

    if (isInitialized && status === "authenticated" && session?.user?.email) {
      const timeoutId = setTimeout(() => {
        syncCartToSupabase(session.user.email, cart);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [cart, session, status, isInitialized]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
