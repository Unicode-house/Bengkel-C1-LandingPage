"use client";
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown } from "lucide-react";
import { motion, LazyMotion, domAnimation } from "framer-motion";

// ⚡ Pakai import statis di bawah buat lazy-load gambar besar
const heroImage = "/assets/hero-construction.webp";

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
  }, [whatsappNumber, whatsappMessage]);

  const scrollToServices = useCallback(() => {
    document
      .getElementById("services")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden will-change-transform"
    >
      <LazyMotion features={domAnimation}>
        {/* 🖼️ Background (GPU accelerated + lazy-loaded) */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform, opacity",
          }}
          onContextMenu={(e) => e.preventDefault()}
          initial={{ scale: 1.03, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-black/60 sm:bg-black/50"></div>
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 relative z-10 text-center text-white max-w-3xl">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Solusi Konstruksi & Pengelasan Terpercaya Sejak 2009
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl mb-8 text-white/90"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            Berkualitas, Amanah, dan Profesional dalam setiap proyek.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          >
            {/* WhatsApp CTA */}
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

            {/* Scroll CTA */}
            <Button
              size="lg"
              onClick={scrollToServices}
              className="text-lg px-8 py-6 h-auto rounded-xl shadow-md
                bg-transparent text-white border border-white 
                hover:bg-white hover:text-black transition-all duration-300 will-change-transform"
            >
              Lihat Layanan Kami
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator (reduced motion safe) */}
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
      </LazyMotion>
    </section>
  );
};

export default memo(Hero);
