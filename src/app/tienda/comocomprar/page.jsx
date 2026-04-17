// app/tienda/como-comprar/page.jsx
import ShopHeader from "../../components/ShopHeader"
import ShopFooter from "../../components/ShopFooter"
import { Search, ShoppingBag, MapPin, Tag } from "lucide-react"
import { generateMetadata } from "@/src/lib/seo";


export const metadata = generateMetadata({
  title: "Como comprar | Club Colon de Chivilcoy",
  description:
    "Bienvenido a la tienda oficial del Club Colon de Chivilcoy Seccion de como comprar.",
  keywords: [
    "como comprar",
    "deporte",
    "tienda",
    "Club Colon de Chivilcoy",
    "chivilcoy",
  ],
});

const pasos = [
  {
    numero: "01",
    icono: <Search className="w-6 h-6 text-red-600" />,
    titulo: "Explorá el catálogo",
    desc: "Navegá por las categorías o usá el buscador para encontrar el producto que querés. Podés filtrar por categoría y ver la disponibilidad de stock.",
  },
  {
    numero: "02",
    icono: <Tag className="w-6 h-6 text-red-600" />,
    titulo: "Revisá los detalles",
    desc: "En cada producto encontrás el precio, talles disponibles, descripción y fotos. Usá la guía de talles para elegir el tuyo antes de ir al local.",
  },
  {
    numero: "03",
    icono: <ShoppingBag className="w-6 h-6 text-red-600" />,
    titulo: "Guardá tus favoritos",
    desc: "Agregá los productos que te interesan a tu lista de favoritos para tenerlos a mano cuando vayas al local.",
  },
  {
    numero: "04",
    icono: <MapPin className="w-6 h-6 text-red-600" />,
    titulo: "Acercate al local",
    desc: "Una vez que elegiste lo que querés, visitá la Sede Social del club en Vicente López 170, Chivilcoy. El equipo te va a atender y podrás llevarte tu producto.",
  },
]

export default function ComoComprarPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ShopHeader />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">¿Cómo comprar?</h1>
        <p className="text-gray-500 mb-10">
          Nuestra tienda es un catálogo online. Explorá los productos desde acá y luego acercate al local para adquirirlos.
        </p>

        {/* Aviso destacado */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-10 flex gap-3 items-start">
          <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800 mb-1">Las compras se realizan en el local físico</p>
            <p className="text-red-700 text-sm">
              Esta tienda es solo de consulta. Para adquirir cualquier producto tenés que acercarte personalmente a la <strong>Sede Social del club — Vicente López 170, Chivilcoy</strong>.
            </p>
          </div>
        </div>

        {/* Pasos */}
        <div className="space-y-6 mb-12">
          {pasos.map((paso, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {paso.numero}
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-1">
                  {paso.icono}
                  <h3 className="font-bold text-lg">{paso.titulo}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{paso.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Local físico */}
        <div className="bg-black text-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-400" /> Dónde encontrarnos
          </h2>
          <div className="space-y-2 text-gray-300 text-sm">
            <p><strong className="text-white">Sede Social</strong> — Vicente López 170, Chivilcoy, Buenos Aires</p>
            <p>Consultá los horarios de atención directamente en el club.</p>
          </div>
          <div className="mt-4 w-full rounded-lg overflow-hidden h-[220px]">
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
        </div>
      </main>
      <ShopFooter />
    </div>
  )
}