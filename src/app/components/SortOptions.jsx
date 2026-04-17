"use client"

export default function SortOptions({ onSortChange, currentSort = "" }) {
  const sortOptions = [
    { value: "", label: "Ordenar por..." },
    { value: "nombre-ASC", label: "Nombre: A-Z" },
    { value: "nombre-DESC", label: "Nombre: Z-A" },
    { value: "precio-ASC", label: "Precio: Menor a Mayor" },
    { value: "precio-DESC", label: "Precio: Mayor a Menor" },
    { value: "fecha_creacion-DESC", label: "Más Recientes" },
    { value: "fecha_creacion-ASC", label: "Más Antiguos" },
  ]

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="sort" className="text-sm font-medium text-gray-700">
          Ordenar por:
        </label>
        <select
          id="sort"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
