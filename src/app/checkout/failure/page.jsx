"use client";

import { motion } from "framer-motion";
import { XCircle, RefreshCcw, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function FailurePage() {
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
            <XCircle className="text-red-500 w-32 h-32" strokeWidth={1} />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
              transition={{ delay: 0.4, duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0 bg-red-500/10 rounded-full -z-10"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-serif text-5xl md:text-6xl mb-6"
        >
          Payment Failed
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-foreground/60 text-lg mb-12 max-w-md mx-auto"
        >
          We couldn't process your transaction. This could be due to a bank error or a timeout. Don't worry, no funds were deducted.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            variant="secondary" 
            className="gap-2 h-14 px-8"
            onClick={() => window.history.back()}
          >
            <RefreshCcw size={18} /> Try Again
          </Button>
          <Link href="/contact">
            <Button className="gap-2 h-14 px-8">
              <HelpCircle size={18} /> Contact Support
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
