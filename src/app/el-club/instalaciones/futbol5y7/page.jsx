import Image from "next/image"
import { MapPin, Phone, Lightbulb, Clock, Users, Utensils } from "lucide-react"
import { generateMetadata } from "@/src/lib/seo";

export const metadata = generateMetadata({
  title: "Instalaciones | Futbol 5 y 7 | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Instalaciones de futbol 5 y 7.",
  keywords: [
    "futbol",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
    "instalaciones"
  ],
});

export default function Futbol5y7() {
  const instalaciones = [
    { icono: <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Césped sintético de alta densidad", desc: "Juego bajo cualquier condición climática con cauchutado periódico para mantener la amortiguación." },
    { icono: <Lightbulb className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Iluminación LED", desc: "Torres actualizadas con luces LED de gran potencia para visibilidad perfecta en turnos nocturnos." },
    { icono: <Users className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Vestuarios con duchas", desc: "Acceso a vestuarios con duchas y agua caliente para todos los jugadores." },
    { icono: <Utensils className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Sector de parrillas y cantina", desc: "Mesas y parrillas disponibles en el predio. Cantina cercana con bebidas y snacks." },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Complejo de Fútbol 5 y 7</h1>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image src="/instalaciones/futbol5y7.jpg" alt="Complejo de Fútbol 5 y 7" fill className="object-cover" />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            El complejo de fútbol 5 y 7 de Colón es uno de los más cuidados de la zona, con <strong>césped sintético de alta densidad</strong> y <strong>iluminación LED</strong> de gran potencia. Funciona todos los días desde la tarde hasta la medianoche, siendo un punto de encuentro clásico para socios y vecinos de Chivilcoy que organizan sus "partiditos" entre amigos.
          </p>
          <p className="text-lg leading-relaxed">
            Las canchas tienen una doble función esencial: durante la tarde son la base de entrenamiento de las <strong>categorías más pequeñas</strong> (Escuelita y Pre-infantiles), y al finalizar ese horario se abren para el <strong>alquiler a particulares</strong>.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Instalaciones</h2>
        </div>

        <div className="space-y-3">
          {instalaciones.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
              {item.icono}
              <div>
                <p className="font-semibold text-gray-800">{item.titulo}</p>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-600">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-600" /> Escuelita de Fútbol
            </h3>
            <p className="text-gray-600 text-sm">De <strong>17:00 a 20:00 hs</strong> aproximadamente. Las canchas de dimensiones reducidas favorecen la técnica individual y el contacto constante con la pelota para Pre-infantiles y Escuelita.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-400">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" /> Alquiler a Particulares
            </h3>
            <p className="text-gray-600 text-sm">Desde las <strong>20:00 hs hasta la medianoche</strong> (aprox. 00:00 - 01:00 hs según el día). Los turnos fijos de días de semana se ocupan rápido — se recomienda reservar con varios días de anticipación.</p>
          </div>
        </div>

        <div className="bg-black text-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Phone className="w-5 h-5 text-red-400" /> Reservas
          </h2>
          <p className="text-gray-300">
            Las reservas se gestionan por <strong className="text-white">WhatsApp del complejo</strong> o directamente en la <strong className="text-white">Secretaría del Campo de Deportes</strong> (Bartolomé Benítez 95). Los turnos nocturnos de días de semana suelen estar tomados por fijos, por lo que se recomienda reservar con anticipación.
          </p>
        </div>

        <div className="w-full rounded-lg overflow-hidden h-[360px]">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t">
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-gray-600">DIRECCIÓN</h3>
              <p className="text-black font-medium">Bartolomé Benítez 95, Chivilcoy</p>
              <p className="text-sm text-gray-500">Campo de Deportes</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Phone className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-gray-600">RESERVAS</h3>
              <p className="text-black">WhatsApp del complejo</p>
              <p className="text-sm text-gray-500">o en secretaría del Campo de Deportes</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}