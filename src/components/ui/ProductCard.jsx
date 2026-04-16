"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Eye, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div 
      className="group relative flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative aspect-[4/5] bg-foreground/5 overflow-hidden mb-4">
        {product.isBestSeller && (
          <div className="absolute top-4 left-4 z-10 bg-background text-foreground text-[10px] tracking-widest uppercase px-3 py-1 font-medium">
            Best Seller
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all shadow-sm"
        >
          <Heart
            size={16}
            className={wishlisted ? "fill-gold text-gold" : "text-foreground/40 hover:text-gold"}
            strokeWidth={wishlisted ? 0 : 1.5}
          />
        </button>
        
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <motion.img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Hover Actions */}
        <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
          <button 
            onClick={() => addToCart(product)}
            className="flex-1 bg-background text-foreground h-12 flex items-center justify-center gap-2 hover:bg-gold hover:text-background transition-colors text-sm font-medium uppercase tracking-wide"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
          <Link 
            href={`/product/${product.id}`}
            className="w-12 h-12 bg-background text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>

      <div className="text-center px-4">
        <h3 className="font-serif text-lg leading-snug mb-2 group-hover:text-gold transition-colors">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-foreground/70 font-sans">₹{product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
}
