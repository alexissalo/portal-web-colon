import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, Trophy, MapPin, Users, Star } from "lucide-react";
import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "Voley | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Voley.",
  keywords: [
    "voley",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
  ],
});

export default function VoleyPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px]">
          <Image
            src="/instalaciones/canchavoley.jpg"
            alt="Equipo de Vóley"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <h1 className="text-5xl font-bold mb-4">Vóley</h1>
              <p className="text-xl max-w-2xl">
                Uno de los deportes con mayor crecimiento en el club. Equipos
                masculinos y femeninos compitiendo en la Liga Chivilcoyana con
                proyección regional.
              </p>
            </div>
          </div>
        </section>

        {/* Info general + próximos partidos */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-6">Nuestros Equipos</h2>
                <p className="text-lg mb-4">
                  Colón es uno de los pilares de la{" "}
                  <strong>Liga Chivilcoyana de Vóley</strong>, que nuclea a los
                  mejores equipos de la ciudad y de localidades vecinas como 9
                  de Julio, Suipacha, Bragado y Lobos. El club compite
                  activamente en ambas ramas —masculina y femenina— con equipos
                  de Primera División.
                </p>
                <p className="text-lg mb-6">
                  La gran cantidad de jugadores sumados a la disciplina permite
                  presentar equipos "A" y "B" en los torneos, demostrando el
                  enorme volumen deportivo que maneja la subcomisión de vóley.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Trophy className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Rama Masculina</p>
                      <p className="font-bold">Equipos A y B</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Trophy className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Rama Femenina</p>
                      <p className="font-bold">Equipos A y B</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Star className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Hito internacional
                      </p>
                      <p className="font-bold">vs Selección Chile 2022</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Users className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Formativas</p>
                      <p className="font-bold">Sub 14 · Sub 16 · Sub 18</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instalaciones */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <MapPin className="text-red-600" /> Instalaciones
            </h2>
            <p className="text-gray-500 mb-8">
              Infraestructura de primer nivel para el vóley en el centro de
              Chivilcoy
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-600">
                <h3 className="text-xl font-bold mb-2">
                  Estadio "Oscar y Alfredo Barca"
                </h3>
                <p className="text-gray-600">
                  Microestadio techado con piso de parqué flotante, tribunas en
                  laterales y cabeceras. Sede de los partidos más importantes y
                  de alta convocatoria.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-400">
                <h3 className="text-xl font-bold mb-2">
                  Gimnasio "Ignacio 'Cacho' Antogna"
                </h3>
                <p className="text-gray-600">
                  Espacio dedicado a los entrenamientos y partidos oficiales,
                  con excelente piso y todas las comodidades para los deportes
                  de pista cerrada.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Formativas */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  Categorías Formativas
                </h2>
                <p className="text-lg mb-4">
                  El vóley de Colón tiene un fuerte enfoque en las bases.
                  Contamos con escuelita de vóley y todas las categorías
                  inferiores, con el objetivo de nutrir a la Primera División
                  con jugadores y jugadoras formados en casa.
                </p>
                <p className="text-lg mb-6">
                  Es muy habitual ver a las juveniles de Colón saltando a la
                  cancha para foguearse en los torneos de mayores de la Liga
                  Chivilcoyana, demostrando la confianza que el club deposita en
                  su cantera.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      cat: "U12",
                      titulo: "Escuelita",
                      desc: "Iniciación al vóley con metodología adaptada a la edad",
                    },
                    {
                      cat: "U14",
                      titulo: "Sub-14",
                      desc: "Desarrollo técnico y primeras competencias oficiales",
                    },
                    {
                      cat: "U16",
                      titulo: "Sub-16",
                      desc: "Perfeccionamiento táctico y competencia regional",
                    },
                    {
                      cat: "U18",
                      titulo: "Sub-18",
                      desc: "Preparación para el salto a la Primera División",
                    },
                  ].map((item) => (
                    <div key={item.cat} className="flex items-center">
                      <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0 text-sm">
                        {item.cat}
                      </div>
                      <div>
                        <h4 className="font-bold">{item.titulo}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2 relative h-[400px]">
                <Image
                  src="/imagenes/voley1.jpg"
                  alt="Formativas de Vóley"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* voley como actividad social */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Mapa a la izquierda */}
              <div className="md:w-1/2 rounded-lg overflow-hidden h-[360px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1120.1557395592192!2d-60.01980161038725!3d-34.892603393896735!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bea5497567e1bb%3A0x2c2d7f9ad84b7eff!2sClub%20Social%20y%20Deportivo%20Col%C3%B3n!5e0!3m2!1ses-419!2sar!4v1775862573485!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Texto a la derecha */}
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  Más que vóley: un punto de encuentro
                </h2>
                <p className="text-lg mb-4">
                  En Colón el vóley no es solo competencia: es un espacio de
                  pertenencia y comunidad. Tras los partidos o entrenamientos en
                  el estadio Barca o el gimnasio Antogna, jugadores y familias
                  comparten momentos que refuerzan esa esencia de{" "}
                  <strong>"club de barrio"</strong> que distingue a la
                  institución.
                </p>
                <p className="text-lg mb-6">
                  Para sumarte, lo ideal es acercarte a la{" "}
                  <strong>Sede Social (Vicente López 170)</strong> o consultar
                  con la subcomisión de vóley para conocer los horarios de
                  entrenamiento y las categorías disponibles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Escuela de Vóley</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              ¿Querés aprender a jugar al vóley? Nuestra escuela está abierta
              para niños y niñas desde los 6 años, con profesores especializados
              y grupos reducidos.
            </p>
            <Link
              href="/registro-deportista"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Inscribite ahora
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
