/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Search } from "lucide-react";

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
    image: "/src/assets/Rumah 2 Lt.jpg",
    title: "Rumah 2 Lt",
    location: "Sawangan, Depok",
    category: "Bangunan Baru & Renovasi",
    detail: `Pengerjaan renovasi total ini mencakup pembongkaran struktur lama dan pembangunan fondasi baru. Fokus utama adalah pada penguatan struktur kolom dan plat lantai untuk mendukung penambahan ruang, diakhiri dengan finishing arsitektural interior dan eksterior yang menyeluruh.`,
    testimonial:
      "Proses renovasinya sangat terstruktur. Timnya komunikatif dan hasilnya melebihi ekspektasi. Rumah kami terasa seperti baru dan jauh lebih kokoh.t",
  },
  {
    image: "/src/assets/pagar.jpg",
    title: "Pagar",
    location: "Ciracas, Jakarta Timur",
    category: "Pagar & Trails",
    detail:
      "Fabrikasi pagar besi berfokus pada kekuatan struktural dan presisi estetika. Proses ini meliputi fabrikasi rangka utama dan panel custom (minimalis, tempa, atau pola laser-cut) menggunakan material besi hollow atau solid. Setiap sambungan mendapatkan pengelasan penuh yang kemudian dihaluskan (grinding) untuk hasil yang rapi. Pengerjaan diakhiri dengan pelapisan cat dasar anti-rust (anti karat) dan beberapa lapis cat finishing untuk memastikan durabilitas tinggi terhadap cuaca dan kondisi eksterior.",
    testimonial: "Hasil akhirnya benar-benar memuaskan. Pekerjaannya rapi, detail, dan sangat kokoh. Saya tidak ragu merekomendasikan Mandiri Teknik untuk pekerjaan pintu gerbang.",
  },
  {
    image: "/src/assets/Kanopi.jpg",
    title: "Kanopi",
    location: "Cibubur, Jakarta Timur",
    category: "Kanopi",
    detail:
      "Proyek instalasi kanopi ini mencakup perakitan rangka struktural (baik menggunakan baja ringan atau besi hollow) yang dirancang untuk menopang atap secara efektif dan mengelola aliran air. Pengerjaan meliputi instalasi tiang dan rangka utama yang kokoh. Pemasangan material atap (seperti Alderon, Spandek, atau polikarbonat) dilakukan dengan presisi tinggi untuk menjamin kekedapan air dan mencegah kebocoran, seringkali diintegrasikan dengan sistem talang air yang rapi.",
    testimonial: "Kami bersyukur bisa mempunyai kanopi dengan atap yang bagus (Alderon), sehingga tidak jadi penghalang jamaah untuk beribadah ke mesjid karena teras jadi aman dari hujan.",
  },
  {
    image: "/src/assets/jendela.jpg",
    title: "Jendela",
    location: "Gading, Jakarta Utara",
    category: "Kusen, Pintu & Jendela",
    detail:
      "Proyek ini melibatkan perakitan dan instalasi unit kusen, pintu, dan jendela menggunakan material aluminium. Fokus pengerjaan terletak pada pemotongan profil aluminium yang presisi dan perakitan yang rapat untuk memastikan unit kedap air dan udara. Instalasi kaca dan panel menggunakan segel karet berkualitas, dipastikan lurus (level) dan berfungsi mulus.",
    testimonial: "Alhamdulillah... lalu pintu alumunium kamar mandi, jendela rumah sama pondok, semua dikerjakan kang haji ade, hasilnya baik, rapih.",
  },
  {
    image: "/src/assets/Pagar2.jpg",
    title: "Pagar & Tralis",
    location: "Jonggol, Kab Bogor",
    category: "Pagar & Trails",
    detail:
      "Fabrikasi pagar besi berfokus pada kekuatan struktural dan presisi estetika. Proses ini meliputi fabrikasi rangka utama dan panel custom (minimalis, tempa, atau pola laser-cut) menggunakan material besi hollow atau solid. Setiap sambungan mendapatkan pengelasan penuh yang kemudian dihaluskan (grinding) untuk hasil yang rapi. Pengerjaan diakhiri dengan pelapisan cat dasar anti-rust (anti karat) dan beberapa lapis cat finishing untuk memastikan durabilitas tinggi terhadap cuaca dan kondisi eksterior.",
    testimonial: "Hasil akhirnya benar-benar memuaskan. Pekerjaannya rapi, detail, dan sangat kokoh. Saya tidak ragu merekomendasikan Mandiri Teknik untuk pekerjaan pintu gerbang.",
  },
  {
    image: "/src/assets/Custom Metalwork.jpg",
    title: "Custom Metalwork",
    location: "Pondok Kelapa, Jakarta Timur",
    category: "Custom Metalwork",
    detail:
      "Ini adalah layanan fabrikasi logam custom yang dieksekusi berdasarkan desain atau kebutuhan fungsional spesifik. Prosesnya mencakup interpretasi desain teknis, pemilihan material (plat besi, stainless, profil custom), dan eksekusi fabrikasi presisi. Pengerjaan ini dapat melibatkan pemotongan (cutting), pembengkokan (bending), dan perakitan struktur kompleks.",
    testimonial: "...selain karena sudah mengenal sebelumnya, ...tentu saja tidak mengurangi kualitas apapun, sehingga pekerjaan perbesiannya, kami percayakan pada mandiri tehnik.",
  },
  {
    image: "/src/assets/Pagar3.png",
    title: "Cibinong, Kabupaten Bogor",
    location: "Pondok Kelapa, Jakarta Timur",
    category: "Pagar & Trails",
    detail:
      "Proyek ini adalah fabrikasi pagar minimalis custom menggunakan material hollow galvanis. Prosesnya meliputi pemotongan presisi dan pengelasan penuh (full-weld). Finishing dilakukan dengan teknik cat semprot duco untuk hasil akhir yang halus dan tahan lama.",
    testimonial: "Desain pagarnya dibuat persis seperti yang saya inginkan. Hasilnya sangat kokoh dan finishing catnya halus. Rumah jadi terlihat lebih modern dan aman.",
  },
  {
    image: "/src/assets/rolling door.png",
    title: "Rolling Door & Folding Gate",
    location: "Pondok Kelapa, Jakarta Timur",
    category: "Rolling Door & Folding Gate",
    detail:
      "Pemasangan folding gate untuk area komersial ini berfokus pada kelancaran operasional dan keamanan. Menggunakan plat besi tebal, sistem rel presisi, dan bearing roda berkualitas tinggi untuk memastikan pintu dapat dioperasikan dengan ringan dan terkunci aman.",
    testimonial: "Saya pesan rolling door untuk garasi. Pemasangannya cepat dan hasilnya sangat mulus. Pintunya ringan dioperasikan dan terasa sangat aman saat dikunci.",
  },
  {
    image: "/src/assets/jendela.png",
    title: "Jendela",
    location: "Pondok Indah, Jakarta Selatan",
    category: "Kusen, Pintu & Jendela",
    detail:
      "Proyek ini mencakup penggantian total kusen kayu dengan kusen aluminium coating putih. Pemasangan unit pintu dan jendela kaca dilakukan dengan presisi, menggunakan segel karet penuh untuk menjamin kekedapan suara dan mencegah kebocoran air.",
    testimonial: "Pengerjaan kusen aluminium sangat presisi. Pintu dan jendela terpasang sempurna, berfungsi mulus, dan sangat kedap. Rumah jadi terlihat lebih rapi.",
  },
  {
    image: "/src/assets/rumah-2-lantai.png",
    title: "Rumah 2 Lt",
    location: "Bogor Selatan, Kota Bogor",
    category: "Bangunan Baru & Renovasi",
    detail:
      "Pengerjaan renovasi total ini mencakup pembongkaran struktur lama dan pembangunan fondasi baru. Fokus utama adalah pada penguatan struktur kolom dan plat lantai untuk mendukung penambahan ruang, diakhiri dengan finishing arsitektural interior dan eksterior yang menyeluruh.",
    testimonial: "Proses renovasinya sangat terstruktur. Timnya komunikatif dan hasilnya melebihi ekspektasi. Rumah kami terasa seperti baru dan jauh lebih kokoh.t",
  },
  {
    image: "/src/assets/kanopi.png",
    title: "Kanopi",
    location: "Sentul City, Kabupaten Bogor",
    category: "Kanopi",
    detail:
      "Instalasi kanopi carport ini menggunakan rangka baja ringan yang kokoh dengan penutup atap polikarbonat solid untuk meredam panas namun tetap tembus cahaya. Desain rangka disesuaikan untuk integrasi yang rapi dengan talang air tersembunyi.",
    testimonial: "Instalasi kanopinya sangat profesional. Rangkanya kuat dan atapnya terpasang sempurna tanpa celah. Sekarang carport jadi adem dan aman dari hujan.",
  },
  {
    image: "/src/assets/tangga.png",
    title: "Pagar & Tralis",
    location: "Depok, Jawa Barat",
    category: "Pagar & Trails",
    detail:
      "Proyek railing tangga modern ini menggunakan kombinasi material stainless steel untuk handrail dan kaca tempered 10mm. Fokus pengerjaan adalah pada instalasi yang presisi dan kokoh, memastikan keamanan optimal tanpa mengorbankan estetika.",
    testimonial: "Hasil pengerjaan railing tangganya sangat presisi. Sambungannya halus dan yang terpenting sangat kokoh, tidak goyang sama sekali. Aman untuk keluarga.",
  },


];

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filteredProjects =
    activeCategory === "Semua"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pt-32 pb-20 bg-gray-50 min-h-screen"
    >
      <div className="container mx-auto px-4">
        {/* Filter Buttons */}
        <div className="flex overflow-x-auto whitespace-nowrap mb-5 gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#05677E] text-white border-[#05677E] shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fade transition wrapper */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory} // penting biar AnimatePresence trigger pas kategori berubah
            variants={fadeVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid md:grid-cols-3 sm:grid-cols-2 gap-6"
          >
            {filteredProjects.map((p, i) => (
              <motion.div
                key={p.title + i}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={() => setSelectedProject(p)}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl 
                           transition-all duration-500 cursor-pointer bg-white border border-gray-200 
                           hover:bg-[#05677E]"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-all duration-700 
                               group-hover:scale-110 group-hover:brightness-90 rounded-md"
                  />
                </div>

                {/* Icon Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Search
                    size={48}
                    className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
                  />
                </motion.div>

                {/* Text */}
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

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 
                       bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              className="bg-white rounded-xl max-w-6xl w-full overflow-hidden shadow-xl 
                         flex flex-col md:flex-row"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {/* Left image */}
              <div className="md:w-1/2 bg-white p-4 flex items-center justify-center">
                <div className="overflow-hidden w-full h-full rounded-xl">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Right content */}
              <div className="p-8 md:w-1/2 relative flex flex-col justify-center">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={() => setSelectedProject(null)}
                >
                  <X size={24} />
                </button>

                <h2 className="text-3xl font-bold text-[#05677E] mb-1 leading-snug">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-600 mb-6">{selectedProject.location}</p>

                <div className="mb-6">
                  <h3 className="bg-[#E5E4FA] text-[#344A52] px-4 py-2 rounded-xl font-semibold inline-block mb-3">
                    Detail Pengerjaan
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedProject.detail}
                  </p>
                </div>

                <div>
                  <h3 className="bg-[#E5E4FA] text-[#344A52] px-4 py-2 rounded-xl font-semibold inline-block mb-3">
                    Apa kata mereka?
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedProject.testimonial}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
