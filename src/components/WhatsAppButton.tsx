import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const whatsappNumber = "628132147393";
  const whatsappMessage = encodeURIComponent("Halo, saya ingin bertanya tentang layanan Mandiri Tehnik Hade");

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      variant="hero"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-xl hover:bg-gray-600 bg-gray-700"
      aria-label="Chat via WhatsApp"
    >
      <FaWhatsapp className="h-10 w-10 text-white drop-shadow-md" />
    </Button>
  );
};

export default WhatsAppButton;
