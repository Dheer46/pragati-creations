"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import Link from "next/link";

export function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const results = query.trim().length > 0
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
    if (!isOpen) setQuery("");
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[60]"
            onClick={onClose}
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="fixed inset-x-0 top-0 z-[61] max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Search Input */}
            <div className="bg-background border-b border-foreground/10 px-6 py-8">
              <div className="container mx-auto">
                <div className="flex items-center gap-4">
                  <Search size={24} className="text-foreground/30 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for mandala, clocks, mirrors..."
                    className="flex-1 bg-transparent border-none outline-none text-2xl md:text-3xl font-serif text-foreground placeholder:text-foreground/20"
                  />
                  <button
                    onClick={onClose}
                    className="text-foreground/40 hover:text-foreground transition-colors p-2"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto bg-background px-6 pb-12">
              <div className="container mx-auto py-8">
                {query.trim().length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-foreground/30 text-sm uppercase tracking-[0.3em] font-bold">
                      Start typing to discover artisan pieces
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                      {["Mandala", "Clocks", "Mirrors", "Trays", "Name Plates"].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-4 py-2 rounded-full border border-foreground/10 text-xs uppercase tracking-widest font-bold text-foreground/50 hover:text-gold hover:border-gold transition-all"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-foreground/50 font-serif text-xl">No pieces found for "{query}"</p>
                    <p className="text-foreground/30 text-sm mt-2">Try a different search term</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-foreground/30 text-[10px] uppercase tracking-[0.3em] font-black mb-8">
                      {results.length} piece{results.length !== 1 ? "s" : ""} found
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={onClose}
                          className="group flex gap-4 p-4 rounded-2xl hover:bg-foreground/5 transition-all border border-transparent hover:border-foreground/5"
                        >
                          <div className="w-20 h-24 bg-foreground/5 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={`${product.image}?w=200&q=80`}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-serif text-sm group-hover:text-gold transition-colors line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-foreground/40 text-[10px] uppercase tracking-widest mt-1">
                              {product.category}
                            </p>
                            <p className="text-sm font-bold mt-3">₹{product.price.toLocaleString()}</p>
                          </div>
                          <ArrowRight
                            size={16}
                            className="text-foreground/10 group-hover:text-gold transition-colors self-center flex-shrink-0"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
