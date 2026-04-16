"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Home() {
  const categories = [
    { name: "Signature Clocks", image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80" },
    { name: "Serving Trays", image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&q=80" },
    { name: "Name Plates", image: "https://images.unsplash.com/photo-1525264251213-9799292ca3b5?w=800&q=80" },
    { name: "Candle Stands", image: "https://images.unsplash.com/photo-1601614217157-550346d03d07?w=800&q=80" }
  ];

  return (
    <div className="flex flex-col relative w-full pt-16 md:pt-20 bg-background">
      
      {/* Hero Section - 50/50 Split Balanced Style */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden w-full px-6 py-4 md:py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Text Content (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col max-w-2xl z-10 space-y-10 md:space-y-12"
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase w-fit border border-gold/20 backdrop-blur-sm">
              <Star size={12} className="fill-gold" />
              <span>Artisan Excellence • Unique Handcraft</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-foreground leading-[1.05] tracking-tight">
              Artfully <span className="italic text-gold italic-glow">Crafted</span> to Enhance Your Home
            </h1>
            
            <p className="text-foreground/70 font-sans text-lg md:text-xl text-balance leading-relaxed max-w-lg font-light">
              Discover exclusive, soulful mandala and decor pieces designed with patience and a mother's touch, rejecting mass production for true artisanal beauty.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
              <Link href="/shop" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 w-full sm:w-[240px] bg-foreground text-background hover:bg-foreground/90 transition-all duration-500 tracking-[0.2em] font-bold">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/about" className="group flex items-center gap-3 text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-foreground/50 hover:text-gold transition-colors">
                Our Studio Story 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Image Content (Right) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
            className="relative w-full h-[500px] md:h-[650px] lg:h-[750px] rounded-[3rem] overflow-hidden shadow-2xl border border-foreground/5 bg-foreground/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=1200&q=80" 
              alt="Premium Artisan Decor" 
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-[4000ms]"
            />
            <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-background/60 to-transparent backdrop-blur-[2px]">
              <p className="text-foreground/80 font-serif italic text-2xl">The 2024 Signature Series</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="w-full py-10 md:py-14 bg-foreground/[0.02] border-y border-foreground/5 overflow-hidden backdrop-blur-sm relative z-20">
        <div className="whitespace-nowrap animate-marquee flex items-center gap-12 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-gold">
          {Array(8).fill("").map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>Hand-Drawn Mandala</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
              <span>Mother's Craftmanship</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
              <span>Sustainable Art</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
              <span>Unique Home Decor</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            </span>
          ))}
        </div>
      </div>

      {/* Featured Collections Section - Standard 4-Column Grid */}
      <section className="py-24 md:py-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-gold font-serif italic text-2xl md:text-3xl block mb-4">Curated Essences</span>
              <h2 className="text-4xl md:text-6xl font-serif text-foreground leading-tight tracking-tight">Explore Our <span className="opacity-40 italic">Collections</span></h2>
            </div>
            <Link href="/shop" className="group flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold text-foreground/50 hover:text-gold transition-colors">
              View All Series
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {categories.map((category, idx) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group overflow-hidden"
              >
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-foreground/[0.03] border border-foreground/5 shadow-xl transition-all duration-500 group-hover:shadow-2xl">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent flex flex-col justify-end p-8">
                    <Link href={`/shop?category=${category.name.toLowerCase()}`}>
                      <Button variant="outline" className="w-full text-[10px] uppercase tracking-widest border-foreground/10 hover:border-gold hover:text-gold bg-background/20 backdrop-blur-sm transition-all duration-500">
                        Explore
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="pt-8 space-y-2 text-center md:text-left">
                  <span className="text-gold/60 text-[10px] font-bold tracking-[0.2em] uppercase">Series 0{idx + 1}</span>
                  <h3 className="text-2xl font-serif text-foreground group-hover:text-gold transition-colors duration-500">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section - Lighter Split View */}
      <section className="relative w-full py-24 md:py-32 bg-gold/5 border-y border-gold/10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <span className="text-gold font-serif italic text-3xl">Patience & Soul.</span>
            <h2 className="text-4xl md:text-6xl font-serif text-foreground leading-tight">Art That Breathes New <span className="italic text-gold opacity-90">Life</span> into Your Sanctuary</h2>
            <p className="text-foreground/70 font-sans text-lg md:text-xl font-light leading-relaxed max-w-lg">
              In a world of fast-paced production, we choose the rhythmic path of patient creation. Every stroke is a meditation for your space.
            </p>
            <div className="flex items-center gap-12 pt-6">
              <div className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-serif text-gold">100%</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/30">Handmade Integrity</span>
              </div>
              <div className="w-px h-16 bg-foreground/10" />
              <div className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-serif text-gold">Authentic</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/30">Artisan Craft</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] overflow-hidden shadow-2xl h-[500px] md:h-[600px] border border-gold/10"
          >
            <img src="https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&q=80" alt="Process" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
