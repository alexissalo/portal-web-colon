"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { buildProductoSlug } from "@/src/lib/slugify"; 
import { useFavoritos } from "@/src/lib/useFavoritos"


export default function ProductGrid({ products = [] }) {
  
  const { esFavorito, toggleFavorito } = useFavoritos()

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <ShoppingCart className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No se encontraron productos
        </h3>
        <p className="text-gray-500">
          Intenta ajustar los filtros o buscar algo diferente.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id_producto}
          className="bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
        >
          {/* 👇 slug en lugar de id */}
          <Link
            href={`/tienda/producto/${buildProductoSlug(product.id_producto, product.nombre)}`}
            className="block"
          >
            <div className="relative aspect-square">
              <Image
                src={product.imagen_principal || "/placeholder.svg"}
                alt={product.nombre}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              {product.nuevo && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  NUEVO
                </div>
              )}
              {!product.tiene_stock && (
                <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
                  SIN STOCK
                </div>
              )}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorito(product.id_producto)
                  }}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  aria-label={esFavorito(product.id_producto) ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  <Heart className={`h-4 w-4 ${esFavorito(product.id_producto) ? "fill-red-600 text-red-600" : "text-red-600"}`} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
                {product.nombre}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {product.categoria_nombre}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-gray-800 font-bold text-lg">
                  ${product.precio}
                </p>
                {product.stock_total > 0 && (
                  <span className="text-xs text-green-600">
                    Stock: {product.stock_total}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
