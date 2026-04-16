"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

export const useRazorpay = () => {
  const router = useRouter();
  const { addToast } = useToast();

  const loadScript = useCallback((src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initializeCheckout = useCallback(async ({ 
    amount, 
    name = "Pragati Creations", 
    description = "Handmade Luxury Art",
    email = "",
    contact = "",
    onSuccess,
    onFailure,
    address = "Pragati Creations Headquarters",
    formData,
    cart
  }) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      addToast("Razorpay SDK failed to load. Please check your connection.", "error");
      return;
    }

    // 1. Create Order in Backend
    const orderRes = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const orderData = await orderRes.json();

    if (orderData.error) {
      addToast("Failed to create order. Please try again.", "error");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: orderData.amount,
      currency: "INR",
      name,
      description,
      image: "/favicon.ico", // Using favicon as fallback logo
      order_id: orderData.order_id,
      handler: async function (response) {
        // 2. Verify Payment in Backend
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            formData,
            cart,
            amount: amount
          }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          if (onSuccess) onSuccess(verifyData, response);
          router.push(`/checkout/success?payment_id=${response.razorpay_payment_id}`);
        } else {
          if (onFailure) onFailure(verifyData);
          router.push("/checkout/failure");
        }
      },
      prefill: {
        name,
        email,
        contact,
      },
      notes: {
        address: address,
      },
      theme: {
        color: "#d4af37", // Matching our Gold theme
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.error("Payment Failed:", response.error);
      router.push("/checkout/failure");
    });
  }, [loadScript, router]);

  return { initializeCheckout };
};
