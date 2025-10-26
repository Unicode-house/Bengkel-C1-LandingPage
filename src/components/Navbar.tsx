"use client";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const navigate = useNavigate();
  const location = useLocation();

  const activeRef = useRef(activeSection);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const ticking = useRef(false); // ⏱️ prevent scroll handler spam

  const menuItems = [
    { label: "Home", id: "hero" },
    { label: "Tentang Kami", id: "about" },
    { label: "Layanan", id: "services" },
    { label: "Galeri", id: "gallery" },
    { label: "Testimoni", id: "testimonials" },
    { label: "Booking", id: "booking" },
    { label: "Kontak", id: "contact" },
  ];

  // 🧠 keep refs synced
  useEffect(() => {
    activeRef.current = activeSection;
  }, [activeSection]);

  // 📦 cache section refs
  useEffect(() => {
    menuItems.forEach((item) => {
      sectionRefs.current[item.id] = document.getElementById(item.id);
    });
  }, []);

  // ⚙️ optimized scroll + intersection observer
  useEffect(() => {
    if (location.pathname === "/projects") {
      setActiveSection("gallery");
      return;
    }

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          if (window.scrollY < 200) setActiveSection("hero");
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        let visible = activeRef.current;
        for (const entry of entries) {
          if (entry.isIntersecting) visible = entry.target.id;
        }
        if (visible !== activeRef.current) {
          activeRef.current = visible;
          setActiveSection(visible);
        }
      },
      { rootMargin: "-60px 0px -10% 0px", threshold: 0.15 }
    );

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [location.pathname]);

  // 🧭 smooth scroll + mobile optimization
  const scrollToSection = useCallback(
    (id: string) => {
      if (location.pathname !== "/") {
        navigate("/");
        localStorage.setItem("scrollTarget", id);
        return;
      }

      const element = sectionRefs.current[id];
      if (element) {
        const offset = 80;
        const position = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: position, behavior: "smooth" });
        setActiveSection(id);
        setIsMobileMenuOpen(false);
      }
    },
    [location.pathname, navigate]
  );

  // 🎯 scroll after navigation
  useEffect(() => {
    if (location.pathname === "/") {
      const target = localStorage.getItem("scrollTarget");
      if (target) {
        setTimeout(() => {
          const el = sectionRefs.current[target];
          if (el) {
            const offset = 80;
            const pos = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: pos, behavior: "smooth" });
          }
          localStorage.removeItem("scrollTarget");
        }, 350);
      }
    }
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white/90"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* 🧱 Logo */}
          <div
            className={`font-bold text-[#05677E] transition-all duration-300 ${
              isScrolled ? "text-xl" : "text-2xl"
            }`}
          >
            <span className="text-[#5A5C7E]">MTH</span> Mandiri Tehnik Hade
          </div>

          {/* 💻 Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors duration-300 relative text-sm font-medium ${
                  activeSection === item.id
                    ? "text-black font-bold after:content-[''] after:block after:w-full after:h-[2px] after:bg-accent after:mt-1"
                    : "text-[#05677E] hover:text-accent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* 📞 Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              variant="hero"
              onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
              className="flex items-center gap-2 rounded-xl text-white bg-[#344A52] hover:bg-[#05677E] transition-colors duration-300"
            >
              <FaWhatsapp className="text-lg text-white" />
              Hubungi via WhatsApp
            </Button>
          </div>

          {/* 📱 Mobile Button */}
          <button
            className="lg:hidden p-2 text-[#05677E] focus:outline-none will-change-transform"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* 📲 Mobile Menu */}
        <div
          className={`lg:hidden transform transition-transform duration-300 ease-out origin-top ${
            isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          }`}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200 pb-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left py-2 font-medium transition-colors duration-200 ${
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
              onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#05677E] text-white hover:bg-[#344A52]"
            >
              <FaWhatsapp className="text-lg text-white" />
              Hubungi via WhatsApp
            </Button>
          </div>
        </div>
      </div>
      <div className="h-px bg-accent/20"></div>
    </nav>
  );
};

export default memo(Navbar);
