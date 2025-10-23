"use client";
import { Button } from "@/components/ui/button";
import gateImage from "@/assets/project-gate.jpg";
import canopyImage from "@/assets/project-canopy.jpg";
import foldingImage from "@/assets/project-folding.jpg";
import renovationImage from "@/assets/project-renovation.jpg";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Gallery = () => {
  const navigate = useNavigate(); 

  return (
    <section id="gallery" className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Galeri Proyek
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hasil karya kami yang telah dipercaya oleh ratusan klien
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-card hover-lift"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <picture>
                  <source srcSet={`${project.image}?as=webp`} type="image/webp" />
                  <source srcSet={project.image} type="image/jpeg" />
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width="800"
                    height="600"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform select-none pointer-events-none"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </picture>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-semibold text-xl mb-2">{project.title}</h3>
                  <p className="text-sm text-white/90 mb-1">{project.location}</p>
                  <p className="text-sm text-white/80">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="industrial"
            className="text-white rounded-xl"
            onClick={() => navigate("/projects")} // ✅ ini udah bener
          >
            Lihat Semua Proyek
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
