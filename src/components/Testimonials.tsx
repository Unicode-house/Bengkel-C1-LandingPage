"use client";
import { memo } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";

// 🧱 Static data (biar gak re-create tiap render)
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

// 🎬 Variants animasi ringan (GPU friendly)
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <LazyMotion features={domAnimation}>
          {/* 🧠 Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            className="w-full max-w-5xl mx-auto select-none"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.name}
                  className="md:basis-1/2 lg:basis-1/3 px-2"
                >
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={index}
                  >
                    <Card className="h-full rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 bg-[#F5FAFD] hover:-translate-y-1">
                      <CardContent className="p-6 flex flex-col h-full">
                        {/* ⭐ Rating */}
                        <div className="flex gap-1 mb-3">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                            />
                          ))}
                        </div>

                        {/* 💬 Comment */}
                        <p className="text-muted-foreground mb-5 italic flex-grow leading-relaxed text-[15px]">
                          “{testimonial.comment}”
                        </p>

                        {/* 👤 Author */}
                        <div className="border-t border-gray-200 pt-3">
                          <p className="font-semibold text-card-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* 🧭 Controls */}
            <CarouselPrevious className="hidden md:flex focus:outline-none focus:ring-0 hover:scale-110 transition-transform" />
            <CarouselNext className="hidden md:flex focus:outline-none focus:ring-0 hover:scale-110 transition-transform" />
          </Carousel>
        </LazyMotion>
      </div>
    </section>
  );
};

export default memo(Testimonials);
