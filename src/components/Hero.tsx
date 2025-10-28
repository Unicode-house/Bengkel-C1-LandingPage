"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown } from "lucide-react";
import heroImage from "/assets/image-hero.jpg"; // cuma satu gambar aja
import { motion, LazyMotion, domAnimation } from "framer-motion";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Deteksi layar mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const whatsappNumber = "6285156276912";
  const whatsappMessage = encodeURIComponent(
    "Halo, saya tertarik dengan layanan Mandiri Tehnik Hade"
  );

  // ✅ Fungsi WhatsApp
  const handleWhatsAppClick = useCallback(() => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank"
    );
  }, [whatsappNumber, whatsappMessage]);

  // ✅ Scroll ke section layanan
  const scrollToServices = useCallback(() => {
    document
      .getElementById("services")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center isolate"
      // ✅ Hapus overflow-hidden, tambahin isolate biar layer aman di mobile
    >
      <LazyMotion features={domAnimation}>
  {/* ✅ Background utama */}
  <motion.div className="absolute inset-0 z-0">
    <img
      src={heroImage}
      alt="Hero Background"
      className="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
      onContextMenu={(e) => e.preventDefault()}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60  to-black/80 z-0"></div>
  </motion.div>

  <div className="container mx-auto px-4 py-20 relative z-10 text-center text-white">
    <div className="inline-block  px-4 py-6 rounded-2xl">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 
                   text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] tracking-tight"
        style={{ willChange: "transform, opacity" }}
        initial={isMobile ? {} : { opacity: 0, y: 30 }}
        animate={isMobile ? {} : { opacity: 1, y: 0 }}
        transition={{
          duration: isMobile ? 0 : 0.8,
          ease: "easeOut",
        }}
      >
        Solusi Konstruksi & Pengelasan Terpercaya Sejak 2009
      </motion.h1>

      <motion.p
        className="text-base sm:text-lg md:text-2xl mb-8 text-white/95 
                   drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)]"
        style={{ willChange: "transform, opacity" }}
        initial={isMobile ? {} : { opacity: 0, y: 30 }}
        animate={isMobile ? {} : { opacity: 1, y: 0 }}
        transition={{
          duration: isMobile ? 0 : 0.8,
          ease: "easeOut",
          delay: isMobile ? 0 : 0.2,
        }}
      >
        Berkualitas, Amanah, dan Profesional dalam setiap proyek.
      </motion.p>

      {/* ✅ Tombol CTA */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        style={{ willChange: "transform, opacity" }}
        initial={isMobile ? {} : { opacity: 0, y: 30 }}
        animate={isMobile ? {} : { opacity: 1, y: 0 }}
        transition={{
          duration: isMobile ? 0 : 0.8,
          ease: "easeOut",
          delay: isMobile ? 0 : 0.4,
        }}
      >
        {/* Tombol WhatsApp */}
        <Button
          size="lg"
          onClick={handleWhatsAppClick}
          className="text-base sm:text-lg px-6 sm:px-8 py-5 h-auto 
                     bg-[hsl(var(--tertiary))] 
                     text-[hsl(var(--on-tertiary))] 
                     border border-[hsl(var(--tertiary))] 
                     hover:bg-[hsl(var(--on-tertiary-container))] 
                     hover:text-white 
                     transition rounded-xl shadow-md w-full sm:w-auto"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Hubungi via WhatsApp
        </Button>

        {/* Tombol scroll */}
        <Button
          size="lg"
          onClick={scrollToServices}
          className="text-base sm:text-lg px-6 sm:px-8 py-5 h-auto 
                     bg-transparent text-white border border-white 
                     hover:bg-white hover:text-black 
                     transition rounded-xl shadow-md w-full sm:w-auto"
        >
          Lihat Layanan Kami
        </Button>
      </motion.div>
    </div>
  </div>

  {/* ✅ Scroll indicator (desktop only) */}
  {!isMobile && (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      animate={{ y: [0, 10, 0] }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      }}
    >
      <ChevronDown className="h-8 w-8 text-white/70" />
    </motion.div>
  )}
</LazyMotion>

    </section>
  );
};

export default memo(Hero);
