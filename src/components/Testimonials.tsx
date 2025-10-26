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

// 🧱 Static data di luar komponen biar gak re-create tiap render
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

// 🎬 Motion Variants ringan
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted/30 bg-white">
      <div className="container mx-auto px-4">
        <LazyMotion features={domAnimation}>
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Testimoni Klien
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Kepercayaan klien adalah prioritas kami
            </p>
          </motion.div>

          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.name}
                  className="md:basis-1/2 lg:basis-1/3 rounded-xl"
                >
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <Card className="h-full shadow-card hover-lift rounded-xl focus:outline-none focus:ring-0">
                      <CardContent className="p-6 flex flex-col h-full bg-[#F5FAFD] rounded-xl">
                        {/* ⭐ Rating */}
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>

                        {/* 💬 Comment */}
                        <p className="text-muted-foreground mb-6 flex-grow italic leading-relaxed">
                          “{testimonial.comment}”
                        </p>

                        {/* 👤 Author */}
                        <div>
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

            {/* Controls */}
            <CarouselPrevious className="focus:outline-none focus:ring-0" />
            <CarouselNext className="focus:outline-none focus:ring-0" />
          </Carousel>
        </LazyMotion>
      </div>
    </section>
  );
};

export default memo(Testimonials);
