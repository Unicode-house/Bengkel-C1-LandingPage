/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, Variants, LazyMotion, domAnimation } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// 🧱 Static Data
const categories = [
  "Semua",
  "Bangunan Baru & Renovasi",
  "Pagar & Trails",
  "Kanopi",
  "Relling Tangga & Balkon",
  "Custom Metalwork",
  "Rolling Door & Folding Gate",
  "Kusen, Pintu & Jendela",
  "Pintu Dorong & Swing",
];

const projects = [
  {
    images: ["/assets/Rumah 2 Lt.jpg", "/assets/Rumah 2 Lt.jpg", "/assets/Rumah 2 Lt.jpg"],
    title: "Rumah 2 Lt",
    location: "Sawangan, Depok",
    category: "Bangunan Baru & Renovasi",
    detail: `Pengerjaan renovasi total ini mencakup pembongkaran struktur lama dan pembangunan fondasi baru...`,
    testimonial:
      "Proses renovasinya sangat terstruktur. Timnya komunikatif dan hasilnya melebihi ekspektasi.",
  },
  {
    images: ["/assets/pagar.jpg", "/assets/Pagar.jpg", "/assets/pagar.png"],
    title: "Pagar",
    location: "Ciracas, Jakarta Timur",
    category: "Pagar & Trails",
    detail:
      "Fabrikasi pagar besi berfokus pada kekuatan struktural dan presisi estetika...",
    testimonial:
      "Hasil akhirnya benar-benar memuaskan. Pekerjaannya rapi dan kokoh.",
  },
  {
    images: ["/assets/Kanopi.jpg", "/assets/kanopi.jpg"],
    title: "Kanopi",
    location: "Cibubur, Jakarta Timur",
    category: "Kanopi",
    detail:
      "Proyek instalasi kanopi ini mencakup perakitan rangka struktural dari baja ringan...",
    testimonial: "Kanopi-nya keren banget, adem dan tahan hujan.",
  },
  {
    images: ["/assets/Jendela.jpg", "/assets/jendela.png"],
    title: "Jendela",
    location: "Gading, Jakarta Utara",
    category: "Kusen, Pintu & Jendela",
    detail:
      "Pengerjaan jendela dan kusen aluminium dengan teknik presisi tinggi untuk kedap air.",
    testimonial: "Rapi dan kuat, hasilnya profesional banget.",
  },
  // dst...
];

// 🎬 Animasi ringan
const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);

  // ⚡ useMemo → gak re-filter tiap render
  const filteredProjects = useMemo(() => {
    return activeCategory === "Semua"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // ⚡ useCallback buat slider navigation
  const handleNextImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImage((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedProject]);

  const handlePrevImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImage((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  }, [selectedProject]);

  return (
    <LazyMotion features={domAnimation}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pt-32 pb-20 bg-gray-50 min-h-screen"
      >
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <div className="flex overflow-x-auto whitespace-nowrap mb-5 gap-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#05677E] text-white border-[#05677E] shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={fadeVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid md:grid-cols-3 sm:grid-cols-2 gap-6"
            >
              {filteredProjects.map((p) => (
                <motion.div
                  key={p.title}
                  onClick={() => {
                    setSelectedProject(p);
                    setCurrentImage(0);
                  }}
                  className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white border border-gray-200 hover:bg-[#05677E]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
                    />
                  </div>
                  <div className="p-4 text-center transition-colors duration-300">
                    <h3 className="font-semibold text-lg text-[#05677E] group-hover:text-white">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-white/90">
                      {p.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 🧩 MODAL DETAIL */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-center min-h-screen p-0 md:p-4">
                <motion.div
                  className="bg-white w-full max-w-7xl shadow-xl flex flex-col md:flex-row rounded-none md:rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* 🖼️ SLIDER */}
                  <div className="relative w-full md:w-1/2 p-4 bg-white flex flex-col items-center justify-center">
                    <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={selectedProject.images[currentImage]}
                          src={selectedProject.images[currentImage]}
                          alt={selectedProject.title}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="absolute w-full h-full object-cover"
                        />
                      </AnimatePresence>
                    </div>

                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-md"
                        >
                          <ChevronLeft size={22} />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-md"
                        >
                          <ChevronRight size={22} />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-sm md:hidden"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* 📋 DETAIL */}
                  <div className="relative w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="hidden md:block absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition"
                    >
                      <X size={26} />
                    </button>

                    <h2 className="text-2xl md:text-3xl font-bold text-[#05677E] mb-1 leading-snug">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">
                      {selectedProject.location}
                    </p>

                    <div className="mb-6">
                      <h3 className="bg-[#E5E4FA] text-[#344A52] px-4 py-2 rounded-xl font-semibold inline-block mb-3 text-sm md:text-base">
                        Detail Pengerjaan
                      </h3>
                      <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
                        {selectedProject.detail}
                      </p>
                    </div>

                    <div>
                      <h3 className="bg-[#E5E4FA] text-[#344A52] px-4 py-2 rounded-xl font-semibold inline-block mb-3 text-sm md:text-base">
                        Apa kata mereka?
                      </h3>
                      <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
                        {selectedProject.testimonial}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </LazyMotion>
  );
};

export default memo(GalleryPage);
