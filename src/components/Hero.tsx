"use client";

import { memo, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/* ✅ Gunakan WebP (lebih ringan) + prefetch preload di Head (Next.js) */
const heroImage = "/assets/hero-construction.webp";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  /* 🧠 UseMemo biar gak encode ulang setiap render */
  const whatsappLink = useMemo(() => {
    const number = "6285156276912";
    const message = encodeURIComponent(
      "Halo, saya tertarik dengan layanan Mandiri Tehnik Hade"
    );
    return `https://wa.me/${number}?text=${message}`;
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    window.open(whatsappLink, "_blank");
  }, [whatsappLink]);

  const scrollToServices = useCallback(() => {
    const section = document.getElementById("services");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white select-none"
    >
      {/* ✅ Background Image (Preloaded + GPU-optimized) */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "translateZ(0)", // ✅ GPU hint
        }}
        initial={prefersReducedMotion ? false : { scale: 1.03 }}
        whileInView={prefersReducedMotion ? {} : { scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50" />
      </motion.div>

      {/* ✅ Content */}
      <div className="relative z-10 text-center max-w-3xl px-4 py-20">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          style={{ minHeight: "3.5rem" }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Solusi Konstruksi & Pengelasan Terpercaya Sejak 2009
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl mb-8 text-white/90"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        >
          Berkualitas, Amanah, dan Profesional dalam setiap proyek.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={handleWhatsAppClick}
            className="text-lg px-8 py-6 h-auto rounded-xl shadow-md 
              bg-[#05677E] text-white border border-[#05677E]
              hover:bg-[#344A52] transition-all duration-300 will-change-transform
              focus-visible:ring-2 focus-visible:ring-[#05677E]/50"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Hubungi via WhatsApp
          </Button>

          <Button
            size="lg"
            onClick={scrollToServices}
            className="text-lg px-8 py-6 h-auto rounded-xl shadow-md
              bg-transparent text-white border border-white
              hover:bg-white hover:text-black transition-all duration-300 will-change-transform
              focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Lihat Layanan Kami
          </Button>
        </div>
      </div>

      {/* ✅ Scroll Indicator (disable animasi kalau user prefer no motion) */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-8 w-8 text-white/70" />
        </motion.div>
      )}
    </section>
  );
};

export default memo(Hero);
