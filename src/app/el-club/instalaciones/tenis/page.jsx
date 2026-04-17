import Image from "next/image"
import { MapPin, Phone, Users, Lightbulb } from "lucide-react"
import { generateMetadata } from "@/src/lib/seo";

export const metadata = generateMetadata({
  title: "Instalaciones | Tenis | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Instalaciones de tenis.",
  keywords: [
    "tenis",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
    "instalaciones"
  ],
});

export default function ComplejoTenisPage() {
  const instalaciones = [
    { icono: <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "3 canchas de polvo de ladrillo y 1 de cemento", desc: "Mantenimiento diario para garantizar pique parejo, fundamental para el aprendizaje y la alta competencia." },
    { icono: <Lightbulb className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Iluminación artificial en todas las canchas", desc: "Sistema de gran potencia que permite extender la actividad hasta altas horas de la noche." },
    { icono: <Users className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Vestuarios completos", desc: "Acceso directo a los vestuarios del predio con todas las comodidades." },
    { icono: <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Entorno arbolado", desc: "Dentro del predio polideportivo de Bartolomé Benítez, cercano a las canchas de fútbol." },
  ]


  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Complejo de Tenis</h1>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image src="/instalaciones/tenis1.jpg" alt="Complejo de Tenis" fill className="object-cover" />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            El complejo de tenis del Club Social y Deportivo Colón es un componente fundamental de su Campo de Deportes, ubicado en el predio de la calle <strong>Bartolomé Benítez</strong>. Es reconocido en la ciudad como uno de los escenarios principales del circuito regional, siendo uno de los <strong>cuatro clubes fundadores y sedes permanentes del Circuito Tenis Chivilcoy</strong>, junto a La Pampa, Gimnasia e Independiente.
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


        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mt-4 mb-4">Horarios</h2>
          <p>Las canchas funcionan desde la mañana hasta altas horas de la noche gracias a la iluminación artificial. Para conocer la disponibilidad actual, consultá en la secretaría del Campo de Deportes o directamente con los profesores del complejo.</p>
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
              <p className="text-black">Secretaría del Campo de Deportes</p>
              <p className="text-sm text-gray-500">o con los profesores del complejo</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}