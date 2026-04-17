import Image from "next/image"
import Link from "next/link"
import { buildProductoSlug } from "@/src/lib/slugify"  // 👈

export default function RelatedProducts({ products = [] }) {
  if (products.length === 0) return null

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Productos Relacionados</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id_producto}
            // 👇 generamos el slug directo acá, ya no depende de que venga en el objeto
            href={`/tienda/producto/${buildProductoSlug(product.id_producto, product.nombre)}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
              <div className="relative aspect-square">
                <Image
                  src={product.imagen_principal || "/placeholder.svg"}
                  alt={product.nombre}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                  {product.nombre}
                </h3>
                <p className="text-gray-600 font-bold">${product.precio}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}