"use client";
import { memo, useCallback } from "react";
import {
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  MessageSquare,
} from "lucide-react"; // 🧩 Icon media sosial
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";
import engineeringImg from "/assets/logo-non-background.webp";

const menuItems = [
  { label: "Home", id: "hero" },
  { label: "Tentang Kami", id: "about" },
  { label: "Layanan", id: "services" },
  { label: "Galeri", id: "gallery" },
  { label: "Testimoni", id: "testimonials" },
  { label: "Booking", id: "booking" },
  { label: "Kontak", id: "contact" },
];

const message = encodeURIComponent("Halo, saya tertarik dengan layanan Anda!");
const waLink = `https://api.whatsapp.com/send?phone=628132147393&text=${message}`;

console.log("isi wa:"+waLink)

// const message = encodeURIComponent("Halo, saya tertarik dengan layanan Anda!");
// const waLink = `https://wa.me/628132147393?text=${message}`;


const contacts = [
  { icon: MapPin, text: "Alamat 1 - Jl. Merdeka No. 123, Bogor" },
  { icon: MessageSquare, text: "Hubungi via WhatsApp", link: waLink },
  { icon: Phone, text: "+62 813-2147-393", link: waLink },
];

// 🌐 Sosial Media
const socials = [
  {
    name: "Facebook",
    icon: Facebook,
    link: "https://www.facebook.com/share/176FrjUn4E/",
  },
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://www.instagram.com/bengkellasmandiritehnik",
  },
  {
    name: "TikTok",
    icon: MessageSquare,
    link: "https://www.tiktok.com/@bengkel.las.mandi86?_t=ZS-90foBLLR5E0&_r=1",
  },
  {
    name: "YouTube",
    icon: Youtube,
    link: "https://youtube.com/@mandiritehniklaslistrik-pi7ip?si=OUc0rU3GHokfZgFK",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const offset = 80;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <footer className="bg-white border-t border-gray-200">
      <LazyMotion features={domAnimation}>
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-12">
          {/* 🏗️ Brand Section */}
          <motion.div
            className="space-y-4 text-gray-700"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-white w-[90px] h-[90px]">
                <img
                  src={engineeringImg}
                  alt="Mandiri Teknik Hade Logo"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain scale-110"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#05677E] leading-snug tracking-tight">
                MANDIRI <br /> TEKNIK HADE
              </h3>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Sejak 2009, kami telah melayani ribuan klien dengan dedikasi penuh.
              Dari proyek rumah tinggal hingga bangunan komersial, kami hadir
              sebagai mitra terpercaya Anda dalam mewujudkan konstruksi
              berkualitas dan profesional.
            </p>
          </motion.div>

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
              {menuItems.map((item) => (
                <li key={item.id}>
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

          {/* 📞 Contact + Social */}
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
              {contacts.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <item.icon className="h-5 w-5 text-[#05677E] flex-shrink-0" />
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#05677E] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <h4 className="text-lg font-bold text-[#05677E] mb-2">
                Sosial Media
              </h4>
              <div className="flex flex-wrap gap-4">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#05677E] transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="text-sm">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ⚙️ Bottom Bar */}
        <motion.div
          className="bg-[#05677E] text-white text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="container mx-auto px-4 py-4 text-center space-y-2">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
              <p>© {currentYear} Mandiri Tehnik Hade</p>
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
      </LazyMotion>
    </footer>
  );
};

export default memo(Footer);
