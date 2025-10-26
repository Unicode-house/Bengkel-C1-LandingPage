/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "./ui/button";

/* ------------------------- Sub Components ------------------------- */
const Logo = memo(({ isScrolled }: { isScrolled: boolean }) => (
  <div
    className={`font-bold text-[#05677E] transition-all duration-300 ${
      isScrolled ? "text-xl" : "text-2xl"
    }`}
  >
    <span className="text-[#5A5C7E]">MTH</span> Mandiri Tehnik Hade
  </div>
));

const DesktopMenu = memo(
  ({
    menuItems,
    activeSection,
    onClick,
  }: {
    menuItems: { label: string; id: string }[];
    activeSection: string;
    onClick: (id: string) => void;
  }) => (
    <div className="hidden lg:flex items-center space-x-8">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onClick(item.id)}
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
  )
);

const WhatsAppButton = memo(() => (
  <Button
    variant="hero"
    onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
    className="flex items-center gap-2 rounded-xl text-white bg-[#344A52] hover:bg-[#05677E] transition-colors duration-300"
  >
    <FaWhatsapp className="text-lg text-white" />
    Hubungi via WhatsApp
  </Button>
));

const MobileMenu = memo(
  ({
    menuItems,
    activeSection,
    isOpen,
    onClick,
  }: {
    menuItems: { label: string; id: string }[];
    activeSection: string;
    isOpen: boolean;
    onClick: (id: string) => void;
  }) => (
    <div
      className={`lg:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-screen pb-6" : "max-h-0"
      }`}
    >
      <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onClick(item.id)}
            className={`transition-colors duration-300 text-left py-2 font-medium ${
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
  )
);

/* --------------------------- Main Navbar --------------------------- */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const navigate = useNavigate();
  const location = useLocation();
  const activeRef = useRef(activeSection);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  /* 🧠 Cache menu items */
  const menuItems = useMemo(
    () => [
      { label: "Home", id: "hero" },
      { label: "Tentang Kami", id: "about" },
      { label: "Layanan", id: "services" },
      { label: "Galeri", id: "gallery" },
      { label: "Testimoni", id: "testimonials" },
      { label: "Booking", id: "booking" },
      { label: "Kontak", id: "contact" },
    ],
    []
  );

  /* 🧩 Keep ref synced with active state */
  useEffect(() => {
    activeRef.current = activeSection;
  }, [activeSection]);

  /* 🔧 Cache section elements once */
  useEffect(() => {
    menuItems.forEach((item) => {
      sectionRefs.current[item.id] = document.getElementById(item.id);
    });
  }, [menuItems]);

  /* 🌀 Smooth scroll using requestAnimationFrame */
  useEffect(() => {
    if (location.pathname === "/projects") {
      setActiveSection("gallery");
      return;
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          if (isScrolled !== scrolled) setIsScrolled(scrolled);
          if (window.scrollY < 200 && activeRef.current !== "hero") {
            setActiveSection("hero");
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, isScrolled]);

  /* 👀 Intersection Observer for section visibility */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible && activeRef.current !== visible.target.id) {
          activeRef.current = visible.target.id;
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-70px 0px -10% 0px", threshold: 0.3 }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [menuItems]);

  /* 🚀 Scroll to section with smooth behavior */
  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (location.pathname !== "/") {
        navigate("/");
        localStorage.setItem("scrollTarget", sectionId);
        return;
      }

      const element = sectionRefs.current[sectionId];
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });

        setTimeout(() => {
          setActiveSection(sectionId);
          setIsMobileMenuOpen(false);
        }, 300);
      }
    },
    [navigate, location.pathname]
  );

  /* 🧭 Scroll after navigating from other page */
  useEffect(() => {
    if (location.pathname === "/") {
      const target = localStorage.getItem("scrollTarget");
      if (target) {
        setTimeout(() => {
          const element = sectionRefs.current[target];
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          localStorage.removeItem("scrollTarget");
        }, 400);
      }
    }
  }, [location.pathname]);

  /* 🖱️ Toggle mobile menu */
  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    []
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white/90"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo isScrolled={isScrolled} />
          <DesktopMenu
            menuItems={menuItems}
            activeSection={activeSection}
            onClick={scrollToSection}
          />
          <div className="hidden lg:block">
            <WhatsAppButton />
          </div>
          <button
            className="lg:hidden p-2 text-[#05677E]"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <MobileMenu
          menuItems={menuItems}
          activeSection={activeSection}
          isOpen={isMobileMenuOpen}
          onClick={scrollToSection}
        />
      </div>
      <div className="h-px bg-accent/20"></div>
    </nav>
  );
};

export default memo(Navbar);
