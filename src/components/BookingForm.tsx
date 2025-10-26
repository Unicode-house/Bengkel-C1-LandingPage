"use client";
import { useState, useCallback, memo } from "react";
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
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";

// ⚙️ Animation Variants (GPU-friendly)
const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
  }),
};

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    notes: "",
  });

  // ⚡ Optimized handlers (useCallback → no re-create on re-render)
  const handleChange = useCallback(
    (key: keyof typeof formData, value: string) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.name || !formData.phone || !formData.service) {
        toast.error("Mohon lengkapi semua field yang wajib diisi");
        return;
      }

      const whatsappNumber = "6285156276912";
      const message = encodeURIComponent(
        `Halo, saya ingin booking layanan:\n\nNama: ${formData.name}\nNomor WA: ${formData.phone}\nLayanan: ${formData.service}\nCatatan: ${formData.notes || "-"}`
      );

      toast.success("Mengarahkan ke WhatsApp...");
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

      setFormData({ name: "", phone: "", service: "", notes: "" });
    },
    [formData]
  );

  return (
    <section id="booking" className="py-20 bg-[#F9FBFC] overflow-hidden">
      <div className="container mx-auto px-4">
        <LazyMotion features={domAnimation}>
          <div className="max-w-2xl mx-auto">
            {/* 🧩 Header */}
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-3 text-primary">
                Booking Layanan
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Isi form di bawah untuk konsultasi gratis
              </p>
            </motion.div>

            {/* 📋 Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg space-y-6 border border-gray-100"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Nama */}
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
              >
                <Label htmlFor="name" className="text-sm font-medium">
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  required
                  autoComplete="name"
                  className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/50"
                />
              </motion.div>

              {/* Nomor WA */}
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                <Label htmlFor="phone" className="text-sm font-medium">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  required
                  autoComplete="tel"
                  className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/50"
                />
              </motion.div>

              {/* Layanan */}
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
              >
                <Label htmlFor="service" className="text-sm font-medium">
                  Jenis Layanan <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => handleChange("service", value)}
                >
                  <SelectTrigger
                    id="service"
                    className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/50"
                  >
                    <SelectValue placeholder="Pilih jenis layanan" />
                  </SelectTrigger>
                  <SelectContent sideOffset={5} className="rounded-xl shadow-md">
                    <SelectItem value="pagar">Pagar & Pintu Besi</SelectItem>
                    <SelectItem value="renovasi">Renovasi Bangunan</SelectItem>
                    <SelectItem value="kanopi">Kanopi & Tralis</SelectItem>
                    <SelectItem value="folding">
                      Folding Gate / Pintu Aluminium
                    </SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Catatan */}
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={3}
              >
                <Label htmlFor="notes" className="text-sm font-medium">
                  Catatan (Opsional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Jelaskan detail proyek atau pertanyaan Anda"
                  rows={4}
                  className="resize-none rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/50"
                />
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl text-white bg-gradient-to-r from-primary to-primary/70 hover:opacity-90 transition transform hover:scale-[1.02] shadow-md"
                >
                  Booking Sekarang
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default memo(BookingForm);
