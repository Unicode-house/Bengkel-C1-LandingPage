import { Shield, Award, Lightbulb, Clock } from "lucide-react";
import { motion, Variants } from "framer-motion";
import teamImage from "@/assets/team-workshop.jpg";

const values = [
  {
    icon: Shield,
    title: "Amanah",
    description: "Terpercaya dalam setiap komitmen",
  },
  {
    icon: Award,
    title: "Profesional",
    description: "Standar kualitas terbaik",
  },
  {
    icon: Lightbulb,
    title: "Inovatif",
    description: "Solusi kreatif dan modern",
  },
  {
    icon: Clock,
    title: "Tepat Waktu",
    description: "Selesai sesuai jadwal",
  },
];

// Variants animasi
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, // cubic-bezier mirip easeOut
  },
};

// Variants container untuk stagger
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25, // jeda antar child
      delayChildren: 0.2, // mulai animasi setelah 0.2s
    },
  },
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Tentang Kami
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            15+ tahun pengalaman di bidang konstruksi dan pengelasan
          </p>
        </motion.div>

        {/* Grid About */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            <h3 className="text-3xl font-semibold text-foreground">
              Mandiri Tehnik Hade
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sejak 2009, kami telah melayani ribuan klien dengan dedikasi
              penuh. Dari proyek rumah tinggal hingga bangunan komersial, kami
              hadir sebagai mitra terpercaya Anda dalam mewujudkan konstruksi
              yang berkualitas.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tim mekanik kami yang berpengalaman siap memberikan solusi terbaik
              untuk setiap kebutuhan konstruksi dan pengelasan Anda.
            </p>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-card hover-lift h-80 bg-cover bg-center"
            style={{ backgroundImage: `url(${teamImage})` }}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Optional overlay kalau mau efek gradasi */}
            <div className="absolute inset-0 bg-black/10"></div>
          </motion.div>
        </div>

        {/* Values Grid dengan stagger */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="p-6 shadow-card hover-lift text-center rounded-xl bg-[#F5FAFD]"
              variants={fadeUp}
            >
              <value.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h4 className="font-semibold text-lg mb-2 text-card-foreground">
                {value.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
