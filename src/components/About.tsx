"use client";
import { memo } from "react";
import { Shield, Award, Lightbulb, Clock } from "lucide-react";
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";
import teamImage from "/assets/team-workshop.jpg";

// 🧱 Static data biar gak re-create tiap render
const values = [
  { icon: Shield, title: "Amanah", description: "Terpercaya dalam setiap komitmen" },
  { icon: Award, title: "Profesional", description: "Standar kualitas terbaik" },
  { icon: Lightbulb, title: "Inovatif", description: "Solusi kreatif dan modern" },
  { icon: Clock, title: "Tepat Waktu", description: "Selesai sesuai jadwal" },
];

// ⚙️ Animasi ringan, halus, GPU-friendly
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-white overflow-hidden will-change-transform">
      <div className="container mx-auto px-4">
        <LazyMotion features={domAnimation}>
          {/* Title */}
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Tentang Kami
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              15+ tahun pengalaman di bidang konstruksi dan pengelasan
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16">
            <motion.div
              className="space-y-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                Mandiri Tehnik Hade
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Sejak 2009, kami telah melayani ribuan klien dengan dedikasi penuh.
                Dari proyek rumah tinggal hingga bangunan komersial, kami hadir sebagai
                mitra terpercaya Anda dalam mewujudkan konstruksi yang berkualitas.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Tim mekanik kami yang berpengalaman siap memberikan solusi terbaik untuk
                setiap kebutuhan konstruksi dan pengelasan Anda.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-card bg-cover bg-center"
              style={{ backgroundImage: `url(${teamImage})`, willChange: "transform, opacity" }}
              onContextMenu={(e) => e.preventDefault()}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                className="p-6 bg-[#F5FAFD] rounded-xl shadow-card text-center hover-lift 
                           transition-transform duration-300 will-change-transform"
                variants={fadeUp}
              >
                <value.icon className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-4 text-accent" />
                <h4 className="font-semibold text-lg mb-2 text-card-foreground">
                  {value.title}
                </h4>
                <p className="text-sm md:text-base text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default memo(About);
