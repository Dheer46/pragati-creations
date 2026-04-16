"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, Menu, User, LogOut, Package } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "./SearchOverlay";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems, setIsWishlistOpen } = useWishlist();
  const { scrollY } = useScroll();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          isScrolled ? "py-2" : "py-4 md:py-4"
        )}
      >
        <div className="container mx-auto px-6">
          <div className={cn(
            "flex items-center justify-between px-8 py-3 transition-all duration-700 rounded-full",
            isScrolled ? "bg-background/90 backdrop-blur-xl border border-foreground/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]" : "bg-transparent"
          )}>
            
            {/* Mobile Menu */}
            <button className="md:hidden text-foreground">
              <Menu strokeWidth={1} size={24} />
            </button>

            {/* Nav Links (Desktop - Left) */}
            <nav className="hidden md:flex items-center gap-10 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-foreground/70">
              <Link href="/shop" className="hover:text-gold transition-colors relative group">
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/about" className="hover:text-gold transition-colors relative group">
                Story
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/contact" className="hover:text-gold transition-colors relative group">
                Custom
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Logo (Center - Absolute) */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center group z-50">
              <motion.div 
                className="font-serif text-2xl md:text-3xl font-bold tracking-tighter text-gold flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                PC
              </motion.div>
            </Link>

            {/* Actions (Right) */}
            <div className="flex items-center gap-4 md:gap-8 relative">
              {/* Search Button */}
              <button 
                className="hidden sm:block text-foreground/40 hover:text-gold transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search strokeWidth={1} size={18} />
              </button>

              {/* Wishlist Button */}
              <button 
                className="hidden sm:block text-foreground/40 hover:text-gold transition-colors relative"
                onClick={() => setIsWishlistOpen(true)}
              >
                <Heart strokeWidth={1} size={18} />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-[9px] h-4 w-4 rounded-full flex items-center justify-center pointer-events-none font-bold">
                    {totalWishlistItems}
                  </span>
                )}
              </button>
              
              {/* User Profile / Login */}
              <div className="relative">
                {session ? (
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20 hover:bg-gold/20 transition-all overflow-hidden"
                  >
                    {session.user?.image ? (
                      <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} />
                    )}
                  </button>
                ) : (
                  <Link href="/login" className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-widest uppercase text-foreground/50 hover:text-gold transition-colors">
                    <User size={16} strokeWidth={1} />
                    <span className="hidden lg:inline">Account</span>
                  </Link>
                )}

                <AnimatePresence>
                  {isProfileOpen && session && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-56 bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-2xl overflow-hidden z-[60]"
                    >
                      <div className="p-4 border-b border-foreground/5">
                        <p className="text-xs font-bold text-foreground truncate">{session.user?.email}</p>
                        <p className="text-[10px] text-gold uppercase tracking-widest mt-1">Valued Customer</p>
                      </div>
                      <div className="p-2">
                         <Link href="/my-orders" className="flex items-center gap-3 px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-foreground/60 hover:text-gold hover:bg-foreground/5 rounded-xl transition-all">
                          <Package size={14} />
                          My Orders
                        </Link>
                        <button 
                          onClick={() => signOut()}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
                        >
                          <LogOut size={14} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <button 
                className="relative hover:text-gold transition-colors flex items-center"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag strokeWidth={1.5} size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] h-4 w-4 rounded-full flex items-center justify-center pointer-events-none">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
