"use client";

import { use, useState } from "react";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Check, FastForward, ShieldCheck, ShoppingCart, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProductDetail({ params }) {
  // Extract id from params
  const { id } = use(params);
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find(p => p.id === id);
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return notFound();

  const handleBuyNow = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6">

        <Link href="/shop" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-foreground/60 hover:text-foreground mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">

          {/* Image Gallery */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`relative bg-foreground/5 overflow-hidden cursor-zoom-in ${isZoomed ? "fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-10 cursor-zoom-out" : "aspect-[4/5] md:aspect-auto md:h-[700px]"}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={`${product.image}?w=1200&q=90`}
                alt={product.name}
                className={`object-cover ${isZoomed ? "max-h-full max-w-full object-contain" : "w-full h-full"}`}
              />
            </motion.div>
          </div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-2 text-gold tracking-widest uppercase text-xs font-medium">
              {product.category}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
              {product.name}
            </h1>
            <p className="font-sans text-2xl text-foreground/80 mb-8">₹{product.price.toLocaleString()}</p>

            <p className="font-sans text-foreground/70 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            <div className="space-y-4 mb-10 text-sm font-sans text-foreground/80 bg-foreground/5 p-6 border border-foreground/10">
              <div className="flex gap-3">
                <ShieldCheck size={20} className="text-gold shrink-0" />
                <span><strong className="text-foreground font-medium uppercase tracking-wider text-xs block mb-1">Materials</strong> {product.materials}</span>
              </div>
              <div className="flex gap-3">
                <FastForward size={20} className="text-gold shrink-0" />
                <span><strong className="text-foreground font-medium uppercase tracking-wider text-xs block mb-1">Processing Time</strong> {product.processingTime}</span>
              </div>
              <div className="flex gap-3 text-gold bg-gold/10 p-3 mt-4">
                <Check size={20} className="shrink-0" />
                <span>Customization available upon request via Contact Us.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                variant="secondary"
                size="lg" 
                className="flex-1 h-16 text-lg gap-2" 
                onClick={() => {
                  addToCart(product);
                  setAddedToCart(true);
                  setTimeout(() => setAddedToCart(false), 2000);
                }}
              >
                {addedToCart ? (
                  <><Check size={20} /> Added!</>
                ) : (
                  <><ShoppingCart size={20} /> Add to Cart</>
                )}
              </Button>
              <Button 
                size="lg" 
                className="flex-1 h-16 text-lg gap-2" 
                onClick={handleBuyNow}
              >
                <Zap size={20} fill="currentColor" /> Buy Now
              </Button>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
