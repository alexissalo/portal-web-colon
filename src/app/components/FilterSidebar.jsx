"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FilterSidebar({
  onFilterChange,
  categorias = [],
  minPrice = 0,
  maxPrice = 1000,
  activeCategory = "",
  activePriceMin,   // ← NUEVO
  activePriceMax,   // ← NUEVO
}) {
  const [activeCategories, setActiveCategories] = useState(
    activeCategory ? [activeCategory] : []
  )
  const [priceRange, setPriceRange] = useState([
    activePriceMin ?? minPrice,
    activePriceMax ?? maxPrice,
  ])
  const [isOpen, setIsOpen] = useState(false)

  // Flag para saber si fue interacción del usuario o cambio de props externos
  const isUserInteraction = useRef(false)

  // Sincronizar categoría activa desde URL (sin disparar onFilterChange)
  useEffect(() => {
    if (activeCategory) {
      setActiveCategories([activeCategory])
    } else {
      setActiveCategories([])
    }
  }, [activeCategory])

  // Actualizar rango de precios cuando cambian los props (sin disparar onFilterChange)
  useEffect(() => {
  setPriceRange([activePriceMin ?? minPrice, activePriceMax ?? maxPrice])
}, [activePriceMin, activePriceMax, minPrice, maxPrice])

  // Solo llamar onFilterChange cuando el usuario interactúa
  useEffect(() => {
    if (!isUserInteraction.current) return
    isUserInteraction.current = false

    onFilterChange({
      categories: activeCategories,
      priceRange,
    })
  }, [activeCategories, priceRange, onFilterChange])

  const handleCategoryToggle = (categoryName) => {
    isUserInteraction.current = true
    setActiveCategories((prev) => {
      if (prev.includes(categoryName)) {
        return []
      } else {
        return [categoryName]
      }
    })
  }

  const handlePriceChange = (index, value) => {
    isUserInteraction.current = true
    setPriceRange((prev) => {
      const newRange = [...prev]
      newRange[index] = Number(value)
      return newRange
    })
  }

  const clearFilters = () => {
    isUserInteraction.current = true
    setActiveCategories([])
    setPriceRange([minPrice, maxPrice])
  }

  const toggleFilters = () => {
    setIsOpen(!isOpen)
  }

  const hasActiveFilters = activeCategories.length > 0 || priceRange[0] !== minPrice || priceRange[1] !== maxPrice

  return (
    <aside className="w-full md:w-64">
      <button
        onClick={toggleFilters}
        className="w-full flex justify-between items-center p-4 bg-gray-100 md:hidden rounded-lg"
      >
        <span className="font-semibold">Filtros</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      <div className={`space-y-6 mt-4 md:mt-0 ${isOpen ? "block" : "hidden"} md:block`}>
        {/* Header con botón limpiar */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Filtros</h2>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-red-600 text-sm hover:underline">
              Limpiar
            </button>
          )}
        </div>

        {/* Categorías */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Categorías</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {categorias.map((categoria) => (
              <div key={categoria.id_categoria} className="flex items-center">
                <input
                  type="checkbox"
                  id={`categoria-${categoria.id_categoria}`}
                  checked={activeCategories.includes(categoria.nombre)}
                  onChange={() => handleCategoryToggle(categoria.nombre)}
                  className="mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor={`categoria-${categoria.id_categoria}`} className="flex-1 cursor-pointer">
                  <span className="text-sm">{categoria.nombre}</span>
                  <span className="text-xs text-gray-500 ml-2">({categoria.total_productos})</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Rango de Precios */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Rango de Precios</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">$</span>
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Min"
              />
              <span className="text-sm">-</span>
              <span className="text-sm">$</span>
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Max"
              />
            </div>

            {/* Slider visual */}
            <div className="space-y-2">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>
        </div>

        {/* Filtros activos */}
        {hasActiveFilters && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Filtros activos:</h4>
            <div className="space-y-1">
              {activeCategories.map((category) => (
                <div key={category} className="flex items-center justify-between text-sm">
                  <span>{category}</span>
                  <button onClick={() => handleCategoryToggle(category)} className="text-red-600 hover:text-red-800">
                    ×
                  </button>
                </div>
              ))}
              {(priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
                <div className="text-sm">
                  Precio: ${priceRange[0]} - ${priceRange[1]}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
