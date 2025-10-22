import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const menuItems = [
    { label: "Home", id: "hero" },
    { label: "Tentang Kami", id: "about" },
    { label: "Layanan", id: "services" },
    { label: "Galeri", id: "gallery" },
    { label: "Testimoni", id: "testimonials" },
    { label: "Booking", id: "booking" },
    { label: "Kontak", id: "contact" },
  ];

  useEffect(() => {

    if (location.pathname === "/projects") {
      setActiveSection("gallery");
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Kalau masih di atas, paksa Home aktif
      if (window.scrollY < 200) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const sections = menuItems.map((item) => document.getElementById(item.id));

    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection = activeSection;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSection = entry.target.id;
          }
        });
        if (visibleSection !== activeSection) {
          setActiveSection(visibleSection);
        }
      },
      {
        rootMargin: "-70px 0px -10% 0px", // lebih aman buat section pendek
        threshold: 0.1,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // tinggi navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });

      // langsung update active section biar ga delay
      setActiveSection(sectionId);
      setTimeout(() => setActiveSection(sectionId), 400);

      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white/90"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className={`font-bold text-[#05677E] transition-all duration-300 ${
              isScrolled ? "text-xl" : "text-2xl"
            }`}
          >
            <span className="text-[#5A5C7E]">MTH</span> Mandiri Tehnik Hade
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors duration-300 relative text-sm font-medium
                  ${
                    activeSection === item.id
                      ? "text-black font-bold after:content-[''] after:block after:w-full after:h-[2px] after:bg-accent after:mt-1"
                      : "text-[#05677E] hover:text-accent"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button
              variant="hero"
              onClick={() =>
                window.open("https://wa.me/6281234567890", "_blank")
              }
              className="flex items-center gap-2 rounded-xl text-white bg-[#344A52] hover:bg-[#05677E] transition-colors duration-300"
            >
              <FaWhatsapp className="text-lg text-white" />
              Hubungi via WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#05677E]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-screen pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors duration-300 text-left py-2 font-medium
                  ${
                    activeSection === item.id
                      ? "text-black font-bold underline"
                      : "text-[#05677E] hover:text-accent"
                  }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="hero"
              onClick={() =>
                window.open("https://wa.me/6281234567890", "_blank")
              }
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#05677E] text-white hover:bg-[#344A52]"
            >
              <FaWhatsapp className="text-lg text-white" />
              Hubungi via WhatsApp
            </Button>
          </div>
        </div>
      </div>
      {/* Separator */}
      <div className="h-px bg-accent/20"></div>
    </nav>
  );
};

export default Navbar;
