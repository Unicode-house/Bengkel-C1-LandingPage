"use client";
import { memo } from "react";
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";
import valuesBg from "/assets/values-bg.webp"; // ⚡ pakai format webp untuk load lebih cepat

// 🧱 Static values di luar komponen
const companyValues = ["Amanah", "Profesional", "Inovatif", "Tanggung Jawab", "Kualitas"];

// ⚙️ Variants ringan & GPU-friendly
const listVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.4, ease: "easeOut" },
  }),
};

const Values = () => {
  return (
    <section
      className="py-20 relative overflow-hidden bg-[#021B22] text-white will-change-transform"
      id="values"
    >
      <LazyMotion features={domAnimation}>
        {/* 🖼️ Background optimized */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: `url(${valuesBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          onContextMenu={(e) => e.preventDefault()}
          initial={{ scale: 1.04 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-black/50 sm:bg-black/40 backdrop-blur-[0.5px]" />
        </motion.div>

        {/* ✅ Preload hidden image (biar gak LCP delay) */}
        <img
          src={valuesBg}
          alt="Background Values"
          width="1920"
          height="1080"
          loading="eager"
          decoding="async"
          className="hidden"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* 🧩 Left content */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                Nilai & Filosofi
              </h2>

              <div className="space-y-4">
                {companyValues.map((value, index) => (
                  <motion.div
                    key={value}
                    className="flex items-center gap-4"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={index}
                  >
                    <div className="w-2 h-2 bg-accent rounded-full shrink-0"></div>
                    <span className="text-lg font-medium">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 🧠 Quote box */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/20 shadow-lg transition-all duration-500"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <blockquote className="text-white">
                <p className="text-lg md:text-2xl font-light leading-relaxed italic mb-4">
                  “Dengan semangat yang kuat dan niat yang tulus, kami menciptakan
                  solusi kreatif dan menjaga profesionalisme demi kemajuan bersama.”
                </p>
                <footer className="text-accent font-semibold">
                  — Mandiri Tehnik Hade
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </LazyMotion>
    </section>
  );
};

export default memo(Values);
