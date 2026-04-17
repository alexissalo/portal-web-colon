import Link from "next/link"
import { FaBuilding, FaTrophy, FaBasketballBall, FaFutbol } from "react-icons/fa"
import { MdOutlineSportsTennis, MdOutlinePool } from "react-icons/md";
import { generateMetadata } from "@/src/lib/seo";

export const metadata = generateMetadata({
  title: "Instalaciones | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Informacion.",
  keywords: [
    "futbol",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
    "instalaciones"
  ],
});


const venues = [
  {
    name: "Sede Social",
    icon: <FaBuilding className="w-16 h-16 text-black group-hover:text-red-600 transition-colors" />,
    href: "/el-club/instalaciones/sedesocial",
    subtitle: "sede",
  },
  {
    name: "Lucio Zanichelli",
    icon: <FaTrophy className="w-16 h-16 text-black group-hover:text-red-600 transition-colors" />,
    href: "/el-club/instalaciones/estadio",
    subtitle: "estadio",
  },
  {
    name: "Pileta",
    icon: <MdOutlinePool className="w-16 h-16 text-black group-hover:text-red-600 transition-colors" />,
    href: "/el-club/instalaciones/pileta",
    subtitle: "complejo",
  },
  {
    name: "Futbol 5 y 7",
    icon: <FaFutbol className="w-16 h-16 text-black group-hover:text-red-600 transition-colors" />,
    href: "/el-club/instalaciones/futbol5y7",
    subtitle: "complejo",
  },
  {
    name: "Basquet",
    icon: <FaBasketballBall className="w-16 h-16 text-black group-hover:text-red-600 transition-colors" />,
    href: "/el-club/instalaciones/basquet",
    subtitle: "complejo",
  },
  {
    name: "Tenis",
    icon: <MdOutlineSportsTennis className="w-16 h-16 text-black group-hover:text-red-600 transition-colors" />,
    href: "/el-club/instalaciones/tenis",
    subtitle: "complejo",
  },

]

export default function SedesYPrediosPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-12">Instalaciones</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {venues.map((venue) => (
          <Link key={venue.name} href={venue.href} className="flex flex-col items-center group">
            <div className="relative w-32 h-32 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                {venue.icon} {/* Renderiza el nodo del ícono directamente */}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs uppercase px-3 py-1 whitespace-nowrap">
                {venue.subtitle}
              </div>
            </div>
            <h2 className="text-center font-bold text-black group-hover:text-red-600 transition-colors">
              {venue.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  )
}
