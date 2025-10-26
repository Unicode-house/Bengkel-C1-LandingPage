"use client";
import { memo } from "react";
import {
  DoorOpen,
  Home,
  Sun,
  MoveUpRight,
  Shield,
  Grid,
  PanelsTopLeft,
  Settings,
} from "lucide-react";
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";

// 🧱 Static data di luar komponen (hemat re-render)
const services = [
  {
    icon: Home,
    title: "Bangun Baru & Renovasi",
    description:
      "Konstruksi rumah baru dan renovasi dengan standar kualitas tinggi, dikerjakan oleh tim profesional berpengalaman.",
  },
  {
    icon: Shield,
    title: "Pagar & Tralis",
    description:
      "Desain dan instalasi pagar serta tralis dengan berbagai model, dari minimalis hingga ornamental yang elegan.",
  },
  {
    icon: Sun,
    title: "Kanopi",
    description:
      "Kanopi berkualitas untuk carport, teras, dan area outdoor dengan material tahan lama dan desain menarik.",
  },
  {
    icon: MoveUpRight,
    title: "Relling Tangga & Balkon",
    description:
      "Railing tangga dan balkon stainless steel atau besi dengan desain modern, aman, dan tahan karat.",
  },
  {
    icon: DoorOpen,
    title: "Pintu Dorong & Swing",
    description:
      "Pintu dengan sistem dorong dan swing untuk kebutuhan, dari rumah tinggal hingga komersial.",
  },
  {
    icon: Grid,
    title: "Rolling Door & Folding Gate",
    description:
      "Rolling door dan folding gate otomatis maupun manual untuk keamanan maksimal properti Anda.",
  },
  {
    icon: PanelsTopLeft,
    title: "Kusen, Pintu & Jendela Aluminium",
    description:
      "Kusen pintu, dan jendela aluminium dengan berbagai warna dan finishing, tahan lama dan anti rayap.",
  },
  {
    icon: Settings,
    title: "Custom Metalwork",
    description:
      "Layanan pengelasan khusus untuk kebutuhan custom sesuai spesifikasi dan desain yang Anda inginkan.",
  },
];

// ⚙️ Variants ringan dan efisien (framerate stabil)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
      ease: "easeOut",
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const Services = () => {
  return (
    <section
      id="services"
      className="py-20 bg-[#F9FBFC] overflow-hidden will-change-transform"
    >
      <div className="container mx-auto px-4">
        {/* ✅ LazyMotion buat load animasi lebih hemat */}
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
              Layanan Kami
            </h2>
            <p className="text-base md:text-xl text-[#05677E] max-w-2xl mx-auto">
              Dari desain hingga instalasi, kami tawarkan solusi lengkap untuk
              kebutuhan konstruksi dan pengelasan Anda
            </p>
          </motion.div>

          {/* Grid Services */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                className="bg-[#CFE6F0] p-6 md:p-8 rounded-xl shadow-card hover-lift 
                           transition-transform duration-300 group cursor-pointer 
                           will-change-transform"
                variants={cardVariants}
              >
                <div
                  className="bg-[#B6EBFF] w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center 
                             justify-center mb-5 md:mb-6 transition-colors duration-300 
                             group-hover:bg-[#003543]"
                >
                  <service.icon
                    className="h-7 w-7 md:h-8 md:w-8 text-primary transition-colors duration-300 
                               group-hover:text-white"
                  />
                </div>
                <h3 className="font-semibold text-lg md:text-xl mb-2 text-card-foreground">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default memo(Services);
