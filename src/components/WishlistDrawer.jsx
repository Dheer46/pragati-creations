"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import Link from "next/link";

export function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={() => setIsWishlistOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-foreground/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-foreground/5">
              <div className="flex items-center gap-3">
                <Heart size={20} className="text-gold fill-gold" />
                <h2 className="font-serif text-xl">Wishlist</h2>
                <span className="text-xs bg-foreground/5 text-foreground/60 px-2 py-1 rounded-full font-bold">
                  {wishlist.length}
                </span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="text-foreground/40 hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-6">
                  <Heart size={48} className="text-foreground/10" />
                  <div>
                    <p className="font-serif text-lg mb-2">Your wishlist is empty</p>
                    <p className="text-foreground/50 text-sm">Save your favorite pieces for later</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsWishlistOpen(false)}
                    className="uppercase tracking-widest text-xs"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {wishlist.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 group"
                    >
                      <Link
                        href={`/product/${item.id}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="w-20 h-24 bg-foreground/5 overflow-hidden rounded-lg flex-shrink-0"
                      >
                        <img src={`${item.image}?w=200&q=80`} alt={item.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.id}`}
                          onClick={() => setIsWishlistOpen(false)}
                          className="font-serif text-sm hover:text-gold transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-foreground/50 text-xs mt-1">{item.category}</p>
                        <p className="text-sm font-bold mt-2">₹{item.price.toLocaleString()}</p>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => {
                              addToCart(item);
                              removeFromWishlist(item.id);
                            }}
                            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-gold hover:text-foreground transition-colors"
                          >
                            <ShoppingCart size={12} /> Move to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-foreground/30 hover:text-red-500 transition-colors ml-4"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
