"use client";

import { useEffect, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, ShoppingBag, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const type = searchParams.get("type");
  const [countdown, setCountdown] = useState(5);

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const customMessage = `Hello, I just placed an order! ${paymentId ? `My transaction ID is ${paymentId}.` : "I recently completed my purchase (COD)."} I would like to track my delivery status.`;
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(customMessage)}`;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = waLink;
    }
  }, [countdown, waLink]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-12">
      <div className="container max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", damping: 15 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <CheckCircle className="text-gold w-32 h-32" strokeWidth={1} />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
              transition={{ delay: 0.4, duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0 bg-gold/10 rounded-full -z-10"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-serif text-5xl md:text-6xl mb-6"
        >
          Order Confirmed
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-foreground/60 text-lg mb-12 max-w-md mx-auto"
        >
          {type === "cod" 
            ? "Your handmade art piece has been reserved. You can pay when it arrives at your doorstep." 
            : "Thank you for your purchase. We've received your payment and our artisans are beginning their work."}
        </motion.p>

        {paymentId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-sm text-xs uppercase tracking-widest text-foreground/40 mb-12"
          >
            Transaction ID: {paymentId}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/shop">
            <Button variant="secondary" className="gap-2 h-14 px-8">
              <ShoppingBag size={18} /> Continue Shopping
            </Button>
          </Link>
          <a href={waLink}>
            <Button className="gap-2 h-14 px-8 font-bold bg-[#25D366] hover:bg-[#128C7E] text-white border-none">
              <MessageCircle size={18} /> Message on WhatsApp ({countdown}s)
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
