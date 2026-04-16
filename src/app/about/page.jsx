"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

export default function About() {
  return (
    <div className="bg-background min-h-screen">
      
      {/* Hero */}
      <section className="pt-48 pb-32 px-6 text-center">
        <div className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 text-balance max-w-5xl mx-auto flex justify-center">
          <TextReveal text="Our Story" />
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          className="w-24 h-[1px] bg-gold mx-auto"
        />
      </section>

      {/* Visual Essay */}
      <section className="pb-32 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Chapter 1 */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-40">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/5] bg-foreground/5 overflow-hidden group"
            >
              <img 
                src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=1000&q=80" 
                alt="Artist at work" 
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </motion.div>

            <div className="font-sans text-lg md:text-xl text-foreground/80 leading-relaxed font-light space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
                Started with a mother's <span className="text-gold italic">passion</span>.
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Pragati Creations was born in the quiet hours of motherhood. What began as a meditative practice of painting mandalas to find inner peace rapidly evolved into a breathtaking journey of self-discovery and artistry. 
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                The name "Pragati" signifies progress—a beautiful reflection of an artist's continuous evolution. With every dot placed on a canvas, the brand took shape, transforming a humble hobby into a premier destination for luxury handcrafted decor.
              </motion.p>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="order-2 lg:order-1 font-sans text-lg md:text-xl text-foreground/80 leading-relaxed font-light space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
                The essence of <span className="text-gold italic">time</span> and <span className="text-gold italic">detail</span>.
              </h2>
              <blockquote className="border-l-[3px] border-gold pl-8 my-10 py-2 italic font-serif text-2xl md:text-3xl text-foreground leading-snug">
                "Art is not what you see, but what you make others feel. Every piece carries a fragment of my soul."
              </blockquote>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                In a world obsessed with speed, we choose patience. Designing a single mandala or carving an MDF motif requires profound concentration and hours of meticulous labor. It is a dialogue between the artist and the canvas.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Today, Pragati Creations stands as a beacon for authentic craftsmanship. We don't just sell art; we provide the warmth of human touch wrapped in uncompromising luxury.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="order-1 lg:order-2 relative aspect-square bg-foreground/5 overflow-hidden group"
            >
              <img 
                src="https://images.unsplash.com/photo-1563804825946-b3334d7d3ef5?w=1000&q=80" 
                alt="Detailed artwork" 
                className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
              />
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}
