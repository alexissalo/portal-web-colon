import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, Trophy, MapPin, Users, Shield, Star } from "lucide-react";
import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "Futbol | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Futbol.",
  keywords: [
    "futbol",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
  ],
});

export default function FutbolPage() {
  const jugadores = [
    {
      id: 1,
      nombre: "Juan Pérez",
      posicion: "Arquero",
      numero: 1,
      imagen: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      posicion: "Defensor",
      numero: 4,
      imagen: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      nombre: "Miguel González",
      posicion: "Mediocampista",
      numero: 8,
      imagen: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      nombre: "Luis Martínez",
      posicion: "Delantero",
      numero: 9,
      imagen: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 5,
      nombre: "Roberto Sánchez",
      posicion: "Defensor",
      numero: 2,
      imagen: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 6,
      nombre: "Fernando López",
      posicion: "Mediocampista",
      numero: 10,
      imagen: "/placeholder.svg?height=300&width=300",
    },
  ];

  const proximosPartidos = [
    {
      id: 1,
      rival: "Rival FC",
      fecha: "15/12/2023",
      hora: "20:00",
      local: true,
      estadio: "Estadio Principal",
    },
    {
      id: 2,
      rival: "Atlético City",
      fecha: "22/12/2023",
      hora: "17:30",
      local: false,
      estadio: "Estadio Municipal",
    },
    {
      id: 3,
      rival: "United Sporting",
      fecha: "05/01/2024",
      hora: "19:15",
      local: true,
      estadio: "Estadio Principal",
    },
  ];

  const cuerpoTecnico = [
    {
      id: 1,
      nombre: "Alejandro Gómez",
      cargo: "Director Técnico",
      imagen: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      nombre: "Martín Silva",
      cargo: "Asistente Técnico",
      imagen: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      nombre: "Pablo Ruiz",
      cargo: "Preparador Físico",
      imagen: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      nombre: "Jorge Méndez",
      cargo: "Entrenador de Arqueros",
      imagen: "/placeholder.svg?height=200&width=200",
    },
  ];

  const titulos = [
    { año: "2022", torneo: "Liguilla", detalle: "Final vs Atlético Huracán" },
    { año: "2015", torneo: "Clausura", detalle: "Liga Chivilcoyana" },
    { año: "2014", torneo: "Campeonato", detalle: "Liga Chivilcoyana" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px]">
          <Image
            src="/imagenes/bannerfutbol.jpeg"
            alt="Equipo de Fútbol"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <h1 className="text-5xl font-bold mb-4">Fútbol</h1>
              <p className="text-xl max-w-2xl">
                El Rojinegro de Chivilcoy. Pasión, historia y pertenencia en
                cada partido desde 1930.
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
                  El Club Social y Deportivo Colón de Chivilcoy es una de las
                  instituciones más emblemáticas de la ciudad, fundada el 12 de
                  octubre de 1930. Su sección de fútbol es un peso pesado
                  histórico de la <strong>Liga Chivilcoyana</strong>, siendo
                  candidato permanente en los torneos Apertura, Clausura y
                  Liguillas.
                </p>
                <p className="text-lg mb-4">
                  A nivel regional, el Rojinegro compite frecuentemente en el{" "}
                  <strong>Torneo Regional Federal Amateur</strong> organizado
                  por el Consejo Federal de la AFA, enfrentando a los mejores
                  equipos de la Provincia de Buenos Aires en busca del ascenso
                  al Federal A.
                </p>
                <p className="text-lg mb-6">
                  Sus colores rojo y negro, reflejados en la icónica camiseta a
                  bastones verticales, son sinónimo de identidad y orgullo
                  chivilcoyano.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Títulos */}
        <section className="py-12 bg-black text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Trophy className="text-yellow-400" /> Triunfos Recientes
            </h2>
            <p className="text-gray-400 mb-8">
              Algunos de los títulos más recordados en la historia moderna del
              club
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {titulos.map((titulo, i) => (
                <div
                  key={i}
                  className="border border-red-600 rounded-lg p-6 flex flex-col items-center text-center"
                >
                  <span className="text-yellow-400 text-4xl font-bold mb-1">
                    {titulo.año}
                  </span>
                  <span className="text-xl font-semibold mb-2">
                    {titulo.torneo}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {titulo.detalle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Identidad y camiseta */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Shield className="text-red-600" /> Identidad Rojinegra
                </h2>
                <p className="text-lg mb-4">
                  Los colores rojo y negro son mucho más que una paleta: son la
                  identidad del club. La camiseta titular, con sus icónicos
                  bastones verticales rojinegros, es reconocida en toda la
                  región y cada temporada se presenta con un evento
                  multitudinario en la Sede Social del club, con el fuerte
                  respaldo de comercios y empresas de Chivilcoy.
                </p>
              </div>
              <div className="md:w-1/2 relative h-[360px] rounded-lg overflow-hidden">
                <Image
                  src="/imagenes/camiseta.jpg"
                  alt="Camiseta rojinegra de Colón"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dónde juegan */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <MapPin className="text-red-600" /> Dónde Juega Colón
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2 relative h-[320px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3272.6275954594694!2d-60.0307869!3d-34.8906967!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bebab3bda86f3f%3A0xf0229d56ea2c298a!2sClub%20Social%20y%20Deportivo%20Col%C3%B3n%20-%20Estadio%20de%20f%C3%BAtbol%20y%20Campo%20de%20deportes!5e0!3m2!1ses-419!2sar!4v1775792731349!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{border:0}}
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="md:w-1/2">
                <p className="text-lg mb-4">
                  El fútbol de Colón se desarrolla principalmente en su{" "}
                  <strong>Campo de Deportes</strong>, sede habitual de los
                  partidos de la Liga Chivilcoyana.
                </p>
                <p className="text-lg mb-4">
                  Ademas en su estadio "Lucio Zanichelli" con luz artificial
                  para partidos de noche.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divisiones Inferiores */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  Divisiones Inferiores
                </h2>
                <p className="text-lg mb-4">
                  Una de las patas más fuertes del proyecto futbolístico de
                  Colón son sus categorías formativas. El club funciona como un
                  enorme contenedor social para los chicos de Chivilcoy, con
                  divisiones que van desde los 5 años hasta Reserva.
                </p>
                <p className="text-lg mb-6">
                  Los títulos en inferiores son frecuentes —como el recordado
                  campeonato de la <strong>Categoría 2009</strong> obtenido en
                  2019— y la cantera nutre constantemente a la Primera División
                  de jugadores con fuerte sentido de pertenencia.
                </p>
              </div>
              <div className="md:w-1/2 relative h-[400px]">
                <Image
                  src="/imagenes/pretemporadainferiores.jpg"
                  alt="Divisiones Inferiores"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Escuela de Fútbol */}
        <section className="py-12 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Escuela de Fútbol</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              ¿Querés que tu hijo aprenda a jugar al fútbol en un ambiente
              profesional y divertido? Nuestra escuela está abierta para niños y
              niñas de 5 a 14 años.
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
