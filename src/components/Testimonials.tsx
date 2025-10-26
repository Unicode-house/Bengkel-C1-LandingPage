"use client";

import { memo, useMemo } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  motion,
  Variants,
  LazyMotion,
  domAnimation,
  useReducedMotion,
} from "framer-motion";

/* 🧱 Static data di luar komponen biar gak re-create tiap render */
const testimonials = [
  {
    name: "Bpk. H. Eko Santoso",
    role: "Pemilik Rumah",
    comment:
      "Pekerjaan pagar dan kanopi sangat rapi dan profesional. Timnya ramah dan hasilnya melebihi ekspektasi. Highly recommended!",
    rating: 5,
  },
  {
    name: "Bpk. Munin Niin",
    role: "Pengusaha",
    comment:
      "Sudah beberapa kali menggunakan jasa MTH untuk proyek renovasi. Selalu puas dengan kualitas dan ketepatan waktu.",
    rating: 5,
  },
  {
    name: "Ibu Siti Nurhaliza",
    role: "Arsitek",
    comment:
      "Kerjasama yang sangat baik. Tim MTH paham detail teknis dan memberikan solusi terbaik untuk setiap proyek.",
    rating: 5,
  },
  {
    name: "Bpk. Ahmad Fauzi",
    role: "Developer",
    comment:
      "Pelayanan cepat, harga kompetitif, dan hasil memuaskan. Akan terus bekerja sama untuk proyek-proyek berikutnya.",
    rating: 5,
  },
  {
    name: "Ibu Ratna Dewi",
    role: "Pemilik Toko",
    comment:
      "Folding gate yang dipasang sangat berkualitas. Pemasangannya cepat dan rapi. Terima kasih MTH!",
    rating: 5,
  },
];

/* 🎬 GPU-friendly variants */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Testimonials = () => {
  const prefersReducedMotion = useReducedMotion();

  /* 🧠 Memoize cards biar gak re-render */
  const testimonialCards = useMemo(
    () =>
      testimonials.map((t, index) => (
        <CarouselItem
          key={t.name}
          className="md:basis-1/2 lg:basis-1/3 px-2 select-none"
        >
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={index}
          >
            <Card className="h-full rounded-2xl shadow-card hover:shadow-xl bg-[#F5FAFD] 
                             transition-transform duration-300 hover:-translate-y-1.5 transform-gpu will-change-transform">
              <CardContent className="p-6 flex flex-col h-full">
                {/* ⭐ Rating */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                    />
                  ))}
                </div>

                {/* 💬 Comment */}
                <p className="text-muted-foreground mb-5 italic flex-grow leading-relaxed text-[15px]">
                  “{t.comment}”
                </p>

                {/* 👤 Author */}
                <div className="border-t border-gray-200 pt-3">
                  <p className="font-semibold text-card-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </CarouselItem>
      )),
    []
  );

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-white to-gray-50 scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <LazyMotion features={domAnimation}>
          {/* 🧠 Header */}
          <motion.div
            className="text-center mb-14"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3 text-primary">
              Testimoni Klien
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Kepercayaan klien adalah prioritas kami
            </p>
          </motion.div>

          {/* 💬 Carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>{testimonialCards}</CarouselContent>

            {/* 🧭 Controls */}
            <CarouselPrevious className="hidden md:flex focus:outline-none focus:ring-0 hover:scale-110 transition-transform duration-200" />
            <CarouselNext className="hidden md:flex focus:outline-none focus:ring-0 hover:scale-110 transition-transform duration-200" />
          </Carousel>
        </LazyMotion>
      </div>
    </section>
  );
};

export default memo(Testimonials);
