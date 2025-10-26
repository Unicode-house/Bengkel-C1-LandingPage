/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { memo, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, Variants, LazyMotion, domAnimation } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// 🧱 Static Data (pindah di luar komponen → biar gak re-create tiap render)
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
    images: ["/assets/Rumah-2Lt.webp"],
    title: "Rumah 2 Lt",
    location: "Sawangan, Depok",
    category: "Bangunan Baru & Renovasi",
    detail: "Pengerjaan renovasi total dengan fondasi baru dan sistem drainase modern.",
    testimonial: "Proses renovasinya terstruktur, hasilnya melebihi ekspektasi.",
  },
  {
    images: ["/assets/pagar.webp"],
    title: "Pagar",
    location: "Ciracas, Jakarta Timur",
    category: "Pagar & Trails",
    detail: "Fabrikasi pagar besi dengan kekuatan struktural dan presisi estetika.",
    testimonial: "Pekerjaannya rapi dan kokoh, hasilnya memuaskan.",
  },
  {
    images: ["/assets/Kanopi.webp"],
    title: "Kanopi",
    location: "Cibubur, Jakarta Timur",
    category: "Kanopi",
    detail: "Instalasi kanopi baja ringan dengan sistem peredam panas modern.",
    testimonial: "Kanopinya adem banget, tampilannya modern.",
  },
  {
    images: ["/assets/Jendela.webp"],
    title: "Jendela",
    location: "Gading, Jakarta Utara",
    category: "Kusen, Pintu & Jendela",
    detail: "Pengerjaan jendela aluminium dengan teknik presisi kedap air.",
    testimonial: "Rapi, kuat, hasilnya profesional banget.",
  },
];

// ⚙️ Variants animasi ringan (GPU-friendly)
const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeInOut" } },
};

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);

  // ⚡ useMemo biar filtering gak re-run tiap render
  const filteredProjects = useMemo(
    () => (activeCategory === "Semua" ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  // ⚡ Callback memoized untuk navigasi gambar
  const handleNextImage = useCallback(() => {
    if (selectedProject)
      setCurrentImage((prev) => (prev + 1) % selectedProject.images.length);
  }, [selectedProject]);

  const handlePrevImage = useCallback(() => {
    if (selectedProject)
      setCurrentImage((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
  }, [selectedProject]);

  return (
    <LazyMotion features={domAnimation}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pt-28 pb-16 bg-gray-50 min-h-screen overflow-hidden will-change-transform"
      >
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <div className="flex overflow-x-auto whitespace-nowrap mb-6 gap-2 scrollbar-hide snap-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full border text-sm snap-start transition-all duration-300
                  ${activeCategory === cat
                    ? "bg-[#05677E] text-white border-[#05677E] shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
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
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            >
              {filteredProjects.map((p) => (
                <motion.div
                  key={p.title}
                  onClick={() => {
                    setSelectedProject(p);
                    setCurrentImage(0);
                  }}
                  className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl 
                             bg-white border border-gray-200 cursor-pointer transition-all duration-500 hover:bg-[#05677E]"
                  variants={fadeVariants}
                >
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover aspect-[4/3] transition-all duration-700 
                               group-hover:scale-105 group-hover:brightness-90"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-base md:text-lg text-[#05677E] group-hover:text-white">
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

        {/* 🔍 Modal Detail */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="bg-white w-full max-w-5xl mx-2 md:mx-auto shadow-xl flex flex-col md:flex-row rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {/* 🖼️ Image Section */}
                <div className="relative w-full md:w-1/2 p-4 flex flex-col items-center justify-center bg-gray-50">
                  <div className="relative w-full aspect-[16/9] bg-gray-200 rounded-xl overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedProject.images[currentImage]}
                        src={selectedProject.images[currentImage]}
                        alt={selectedProject.title}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>

                  {/* Nav Buttons */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full md:hidden"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* 📋 Detail Section */}
                <div className="w-full md:w-1/2 p-6 md:p-10 relative">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="hidden md:block absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition"
                  >
                    <X size={24} />
                  </button>

                  <h2 className="text-xl md:text-2xl font-bold text-[#05677E] mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">{selectedProject.location}</p>

                  <div className="mb-4">
                    <h3 className="bg-[#E5E4FA] text-[#344A52] px-3 py-1 rounded-lg font-semibold inline-block mb-2 text-sm">
                      Detail Pengerjaan
                    </h3>
                    <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
                      {selectedProject.detail}
                    </p>
                  </div>

                  <div>
                    <h3 className="bg-[#E5E4FA] text-[#344A52] px-3 py-1 rounded-lg font-semibold inline-block mb-2 text-sm">
                      Apa kata mereka?
                    </h3>
                    <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
                      {selectedProject.testimonial}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </LazyMotion>
  );
};

export default memo(GalleryPage);
