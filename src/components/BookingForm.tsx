"use client";

import { memo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  motion,
  Variants,
  LazyMotion,
  domAnimation,
  useReducedMotion,
} from "framer-motion";

const BookingForm = () => {
  const prefersReducedMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (isSubmitting) return; // prevent spam

      if (!formData.name || !formData.phone || !formData.service) {
        toast.error("Mohon lengkapi semua field yang wajib diisi");
        return;
      }

      setIsSubmitting(true);

      const whatsappNumber = "628132147393";
      const message = encodeURIComponent(
        `Halo, saya ingin booking layanan:\n\nNama: ${formData.name}\nNomor WA: ${formData.phone}\nLayanan: ${formData.service}\nCatatan: ${formData.notes || "-"}`
      );

      toast.success("Mengarahkan ke WhatsApp...");
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

      // Reset form setelah 1 detik (biar gak nge-flash)
      setTimeout(() => {
        setFormData({ name: "", phone: "", service: "", notes: "" });
        setIsSubmitting(false);
      }, 1000);
    },
    [formData, isSubmitting]
  );

  /* 🎬 Smooth field animation */
  const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <section id="booking" className="py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <LazyMotion features={domAnimation}>
            {/* 🧠 Header */}
            <motion.div
              className="text-center mb-12"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary select-none">
                Booking Layanan
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground select-none">
                Isi form di bawah untuk konsultasi gratis
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-lg space-y-6 border border-white/20 transform-gpu will-change-transform"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Nama */}
              <motion.div
                className="space-y-2"
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
              >
                <Label htmlFor="name">
                  Nama Lengkap <span className="text-error select-none">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="border border-outline/30 focus:ring-2 focus:ring-primary/40 rounded-xl"
                  required
                />
              </motion.div>

              {/* Nomor WA */}
              <motion.div
                className="space-y-2"
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                <Label htmlFor="phone">
                  Nomor WhatsApp <span className="text-error">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="rounded-xl border border-outline/30 focus:ring-2 focus:ring-primary/40"
                  required
                />
              </motion.div>

              {/* Jenis Layanan */}
              <motion.div
                className="space-y-2"
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
              >
                <Label htmlFor="service">
                  Jenis Layanan <span className="text-error select-none">*</span>
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(val) => handleChange("service", val)}
                >
                  <SelectTrigger
                    id="service"
                    className="w-full border border-outline/30 focus:ring-2 focus:ring-primary/40 rounded-xl"
                  >
                    <SelectValue placeholder="Pilih jenis layanan" />
                  </SelectTrigger>
                  <SelectContent
                    sideOffset={5}
                    className="rounded-xl shadow-lg bg-white"
                  >
                    <SelectItem value="pagar">Pagar & Pintu Besi</SelectItem>
                    <SelectItem value="renovasi">Renovasi Bangunan</SelectItem>
                    <SelectItem value="kanopi">Kanopi & Tralis</SelectItem>
                    <SelectItem value="folding">Folding Gate / Pintu Alumunium</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Catatan */}
              <motion.div
                className="space-y-2"
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={3}
              >
                <Label htmlFor="notes">Catatan (Opsional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Jelaskan detail proyek atau pertanyaan Anda"
                  rows={4}
                  className="resize-none border border-outline/30 focus:ring-2 focus:ring-primary/40 rounded-xl"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.03]
                    bg-gradient-to-r from-primary to-primary/70 text-white"
                >
                  {isSubmitting ? "Memproses..." : "Booking Sekarang"}
                </Button>
              </motion.div>
            </motion.form>
          </LazyMotion>
        </div>
      </div>
    </section>
  );
};

export default memo(BookingForm);
