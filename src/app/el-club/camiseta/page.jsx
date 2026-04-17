import Image from "next/image"
import Link from "next/link"
import { MapPin, ShoppingBag, Star, Shirt } from "lucide-react"
import { generateMetadata } from "@/src/lib/seo";

export const metadata = generateMetadata({
  title: "Camiseta | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Camiseta.",
  keywords: [
    "futbol",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
    "camiseta"
  ],
});

export default function CamisetaPage() {

  const dondeComprar = [
    { icono: <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Sede Social (Vicente López 170)", desc: "Se puede adquirir o encargar directamente en secretaría." },
    { icono: <ShoppingBag className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Tienda online del club", desc: "Ingresá a nuestra tienda para ver los productos disponibles." },
    { icono: <Star className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Cena de Presentación de Indumentaria", desc: "Evento anual antes del inicio de cada temporada donde se presentan los nuevos modelos y se ponen a la venta." },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">La Camiseta Rojinegra</h1>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image src="/imagenes/camiseta.jpg" alt="Camiseta Rojinegra de Colón" fill className="object-cover" />
        </div>

        {/* Intro */}
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            La camiseta del Club Social y Deportivo Colón de Chivilcoy es el símbolo máximo de identidad de la institución. Sus colores <strong>rojo y negro</strong> están profundamente arraigados en la tradición del "Rojinegro" desde su fundación en 1930, y hoy es una de las prendas deportivas más vistas en las calles de Chivilcoy, reflejo del enorme crecimiento social del club en la última década.
          </p>
        </div>

        {/* Identidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black text-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Shirt className="w-5 h-5 text-red-400" /> Los colores y su significado
            </h2>
            <p className="text-gray-300 mb-3">
              El <strong className="text-white">rojo y el negro</strong> representan la pasión, la fuerza y la historia del club desde 1930. Sus seguidores son conocidos en toda la región como <strong className="text-white">"Los Rojinegros"</strong>, y el apodo <strong className="text-white">"El León"</strong> ha ganado fuerza en los últimos años, especialmente en el fútbol.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-600">
            <h2 className="text-xl font-bold mb-3">El Escudo</h2>
            <p className="text-gray-600">
              Se ubica sobre el corazón en todas las disciplinas. Escudo de forma clásica dividido verticalmente con las iniciales <strong>C.A.C.</strong> o el nombre completo rodeando la base. En los torneos internacionales, el escudo se luce junto a la <strong>bandera argentina</strong>.
            </p>
          </div>
        </div>


        {/* Dónde conseguirla */}
        <div>
          <h2 className="text-2xl font-bold mb-4">¿Dónde conseguirla?</h2>
          <div className="space-y-3">
            {dondeComprar.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                {item.icono}
                <div>
                  <p className="font-semibold text-gray-800">{item.titulo}</p>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA tienda */}
        <div className="bg-red-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Conseguí la tuya</h2>
          <p className="text-red-100 mb-6 max-w-xl mx-auto">
            Visitá nuestra tienda online o acercate a la sede en Vicente López 170. Mostrar la camiseta rojinegra es la mejor forma de apoyar al club.
          </p>
          <Link
            href="/tienda"
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Ir a la tienda
          </Link>
        </div>
      </div>
    </div>
  )
}