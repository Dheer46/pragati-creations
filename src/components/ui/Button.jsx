"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const buttonVariants = {
  primary: "bg-foreground text-background hover:opacity-90 transition-opacity",
  secondary: "bg-transparent border border-gold text-gold hover:bg-gold hover:text-white transition-colors",
  ghost: "bg-transparent text-foreground hover:bg-foreground/5",
};

export const Button = forwardRef(({ className, variant = "primary", size = "default", children, ...props }, ref) => {
  const sizes = {
    default: "px-6 py-3 text-sm tracking-wide",
    sm: "px-4 py-2 text-xs",
    lg: "px-8 py-4 text-base tracking-widest",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center font-sans font-medium uppercase transition-colors duration-300",
        buttonVariants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";
