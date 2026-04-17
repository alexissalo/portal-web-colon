import { generateMetadata } from "@/src/lib/seo";

export const metadata = generateMetadata({
  title: "Informacion | Club Colon de Chivilcoy",
  description:
    "Bienvenido al sitio oficial del Club Colon de Chivilcoy Seccion de Informacion.",
  keywords: [
    "futbol",
    "deporte",
    "actividades",
    "Club Colon de Chivilcoy",
    "chivilcoy",
  ],
});

export default function DatosPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-6">Datos</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <section className="space-y-6 lg:w-1/2">
          <div>
            <h2 className="text-xl font-bold text-black mb-2">
              NOMBRE COMPLETO
            </h2>
            <p className="text-red-600 text-lg">
              Club Social y Deportivo Colon de Chivilcoy
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-2">
              FECHA DE FUNDACIÓN
            </h2>
            <p className="text-red-600 text-lg">12 de octubre de 1930</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-2">ESTADIO</h2>
            <p className="text-red-600 text-lg">Lucio Zanichelli</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-2">DIRECCIÓN</h2>
            <p className="text-red-600 text-lg">
              Vicente lopez 170 - Chivilcoy, Provincia de Buenos Aires
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-2">INSTAGRAM</h2>
            <p className="text-red-600 text-lg">@clubcolonchivilcoy</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-2">FACEBOOK</h2>
            <p className="text-red-600 text-lg">@clubcolonchivilcoyoficial</p>
          </div>
        </section>

        <div className="lg:w-1/2 h-[400px] rounded-lg overflow-hidden">
          {" "}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d860.5804684350996!2d-60.01896881628484!3d-34.892156864891305!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bea5497567e1bb%3A0x2c2d7f9ad84b7eff!2sClub%20Social%20y%20Deportivo%20Col%C3%B3n!5e0!3m2!1ses-419!2sar!4v1774474803867!5m2!1ses-419!2sar"
            width="600"
            height="450"
            style={{border:0}}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
