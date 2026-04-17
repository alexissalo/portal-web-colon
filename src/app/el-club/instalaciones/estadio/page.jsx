import Image from "next/image"
import { MapPin, Phone, Users, Lightbulb, Shirt } from "lucide-react"
import { generateMetadata } from "@/src/lib/seo";

export const metadata = generateMetadata({
  title: "Instalaciones | Estadio | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Instalaciones de estadio.",
  keywords: [
    "estadio",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
    "instalaciones"
  ],
});

export default function ComplejoEstadioPage() {
  const instalaciones = [
    { icono: <Users className="w-5 h-5 text-red-600 flex-shrink-0" />, texto: "Capacidad aproximada de 2.000 espectadores con tribunas laterales y sector perimetral" },
    { icono: <Lightbulb className="w-5 h-5 text-red-600 flex-shrink-0" />, texto: "Torres de iluminación para partidos oficiales y entrenamientos nocturnos" },
    { icono: <Shirt className="w-5 h-5 text-red-600 flex-shrink-0" />, texto: "Vestuarios modernizados ubicados bajo la zona de tribunas" },
    { icono: <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />, texto: "Cancha de césped natural reglamentaria para torneos AFA (Regional Federal Amateur)" },
    { icono: <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />, texto: "Canchas auxiliares de entrenamiento y cancha de césped sintético para papi fútbol y divisiones menores" },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Estadio de Fútbol</h1>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image src="/instalaciones/estadio1.jpg" alt="Estadio de Fútbol Colón" fill className="object-cover" />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            El estadio de fútbol principal de Colón se encuentra dentro del <strong>Campo de Deportes</strong> de la institución, sobre la calle Bartolomé Benítez 95.
          </p>
          <p className="text-lg leading-relaxed">
            El predio es un complejo integral que no solo alberga la cancha principal, sino también instalaciones auxiliares que permiten el desarrollo de todas las divisiones del fútbol rojinegro, desde la Primera División hasta las inferiores y el papi fútbol.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Instalaciones</h2>
        </div>

        <div className="space-y-3">
          {instalaciones.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
              {item.icono}
              <p className="text-gray-700">{item.texto}</p>
            </div>
          ))}
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mt-4 mb-4">Horarios</h2>
          <p>Martes a Domingo de 9:00 a 20:00 hs. Los horarios de entrenamiento varían según la categoría — consultá en la sede social.</p>
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
          <div className="flex items-center space-x-4">
            <MapPin className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-gray-600">DIRECCIÓN</h3>
              <p className="text-black">Bartolomé Benítez 95, Chivilcoy</p>
              <p className="text-sm text-gray-500">Entre Vicente López y Garibaldi</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Phone className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-gray-600">TELÉFONO</h3>
              <p className="text-black">Consultá en la sede social</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}