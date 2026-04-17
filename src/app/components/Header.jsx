"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";

const menuData = {
  "El Club": {
    Institucional: [
      { label: "Información", href: "/el-club/datos" },
      { label: "Instalaciones", href:"/el-club/instalaciones"},
    ],
    Identidad: [
      { label: "Historia", href: "/el-club/historia" },
      { label: "Camiseta", href: "/el-club/camiseta" },
    ],
    "Redes": [
      { label: "Instagram", href: "https://www.instagram.com/clubcolonchivilcoy/" },
      { label: "Facebook", href: "https://www.facebook.com/clubcolonchivilcoyoficial/" },
      { label: "Youtube", href: "https://www.youtube.com/@clubcolonchivilcoy" },

    ],
  },
  Deportes: {
    Disciplinas: [
      { label: "Futbol", href: "/futbol" },
      { label: "Patin", href: "/patin" },
      { label: "Tenis", href: "/tenis" },
      { label: "Voley", href: "/voley" },
      { label: "Basquet", href: "/basquet" },
    ],
  },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const [openMobileMenus, setOpenMobileMenus] = useState([]);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setOpenMobileMenus([]);
      }
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMouseEnter = (menuTitle) => {
    if (!isMobile) {
      setActiveDropdown(menuTitle);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  const toggleMobileSubmenu = (menuTitle) => {
    setOpenMobileMenus((prev) =>
      prev.includes(menuTitle)
        ? prev.filter((item) => item !== menuTitle)
        : [...prev, menuTitle]
    );
  };

  const menuItems = [
    { href: "/noticias", label: "Noticias" },
    { href: "/#", label: "El Club", hasDropdown: true },
    { href: "/#", label: "Deportes", hasDropdown: true },
    { href: "/registro-deportista", label: "Inscripcion deportistas" },
    { href: "/tienda", label: "Tienda" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black text-white z-[9000]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center space-x-3">
              <Link href={"/"} className="flex items-center space-x-3">
                <Image
                  src="/logo_colon_sin_fondo.png"
                  alt="Club Logo"
                  width={90}
                  height={90}
                  className="w-auto h-[90px]"
                />
                <div className="flex flex-col">
                  <span className="text-xs">Club Social Y Deportivo</span>
                  <span className="text-lg font-bold">Colon de Chivilcoy</span>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-4">
                <a
                  href="https://www.facebook.com/clubcolonchivilcoyoficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-500"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/clubcolonchivilcoy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-500"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@clubcolonchivilcoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-500"
                >
                  <Youtube size={20} />
                </a>
              </div>
              <button
                className="md:hidden text-white focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        <nav
          className={`bg-red-600 text-white ${
            isMobile && isMenuOpen ? "hidden" : "hidden md:block"
          } relative`}
        >
          <div className="container mx-auto px-4">
            <ul className="flex justify-between items-center py-1">
              {menuItems.map((item) => (
                <li
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => {
                    item.hasDropdown && handleMouseEnter(item.label);
                    setActiveLink(item.label);
                  }}
                  onMouseLeave={() => {
                    handleMouseLeave();
                    setActiveLink(null);
                  }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center text-sm font-medium py-2 border-b-2 ${
                      activeLink === item.label
                        ? "border-white text-white"
                        : "border-transparent hover:border-white hover:text-white"
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </Link>
                  {item.hasDropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 bg-black text-white min-w-max shadow-lg">
                      <div className="container mx-auto p-6 grid grid-cols-3 gap-6">
                        {Object.entries(
                          menuData[item.label]
                        ).map(([category, links]) => (
                          <div key={category}>
                            <h3 className="font-bold mb-4 text-red-600">
                              {category}
                            </h3>
                            <ul className="space-y-2">
                              {links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="text-sm text-gray-300 hover:text-white block transition-colors duration-150"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
      {isMenuOpen && isMobile && (
        <div className="fixed inset-0 bg-black z-[9001] overflow-y-auto pt-16">
          <Link href={"/"}>
            <Image
              src="/logo_colon_sin_fondo.png"
              alt="Club Logo"
              width={90}
              height={90}
              className="w-auto h-[90px] absolute top-1 left-4"
            />
          </Link>
          <button
            className="absolute top-4 right-4 text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <div className="container mx-auto px-4 py-12">
            <nav>
              <ul className="space-y-6">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    {item.hasDropdown ? (
                      <button
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className="flex items-center justify-between w-full text-white hover:text-red-500 text-xl font-medium"
                      >
                        {item.label}
                        {openMobileMenus.includes(item.label) ? (
                          <ChevronUp className="w-6 h-6" />
                        ) : (
                          <ChevronDown className="w-6 h-6" />
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-white hover:text-red-500 text-xl font-medium"
                        onClick={toggleMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                    {item.hasDropdown &&
                      openMobileMenus.includes(item.label) && (
                        <div className="mt-4 ml-4 space-y-6">
                          {Object.entries(
                            menuData[item.label]
                          ).map(([category, links]) => (
                            <div key={category}>
                              <h3 className="text-red-600 font-bold mb-2">
                                {category}
                              </h3>
                              <ul className="space-y-2 ml-4">
                                {links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className="text-sm text-gray-300 hover:text-white"
                                      onClick={toggleMenu}
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 space-y-4">
              <div className="flex justify-center space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-500"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://www.youtube.com/@clubcolonchivilcoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-500"
                >
                  <Youtube size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-500"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Spacer to prevent content from hiding under fixed header */}
      {!isMobile ? <div className="h-[140px]" /> : <div className="h-[95px]" />}
    </>
  );
}
