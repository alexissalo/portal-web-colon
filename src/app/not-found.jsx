import Link from "next/link"
import Image from "next/image"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center px-4 py-16">
          <div className="mb-8">
            <Image
              src="/logo_colon_sin_fondo.png"
              alt="404"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Página no encontrada</h2>
          <p className="text-xl text-gray-600 mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <Link
            href="/"
            className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors inline-block"
          >
            Volver a la página principal
          </Link>
        </div>
      </main>
    </div>
  )
}

