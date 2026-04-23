import Image from "next/image"
import Link from "next/link"
import Header from "./components/Header"
import Footer from "./components/Footer"
import NewsSection from "./components/NewsSection"
import ProductCarouselWrapper from "./components/ProductCarouselWrapper"
import HeroBanner from "./components/HeroBanner"
import { BookOpenText, Building, ShoppingBag, MapPin, Instagram } from "lucide-react"
import { generateMetadata } from "../lib/seo"

export const dynamic = "force-dynamic"


export const metadata = generateMetadata({
  title: "Inicio | Club Colon de Chivilcoy",
  description: "Bienvenido al sitio oficial del Club Colon de Chivilcoy. Noticias, Informacion y más.",
  keywords: ["inicio", "noticias", "resultados", "Club Colon de Chivilcoy"],
})

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Carousel */}
        <HeroBanner />

        {/* Noticias*/}
        <div className="container mx-auto px-4 py-12">
          <NewsSection />
        </div>


        {/* Enlaces Rápidos */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Accesos Rápidos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <Link
                href="/noticias"
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow group"
              >
                <BookOpenText className="h-12 w-12 mx-auto mb-4 text-red-600 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg">Noticias</h3>
                <p className="text-gray-600 text-sm mt-2">Novedades del club</p>
              </Link>
              <Link
                href="/el-club/datos"
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow group"
              >
                <Building className="h-12 w-12 mx-auto mb-4 text-red-600 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg">Club</h3>
                <p className="text-gray-600 text-sm mt-2">Informacion y instalaciones</p>
              </Link>
              <Link
                href="/tienda"
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow group"
              >
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-red-600 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg">Tienda</h3>
                <p className="text-gray-600 text-sm mt-2">Productos oficiales</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Productos Destacados</h2>
              <Link href="/tienda" className="text-red-600 hover:underline font-medium flex items-center">
                Ver tienda completa <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <ProductCarouselWrapper />
          </div>
        </section>


        {/* Instalaciones */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Nuestras Instalaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48">
                  <Image
                    src="/instalaciones/estadio1.jpg"
                    alt="Estadio"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Estadio Principal</h3>
                  <p className="text-gray-600 mb-4">Capacidad para 2000 espectadores con todas las comodidades.</p>
                  <Link href="/el-club/instalaciones/estadio" className="text-red-600 hover:underline font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> Ver ubicación
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48">
                  <Image
                    src="/instalaciones/complejobasquet.jpg"
                    alt="Polideportivo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Cancha de basquet</h3>
                  <p className="text-gray-600 mb-4">Instalaciones para básquet, vóley y patin.</p>
                  <Link
                    href="/el-club/instalaciones/basquet"
                    className="text-red-600 hover:underline font-medium flex items-center"
                  >
                    <MapPin className="h-4 w-4 mr-1" /> Ver ubicación
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48">
                  <Image
                    src="/instalaciones/tenis1.jpg"
                    alt="Centro de Entrenamiento"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Canchas de tenis</h3>
                  <p className="text-gray-600 mb-4">
                    Modernas instalaciones para maximo rendimiento.
                  </p>
                  <Link
                    href="/el-club/instalaciones/tenis"
                    className="text-red-600 hover:underline font-medium flex items-center"
                  >
                    <MapPin className="h-4 w-4 mr-1" /> Ver ubicación
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Redes Sociales */}
        <section className="py-12 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Síguenos en Redes Sociales</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Mantente al día con todas las novedades del club siguiéndonos en nuestras redes sociales oficiales.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.instagram.com/clubcolonchivilcoy/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-red-600 p-4 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/clubcolonchivilcoyoficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-red-600 p-4 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@clubcolonchivilcoy"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-red-600 p-4 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

