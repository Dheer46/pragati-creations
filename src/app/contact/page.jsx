"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-background min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">

        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            Connect With Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 max-w-2xl mx-auto text-lg"
          >
            Have a question or looking for a customized piece? We would love to hear from you and bring your vision to life.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-20">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-12"
          >
            <div>
              <h3 className="font-serif text-2xl mb-6">Direct Inquiries</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-foreground/80">
                  <Phone className="text-gold mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-foreground uppercase tracking-wider text-xs mb-1">Phone / WhatsApp</p>
                    <p>+91 96503 85978</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-foreground/80">
                  <Mail className="text-gold mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-foreground uppercase tracking-wider text-xs mb-1">Email</p>
                    <p>[hello@pragaticreations.com]</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-foreground/5 p-8 border border-foreground/10">
              <h4 className="font-serif text-xl mb-4">Custom Orders</h4>
              <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
                Looking for a specific size, color scheme, or a completely bespoke design? Fill out the form or chat with us directly on WhatsApp.
              </p>
              <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                <MessageSquare size={18} /> WhatsApp Us
              </Button>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-3"
          >
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/60 font-medium">Name</label>
                  <input type="text" required className="w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:border-gold outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/60 font-medium">Phone</label>
                  <input type="tel" required className="w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:border-gold outline-none transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-foreground/60 font-medium">Product Category Request</label>
                <select className="w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:border-gold outline-none transition-colors appearance-none">
                  <option value="mandala">Mandala Art</option>
                  <option value="mdf">MDF Wall Art</option>
                  <option value="nameboard">Name Board</option>
                  <option value="gift">Personalized Gift</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-foreground/60 font-medium">Estimated Budget (₹)</label>
                <input type="text" className="w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:border-gold outline-none transition-colors" placeholder="e.g. 5000 - 10000" />
              </div>

              <div className="space-y-2 flex-grow">
                <label className="text-xs uppercase tracking-widest text-foreground/60 font-medium">Message</label>
                <textarea rows="4" required className="w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:border-gold outline-none transition-colors resize-none placeholder:text-foreground/30" placeholder="Please describe your requirements..."></textarea>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Request
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
