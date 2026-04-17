import Image from "next/image";
import Link from "next/link";
import ShopHeader from "../components/ShopHeader";
import ShopFooter from "../components/ShopFooter";
import { generateMetadata } from "../../lib/seo";
import { buildProductoSlug } from "@/src/lib/slugify";

export const metadata = generateMetadata({
  title: "Tienda Oficial | Club Colon de Chivilcoy",
  description:
    "Visita los productos oficiales del Club Colon de Chivilcoy. Camisetas, accesorios y más.",
  keywords: ["tienda", "camisetas", "productos oficiales", "Club Colon"],
  type: "website",
});

// Función para obtener productos destacados
async function getProductosDestacados() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";
  try {
    const res = await fetch(`${baseUrl}/api/productos/destacados?limit=8`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Error al cargar productos");
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return { productos: [] };
  }
}

// Función para obtener categorías
async function getCategorias() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";
  try {
    const res = await fetch(`${baseUrl}/api/productos/categorias?limit=8`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error("Error al cargar categorías");
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return { categorias: [] };
  }
}

export default async function TiendaPage() {
  const [productosData, categoriasData] = await Promise.all([
    getProductosDestacados(),
    getCategorias(),
  ]);

  const productos = productosData.productos || [];
  const categorias = categoriasData.categorias || [];

  return (
    <div className="flex flex-col min-h-screen">
      <ShopHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative text-white py-20 overflow-hidden">
          {/* Imagen de fondo */}
          <Image
            src="/imagenes/banner3.jpeg"
            alt="Banner tienda oficial"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay rojo semitransparente para mantener legibilidad */}
          <div className="absolute inset-0 bg-red-600/75" />

          {/* Contenido encima */}
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Bienvenido a la Tienda Oficial
            </h1>
            <p className="text-xl mb-8">
              Encuentra los mejores productos oficiales del club
            </p>
            <Link
              href="/tienda/productos"
              className="bg-white text-red-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        </section>

        {/* Categorías */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Categorías</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categorias.map((categoria) => (
                <Link
                  key={categoria.id_categoria}
                  href={`/tienda/categoria/${categoria.nombre.toLowerCase()}`}
                  className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow group"
                >
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700 transition-colors">
                    <span className="text-white font-bold text-xl">
                      {categoria.nombre.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{categoria.nombre}</h3>
                  <p className="text-gray-600 text-sm">
                    {categoria.total_productos} producto
                    {categoria.total_productos !== 1 ? "s" : ""}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Productos Destacados
            </h2>
            {productos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {productos.map((producto) => (
                  <div
                    key={producto.id_producto}
                    className="bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
                  >
                    <Link
                      href={`/tienda/producto/${buildProductoSlug(producto.id_producto, producto.nombre)}`}
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={producto.imagen_principal || "/placeholder.svg"}
                          alt={producto.nombre}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        {producto.nuevo && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            NUEVO
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-red-600 transition-colors">
                          {producto.nombre}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {producto.categoria_nombre}
                        </p>
                        <p className="text-gray-700 font-bold">
                          ${producto.precio}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No hay productos disponibles en este momento.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="text-xl mb-8">
              Explora toda nuestra colección de productos oficiales
            </p>
            <Link
              href="/tienda/productos"
              className="bg-white text-red-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Ver Catálogo Completo
            </Link>
          </div>
        </section>
      </main>
      <ShopFooter />
    </div>
  );
}
