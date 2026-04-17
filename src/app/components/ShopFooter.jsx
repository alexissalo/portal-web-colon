import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube } from "lucide-react"

export default function ShopFooter() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Columna 1 — Logo y dirección */}
          <div className="flex flex-col gap-3">
            <Link href="/tienda" className="flex items-center gap-2">
              <Image src="/logo_colon_sin_fondo.png" alt="Club Colón" width={40} height={40} className="w-auto h-[40px]" />
              <span className="text-lg font-bold">Shop</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tienda Oficial del Club Social y Deportivo Colón de Chivilcoy
            </p>
            <p className="text-gray-400 text-sm">
              Vicente López 170, Chivilcoy<br />
              Buenos Aires, Argentina
            </p>
          </div>

          {/* Columna 2 — Links de ayuda */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ayuda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tienda/preguntasfrecuentes" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="/tienda/comocomprar" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  ¿Cómo comprar?
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 — Redes sociales */}
          <div>
            <h3 className="text-lg font-bold mb-4">Seguinos</h3>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/clubcolonchivilcoyoficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 bg-white/10 hover:bg-red-600 rounded-full transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/clubcolonchivilcoy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 bg-white/10 hover:bg-red-600 rounded-full transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@clubcolonchivilcoy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Youtube"
                className="p-2 bg-white/10 hover:bg-red-600 rounded-full transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Tienda Oficial Club Colón de Chivilcoy. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}