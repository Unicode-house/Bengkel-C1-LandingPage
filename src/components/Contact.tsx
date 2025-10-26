"use client";
import { memo } from "react";
import { MapPin, Phone, Mail, Youtube, Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";

// 🧱 Static Data (biar gak recreate tiap render)
const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat",
    content: "Bogor, Jawa Barat, Indonesia",
  },
  {
    icon: Phone,
    title: "Telepon",
    content: "+62 851-5665-5145",
    link: "tel:+6285156655145",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@mandiritehnikhade.com",
    link: "mailto:info@mandiritehnikhade.com",
  },
];

const socialMedia = [
  { icon: Youtube, name: "YouTube", link: "#" },
  { icon: SiTiktok, name: "TikTok", link: "#" },
  { icon: Instagram, name: "Instagram", link: "#" },
];

// ⚙️ Animation Variants (GPU friendly)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.4, ease: "easeOut" },
  }),
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <LazyMotion features={domAnimation}>
          {/* 🧠 Heading */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Kontak Kami
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Hubungi kami untuk konsultasi atau kerja sama proyek
            </p>
          </motion.div>

          {/* ⚡ Grid */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* 🧭 Contact Info */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="flex items-start gap-4"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <div className="bg-primary/10 p-3 rounded-xl flex-shrink-0">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-card-foreground">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-muted-foreground hover:text-accent transition-colors duration-300"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* 🌐 Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <h3 className="font-semibold text-lg mb-4 text-card-foreground">
                  Media Sosial
                </h3>
                <div className="flex gap-4">
                  {socialMedia.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="bg-primary/10 p-3 rounded-xl transition-colors hover:bg-primary/20"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="h-6 w-6 text-primary" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* 🗺️ Map Section */}
            <motion.div
              className="h-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-100"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d106.68942834335936!3d-6.594509999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5d2e602b501%3A0x25a12f0f97fac4ee!2sBogor%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1234567890"
                loading="lazy"
                title="Lokasi Mandiri Tehnik Hade"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="w-full h-full border-none will-change-transform"
              ></iframe>
            </motion.div>
          </div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default memo(Contact);
