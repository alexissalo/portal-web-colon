"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import { useFavoritos } from "@/src/lib/useFavoritos"

export default function ProductDetails({ producto }) {
  const [selectedTalle, setSelectedTalle] = useState("")

  const { esFavorito, toggleFavorito } = useFavoritos()



  const getAvailableStock = () => {
    if (!selectedTalle || !producto.stock) return 0
    const talleStock = producto.stock.find((s) => s.talle_nombre === selectedTalle)
    return talleStock ? talleStock.cantidad : 0
  }

  const maxQuantity = Math.min(getAvailableStock(), 10) // Máximo 10 unidades

  return (
    <div className="space-y-6">
      {/* Título y precio */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{producto.nombre}</h1>
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleFavorito(producto.id_producto)
            }}
            className={`p-2 rounded-full transition-colors ${
              esFavorito(producto.id_producto) ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400 hover:text-red-600"
            }`}
            aria-label={esFavorito(producto.id_producto) ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Heart className={`h-5 w-5 ${esFavorito(producto.id_producto) ? "fill-red-600 text-red-600" : "text-red-600"}`} />
          </button>
        </div>

        <p className="text-gray-600 mb-4">{producto.categoria_nombre}</p>

        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-gray-900">${producto.precio}</span>
          {producto.tiene_stock ? (
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">En stock</span>
          ) : (
            <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">Sin stock</span>
          )}
        </div>
      </div>

      {/* Descripción corta */}
      {producto.descripcion && (
        <div>
          <p className="text-gray-700 leading-relaxed">
            {producto.descripcion.length > 200 ? `${producto.descripcion.substring(0, 200)}...` : producto.descripcion}
          </p>
        </div>
      )}

      {/* Selección de talle */}
      {producto.stock && producto.stock.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Talle</h3>
          <div className="grid grid-cols-4 gap-2">
            {producto.stock.map((stockItem) => (
              <button
                key={stockItem.id_talle}
                onClick={() => setSelectedTalle(stockItem.talle_nombre)}
                disabled={stockItem.cantidad === 0}
                className={`p-3 border rounded-lg text-center font-medium transition-colors ${
                  stockItem.cantidad === 0
                    ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                    : selectedTalle === stockItem.talle_nombre
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-gray-300 hover:border-red-600 hover:text-red-600"
                }`}
              >
                {stockItem.talle_nombre}
                {stockItem.cantidad === 0 && <div className="text-xs mt-1">Sin stock</div>}
              </button>
            ))}
          </div>
          {selectedTalle && (
            <p className="text-sm text-gray-600 mt-2">Stock disponible: {getAvailableStock()} unidades</p>
          )}
        </div>
      )}


      {/* Información adicional */}
      <div className="border-t pt-6 space-y-4">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Truck className="h-5 w-5" />
          <span>Retiro en local</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Shield className="h-5 w-5" />
          <span>Garantía oficial del fabricante</span>
        </div>
      </div>

      {/* Información del producto */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-3">Información del producto</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex">
            <dt className="font-medium text-gray-900 w-24">SKU:</dt>
            <dd className="text-gray-700">CD-{producto.id_producto.toString().padStart(4, "0")}</dd>
          </div>
          <div className="flex">
            <dt className="font-medium text-gray-900 w-24">Categoría:</dt>
            <dd className="text-gray-700">{producto.categoria_nombre}</dd>
          </div>
          {producto.stock_total > 0 && (
            <div className="flex">
              <dt className="font-medium text-gray-900 w-24">Stock total:</dt>
              <dd className="text-gray-700">{producto.stock_total} unidades</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}
