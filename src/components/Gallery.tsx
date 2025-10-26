"use client";

import { memo, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  motion,
  Variants,
  LazyMotion,
  domAnimation,
  useReducedMotion,
} from "framer-motion";
import { useNavigate } from "react-router-dom";

/* 🧱 Static data tetap di luar komponen */
const projects = [
  {
    image: "/assets/foto34.jpg",
    title: "Pagar Besi Minimalis",
    location: "Bogor",
    description: "Pagar custom dengan desain modern dan elegan",
  },
  {
    image: "/assets/foto41.jpg",
    title: "Kanopi Polycarbonate",
    location: "Jakarta",
    description: "Kanopi modern untuk area entrance",
  },
  {
    image: "/assets/foto9.jpg",
    title: "Folding Gate Aluminium",
    location: "Depok",
    description: "Pintu lipat untuk toko modern",
  },
  {
    image: "/assets/foto40.jpg",
    title: "Renovasi Bangunan Komersial",
    location: "Tangerang",
    description: "Renovasi facade bangunan profesional",
  },
];

/* 🎬 Animasi variants — ringan & GPU friendly */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
      ease: "easeOut",
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const Gallery = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  /* 🧠 Memoize project cards */
  const renderProjects = useMemo(
    () =>
      projects.map((project) => (
        <motion.div
          key={project.title}
          className="group relative overflow-hidden rounded-xl shadow-card 
                     hover:-translate-y-2 transition-transform duration-500 
                     ease-out will-change-transform transform-gpu cursor-pointer"
          variants={cardVariants}
        >
          <div className="aspect-[4/3] overflow-hidden">
            <picture>
              {/* ✅ WebP fallback strategy */}
              <source
                srcSet={`${project.image.replace(".jpg", ".webp")}`}
                type="image/webp"
              />
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                width="800"
                height="600"
                decoding="async"
                fetchPriority="low"
                className="w-full h-full object-cover transition-transform duration-500 
                           group-hover:scale-110 transform-gpu select-none pointer-events-none"
                onContextMenu={(e) => e.preventDefault()}
              />
            </picture>
          </div>

          {/* 🩶 Overlay Info */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05677E]/90 via-[#05677E]/60 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="font-semibold text-xl mb-1">{project.title}</h3>
              <p className="text-sm text-white/90">{project.location}</p>
              <p className="text-sm text-white/80 mt-1">{project.description}</p>
            </div>
          </div>
        </motion.div>
      )),
    []
  );

  /* 🧭 Navigate handler pakai useCallback biar gak re-create */
  const handleNavigate = useCallback(() => {
    navigate("/projects");
  }, [navigate]);

  return (
    <section id="gallery" className="min-h-screen py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <LazyMotion features={domAnimation}>
          {/* ✅ Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Galeri Proyek
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hasil karya kami yang telah dipercaya oleh ratusan klien
            </p>
          </motion.div>

          {/* ✅ Gallery Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-12"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {renderProjects}
          </motion.div>

          {/* ✅ CTA Button */}
          <motion.div
            className="text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              variant="industrial"
              className="text-white rounded-xl transition-transform hover:scale-105 will-change-transform"
              onClick={handleNavigate}
            >
              Lihat Semua Proyek
            </Button>
          </motion.div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default memo(Gallery);
