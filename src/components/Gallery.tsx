/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { memo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  motion,
  Variants,
  LazyMotion,
  domAnimation,
  AnimatePresence,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Tangga Stainless Steel",
    location: "Bogor",
    description: "Tangga modern dengan railing stainless steel",
    thumbnail: "/assets/galeri (1).jpg",
    type: "Reling Tangga & Balkon",
    images: [
      "/assets/galeri (1).jpg",
      "/assets/galeri-detail-preview (10).webp",
    ],
    detail:
      "Railing tangga modern dari kombinasi stainless steel dan kaca tempered 10mm. Fokus pengerjaan pada kekuatan struktur dan tampilan elegan.",
    testimonial:
      "Tangga tampil mewah dan sangat aman. Semua sambungan halus dan presisi.",
  },
  {
    title: "Jendela Aluminium",
    location: "Jakarta",
    description: "Jendela rumah dengan kusen aluminium tahan lama",
    thumbnail: "/assets/galeri (2).jpg",
    type: "Kusen, Pintu & Jendela Aluminium",

    images: [
      "/assets/galeri (2).jpg",
      "/assets/galeri-detail-preview (6).webp",
    ],
    detail:
      "Proyek ini melibatkan perakitan dan instalasi unit kusen, pintu, dan jendela menggunakan material aluminium. Fokus pengerjaan terletak pada pemotongan profil aluminium yang presisi dan perakitan yang rapat untuk memastikan unit kedap air dan udara. Instalasi kaca dan panel menggunakan segel karet berkualitas, dipastikan lurus (level) dan berfungsi mulus.",
    testimonial:
      "Alhamdulillah... lalu pintu alumunium kamar mandi, jendela rumah sama pondok, semua dikerjakan kang haji ade, hasilnya baik, rapih.",
  },
  {
    title: "Renovasi Rumah Tinggal",
    location: "Depok",
    description: "Renovasi rumah minimalis modern",
    thumbnail: "/assets/galeri (3).jpg",
    type: "Bangun Baru & Renovasi",
    images: [
      "/assets/galeri (3).jpg",
      "/assets/galeri-detail-preview (2).webp",
    ],
    detail:
      "Proyek hunian 2 tingkat ini melibatkan pengerjaan struktur lengkap, diawali dengan perencanaan teknis dan pengecoran fondasi yang dirancang presisi untuk menopang beban ganda. Konstruksi inti berlanjut pada pengerjaan rangka beton bertulang, mencakup kolom, balok, dan plat lantai yang dieksekusi untuk menjamin integritas dan kekuatan bangunan. Tahap pengerjaan kemudian ditutup dengan penyelesaian arsitektural yang komprehensif, meliputi pemasangan dinding, instalasi rangka atap, plafon, serta finishing detail pada interior dan eksterior.",
    testimonial:
      "Saya waktu itu punya rencana ingin punya tempat pernikahan seperti aula, dan alhamdulillah terwujud. Walaupun dengan budget yang disesuaikan, tapi hasilnya OK dan desainnya bagus.",
  },
  {
    title: "Kanopi Carport",
    location: "Tangerang",
    description: "Kanopi carport dengan atap alderon anti panas",
    thumbnail: "/assets/galeri (4).jpg",
    type: "Kanopi",
    images: [
      "/assets/galeri (4).jpg",
      "/assets/galeri-detail-preview (1).webp",
    ],
    detail:
      "Proyek instalasi kanopi ini mencakup perakitan rangka struktural (baik menggunakan baja ringan atau besi hollow) yang dirancang untuk menopang atap secara efektif dan mengelola aliran air. Pengerjaan meliputi instalasi tiang dan rangka utama yang kokoh. Pemasangan material atap (seperti Alderon, Spandek, atau polikarbonat) dilakukan dengan presisi tinggi untuk menjamin kekedapan air dan mencegah kebocoran, seringkali diintegrasikan dengan sistem talang air yang rapi.",
    testimonial:
      "Kami bersyukur bisa mempunyai kanopi dengan atap yang bagus (Alderon), sehingga tidak jadi penghalang jamaah untuk beribadah ke mesjid karena teras jadi aman dari hujan.",
  },
];

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
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);

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
    <section id="gallery" className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
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

          {/* Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-12"
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.2, delayChildren: 0.1 },
              },
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer to-transparent opacity-0"
                variants={cardVariants}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImage(0);
                }}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-semibold text-xl mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/90 mb-1">
                      {project.location}
                    </p>
                    <p className="text-sm text-white/85">
                      {project.type}
                    </p>
                    <p className="text-sm text-white/80">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
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

          {/* Popup (copy dari GalleryPage) */}
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
                    {/* Gambar / Slider */}
                    <div className="relative w-full md:w-1/2 p-4 flex flex-col items-center justify-center">
                      <div className="relative w-full h-[400px] md:h-[550px] bg-gray-100 rounded-xl overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={selectedProject.images[currentImage]}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute w-full h-full flex items-center justify-center"
                          >
                            <img
                              src={selectedProject.images[currentImage]}
                              alt={selectedProject.title}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Tombol Prev/Next */}
                        {selectedProject.images.length > 1 && (
                          <>
                            <button
                              onClick={handlePrevImage}
                              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-md"
                            >
                              <ChevronLeft size={22} />
                            </button>
                            <button
                              onClick={handleNextImage}
                              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-md"
                            >
                              <ChevronRight size={22} />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Dots */}
                      <div className="flex mt-4 gap-2">
                        {selectedProject.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentImage(i)}
                            className={`w-3 h-3 rounded-full ${
                              i === currentImage
                                ? "bg-[#05677E]"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Tombol Close Mobile */}
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-sm md:hidden"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Detail */}
                    <div className="relative w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="hidden md:block absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition"
                      >
                        <X size={26} />
                      </button>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#05677E] mb-1">
                        {selectedProject.title}
                      </h2>
                      <p className="text-gray-600 mb-6 text-sm md:text-base">
                        {selectedProject.location}
                      </p>

                      <div className="mb-6">
                        <h3 className="bg-[#E5E4FA] text-[#344A52] px-4 py-2 rounded-xl font-semibold inline-block mb-3 text-sm md:text-base">
                          Detail Pengerjaan
                        </h3>
                        <p className="text-sm text-gray-700">
                          {selectedProject.detail}
                        </p>
                      </div>

                      <div>
                        <h3 className="bg-[#E5E4FA] text-[#344A52] px-4 py-2 rounded-xl font-semibold inline-block mb-3 text-sm md:text-base">
                          Apa kata mereka?
                        </h3>
                        <p className="text-sm text-gray-700">
                          {selectedProject.testimonial}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </LazyMotion>
      </div>
    </section>
  );
};

export default memo(Gallery);
