"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Sparkles, Gem, Hand } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";

/* ── helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  const categories = [
    {
      name: "Signature Clocks",
      tag: "Functional Art",
      image: "/images/aesthetic_clock.png",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      name: "Serving Trays",
      tag: "Table Luxury",
      image: "/images/serving_tray.png",
      span: "",
    },
    {
      name: "Name Plates",
      tag: "Welcome Home",
      image: "/images/name_plate.png",
      span: "",
    },
    {
      name: "Candle Stands",
      tag: "Warm Glow",
      image: "/images/candle_stand.png",
      span: "md:col-span-2",
    },
  ];

  const timeline = [
    { icon: Sparkles, title: "Inspiration", text: "Each piece begins as a quiet spark — an idea born from nature, geometry, and the sacred patience of a mother's vision." },
    { icon: Hand, title: "Craft", text: "Hours of meticulous hand-dotting, layered brushwork, and resin-pouring transform raw materials into living art." },
    { icon: Gem, title: "Finish", text: "A premium high-gloss seal preserves every detail, ensuring your piece radiates brilliance for years to come." },
  ];

  return (
    <div className="flex flex-col relative w-full bg-background overflow-hidden">

      {/* ═══════════════════════════════════════
          SECTION 1 ─ FULL-BLEED CINEMATIC HERO
          ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        {/* BG Image with Parallax */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          <img
            src="/images/mandala_mirror.png"
            alt="Premium Artisan Decor"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        {/* Floating Accent Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] rounded-full border border-dashed border-white/10 z-[2] pointer-events-none hidden md:block"
        />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center max-w-3xl px-6 flex flex-col items-center gap-8"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-5 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase border border-white/15"
          >
            <Star size={12} className="fill-gold text-gold" />
            <span>Artisan Excellence • Unique Handcraft</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-medium text-white leading-[1.05] tracking-tight"
          >
            Where Every Piece Tells a{" "}
            <span className="italic text-gold drop-shadow-[0_0_30px_rgba(182,141,64,0.35)]">
              Story
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-white/70 font-sans text-lg md:text-xl leading-relaxed font-light max-w-xl"
          >
            Discover soulful mandala and decor pieces — each one patient, handcrafted, and utterly unique.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row items-center gap-5 pt-2"
          >
            <Link href="/shop">
              <Button
                size="lg"
                className="h-14 px-10 bg-gold hover:bg-gold/90 text-white tracking-[0.2em] font-bold transition-all duration-500 shadow-[0_4px_40px_rgba(182,141,64,0.35)] hover:shadow-[0_4px_60px_rgba(182,141,64,0.5)]"
              >
                Explore Collection
              </Button>
            </Link>
            <Link
              href="/about"
              className="group flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-bold text-white/50 hover:text-gold transition-colors"
            >
              Our Studio Story
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-[9px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 ─ BEST SELLERS HORIZONTAL
          ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="container mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
          >
            <div>
              <span className="text-gold font-serif italic text-2xl block mb-3">Best Sellers</span>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight tracking-tight">
                Most <span className="italic opacity-40">Loved</span> Pieces
              </h2>
            </div>
            <Link
              href="/shop"
              className="group flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold text-foreground/50 hover:text-gold transition-colors shrink-0"
            >
              View All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Horizontal Scroll Container */}
          <div className="flex gap-6 md:gap-8 overflow-x-auto pb-6 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {bestSellers.map((product, idx) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                className="min-w-[280px] md:min-w-[340px] snap-start group"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-foreground/[0.03] border border-foreground/5 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:border-gold/20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-foreground/80 text-background text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                      <p className="text-white font-serif text-lg">{product.name}</p>
                      <p className="text-gold font-bold text-sm mt-1">₹{product.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 ─ BENTO GRID COLLECTIONS
          ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 bg-foreground/[0.02] border-y border-foreground/5">
        <div className="container mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-gold font-serif italic text-2xl block mb-3">Curated Worlds</span>
            <h2 className="text-4xl md:text-6xl font-serif text-foreground leading-tight tracking-tight">
              Browse by <span className="italic opacity-40">Collection</span>
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[260px] gap-5">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                className={`relative group rounded-[2rem] overflow-hidden cursor-pointer ${cat.span}`}
              >
                <Link href={`/shop?category=${cat.name.toLowerCase()}`} className="absolute inset-0 z-20" />
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 transition-all duration-500 group-hover:from-black/80" />
                <div className="absolute bottom-0 left-0 right-0 z-10 p-8 flex flex-col gap-1">
                  <span className="text-gold/80 text-[10px] font-bold tracking-[0.25em] uppercase">
                    {cat.tag}
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-serif group-hover:text-gold transition-colors duration-500">
                    {cat.name}
                  </h3>
                </div>
                {/* hover corner arrow */}
                <div className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/20">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 ─ CRAFTSMANSHIP TIMELINE
          ═══════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/10 pointer-events-none hidden lg:block" />

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left ─ Text + Timeline */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <span className="text-gold font-serif italic text-3xl">Our Process</span>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight">
                Patience <span className="italic text-gold">&</span> Soul in Every Detail
              </h2>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-10 border-l-2 border-gold/20 space-y-12">
              {timeline.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                    className="relative"
                  >
                    {/* Dot */}
                    <div className="absolute -left-[calc(1.25rem+5px)] top-0 w-10 h-10 rounded-full bg-gold/10 border-2 border-gold/40 flex items-center justify-center">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <h3 className="text-lg font-serif text-foreground mb-2">{step.title}</h3>
                    <p className="text-foreground/60 font-light leading-relaxed text-sm max-w-md">{step.text}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-12 pt-4">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-serif text-gold">100%</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/30">Handmade</span>
              </div>
              <div className="w-px h-14 bg-foreground/10" />
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-serif text-gold">500+</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/30">Happy Homes</span>
              </div>
              <div className="w-px h-14 bg-foreground/10" />
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-serif text-gold">Eco</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/30">Sustainable</span>
              </div>
            </div>
          </motion.div>

          {/* Right ─ Stacked Images */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="relative h-[550px] md:h-[650px]"
          >
            <div className="absolute top-0 right-0 w-[75%] h-[65%] rounded-[2.5rem] overflow-hidden shadow-2xl border border-foreground/5 z-10">
              <img
                src="/images/sunburst_mirror.png"
                alt="Artisan Process"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[3000ms]"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[65%] h-[55%] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gold/10 z-20">
              <img
                src="/images/golden_lotus.png"
                alt="Golden Lotus Mandala"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase">Featured</p>
                <p className="text-white font-serif text-lg">Golden Lotus Mandala</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 ─ CTA BANNER
          ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5 border-y border-gold/10" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative container mx-auto px-6 text-center flex flex-col items-center gap-8 max-w-2xl"
        >
          <span className="text-gold font-serif italic text-2xl">Made for You</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight">
            Have Something Special in Mind?
          </h2>
          <p className="text-foreground/60 font-light text-lg leading-relaxed max-w-lg">
            We bring your imaginative concepts to life. From custom mandalas to personalized name plates, every commission is a bespoke creation.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Link href="/contact">
              <Button
                size="lg"
                className="h-14 px-10 bg-foreground text-background hover:bg-foreground/90 tracking-[0.2em] font-bold transition-all duration-500"
              >
                Request Custom Order
              </Button>
            </Link>
            <Link
              href="/shop"
              className="group flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-bold text-foreground/50 hover:text-gold transition-colors"
            >
              Browse Ready Pieces
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
