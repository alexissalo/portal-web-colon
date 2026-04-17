"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { href: "/el-club/datos", label: "Datos" },
  { href: "/el-club/instalaciones", label: "Instalaciones" },
  { href: "/el-club/historia", label: "Historia" },
  { href: "/el-club/camiseta", label: "Camiseta" },
  ];

export default function ClubLayout({
  children,
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main content - moved to first position */}
          <main className="flex-1">{children}</main>

          {/* Sidebar - moved to second position with updated styling */}
          <aside className="md:w-64 flex-shrink-0 bg-gray-50 p-6 rounded-lg block max-h-fit">
            <h2 className="text-2xl font-bold text-gray-400 mb-4">EL CLUB</h2>
            <nav className="space-y-2">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block transition-colors ${
                    pathname === link.href ? "text-red-600 font-semibold" : "text-black hover:text-red-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
