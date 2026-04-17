// app/noticias/[slug]/page.jsx
import Link from "next/link";
import Image from "next/image";
import { Facebook, Youtube, Instagram } from "lucide-react";
import { generateMetadata as generateSeoMetadata } from "../../../lib/seo";
import { buildNoticiaSlug } from "../../../lib/slugify";

async function getNoticia(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";
  try {
    const res = await fetch(`${baseUrl}/api/noticias/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Error al cargar la noticia");
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// 👇 nombre correcto para que Next.js lo reconozca como metadata
export async function generateMetadata({ params }) {
  const { slug } = await params; // 👈 await
  const data = await getNoticia(slug);

  if (!data?.noticia) {
    return { title: "Noticia no encontrada | Club Colon de Chivilcoy" };
  }

  const { noticia } = data;
  return generateSeoMetadata({
    title: `${noticia.titulo} | Noticias | Club Colon de Chivilcoy`,
    description: noticia.subtitulo || noticia.titulo,
    keywords: [
      "noticias",
      noticia.categoria_nombre,
      ...(noticia.tags || []),
    ].filter(Boolean),
    image: noticia.imagen_principal,
    type: "article",
  });
}

export default async function NoticiaPage({ params }) {
  const { slug } = await params; // 👈 await

  const data = await getNoticia(slug);

  // 👇 Next.js se encarga del SEO solo con generateMetadata arriba, no llamar manualmente
  if (!data?.noticia) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Noticia no encontrada
      </div>
    );
  }

  const { noticia, relacionadas } = data;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <article className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 text-sm mb-6">
          <Link href="/" className="text-red-600 hover:underline">
            Inicio
          </Link>
          <span className="text-gray-500">/</span>
          <Link href="/noticias" className="text-red-600 hover:underline">
            Noticias
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-500">{noticia.titulo}</span>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="text-sm text-gray-600">
              {formatDate(noticia.fecha_publicacion)} |{" "}
              {noticia.categoria_nombre}
            </div>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/clubcolonchivilcoyoficial"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/clubcolonchivilcoy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
               <a
                href="https://www.youtube.com/@clubcolonchivilcoy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                aria-label="Twitter"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">
            {noticia.titulo}
          </h1>
          <p className="text-xl text-gray-700 mb-4">{noticia.subtitulo}</p>
          <div className="flex gap-2 flex-wrap">
            {noticia.tags.map((tag) => (
              <div
                key={tag}
                className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[16/9] mb-8">
          <Image
            src={noticia.imagen_principal || "/placeholder.svg"}
            alt={noticia.titulo}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div
          className="prose prose-lg max-w-none ql-editor mb-16"
          dangerouslySetInnerHTML={{ __html: noticia.contenido }}
        />

        <section>
          <h2 className="text-2xl font-bold text-center text-black mb-8">
            Notas Relacionadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relacionadas.map((article) => (
              <Link
                key={article.id_noticia}
                href={`/noticias/${buildNoticiaSlug(article.id_noticia, article.titulo)}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={article.imagen_principal || "/placeholder.svg"}
                    alt={article.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-red-600">
                    {article.titulo}
                  </h3>
                  {article.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {article.tags.map((tag, i) => (
                        <div
                          key={i}
                          className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
