import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, Trophy, MapPin, Users, Sun, Moon } from "lucide-react";
import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "Tenis | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Tenis.",
  keywords: ["tenis", "deporte", "actividades", "Club Colon", "chivilcoy"],
});

export default function TenisPage() {

  const niveles = [
    {
      label: "Mini",
      titulo: "Mini Tenis (5-8 años)",
      desc: "Iniciación lúdica. Primeros fundamentos del deporte adaptados a la edad.",
    },
    {
      label: "Ini",
      titulo: "Escuela de Menores",
      desc: "Técnica básica, movilidad y primeros pasos en la competencia local.",
    },
    {
      label: "Perf",
      titulo: "Intermedios y Avanzados",
      desc: "Mejora técnica y táctica para jugadores con experiencia en torneos.",
    },
    {
      label: "Adul",
      titulo: "Adultos",
      desc: "Clases para principiantes, intermedios y avanzados en horarios flexibles.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px]">
          <Image
            src="/instalaciones/tenis1.jpg"
            alt="Canchas de Tenis"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <h1 className="text-5xl font-bold mb-4">Tenis</h1>
              <p className="text-xl max-w-2xl">
                Deporte, competencia y vida social. El tenis en Colón se vive en
                el Campo de Deportes, con canchas de tierra batida iluminadas y
                torneos durante todo el año.
              </p>
            </div>
          </div>
        </section>

        {/* Info general + torneos */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-6">Tenis en el Club</h2>
                <p className="text-lg mb-4">
                  El tenis es una de las actividades con mayor crecimiento en la
                  vida social y deportiva de Colón. Con sede en el{" "}
                  <strong>Campo de Deportes</strong>, ofrece un ambiente
                  relajado pero muy competitivo dentro del circuito local, con
                  canchas de <strong>polvo de ladrillo</strong> —la superficie
                  tradicional argentina— e iluminación artificial para partidos
                  nocturnos.
                </p>
                <p className="text-lg mb-6">
                  Colón es una de las{" "}
                  <strong>sedes oficiales de Tenis Chivilcoy</strong>, la
                  organización que nuclea los torneos de la ciudad, recibiendo
                  frecuentemente etapas del circuito local con categorías de 1ra
                  a 5ta, Senior y Damas.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <MapPin className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Ubicación</p>
                      <p className="font-bold">Campo de Deportes</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Moon className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Horario</p>
                      <p className="font-bold">Diurno y nocturno</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Trophy className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Circuito</p>
                      <p className="font-bold">Tenis Chivilcoy</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Users className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Acceso</p>
                      <p className="font-bold">Socios y no socios</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instalaciones */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <MapPin className="text-red-600" /> Instalaciones
            </h2>
            <p className="text-gray-500 mb-8">
              Campo de Deportes — Sede del tenis rojinegro
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image
                    src="/instalaciones/tenisladrillo.jpg"
                    alt="Canchas de polvo de ladrillo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Canchas de Polvo de Ladrillo
                  </h3>
                  <p className="text-gray-600 mb-2">
                    La superficie tradicional y preferida en Argentina. Ideales
                    para el desarrollo técnico y el juego táctico.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                    <Moon className="w-4 h-4" /> Iluminación nocturna disponible
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image
                    src="/instalaciones/tenisnocturno.jpg"
                    alt="Canchas nocturnas"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Juego Nocturno</h3>
                  <p className="text-gray-600 mb-2">
                    Las canchas cuentan con iluminación artificial, permitiendo
                    jugar después del trabajo o el estudio.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                    <Sun className="w-4 h-4" /> Disponibles de día y de noche
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Trophy className="text-red-600" /> Circuito Chivilcoyano
                </h2>
                <p className="text-lg mb-4">
                  Colón es <strong>sede oficial de Tenis Chivilcoy</strong>,
                  recibiendo etapas del circuito local donde jugadores de toda
                  la región compiten por el ranking. Las categorías que
                  participan son: 1ra a 5ta, Senior y Damas.
                </p>
                <p className="text-lg mb-6">
                  El club tiene una lista nutrida de representantes que
                  defienden los colores rojinegros en cada torneo del circuito.
                </p>
              </div>
              <div className="md:w-1/2 relative h-[360px]">
                <Image
                  src="/instalaciones/tenis2.jpg"
                  alt="Circuito Chivilcoyano de Tenis"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Escuela de tenis */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2 relative h-[400px]">
                <Image
                  src="/instalaciones/tenisescuela.jpg"
                  alt="Escuela de Tenis"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Escuela de Tenis</h2>
                <p className="text-lg mb-4">
                  La formación es un pilar del club. La{" "}
                  <strong>Escuela de Menores</strong> funciona durante todo el
                  año con foco en técnica básica, movilidad y competencia. Para
                  adultos existen turnos para todos los niveles con profesores
                  especializados en técnica y táctica.
                </p>
                <div className="space-y-4 mb-6">
                  {niveles.map((nivel) => (
                    <div key={nivel.label} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                        {nivel.label}
                      </div>
                      <div>
                        <h4 className="font-bold">{nivel.titulo}</h4>
                        <p className="text-sm text-gray-600">{nivel.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tenis como actividad social */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  Más que tenis: un punto de encuentro
                </h2>
                <p className="text-lg mb-4">
                  En Colón el tenis no es solo competencia: es un punto de
                  encuentro social. Es muy común que tras los partidos o
                  entrenamientos, los jugadores compartan momentos en el predio
                  o en la cantina del club, manteniendo esa esencia de{" "}
                  <strong>"club de barrio"</strong> que distingue a la
                  institución.
                </p>
                <p className="text-lg mb-6">
                  Para sumarte, lo ideal es acercarte al{" "}
                  <strong>Campo de Deportes (Benitez 51 99)</strong> o consultar
                  en la <strong>Sede Social (Vicente López 170)</strong> para
                  conocer horarios de profesores y disponibilidad de turnos.
                </p>
              </div>
              <div className="md:w-1/2 rounded-lg overflow-hidden h-[360px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.160043603677!2d-60.03078687755193!3d-34.89069670296491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bebab3a65df2b5%3A0xbf855ce9ed321fa8!2sColon%20Chivilcoy!5e0!3m2!1ses-419!2sar!4v1775788761107!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
