"use client";
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const heroImage = "/assets/hero-construction.webp"; // ✅ pakai WebP (lebih ringan & cepat)

const Hero = () => {
  const whatsappNumber = "6285156276912";
  const whatsappMessage = encodeURIComponent(
    "Halo, saya tertarik dengan layanan Mandiri Tehnik Hade"
  );

  const handleWhatsAppClick = useCallback(() => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank"
    );
  }, []);

  const scrollToServices = useCallback(() => {
    document
      .getElementById("services")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* ✅ Preloaded Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        // ⚡ Hapus opacity animasi biar LCP gak delay
        initial={{ scale: 1.03 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50" />
      </motion.div>

      {/* ✅ Content */}
      <div className="relative z-10 text-center max-w-3xl px-4 py-20">
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          style={{ minHeight: "3.5rem" }}
        >
          Solusi Konstruksi & Pengelasan Terpercaya Sejak 2009
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-white/90">
          Berkualitas, Amanah, dan Profesional dalam setiap proyek.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={handleWhatsAppClick}
            className="text-lg px-8 py-6 h-auto rounded-xl shadow-md 
              bg-[#05677E] text-white border border-[#05677E]
              hover:bg-[#344A52] transition-all duration-300 will-change-transform"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Hubungi via WhatsApp
          </Button>

          <Button
            size="lg"
            onClick={scrollToServices}
            className="text-lg px-8 py-6 h-auto rounded-xl shadow-md
              bg-transparent text-white border border-white
              hover:bg-white hover:text-black transition-all duration-300 will-change-transform"
          >
            Lihat Layanan Kami
          </Button>
        </div>
      </div>

      {/* ✅ Scroll Indicator */}
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
    </section>
  );
};

export default memo(Hero);
