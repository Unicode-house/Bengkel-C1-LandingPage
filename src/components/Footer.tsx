"use client";

import { memo, useMemo, useCallback } from "react";
import { MapPin, Phone } from "lucide-react";
import {
  motion,
  Variants,
  LazyMotion,
  domAnimation,
  useReducedMotion,
} from "framer-motion";
import engineeringImg from "/assets/engineering.jpg";

/* 🧱 Static data (immutable) */
const menuItems = [
  { label: "Home", id: "hero" },
  { label: "Tentang Kami", id: "about" },
  { label: "Layanan", id: "services" },
  { label: "Galeri", id: "gallery" },
  { label: "Testimoni", id: "testimonials" },
  { label: "Booking", id: "booking" },
  { label: "Kontak", id: "contact" },
];

const contacts = [
  { icon: MapPin, text: "Alamat 1 - Jl. Merdeka No. 123, Bogor" },
  { icon: MapPin, text: "Alamat 2 - Jl. Raya Pajajaran, Bogor" },
  { icon: MapPin, text: "Alamat 3 - Jl. Ciomas, Bogor Barat" },
  { icon: Phone, text: "0826-2897-7634", link: "tel:082628977634" },
];

/* ⚙️ Animation Variants */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.45, ease: "easeOut" },
  }),
};

const Footer = () => {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  /* 🧠 Memoized data map */
  const renderMenu = useMemo(
    () =>
      menuItems.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => scrollToSection(item.id)}
            className="hover:text-[#05677E] transition-colors duration-200"
          >
            {item.label}
          </button>
        </li>
      )),
    []
  );

  const renderContacts = useMemo(
    () =>
      contacts.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <item.icon className="h-5 w-5 text-[#05677E] flex-shrink-0" />
          {item.link ? (
            <a
              href={item.link}
              className="hover:text-[#05677E] transition-colors duration-200"
            >
              {item.text}
            </a>
          ) : (
            <span>{item.text}</span>
          )}
        </li>
      )),
    []
  );

  /* ⚡ Optimized scroll handler */
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const offset = 80;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 scroll-mt-20">
      <LazyMotion features={domAnimation}>
        {/* 🌐 Top Section */}
        <div className="container mx-auto px-4 py-16 grid gap-10 md:grid-cols-3">
          {/* 🧱 Brand Info */}
          <motion.div
            className="space-y-5 text-gray-700 transform-gpu will-change-transform"
            variants={fadeUp}
            initial="hidden"
            whileInView={prefersReducedMotion ? {} : "visible"}
            viewport={{ once: true }}
            custom={0}
          >
            <div className="flex items-center gap-3">
              <div className="bg-white p-3 rounded-full shadow-md flex items-center justify-center">
                <img
                  src={engineeringImg}
                  alt="Mandiri Teknik Hade Logo"
                  loading="lazy"
                  decoding="async"
                  width="44"
                  height="44"
                  className="h-11 w-11 object-contain"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <h3 className="text-xl font-bold text-[#05677E] leading-tight">
                MANDIRI <br /> TEKNIK HADE
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-gray-600 max-w-md">
              Sejak 2009, kami telah melayani ribuan klien dengan dedikasi penuh.
              Dari proyek rumah tinggal hingga bangunan komersial, kami hadir
              sebagai mitra terpercaya dalam mewujudkan konstruksi berkualitas
              dan profesional.
            </p>
          </motion.div>

          {/* 🧭 Navigation Menu */}
          <motion.div
            className="space-y-4 transform-gpu will-change-transform"
            variants={fadeUp}
            initial="hidden"
            whileInView={prefersReducedMotion ? {} : "visible"}
            viewport={{ once: true }}
            custom={1}
          >
            <h4 className="text-lg font-bold text-[#05677E]">Halaman</h4>
            <ul className="space-y-2 text-gray-700">{renderMenu}</ul>
          </motion.div>

          {/* 📞 Contact Info */}
          <motion.div
            className="space-y-4 transform-gpu will-change-transform"
            variants={fadeUp}
            initial="hidden"
            whileInView={prefersReducedMotion ? {} : "visible"}
            viewport={{ once: true }}
            custom={2}
          >
            <h4 className="text-lg font-bold text-[#05677E]">Kontak</h4>
            <ul className="space-y-3 text-gray-700">{renderContacts}</ul>
          </motion.div>
        </div>

        {/* ⚡ Bottom Bar */}
        <motion.div
          className="bg-[#05677E] text-white text-sm transform-gpu will-change-transform"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
            <div className="space-y-1 md:space-y-0 md:flex md:items-center md:gap-3">
              <p>© {currentYear} Mandiri Tehnik Hade</p>
              <span className="hidden md:inline">|</span>
              <p>Dibuat oleh MTH Team</p>
            </div>

            <div className="flex items-center justify-center gap-3 text-white/90">
              <a
                href="#"
                className="hover:text-white underline-offset-4 hover:underline transition-all duration-200"
              >
                Legalitas
              </a>
              <span>|</span>
              <a
                href="#"
                className="hover:text-white underline-offset-4 hover:underline transition-all duration-200"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </motion.div>
      </LazyMotion>
    </footer>
  );
};

export default memo(Footer);
