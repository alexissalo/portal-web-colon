// app/tienda/preguntas-frecuentes/page.jsx
import ShopHeader from "../../components/ShopHeader"
import ShopFooter from "../../components/ShopFooter"
import { ChevronDown } from "lucide-react"
import { generateMetadata } from "@/src/lib/seo";

export const metadata = generateMetadata({
  title: "Preguntas Frecuentes | Club Colon de Chivilcoy",
  description:
    "Bienvenido a la tienda oficial del Club Colon de Chivilcoy Seccion de preguntas frecuentes.",
  keywords: [
    "preguntas frecuentes",
    "deporte",
    "tienda",
    "Club Colon de Chivilcoy",
    "chivilcoy",
  ],
});

const faqs = [
  {
    pregunta: "¿Los productos son oficiales del club?",
    respuesta: "Sí, todos los productos de nuestra tienda son oficiales y están avalados por el Club Social y Deportivo Colón de Chivilcoy.",
  },
  {
    pregunta: "¿Esta tienda es solo para ver los productos?",
    respuesta: "Sí. Esta tienda es un catálogo online donde podés explorar todos los productos disponibles. Para adquirirlos, tenés que acercarte personalmente a la Sede Social del club en Vicente López 170, Chivilcoy.",
  },
  {
    pregunta: "¿Dónde puedo comprar los productos?",
    respuesta: "Los productos se adquieren únicamente de forma presencial en la Sede Social del club (Vicente López 170, Chivilcoy), en el horario de atención de secretaría.",
  },
  {
    pregunta: "¿Puedo reservar un producto desde la web?",
    respuesta: "Por el momento la tienda funciona como catálogo de consulta. Para reservar o adquirir un producto, debés acercarte directamente al local.",
  },
  {
    pregunta: "¿Los precios que figuran en la web son los mismos que en el local?",
    respuesta: "Sí, los precios publicados en la tienda online corresponden a los precios vigentes en el local. De todas formas, te recomendamos consultar en el momento de la compra ya que pueden estar sujetos a actualizaciones.",
  },
  {
    pregunta: "¿Cómo sé qué talle elegir?",
    respuesta: "Cada producto tiene una guía de talles en su descripción. Si tenés dudas, podés consultarlo directamente en el local al momento de la compra.",
  },
  {
    pregunta: "¿Puedo encargar un producto que no está en stock?",
    respuesta: "Sí, en muchos casos es posible encargar productos. Acercate a la Sede Social y el equipo del club te orientará sobre disponibilidad y plazos.",
  },
  {
    pregunta: "¿Tienen productos para todas las disciplinas del club?",
    respuesta: "La tienda cuenta con productos de fútbol, básquet, patín y artículos generales del club. La disponibilidad puede variar según la temporada.",
  },
]

export default function PreguntasFrecuentesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ShopHeader />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Preguntas Frecuentes</h1>
        <p className="text-gray-500 mb-10">Todo lo que necesitás saber sobre nuestra tienda y los productos del club.</p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white border border-gray-200 rounded-lg">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold list-none">
                {faq.pregunta}
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
              </summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                {faq.respuesta}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-1 font-medium">¿Tenés más preguntas?</p>
          <p className="text-gray-500 text-sm">Acercate a la Sede Social en <strong>Vicente López 170, Chivilcoy</strong> y el equipo del club te va a ayudar.</p>
        </div>
      </main>
      <ShopFooter />
    </div>
  )
}