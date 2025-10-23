"use client";
import { MapPin, Phone } from "lucide-react";
import { motion, Variants } from "framer-motion";
// Import gambar dari assets
import engineeringImg from "/assets/engineering.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const menuItems = [
    { label: "Home", id: "hero" },
    { label: "Tentang Kami", id: "about" },
    { label: "Layanan", id: "services" },
    { label: "Galeri", id: "gallery" },
    { label: "Testimoni", id: "testimonials" },
    { label: "Booking", id: "booking" },
    { label: "Kontak", id: "contact" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-12">
        {/* Logo & Deskripsi */}
        <motion.div
          className="space-y-4 text-gray-700"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white p-3 rounded-full flex items-center justify-center">
              <img
                src={engineeringImg}
                alt="Mandiri Teknik Hade Logo"
                className="h-11 w-11 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-[#05677E] leading-tight">
              MANDIRI <br /> TEKNIK HADE
            </h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Sejak 2009, kami telah melayani ribuan klien dengan dedikasi penuh.
            Dari proyek rumah tinggal hingga bangunan komersial, kami hadir
            sebagai mitra terpercaya Anda dalam mewujudkan konstruksi yang
            berkualitas. <br />
            Tim mekanik kami yang berpengalaman siap memberikan solusi terbaik
            untuk setiap kebutuhan konstruksi dan pengelasan Anda.
          </p>
        </motion.div>

        {/* Menu Halaman */}
        <motion.div
          className="space-y-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <h4 className="text-lg font-bold text-[#05677E]">Halaman</h4>
          <ul className="space-y-2 text-gray-700">
            {menuItems.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="hover:text-[#05677E] transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Kontak */}
        <motion.div
          className="space-y-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          <h4 className="text-lg font-bold text-[#05677E]">Kontak</h4>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-[#05677E]" />
              <span>Alamat 1 wkwkwkwkakajsfasfajdlf</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-[#05677E]" />
              <span>Alamat 2 wkwkwkwkakajsfasfajdlf</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-[#05677E]" />
              <span>Alamat 3 wkwkwkwkakajsfasfajdlf</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="h-5 w-5 text-[#05677E]" />
              <span>082628977634</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="bg-[#05677E] text-white text-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="container mx-auto px-4 py-4 text-center space-y-2">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
            <p>Copyright © {currentYear} Mandiri Tehnik Hade</p>
            <span className="hidden md:inline">|</span>
            <p>Dibuat oleh MTH Team</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <a href="#" className="hover:underline">
              Legalitas
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
