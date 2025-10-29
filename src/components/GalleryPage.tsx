/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, useState, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
  LazyMotion,
  domAnimation,
} from "framer-motion";
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
    thumbnail: "/assets/galeri-page (1).jpg",
    images: [
      "/assets/galeri-detail-preview (3).webp",
      "/assets/galeri-detail-preview (9).webp",
    ],
    title: "Rumah 2 Lt",
    location: "Sawangan, Depok",
    category: "Bangunan Baru & Renovasi",
    detail: `Proyek hunian 2 tingkat ini melibatkan pengerjaan struktur lengkap, diawali dengan perencanaan teknis dan pengecoran fondasi yang dirancang presisi untuk menopang beban ganda. Konstruksi inti berlanjut pada pengerjaan rangka beton bertulang, mencakup kolom, balok, dan plat lantai yang dieksekusi untuk menjamin integritas dan kekuatan bangunan. Tahap pengerjaan kemudian ditutup dengan penyelesaian arsitektural yang komprehensif, meliputi pemasangan dinding, instalasi rangka atap, plafon, serta finishing detail pada interior dan eksterior.`,
    testimonial:
      "Saya waktu itu punya rencana ingin punya tempat pernikahan seperti aula, dan alhamdulillah terwujud. Walaupun dengan budget yang disesuaikan, tapi hasilnya OK dan desainnya bagus.",
  },
  {
    thumbnail: "/assets/galeri-page (6).jpg",
    images: [
      "/assets/galeri-detail-preview (8).webp",
      "/assets/galeri-detail-preview (1).webp",
    ],
    title: "Pagar",
    location: "Ciracas, Jakarta Timur",
    category: "Pagar & Trails",
    detail:
      "Fabrikasi pagar besi berfokus pada kekuatan struktural dan presisi estetika. Proses ini meliputi fabrikasi rangka utama dan panel custom (minimalis, tempa, atau pola laser-cut) menggunakan material besi hollow atau solid. Setiap sambungan mendapatkan pengelasan penuh yang kemudian dihaluskan (grinding) untuk hasil yang rapi. Pengerjaan diakhiri dengan pelapisan cat dasar anti-rust (anti karat) dan beberapa lapis cat finishing untuk memastikan durabilitas tinggi terhadap cuaca dan kondisi eksterior.",
    testimonial:
      "Hasil akhirnya benar-benar memuaskan. Pekerjaannya rapi, detail, dan sangat kokoh. Saya tidak ragu merekomendasikan Mandiri Teknik untuk pekerjaan pintu gerbang.",
  },
  {
    thumbnail: "/assets/galeri-page (3).jpg",
    images: [
      "/assets/galeri-detail-preview (2).webp",
      "/assets/galeri-detail-preview (9).webp",
    ],
    title: "Kanopi",
    location: "Cibubur, Jakarta Timur",
    category: "Kanopi",
    detail:
      "Proyek instalasi kanopi ini mencakup perakitan rangka struktural (baik menggunakan baja ringan atau besi hollow) yang dirancang untuk menopang atap secara efektif dan mengelola aliran air. Pengerjaan meliputi instalasi tiang dan rangka utama yang kokoh. Pemasangan material atap (seperti Alderon, Spandek, atau polikarbonat) dilakukan dengan presisi tinggi untuk menjamin kekedapan air dan mencegah kebocoran, seringkali diintegrasikan dengan sistem talang air yang rapi.",
    testimonial:
      "Kami bersyukur bisa mempunyai kanopi dengan atap yang bagus (Alderon), sehingga tidak jadi penghalang jamaah untuk beribadah ke mesjid karena teras jadi aman dari hujan.",
  },
  {
    thumbnail: "/assets/galeri-page (5).jpg",
    images: [
      "/assets/galeri-detail-preview (7).webp",
      "/assets/galeri-detail-preview (6).webp",
    ],
    title: "Jendela",
    location: "Gading, Jakarta Utara",
    category: "Kusen, Pintu & Jendela",
    detail:
      "Proyek ini melibatkan perakitan dan instalasi unit kusen, pintu, dan jendela menggunakan material aluminium. Fokus pengerjaan terletak pada pemotongan profil aluminium yang presisi dan perakitan yang rapat untuk memastikan unit kedap air dan udara. Instalasi kaca dan panel menggunakan segel karet berkualitas, dipastikan lurus (level) dan berfungsi mulus.",
    testimonial:
      "Alhamdulillah... lalu pintu alumunium kamar mandi, jendela rumah sama pondok, semua dikerjakan kang haji ade, hasilnya baik, rapih.",
  },
  {
    thumbnail: "/assets/galeri-page (4).jpg",
    images: [
      "/assets/galeri-detail-preview (1).webp",
      "/assets/galeri-detail-preview (5).webp",
    ],
    title: "Custom Metalwork",
    location: "Pondok Kelapa, Jakarta Timur",
    category: "Custom Metalwork",
    detail:
      "Layanan fabrikasi logam custom berdasarkan desain unik. Melibatkan pemotongan, pembengkokan, hingga perakitan struktur logam kompleks sesuai kebutuhan.",
    testimonial:
      "Pekerjaan sangat presisi dan hasil akhirnya sesuai desain. Mandiri Teknik selalu bisa diandalkan.",
  },

  {
    thumbnail: "/assets/galeri (1).jpg",
    images: [
      "/assets/galeri-detail-preview (10).webp",
      "/assets/galeri-detail-preview (4).webp",
    ],
    title: "Tangga",
    location: "Depok, Jawa Barat",
    category: "Pagar & Trails",
    detail:
      "Railing tangga modern dari kombinasi stainless steel dan kaca tempered 10mm. Fokus pengerjaan pada kekuatan struktur dan tampilan elegan.",
    testimonial:
      "Tangga tampil mewah dan sangat aman. Semua sambungan halus dan presisi.",
  },
];

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
                      src={p.thumbnail}
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
                    <div className="relative w-full h-[400px] md:h-[550px] bg-gray-100 rounded-xl overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={selectedProject.images[currentImage]}
                          src={selectedProject.images[currentImage]}
                          alt={selectedProject.title}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="absolute w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover "
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

