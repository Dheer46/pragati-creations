"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background text-foreground pt-32 pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-16 md:gap-24 mb-24 relative z-10">

        <div className="md:col-span-1 space-y-8">
          <Link href="/" className="inline-block group">
            <h2 className="font-serif text-4xl font-bold tracking-tighter text-gold group-hover:scale-105 transition-transform duration-500">PC</h2>
          </Link>
          <p className="text-foreground/50 font-sans text-sm leading-relaxed max-w-xs font-light">
            An artisanal sanctuary for soulful mandala art and high-end home decor, crafted with patience and love.
          </p>
          <div className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40">
            <a href="https://www.instagram.com/handmade_creations_by_pragati/" className="hover:text-gold transition-colors flex items-center gap-2">
              <span className="w-4 h-px bg-gold/20" /> Instagram
            </a>
            <a href="#" className="hover:text-gold transition-colors flex items-center gap-2">
              <span className="w-4 h-px bg-gold/20" /> Facebook
            </a>
            <a href="[Pragati.rst@gmail.com]" className="hover:text-gold transition-colors flex items-center gap-2">
              <span className="w-4 h-px bg-gold/20" /> Email
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-sans text-[10px] tracking-[0.4em] uppercase font-black text-foreground/30 mb-8 md:mb-10">Collections</h4>
          <ul className="space-y-5 text-foreground/50 text-xs font-medium uppercase tracking-[0.2em]">
            <li><Link href="/shop" className="hover:text-gold transition-colors">The Signature Series</Link></li>
            <li><Link href="/shop" className="hover:text-gold transition-colors">Timepieces</Link></li>
            <li><Link href="/shop" className="hover:text-gold transition-colors">Sanctuary Decor</Link></li>
            <li><Link href="/shop" className="hover:text-gold transition-colors">Bespoke Orders</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-[10px] tracking-[0.4em] uppercase font-black text-foreground/30 mb-8 md:mb-10">Atmosphere</h4>
          <ul className="space-y-5 text-foreground/50 text-xs font-medium uppercase tracking-[0.2em]">
            <li><Link href="/about" className="hover:text-gold transition-colors">The Studio Story</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Connect With Us</Link></li>
            <li><Link href="#" className="hover:text-gold transition-colors">Shipping & Essence</Link></li>
            <li><Link href="#" className="hover:text-gold transition-colors">Terms of Care</Link></li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="font-sans text-[10px] tracking-[0.4em] uppercase font-black text-foreground/30 mb-8 md:mb-10">Journal</h4>
          <p className="text-foreground/50 text-xs leading-relaxed font-light">Join our inner circle for a backstage look at the studio's creations.</p>
          <form className="group flex border-b border-foreground/10 pb-3 hover:border-gold transition-colors duration-500" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent border-none outline-none flex-1 text-xs text-foreground placeholder:text-foreground/20 font-light tracking-widest uppercase"
            />
            <button className="text-[10px] uppercase tracking-[0.3em] hover:text-gold transition-colors font-black">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/20 border-t border-foreground/[0.03]">
        <p>&copy; {new Date().getFullYear()} Pragati Creations • Artisanal Integrity</p>
        <div className="flex gap-10">
          <Link href="#" className="hover:text-gold transition-colors">Craftsmanship First</Link>
          <Link href="#" className="hover:text-gold transition-colors">Soulfully Designed in India</Link>
        </div>
      </div>
    </footer>
  );
}
