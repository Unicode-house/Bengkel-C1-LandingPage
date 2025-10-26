"use client";
import { useState } from "react";
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
import { motion, Variants } from "framer-motion";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.service) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    const whatsappNumber = "6285156276912";
    const message = encodeURIComponent(
      `Halo, saya ingin booking layanan:\n\nNama: ${formData.name}\nNomor WA: ${formData.phone}\nLayanan: ${formData.service}\nCatatan: ${formData.notes || "-"}`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    toast.success("Mengarahkan ke WhatsApp...");

    setFormData({ name: "", phone: "", service: "", notes: "" });
  };

  const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <section id="booking" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Booking Layanan
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Isi form di bawah untuk konsultasi gratis
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-lg space-y-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Nama */}
            <motion.div
              className="space-y-2 rounded-xl"
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              custom={0}
            >
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Nama Lengkap <span className="text-error">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama lengkap"
                className=" border border-outline/30 focus:ring-2 focus:ring-primary/40 rounded-xl"
                required
              />
            </motion.div>

            {/* Nomor WA */}
            <motion.div
              className="space-y-2"
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              custom={1}
            >
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Nomor WhatsApp <span className="text-error">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="08xxxxxxxxxx"
                className="rounded-xl border border-outline/30 focus:ring-2 focus:ring-primary/40"
                required
              />
            </motion.div>

            {/* Layanan */}
            <motion.div
              className="space-y-2"
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              custom={2}
            >
              <Label htmlFor="service" className="text-sm font-medium text-foreground rounded-xl">
                Jenis Layanan <span className="text-error">*</span>
              </Label>
              <Select
              
                value={formData.service}
                onValueChange={(value) => setFormData({ ...formData, service: value })}
              >
                <SelectTrigger
                  id="service"
                  className="w-full  border border-outline/30 focus:ring-2 focus:ring-primary/40 rounded-xl"
                >
                  <SelectValue placeholder="Pilih jenis layanan" />
                </SelectTrigger>
                <SelectContent sideOffset={5} className="rounded-xl shadow-lg">
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
              viewport={{ once: false }}
              custom={3}
            >
              <Label htmlFor="notes" className="text-sm font-medium text-foreground rounded-xl">
                Catatan (Opsional)
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Jelaskan detail proyek atau pertanyaan Anda"
                rows={4}
                className="resize-none  border border-outline/30 focus:ring-2 focus:ring-primary/40 rounded-xl"
              />
            </motion.div>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 
                bg-gradient-to-r from-primary to-primary/70 text-white"
              >
                Booking Sekarang
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
