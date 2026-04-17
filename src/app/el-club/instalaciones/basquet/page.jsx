import Image from "next/image"
import { MapPin, Phone, Mail, Trophy, Users, Dumbbell, Utensils, Star } from "lucide-react"
import { generateMetadata } from "@/src/lib/seo";

export const metadata = generateMetadata({
  title: "Instalaciones | Basquet | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Instalaciones de basquet.",
  keywords: [
    "basquet",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
    "instalaciones"
  ],
});

export default function ComplejoBasquet() {
  const instalacionesBarca = [
    { icono: <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Piso flotante de parqué", desc: "Madera de última generación mantenida bajo estándares profesionales para la competencia federal." },
    { icono: <Users className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Capacidad 1.200 - 1.500 espectadores", desc: "Tribunas laterales de madera y estructura de cemento en cabecera. Ambiente 'caldera' en los clásicos." },
    { icono: <Trophy className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Equipamiento de competencia", desc: "Tableros electrónicos profesionales, relojes de posesión de 24 segundos reglamentarios y aros rebatibles." },
  ]

  const comodidades = [
    { icono: <Users className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Vestuarios locales y visitantes", desc: "Amplios, con duchas y zonas de charla técnica para ambos equipos." },
    { icono: <Dumbbell className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Gimnasio de pesas", desc: "Acceso para categorías superiores. Preparación física específica dentro del mismo complejo." },
  ]

  const eventos = [
    { titulo: "Liga Federal de Básquet", desc: "Sede local del equipo en la tercera categoría nacional, con partidos memorables contra equipos de todo el país." },
    { titulo: "Asociación Básquetbol Chivilcoy (ABCH)", desc: "Escenario de los torneos locales donde Colón es históricamente uno de los máximos ganadores." },
    { titulo: "Final Four Provinciales", desc: "Ha sido sede de definiciones de torneos de clubes de la Provincia de Buenos Aires." },
    { titulo: "Clínicas CABB y Generación Dorada", desc: "Recibió eventos de la Confederación Argentina de Básquetbol y leyendas del básquet nacional." },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Complejo de Básquet</h1>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image src="/instalaciones/complejobasquet.jpg" alt="Estadio Oscar y Alfredo Barca" fill className="object-cover" />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            El complejo de básquet de Colón es, probablemente, la instalación más icónica de la institución. No es solo un gimnasio: es un <strong>centro de alto rendimiento</strong> que ha sido sede de eventos de relevancia nacional y que combina la calidez del club de barrio con las exigencias del básquet profesional. Uno de los mejores templos del básquet en el interior de la Provincia de Buenos Aires.
          </p>
        </div>

        {/* Estadio Barca */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Estadio "Oscar y Alfredo Barca"</h2>
          <p className="text-gray-600 mb-4">
            El corazón del básquet rojinegro. Entrada por <strong>Vicente López 170</strong>, integrado físicamente a la manzana de la sede social.
          </p>
          <div className="space-y-3">
            {instalacionesBarca.map((item, i) => (
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

        {/* Gimnasio Antogna */}
        <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-600">
          <h2 className="text-2xl font-bold mb-3">Gimnasio "Ignacio 'Cacho' Antogna"</h2>
          <p className="text-gray-600 mb-2">
            Polideportivo auxiliar ubicado en el mismo predio. Se utiliza para los <strong>entrenamientos de categorías formativas</strong> (Mini, U13, U15) y para el desarrollo del <strong>básquet femenino</strong>.
          </p>
          <p className="text-gray-600 text-sm">
            Al liberar el estadio Barca de las prácticas diarias, permite que el equipo de Primera entrene en doble turno sin interrumpir la escuelita. También es sede del vóley y el patín del club.
          </p>
        </div>

        {/* Niveles de competencia y eventos */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-red-600" /> Competencias y Eventos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventos.map((evento, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-1">{evento.titulo}</h3>
                <p className="text-gray-500 text-sm">{evento.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comodidades */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Comodidades para el Deportista</h2>
          <div className="space-y-3">
            {comodidades.map((item, i) => (
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

        <div className="w-full rounded-lg overflow-hidden h-[360px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1120.1557395592192!2d-60.01980161038725!3d-34.892603393896735!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bea5497567e1bb%3A0x2c2d7f9ad84b7eff!2sClub%20Social%20y%20Deportivo%20Col%C3%B3n!5e0!3m2!1ses-419!2sar!4v1775862573485!5m2!1ses-419!2sar"
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
              <p className="text-black font-medium">Vicente López 170, Chivilcoy</p>
              <p className="text-sm text-gray-500">Sede Social — Estadio Barca</p>
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