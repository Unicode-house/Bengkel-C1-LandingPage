"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown } from "lucide-react";
import heroImage from "/assets/image-hero.jpg";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const whatsappNumber = "628132147393";
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden isolate"
    >
      <LazyMotion features={domAnimation}>
        <motion.div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hero Background"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onContextMenu={(e) => e.preventDefault()}
          />
          <div
            className={`absolute inset-0 z-0 ${
              isMobile
                ? "bg-gradient-to-b from-black/70 via-black/40 to-black/80"
                : "bg-gradient-to-b from-black/20 via-black/10 to-black/40"
            }`}
          ></div>
        </motion.div>

        <div className="container mx-auto px-4 py-20 relative z-20 text-center text-white">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white select-none pointer-events-none "
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            onSelect={(e) => e.preventDefault()}
          >
            Solusi Konstruksi & Pengelasan Terpercaya Sejak 2009
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-2xl mb-8 text-white/95 drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] select-none pointer-events-none"
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            Berkualitas, Amanah, dan Profesional dalam setiap proyek.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-3 text-base sm:text-lg px-6 sm:px-8 py-5 h-auto 
             bg-[hsl(var(--tertiary))] 
             text-[hsl(var(--on-tertiary))] 
             border border-[hsl(var(--tertiary))] 
             hover:bg-[hsl(var(--on-tertiary-container))] 
             hover:text-white 
             transition rounded-xl shadow-md w-full sm:w-auto"
            >
              <FaWhatsapp className="!text-5xl text-white" />
              <span className="text-base sm:text-lg font-semibold">
                Hubungi via WhatsApp
              </span>
            </Button>

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

        {/* ✅ Scroll indicator (desktop only) */}
        {!isMobile && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
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
