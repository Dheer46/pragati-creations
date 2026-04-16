"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { initializeCheckout } = useRazorpay();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCOD, setIsCOD] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("cart"); // "cart" | "details"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.address && formData.city && formData.state && formData.pincode;

  const handleCheckout = async () => {
    if (isCOD) {
      setIsProcessing(true);
      try {
        const res = await fetch("/api/checkout/cod", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData, cart, amount: totalPrice })
        });
        const data = await res.json();
        if (data.success) {
          clearCart();
          window.location.href = `/checkout/success?type=cod&name=${encodeURIComponent(formData.name)}`;
        } else {
          console.error("COD error:", data.error);
          alert("Failed to process COD order. Please try again.");
        }
      } catch (err) {
        console.error("COD checkout failed", err);
      } finally {
        setIsProcessing(false);
      }
      return;
    }
    
    setIsProcessing(true);
    try {
      await initializeCheckout({
        amount: totalPrice,
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        formData,
        cart,
        onSuccess: () => {
          clearCart();
        }
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-foreground/10">
              <div className="flex items-center gap-4">
                {checkoutStep === "details" && (
                  <button onClick={() => setCheckoutStep("cart")} className="hover:text-gold transition-colors">
                    <X size={20} className="rotate-0 hover:rotate-90 transition-transform" />
                  </button>
                )}
                <h2 className="font-serif text-2xl">
                  {checkoutStep === "cart" ? "Your Cart" : "Shipping Details"}
                </h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="hover:text-gold transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {checkoutStep === "cart" ? (
                /* Cart Items Step */
                <>
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-foreground/50 space-y-4">
                      <ShoppingBag size={48} strokeWidth={1} />
                      <p className="font-sans">Your cart is empty.</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-4 border-b border-foreground/5 pb-6">
                        <div className="w-24 h-24 bg-foreground/5 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-serif text-lg leading-tight">{item.name}</h3>
                            <p className="text-sm text-foreground/60 mt-1">₹{item.price.toLocaleString()}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-foreground/20 rounded-sm">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-foreground/5">
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-foreground/5">
                                <Plus size={16} />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-xs text-foreground/60 underline hover:text-foreground">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </>
              ) : (
                /* Details Step */
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-foreground/60">Full Name</label>
                      <input 
                        type="text" name="name" value={formData.name} onChange={handleInputChange}
                        className="w-full bg-foreground/5 border border-foreground/10 rounded-sm p-3 focus:outline-none focus:border-gold transition-colors"
                        placeholder="Pragati Sharma"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-foreground/60">Email</label>
                        <input 
                          type="email" name="email" value={formData.email} onChange={handleInputChange}
                          className="w-full bg-foreground/5 border border-foreground/10 rounded-sm p-3 focus:outline-none focus:border-gold transition-colors"
                          placeholder="art@example.com"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-foreground/60">Phone</label>
                        <input 
                          type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                          className="w-full bg-foreground/5 border border-foreground/10 rounded-sm p-3 focus:outline-none focus:border-gold transition-colors"
                          placeholder="9876543210"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-foreground/60">Shipping Address</label>
                      <textarea 
                        name="address" value={formData.address} onChange={handleInputChange}
                        className="w-full bg-foreground/5 border border-foreground/10 rounded-sm p-3 focus:outline-none focus:border-gold transition-colors h-24 resize-none"
                        placeholder="Street address, Apartment, etc."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-foreground/60">City</label>
                        <input 
                          type="text" name="city" value={formData.city} onChange={handleInputChange}
                          className="w-full bg-foreground/5 border border-foreground/10 rounded-sm p-3 focus:outline-none focus:border-gold transition-colors"
                          placeholder="Jaipur"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-foreground/60">PIN Code</label>
                        <input 
                          type="text" name="pincode" value={formData.pincode} onChange={handleInputChange}
                          className="w-full bg-foreground/5 border border-foreground/10 rounded-sm p-3 focus:outline-none focus:border-gold transition-colors"
                          placeholder="302001"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-foreground/60">State</label>
                      <input 
                        type="text" name="state" value={formData.state} onChange={handleInputChange}
                        className="w-full bg-foreground/5 border border-foreground/10 rounded-sm p-3 focus:outline-none focus:border-gold transition-colors"
                        placeholder="Rajasthan"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-foreground/10 bg-background/50 backdrop-blur-md">
                
                {/* COD Toggle (Only show in Details step or always?) - Let's show it in Details step for clarity */}
                {checkoutStep === "details" && (
                  <div className="flex items-center justify-between mb-6 p-4 bg-foreground/5 border border-foreground/10 rounded-sm">
                    <div>
                      <p className="text-xs uppercase tracking-widest font-medium">Cash on Delivery</p>
                      <p className="text-[10px] text-foreground/50">Pay when you receive your art</p>
                    </div>
                    <button 
                      onClick={() => setIsCOD(!isCOD)}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        isCOD ? "bg-gold" : "bg-foreground/20"
                      )}
                    >
                      <motion.div 
                        animate={{ x: isCOD ? 24 : 4 }}
                        className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                      />
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans uppercase text-sm tracking-widest text-foreground/60">
                    {checkoutStep === "cart" ? "Subtotal" : "Total to Pay"}
                  </span>
                  <span className="font-serif text-2xl">₹{totalPrice.toLocaleString()}</span>
                </div>
                
                {checkoutStep === "cart" ? (
                  <Button 
                    className="w-full h-14 text-lg" 
                    onClick={() => setCheckoutStep("details")}
                  >
                    Proceed to Checkout
                  </Button>
                ) : (
                  <Button 
                    className="w-full h-14 text-lg" 
                    disabled={isProcessing || !isFormValid}
                    onClick={handleCheckout}
                  >
                    {isProcessing ? "Processing..." : isCOD ? "Place COD Order" : "Pay Securely"}
                  </Button>
                )}

                <p className="text-[10px] text-foreground/40 mt-4 text-center">
                  {checkoutStep === "cart" 
                    ? "Shipping & taxes calculated at next step." 
                    : "Secure 256-bit SSL Encrypted Payment."}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>

  );
}
