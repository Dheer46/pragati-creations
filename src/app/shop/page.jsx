"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

export default function Shop() {
  const [mainFilter, setMainFilter] = useState("All");
  const [subFilter, setSubFilter] = useState("All");

  const categoryMap = {
    "All": [],
    "Wall Decor": ["Mandala", "Mirrors", "Clocks"],
    "Table Decor": ["Trays", "Candle Stands"],
    "Name Plates": []
  };

  const currentSubCategories = categoryMap[mainFilter] || [];

  const handleMainFilter = (cat) => {
    setMainFilter(cat);
    setSubFilter("All");
  };

  const filteredProducts = products.filter(p => {
    if (mainFilter === "All") return true;

    const inCurrentMain = categoryMap[mainFilter].includes(p.category) || mainFilter === p.category;
    if (!inCurrentMain) return false;

    if (subFilter === "All") return true;
    return p.category === subFilter;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            The Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 max-w-2xl mx-auto text-lg"
          >
            Explore our range of premium handcrafted art pieces designed to elevate your space.
          </motion.p>
        </div>

        {/* Main Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-6"
        >
          {Object.keys(categoryMap).map(cat => (
            <button
              key={cat}
              onClick={() => handleMainFilter(cat)}
              className={`px-6 py-2 text-sm uppercase tracking-widest transition-all duration-300 border ${
                mainFilter === cat 
                  ? "border-foreground bg-foreground text-background" 
                  : "border-foreground/10 hover:border-foreground text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Sub Filters (Shown only if Main Filter has subcategories) */}
        <AnimatePresence>
          {currentSubCategories.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="flex flex-wrap justify-center gap-3 mb-16 overflow-hidden"
            >
              <button
                onClick={() => setSubFilter("All")}
                className={`px-4 py-1.5 text-xs uppercase tracking-widest transition-all duration-300 border ${
                  subFilter === "All" 
                    ? "border-gold bg-gold text-background" 
                    : "border-gold/30 hover:border-gold text-gold"
                }`}
              >
                All {mainFilter}
              </button>
              {currentSubCategories.map(subCat => (
                <button
                  key={subCat}
                  onClick={() => setSubFilter(subCat)}
                  className={`px-4 py-1.5 text-xs uppercase tracking-widest transition-all duration-300 border ${
                    subFilter === subCat 
                      ? "border-gold bg-gold text-background" 
                      : "border-gold/30 hover:border-gold text-gold"
                  }`}
                >
                  {subCat}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className={currentSubCategories.length === 0 ? "mb-16" : ""} />

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
