"use client";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";
import { motion } from "framer-motion";

const Hero = () => {
  const whatsappNumber = "6285156276912";
  const whatsappMessage = encodeURIComponent(
    "Halo, saya tertarik dengan layanan Mandiri Tehnik Hade"
  );

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank"
    );
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with subtle zoom */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onContextMenu={(e) => e.preventDefault()} 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 gradient-hero bg-black/50"></div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10 text-center text-white">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Solusi Konstruksi & Pengelasan Terpercaya Sejak 2009
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-white/90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Berkualitas, Amanah, dan Profesional dalam setiap proyek.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <Button
            size="lg"
            onClick={handleWhatsAppClick}
            className="text-lg px-8 py-6 h-auto 
             bg-[hsl(var(--tertiary))] 
             text-[hsl(var(--on-tertiary))] 
             border border-[hsl(var(--tertiary))] 
             hover:bg-[hsl(var(--on-tertiary-container))] 
             hover:text-white 
             transition rounded-xl shadow-md"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Hubungi via WhatsApp
          </Button>

          <Button
            size="lg"
            onClick={scrollToServices}
            className="text-lg px-8 py-6 h-auto bg-transparent text-white border border-white hover:bg-white hover:text-black transition rounded-xl shadow-md"
          >
            Lihat Layanan Kami
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronDown className="h-8 w-8 text-white/70" />
      </motion.div>
    </section>
  );
};

export default Hero;
