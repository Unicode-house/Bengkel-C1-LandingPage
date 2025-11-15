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

const testimonials = [
  {
    name: "Bpk. Kaimudin (Rektor STITSIFA)",
    proyek: "Pekerjaan Perbesian di Kampus STITSIFA",
    comment:
      "Mandiri Tehnik bekerja dengan profesional dan hasilnya rapi serta kuat. Kolaborasi berjalan lancar, penuh komunikasi dan saling percaya. Kami sangat puas dan akan terus mempercayakan proyek perbesian kampus kepada Mandiri Tehnik.",
    rating: 5,
  },
  {
    name: "Bpk. Kino ",
    proyek: "Proyek Pekerjaan Besi",
    comment:
      "Ade orangnya terbuka dan cepat tanggap terhadap masukan. Timnya solid, hasil pekerjaan rapi, dan komunikasinya lancar. Walau jadwal padat, semua selesai tepat waktu dengan hasil memuaskan.",
    rating: 5,
  },
  {
    name: "Bpk. H. Dedi ",
    proyek: "Pintu Gerbang & Folding Gate",
    comment:
      "Mandiri Tehnik memberikan hasil yang rapi, detail, dan kokoh. Timnya profesional dan tanggap terhadap perubahan di lapangan. Kualitas pengerjaan benar-benar di atas ekspektasi kami.",
    rating: 4,
  },
  {
    name: "Bang Hafiz Nugraha",
    proyek: "Pintu Dorong & Pintu Sliding Garasi",
    comment:
      "Kang Haji dikenal disiplin dan hasil kerjanya selalu memuaskan. Pintu dorong dan sliding garasi dikerjakan dengan presisi dan tampilan yang keren. Pelayanan cepat, hasilnya juga tahan lama.",
    rating: 5,
  },
  {
    name: "Aby H. Ahmad ",
    proyek: "Reling Tangga Stainless, Pintu & Jendela",
    comment:
      "Pekerjaan Mandiri Tehnik selalu rapi dan berkualitas tinggi. Dari reling tangga, pintu, hingga jendela, semuanya dikerjakan dengan hasil sempurna. Semoga terus diberkahi kesuksesan.",
    rating: 4,
  },
  {
    name: "Bpk. H. Munin Niin, S.E.",
    proyek: "Pembangunan Aula Pernikahan",
    comment:
      "Desain aula dikerjakan dengan hasil memuaskan dan kokoh. Walau dengan budget terbatas, hasil akhirnya tetap luar biasa. Bangunannya masih awet dan terawat sampai sekarang.",
    rating: 5,
  },
  {
    name: "Bpk. H. Eko ",
    proyek: "Pembuatan Pintu Lipat",
    comment:
      "Om Haji orangnya ramah dan pekerjaannya sangat rapi. Harga bersahabat tapi hasilnya luar biasa kuat dan presisi. Pintu lipat yang dibuat masih awet dan mulus hingga kini.",
    rating: 5,
  },
];

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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary select-none">
              Testimoni Klien
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto select-none">
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
            <CarouselContent className="pb-2 snap-x snap-mandatory">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.name}
                  className="snap-start md:basis-1/2 lg:basis-1/3 rounded-xl"
                >
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <Card className="h-full shadow-card hover-lift rounded-xl focus:outline-none focus:ring-0">
                      <CardContent className="p-6 flex flex-col justify-between h-full bg-[#F5FAFD] rounded-xl min-h-[280px]">
                        
                        {/* ⭐ Rating */}
                        <div className="flex gap-1 mb-4 select-none">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 fill-yellow-400 text-yellow-400"
                              />
                            )
                          )}
                        </div>

                        {/* 💬 Comment */}
                        <p className="text-muted-foreground italic leading-relaxed select-none flex-grow mb-6 line-clamp-5">
                          “{testimonial.comment}”
                        </p>

                        {/* 👤 Author */}
                        <div className="mt-auto">
                          <p className="font-semibold text-card-foreground select-none">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-muted-foreground select-none">
                            {testimonial.proyek}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Controls (desktop only) */}
            <CarouselPrevious className="hidden md:flex focus:outline-none focus:ring-0" />
            <CarouselNext className="hidden md:flex focus:outline-none focus:ring-0" />
          </Carousel>

          {/* 👉 Swipe Indicator (Mobile Only) */}
          <div className="mt-4 flex items-center justify-center gap-2 md:hidden select-none">
            <span className="text-muted-foreground text-sm">Geser</span>

            <div className="flex gap-1">
              <svg
                className="w-4 h-4 text-muted-foreground animate-bounce-x"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l6-6-6-6" />
              </svg>

              <svg
                className="w-4 h-4 text-muted-foreground animate-bounce-x delay-150"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l6-6-6-6" />
              </svg>
            </div>
          </div>

        </LazyMotion>
      </div>
    </section>
  );
};

export default memo(Testimonials);
