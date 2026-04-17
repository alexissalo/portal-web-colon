import Image from "next/image"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Calendar, Trophy, MapPin, Users, Star } from "lucide-react"
import { generateMetadata } from "../../lib/seo"

export const metadata = generateMetadata({
  title: "Basquet | Club Colon de Chivilcoy",
  description: "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Basquet.",
  keywords: ["basquet", "deporte", "actividades", "Club Colon de Chivilcoy", "chivilcoy"],
})

export default function BasquetPage() {

  const hitos = [
    {
      año: "2019",
      titulo: "Spalding Campus",
      detalle: "El estadio Barca recibió a leyendas de la Generación Dorada: Oberto, Magnano, Wolkowyski y videoconferencia con Ginóbili.",
    },
    {
      año: "2024",
      titulo: "Liga Federal",
      detalle: "Clasificación a la Liga Federal (3ª división nacional) tras dominar el Pre-Federal provincial.",
    },
    {
      año: "1993",
      titulo: "3° en Argentina",
      detalle: "La categoría Juvenil llegó al cuadrangular final de la Liga Nacional de Juveniles, obteniendo el 3° puesto a nivel país.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">

        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px]">
          <Image
            src="/imagenes/basquet1.jpeg"
            alt="Equipo de Básquet"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <h1 className="text-5xl font-bold mb-4">Básquet</h1>
              <p className="text-xl max-w-2xl">
                Multicampeones locales y competidores nacionales. El básquet de Colón se vive en el legendario estadio "Oscar y Alfredo Barca".
              </p>
            </div>
          </div>
        </section>

        {/* Info general + próximos partidos */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-6">Nuestro Equipo</h2>
                <p className="text-lg mb-4">
                  Colón es uno de los máximos animadores y multicampeón de los torneos de la <strong>Asociación Básquetbol Chivilcoy (A.B.CH.)</strong>. A nivel nacional, compite habitualmente en la <strong>Liga Federal</strong>, tercera categoría del básquet argentino, siendo un dominador del Torneo Pre-Federal provincial para clasificar.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Trophy className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Títulos ABCH</p>
                      <p className="font-bold">Múltiples</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Trophy className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Liga Federal</p>
                      <p className="font-bold">Participante</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Star className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Juveniles nacionales</p>
                      <p className="font-bold">3° en 1993</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <Users className="text-red-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">DT</p>
                      <p className="font-bold">Maxi Tamburini</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Estadio Barca */}
        <section className="py-12 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2 relative h-[360px] rounded-lg overflow-hidden">
                <Image
                  src="/instalaciones/complejobasquet.jpg"
                  alt="Estadio Oscar y Alfredo Barca"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <MapPin className="text-red-600" /> Estadio "Oscar y Alfredo Barca"
                </h2>
                <p className="text-gray-400 text-sm mb-4">Vicente López 170 — Centro de Chivilcoy</p>
                <p className="text-lg text-gray-200 mb-4">
                  El estadio lleva el nombre de dos figuras legendarias e impulsores históricos del deporte en el club. Es un microestadio techado de primer nivel para la región, con <strong>piso de parqué flotante</strong>, tribunas en laterales y cabeceras, y una acústica que convierte los partidos importantes en verdaderas calderas.
                </p>
                <p className="text-lg text-gray-200">
                  Un viernes o domingo por la noche en el Barca es uno de los grandes planes deportivos que ofrece Chivilcoy: ambiente pasional, familiar y básquet de altísimo nivel.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Hitos históricos */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Trophy className="text-red-600" /> Hitos Históricos
            </h2>
            <p className="text-gray-500 mb-8">Momentos que marcaron la historia del básquet de Colón</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hitos.map((hito, i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                  <span className="text-red-600 text-3xl font-bold">{hito.año}</span>
                  <h3 className="text-xl font-bold mt-1 mb-3">{hito.titulo}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{hito.detalle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formativas */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">Semillero de Oro</h2>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
              La cantera de Colón es una de las más prestigiosas de la Provincia de Buenos Aires, con participación en la Liga Junior (Provincial de Clubes) en todas sus divisiones.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { titulo: "Categorías U13-U15", desc: "Desarrollo técnico y táctico con enfoque en el aprendizaje y la diversión. Base del semillero rojinegro.", href: "/basquet/formativas/u13-u15" },
                { titulo: "Categorías U17-U19", desc: "Perfeccionamiento de habilidades y competencia de mayor exigencia para la proyección al primer equipo.", href: "/basquet/formativas/u17-u19" },
                { titulo: "Mini Basquet", desc: "Para niños y niñas desde los 5 años. Uno de los programas más convocantes y reconocidos de la provincia.", href: "/basquet/escuela" },
              ].map((cat, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-48">
                    <Image src={`/imagenes/basquet1.jpg`} alt={cat.titulo} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{cat.titulo}</h3>
                    <p className="text-gray-600 mb-4">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA inscripción */}
        <section className="py-12 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">¡Sumate a la familia del básquet!</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Abrimos las puertas del estadio Barca para todos. Mini-básquet, formativas y primera división. Vení a entrenar con nosotros.
            </p>
            <Link href="/registro-deportista" className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors">
              Inscribite ahora
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}