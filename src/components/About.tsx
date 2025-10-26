"use client";

import { memo, useMemo } from "react";
import { Shield, Award, Lightbulb, Clock } from "lucide-react";
import {
  motion,
  Variants,
  LazyMotion,
  domAnimation,
  useReducedMotion,
} from "framer-motion";
import teamImage from "/assets/team-workshop.jpg";

/* 🧱 Static data di luar komponen biar gak re-create tiap render */
const values = [
  { icon: Shield, title: "Amanah", description: "Terpercaya dalam setiap komitmen" },
  { icon: Award, title: "Profesional", description: "Standar kualitas terbaik" },
  { icon: Lightbulb, title: "Inovatif", description: "Solusi kreatif dan modern" },
  { icon: Clock, title: "Tepat Waktu", description: "Selesai sesuai jadwal" },
];

/* ⚙️ Animasi reusable, ringan, GPU-friendly */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const About = () => {
  const prefersReducedMotion = useReducedMotion();

  /* 🧠 Memoized value cards */
  const valueCards = useMemo(
    () =>
      values.map((value) => (
        <motion.div
          key={value.title}
          className="p-6 shadow-card hover:shadow-lg hover:-translate-y-1.5 transition-transform duration-300
                     text-center rounded-xl bg-[#F5FAFD] transform-gpu will-change-transform"
          variants={fadeUp}
        >
          <value.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h4 className="font-semibold text-lg mb-2 text-card-foreground">
            {value.title}
          </h4>
          <p className="text-sm text-muted-foreground">{value.description}</p>
        </motion.div>
      )),
    []
  );

  return (
    <section id="about" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <LazyMotion features={domAnimation}>
          {/* 🧠 Title Section */}
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView={prefersReducedMotion ? {} : "show"}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Tentang Kami
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              15+ tahun pengalaman di bidang konstruksi dan pengelasan
            </p>
          </motion.div>

          {/* 🧩 Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* 📝 Text */}
            <motion.div
              className="space-y-6"
              variants={fadeUp}
              initial="hidden"
              whileInView={prefersReducedMotion ? {} : "show"}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-3xl font-semibold text-foreground">
                Mandiri Tehnik Hade
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sejak 2009, kami telah melayani ribuan klien dengan dedikasi penuh. Dari proyek
                rumah tinggal hingga bangunan komersial, kami hadir sebagai mitra terpercaya
                dalam mewujudkan konstruksi yang berkualitas.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Tim mekanik kami yang berpengalaman siap memberikan solusi terbaik untuk setiap
                kebutuhan konstruksi dan pengelasan Anda.
              </p>
            </motion.div>

            {/* 🖼️ Image */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-xl h-80 
                         bg-cover bg-center transform-gpu will-change-transform"
              style={{ backgroundImage: `url(${teamImage})` }}
              onContextMenu={(e) => e.preventDefault()}
              variants={fadeUp}
              initial="hidden"
              whileInView={prefersReducedMotion ? {} : "show"}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/10" />
              {/* ✅ Preload image for LCP optimization */}
              <link rel="preload" as="image" href={teamImage} />
              <img
                src={teamImage}
                alt="Tim Mandiri Tehnik Hade"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                className="hidden"
              />
            </motion.div>
          </div>

          {/* 💎 Company Values */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView={prefersReducedMotion ? {} : "show"}
            viewport={{ once: true, amount: 0.3 }}
          >
            {valueCards}
          </motion.div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default memo(About);
