import Image from "next/image";
import { generateMetadata } from "@/src/lib/seo";

export const metadata = generateMetadata({
  title: "Historia | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Historia.",
  keywords: [
    "futbol",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
    "historia"
  ],
});

export default function HistoriaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Historia del Club Colon de Chivilcoy</h1>

      <div className="mb-8">
        <Image
          src="/historia.jpg"
          alt="Fundación del Club Deportivo"
          width={800}
          height={400}
          className="w-full h-auto rounded-lg shadow-lg mb-4"
        />
        <p className="text-sm text-gray-600 italic">
          Imagen de la fundación del Club Colon de Chivilcoy, 1930
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Los inicios</h2>
          <p>
            El 12 de octubre de 1930, un grupo de entusiastas y apasionados
            jóvenes y adolescentes de la época, quienes residían, en
            inmediaciones de la plaza Colón, de nuestra ciudad, hubo de sentar,
            las sólidas y firmes bases institucionales, del Club Social y
            Deportivo Colón. De acuerdo con algunas versiones históricas, en un
            comienzo, los organizadores del club, habrían tenido el propósito,
            de bautizarla con el nombre de “Sportivo Palermo”, en directa
            referencia a la fábrica de cerveza que eventualmente podría efectuar
            la generosa donación de las camisetas del futuro equipo de fútbol;
            pero al final prevaleció la denominación de Colón, pues en un banco
            del paseo público así llamado, surgió la iniciativa para crear la
            institucion
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Crecimiento y consolidación
          </h2>
          <p>
            La entidad tubo de funcionar en diferentes inmuebles: Su primera
            sede la ubicamos en la cuadra inicial de la calle San Lorenzo;
            después se trasladó sobre la misma arteria a un local situado en el
            Nro. 248; luego se instaló en la esquina de la calle Vicente López
            casi Pueyrredón donde funcionó el viejo Hotel Español;
            posteriormente estuvo sobre la esquina de enfrente y en la esquina
            de las calles Colón e Ituzaingó y tiempo más tarde se estableció en
            un edificio de la calle Colón Nro. 175. En 1931, el Club Colón se
            afilio a la entonces Federación Chivilcoyana de Deportes,
            participando con su conjunto futbolístico en los correspondientes
            torneos de Intermedia y Segunda División. En 1935, digna y
            merecidamente ascendió al certamen de Primera División,
            consagrándose campeón por vez primera, en 1942; verdadera hazaña y
            gran lauro que supo reiterar en los años 1943 y 1944. Con
            posterioridad logró nuevos e importantes triunfos en 1947, 1953,
            1966 y de un modo consecutivo y resonante en los años 1971, 1972,
            1973 y 1974.
          </p>
        </section>

      </div>

    </div>
  );
}
