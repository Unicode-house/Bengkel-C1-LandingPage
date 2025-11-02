"use client";
import { memo } from "react";
import { MapPin, Phone, Mail, Youtube, Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat",
    content: "Bogor, Jawa Barat, Indonesia",
  },
  {
    icon: Phone,
    title: "Telepon",
    content: "+62 813-2147-393",
    link: "tel:+62 813-2147-393",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@mandiritehnikhade.com",
    link: "mailto:info@mandiritehnikhade.com",
  },
];

const socialMedia = [
  { icon: Youtube, name: "YouTube", link: "https://youtube.com/@mandiritehniklaslistrik-pi7ip?si=OUc0rU3GHokfZgFK" },
  { icon: SiTiktok, name: "TikTok", link: "https://www.tiktok.com/@bengkel.las.mandi86?_t=ZS-90foBLLR5E0&_r=1" },
  { icon: Instagram, name: "Instagram", link: "https://www.instagram.com/bengkellasmandiritehnik" },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-muted/30 bg-white">
      <div className="container mx-auto px-4">
        <LazyMotion features={domAnimation}>
          {/* 🧠 Heading */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary select-none">
              Kontak Kami
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto select-none">
              Hubungi kami untuk konsultasi gratis
            </p>
          </motion.div>

          {/* ⚡ Grid Layout */}
          <div className="grid md:grid-cols-2 gap-12">
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
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-card-foreground">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-muted-foreground hover:text-accent transition-colors"
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
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="font-semibold text-lg mb-4 text-card-foreground select-none">
                  Media Sosial
                </h3>
                <div className="flex gap-4">
                  {socialMedia.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-3 rounded-lg"
                      aria-label={social.name}
                      whileHover={{ scale: 1.1, rotate: 2 }}
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
              className="h-[400px] rounded-xl overflow-hidden shadow-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.120616478477!2d106.82443599999999!3d-6.506412699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c17c032765bf%3A0xb1d8d44233ce14ad!2sBengkel%20las%20mandiri%20tehnik(las%20HADE)!5e0!3m2!1sid!2sid!4v1761990438974!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Mandiri Tehnik Hade"
                className="will-change-transform"
              ></iframe>
            </motion.div>
          </div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default memo(Contact);
