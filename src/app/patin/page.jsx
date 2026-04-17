import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, Trophy, MapPin, Users, Star, Medal } from "lucide-react";
import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "Patin | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Patin.",
  keywords: [
    "patin",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
  ],
});

export default function PatinPage() {
  const disciplinas = [
    {
      id: 1,
      nombre: "Patín Artístico",
      descripcion:
        "Desarrollo de habilidades técnicas y artísticas sobre patines, con competencia en torneos nacionales e internacionales.",
      imagen: "/placeholder.svg?height=300&width=500&text=Patín+Artístico",
    },
    {
      id: 2,
      nombre: "Figuras y Niveles",
      descripcion:
        "Categorías C, B y A con competencia federada, clasificatorias a Nacionales y Copas Absolutas.",
      imagen: "/placeholder.svg?height=300&width=500&text=Niveles+Competitivos",
    },
    {
      id: 3,
      nombre: "Show y Precisión",
      descripcion:
        "Coreografías grupales y formaciones con alto nivel artístico y técnico.",
      imagen: "/placeholder.svg?height=300&width=500&text=Show+y+Precisión",
    },
  ];

  const proximosEventos = [
    {
      id: 1,
      nombre: "Exhibición de Fin de Año",
      fecha: "20/12/2023",
      hora: "19:00",
      lugar: "Estadio Barca",
    },
    {
      id: 2,
      nombre: "Torneo A.D.E.P.A.",
      fecha: "15/02/2024",
      hora: "09:00",
      lugar: "A confirmar",
    },
    {
      id: 3,
      nombre: "Master Class — Entrenadora Invitada",
      fecha: "10/03/2024",
      hora: "16:00",
      lugar: "Gimnasio Antogna",
    },
  ];

  const logros = [
    {
      año: "2025",
      evento: "Campeonato Panamericano",
      lugar: "Parque Olímpico",
      detalle:
        "Ana Villarroel Fage: 🥈 plata · Maite Campilii: 🥉 bronce — representando a Argentina",
    },
    {
      año: "2025",
      evento: "Open Internacional",
      lugar: "Club Atlanta, CABA",
      detalle:
        "11 medallas de oro y 10 de plata contra delegaciones de Chile y Uruguay",
    },
    {
      año: "Múltiples",
      evento: "Liga LI.FE.PAR. y A.D.E.P.A.",
      lugar: "Metropolitano",
      detalle: "Títulos metropolitanos y regionales en forma sistemática",
    },
  ];

  const figuras = [
    { nombre: "Ana Villarroel Fage", logro: "Plata Panamericano 2025" },
    { nombre: "Maite Campilii", logro: "Bronce Panamericano 2025" },
    { nombre: "Ana Mirábile", logro: "Referente competitiva" },
    { nombre: "Manuela Palumbo", logro: "Referente competitiva" },
    { nombre: "Luisina Bardengo", logro: "Referente competitiva" },
  ];

  const staffTecnico = [
    {
      nombre: "Angela Gelsi",
      cargo: "Directora Técnica",
      detalle:
        "Lidera el proyecto desde su relanzamiento competitivo en 2021/2022",
      imagen: "/placeholder.svg?height=60&width=60",
    },
    {
      nombre: "Agustina Carisio",
      cargo: "Danza y Preparación Física",
      detalle: "Trabaja el acondicionamiento físico y la expresión corporal",
      imagen: "/placeholder.svg?height=60&width=60",
    },
    {
      nombre: "Malena Pisano",
      cargo: "Asistente Técnica",
      detalle:
        "Apoya la coordinación técnica y el seguimiento de las patinadoras",
      imagen: "/placeholder.svg?height=60&width=60",
    },
  ];

  const categorias = [
    {
      label: "Mini",
      rango: "4-6 años",
      desc: "Iniciación lúdica al patinaje. Equilibrio, coordinación y amor por el deporte.",
    },
    {
      label: "Pre",
      rango: "7-9 años",
      desc: "Primeros pasos en la técnica específica. Nivel Escuela Formativa.",
    },
    {
      label: "Inf",
      rango: "10-12 años",
      desc: "Perfeccionamiento y primeras competencias en niveles C y B.",
    },
    {
      label: "Cad",
      rango: "13-18 años",
      desc: "Alto rendimiento en niveles federados, Nacionales y Copas Absolutas.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px]">
          <Image
            src="/imagenes/patin.jpg"
            alt="Patín"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <h1 className="text-5xl font-bold mb-4">Patín</h1>
              <p className="text-xl max-w-2xl">
                De la escuelita al podio panamericano. El patín de Colón es
                sinónimo de excelencia, familia y medallas internacionales.
              </p>
            </div>
          </div>
        </section>

        {/* Info general + próximos eventos */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-6">
                  Un semillero de campeonas
                </h2>
                <p className="text-lg mb-4">
                  El patín de Colón dejó de ser una actividad recreativa para
                  convertirse en un <strong>centro de alto rendimiento</strong>.
                  Bajo la dirección de Angela Gelsi desde 2021, el club compite
                  en los torneos de <strong>A.D.E.P.A.</strong> y la{" "}
                  <strong>Liga LI.FE.PAR.</strong>, acumulando títulos
                  metropolitanos, regionales e internacionales.
                </p>
                <p className="text-lg mb-6">
                  En 2025, el club alcanzó su mayor hito histórico con medallas
                  en el <strong>Campeonato Panamericano</strong> y un arrollador
                  desempeño en el Open Internacional contra Chile y Uruguay. Un
                  equipo con identidad, método y resultados.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Trophy className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Panamericano 2025</p>
                      <p className="font-bold">Plata + Bronce</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Trophy className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Open Internacional 2025
                      </p>
                      <p className="font-bold">21 medallas</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Users className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Cuerpo técnico</p>
                      <p className="font-bold">Interdisciplinario</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Star className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Desde</p>
                      <p className="font-bold">4 años en adelante</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logros internacionales */}
        <section className="py-12 bg-black text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Trophy className="text-yellow-400" /> Palmarés Internacional
            </h2>
            <p className="text-gray-400 mb-8">
              Los resultados que pusieron a Colón en el mapa del patín argentino
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {logros.map((logro, i) => (
                <div key={i} className="border border-red-600 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-yellow-400 text-2xl font-bold">
                      {logro.año}
                    </span>
                    <span className="text-red-400 text-sm">{logro.lugar}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{logro.evento}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {logro.detalle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instalaciones */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <MapPin className="text-red-600" /> Dónde Entrenamos
            </h2>
            <p className="text-gray-500 mb-8">
              Infraestructura de primer nivel para el alto rendimiento
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-600">
                <h3 className="text-xl font-bold mb-2">
                  Gimnasio "Ignacio 'Cacho' Antogna"
                </h3>
                <p className="text-gray-600">
                  Sede principal de los entrenamientos diarios. Sus pisos de
                  parqué permiten practicar saltos, trompos y coreografías de
                  alta complejidad con total seguridad.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-400">
                <h3 className="text-xl font-bold mb-2">
                  Microestadio "Oscar y Alfredo Barca"
                </h3>
                <p className="text-gray-600">
                  Utilizado para exhibiciones, torneos y eventos de alta
                  convocatoria. Sus dimensiones y acústica lo convierten en un
                  escenario ideal para las competencias.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Nuestras Categorías
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categorias.map((cat) => (
                <div
                  key={cat.label}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                    {cat.label}
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-center">
                    {cat.rango}
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    {cat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                  Más que patín: una familia
                </h2>
                <p className="text-lg mb-4">
                  El patín de Colón tiene una identidad muy particular: el{" "}
                  <strong>sentido de pertenencia</strong>. La delegación viaja
                  en el micro propio de la institución, acompañada por un gran
                  grupo de padres que organiza eventos para costear los viajes a
                  torneos nacionales e internacionales.
                </p>
                <p className="text-lg mb-6">
                  Para sumarte, acercate a la{" "}
                  <strong>Sede Social (Vicente López 170)</strong> o consultá
                  con la subcomisión de patín para conocer los horarios de
                  entrenamiento en el gimnasio Antogna y las categorías
                  disponibles desde los 4 años.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Escuela de Patín</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              ¿Querés aprender a patinar o perfeccionar tu técnica? La escuela
              está abierta desde los 4 años, con clases grupales e individuales
              y un equipo técnico de primer nivel.
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
