"use client";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 🧱 Static data: pindah ke luar komponen biar gak re-create tiap render
const projects = [
  {
    image: "assets/foto34.jpg",
    title: "Pagar Besi Minimalis",
    location: "Bogor",
    description: "Pagar custom dengan desain modern dan elegan",
  },
  {
    image: "assets/foto41.jpg",
    title: "Kanopi Polycarbonate",
    location: "Jakarta",
    description: "Kanopi modern untuk area entrance",
  },
  {
    image: "assets/foto9.jpg",
    title: "Folding Gate Alumunium",
    location: "Depok",
    description: "Pintu lipat untuk toko modern",
  },
  {
    image: "assets/foto40.jpg",
    title: "Renovasi Bangunan Komersial",
    location: "Tangerang",
    description: "Renovasi facade bangunan profesional",
  },
];

// 🎬 Variants animasi ringan dan reusable
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Gallery = () => {
  const navigate = useNavigate();

  return (
    <section id="gallery" className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* ✅ LazyMotion biar FramerMotion gak load semua fitur */}
        <LazyMotion features={domAnimation}>
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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

          {/* Gallery Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-12"
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.1,
                },
              },
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className="group relative overflow-hidden rounded-xl shadow-card hover-lift"
                variants={cardVariants}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <picture>
                    <source
                      srcSet={`${project.image}?as=webp`}
                      type="image/webp"
                    />
                    <source srcSet={project.image} type="image/jpeg" />
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      width="800"
                      height="600"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform select-none pointer-events-none"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </picture>
                </div>

                {/* Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-semibold text-xl mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/90 mb-1">
                      {project.location}
                    </p>
                    <p className="text-sm text-white/80">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              variant="industrial"
              className="text-white rounded-xl"
              onClick={() => navigate("/projects")}
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
