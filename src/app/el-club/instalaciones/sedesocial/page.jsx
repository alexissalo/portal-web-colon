import Image from "next/image"
import { MapPin, Phone,Trophy, Users, Building } from "lucide-react"
import { generateMetadata } from "@/src/lib/seo";

export const metadata = generateMetadata({
  title: "Instalaciones | Sede Social | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Instalaciones de sede social.",
  keywords: [
    "sede social",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
    "instalaciones"
  ],
});

export default function SedeSocial() {
  const instalaciones = [
    { icono: <Users className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Secretaría y Administración", desc: "Gestión de carnets de socios, cobro de cuotas y trámites institucionales." },
    { icono: <Building className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Salón de Eventos", desc: "Cenas de campeonatos, entregas de premios de todas las disciplinas y eventos sociales privados." },
    { icono: <Building className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Secretaría de Deportes", desc: "Coordinación de todas las subcomisiones deportivas del club." },
    { icono: <Trophy className="w-5 h-5 text-red-600 flex-shrink-0" />, titulo: "Vitrina de Trofeos", desc: "Copas del básquet local y provincial, títulos de la Liga Chivilcoyana de Fútbol y logros internacionales del patín." },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Sede Social</h1>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image src="/instalaciones/sedesocial.jpg" alt="Sede Social Club Colón" fill className="object-cover" />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            La Sede Social del Club Social y Deportivo Colón está ubicada en <strong>Vicente López 170</strong>, en pleno centro de Chivilcoy, a pocas cuadras de la Plaza Colón — el lugar donde los jóvenes fundadores se reunían en 1930. Su fachada clásica fue inaugurada oficialmente en <strong>1953</strong> y es el resultado de décadas de esfuerzo colectivo, incluyendo una dolorosa reconstrucción tras un incendio que destruyó gran parte de las instalaciones y archivos históricos del club.
          </p>
          <p className="text-lg leading-relaxed">
            Al atravesar sus pasillos se accede directamente al <strong>estadio Oscar y Alfredo Barca</strong> y al <strong>gimnasio Ignacio "Cacho" Antogna</strong>, convirtiendo a esta manzana del centro de Chivilcoy en un complejo deportivo y social único en la región.
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

        <div className="bg-black text-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="text-yellow-400 w-5 h-5" /> Importancia institucional
          </h2>
          <p className="text-gray-300">
            La sede no solo abre sus puertas para los deportistas. Es el lugar donde se realizan las <strong className="text-white">Asambleas de Socios</strong> y donde la Comisión Directiva proyecta las obras del club.
          </p>
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