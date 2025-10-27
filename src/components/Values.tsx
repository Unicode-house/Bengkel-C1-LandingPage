"use client";
import { memo } from "react";
import valuesBg from "/assets/values-bg 1.jpg";
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";

const companyValues = ["Amanah", "Profesional", "Inovatif", "Tanggung Jawab", "Kualitas"];

const listVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
  }),
};

const Values = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <LazyMotion features={domAnimation}>
        {/* 🖼️ Background Image with animation */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: `url(${valuesBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onContextMenu={(e) => e.preventDefault()}
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </motion.div>

        {/* ✅ Preload hidden image for LCP optimization */}
        <img
          src={valuesBg}
          alt="Background Values"
          loading="lazy"
          decoding="async"
          width="1920"
          height="1080"
          className="hidden"
          onContextMenu={(e) => e.preventDefault()}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 🧩 Left content */}
            <div className="text-white space-y-6">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Nilai & Filosofi
              </motion.h2>

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
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-lg font-medium">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 🧠 Quote box */}
            <motion.div
              className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <blockquote className="text-white">
                <p className="text-xl md:text-2xl font-light leading-relaxed italic mb-4">
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
