import Image from "next/image"
import { MapPin, Phone, Sun, Users, Shield, Star } from "lucide-react"
import { generateMetadata } from "@/src/lib/seo";

export const metadata = generateMetadata({
  title: "Instalaciones | Pileta | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Instalaciones de pileta.",
  keywords: [
    "pileta",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
    "instalaciones"
  ],
});

export default function PiletaPage() {
  const instalaciones = [
    { icono: <Users className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Pileta principal de grandes dimensiones", desc: "Profundidad progresiva, ideal para natación recreativa y competitiva. Filtrado moderno y agua impecable." },
    { icono: <Shield className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Pileta infantil separada", desc: "Sector de baja profundidad exclusivo para los más chicos, con guardavidas permanentes en todo el horario." },
    { icono: <Sun className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Solárium y arboleda", desc: "Amplias zonas de césped y baldosas térmicas para tomar sol. Sector de árboles frondosos para los días de calor extremo." },
    { icono: <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Quinchos, parrillas y mesas", desc: "Acceso a los quinchos del polideportivo. El clásico 'pileta y asado' entre amigos y familias del club." },
    { icono: <Users className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Vestuarios con duchas", desc: "Conexión directa con vestuarios equipados, cambiadores independientes y todas las comodidades." },
  ]

  const accesos = [
    { titulo: "Carnet de temporada completa", desc: "El abono más económico por uso ilimitado durante toda la temporada." },
    { titulo: "Abono mensual o quincenal", desc: "Para quienes no quieren comprometerse con la temporada completa." },
    { titulo: "Entrada diaria", desc: "Con costo diferenciado para socios y no socios." },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Pileta</h1>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image src="/imagenes/banner4.jpeg" alt="Pileta Club Colón" fill className="object-cover" />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            La pileta del Club Social y Deportivo Colón es el centro de la actividad social y recreativa durante la temporada de verano en Chivilcoy. Ubicada en el <strong>Campo de Deportes</strong>, es considerada una de las mejores instalaciones acuáticas de la ciudad. Cuenta con guardavidas permanentes, sistemas de filtrado modernos y un entorno arbolado que la hace única.
          </p>
        </div>

        {/* Instalaciones */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Instalaciones</h2>
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
        </div>

        {/* Colonia de vacaciones */}
        <div className="bg-black text-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" /> Colonia de Vacaciones "Rojinegra"
          </h2>
          <p className="text-gray-300 mb-4">
            La pileta es el eje de la colonia de vacaciones más concurrida de Chivilcoy. Los chicos de <strong className="text-white">3 a 12 años</strong> realizan actividades deportivas, talleres de cocina, juegos temáticos y enseñanza de natación.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-semibold text-white mb-1">Mañana — Colonia</p>
              <p className="text-gray-300 text-sm">Actividades guiadas para los chicos. Natación, talleres y juegos temáticos.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-semibold text-white mb-1">Tarde — Uso libre</p>
              <p className="text-gray-300 text-sm">La pileta se abre para socios y no socios. Día entero de predio con pileta y parrillas.</p>
            </div>
          </div>
        </div>

        {/* Acceso y requisitos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Tipos de acceso</h2>
            <div className="space-y-3">
              {accesos.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-600">
                  <p className="font-semibold text-gray-800">{item.titulo}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Requisitos de ingreso</h2>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
                <p className="font-semibold text-gray-800">Revisión médica obligatoria</p>
                <p className="text-gray-500 text-sm">Válida por 15 o 30 días. Obligatoria para ingresar al agua.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
                <p className="font-semibold text-gray-800">Control de pediculosis</p>
                <p className="text-gray-500 text-sm">Requisito de higiene obligatorio para el acceso a la pileta.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
                <p className="font-semibold text-gray-800">Guardavidas permanentes</p>
                <p className="text-gray-500 text-sm">Presentes durante todo el horario de apertura de la pileta.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pool parties */}
        <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-600">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Sun className="w-5 h-5 text-red-600" /> Eventos Especiales
          </h2>
          <p className="text-gray-600">
            En ocasiones especiales el club organiza <strong>Pool Parties</strong> y jornadas nocturnas con música y servicio de cantina, extendiendo el horario para jóvenes y familias bajo las luces del predio. Seguí las redes sociales del club para enterarte de las fechas.
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
              <p className="text-black font-medium">Benítez 95, Chivilcoy</p>
              <p className="text-sm text-gray-500">Campo de Deportes</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Phone className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-gray-600">TELÉFONO</h3>
              <p className="text-black">Consultá en secretaría</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}