"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Search, Heart, ChevronDown, Menu, X } from "lucide-react"
import { buildProductoSlug } from "@/src/lib/slugify"

export default function ShopHeader() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const debounceRef = useRef(null)
  const containerRef = useRef(null)  // 👈 ref en el contenedor fijo, no en SearchBox
  const pathname = usePathname()
  const router = useRouter()

  const categories = [
    { label: "PRODUCTOS", href: "/tienda/productos" },
    { label: "NOVEDADES", href: "/tienda/novedades" },
    { label: "PREGUNTAS FRECUENTES", href: "/tienda/preguntasfrecuentes" },
    { label: "COMO COMPRAR", href: "/tienda/comocomprar" },
  ]

  // Cerrar al clickear fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const fetchSuggestions = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    setLoadingSuggestions(true)
    try {
      const res = await fetch(`/api/productos/buscar?q=${encodeURIComponent(query)}&limit=3`)
      const data = await res.json()
      setSuggestions(data.productos || [])
      setShowSuggestions(true)
    } catch {
      setSuggestions([])
    } finally {
      setLoadingSuggestions(false)
    }
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim().length >= 2) {
      setShowSuggestions(false)
      router.push(`/tienda/buscar?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  // 👇 onMouseDown + preventDefault evita que el input pierda foco antes del click
  const handleSuggestionMouseDown = (e) => {
    e.preventDefault()
  }

  const handleSuggestionClick = (href) => {
    setShowSuggestions(false)
    setSearchTerm("")
    router.push(href)
  }

  // Dropdown compartido — se renderiza una sola vez, no dentro de un sub-componente
  const Dropdown = () => (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
      {loadingSuggestions ? (
        <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600" />
          Buscando...
        </div>
      ) : suggestions.length === 0 ? (
        <div className="px-4 py-3 text-sm text-gray-500">
          Sin resultados para "{searchTerm}"
        </div>
      ) : (
        <>
          {suggestions.map((producto) => {
            const href = `/tienda/producto/${buildProductoSlug(producto.id_producto, producto.nombre)}`
            return (
              <button
                key={producto.id_producto}
                onMouseDown={handleSuggestionMouseDown}   // 👈 evita blur del input
                onClick={() => handleSuggestionClick(href)}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                  <Image
                    src={producto.imagen_principal || "/placeholder.svg"}
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{producto.nombre}</p>
                  <p className="text-xs text-gray-500">{producto.categoria_nombre}</p>
                </div>
                <span className="text-sm font-semibold text-red-600 flex-shrink-0">
                  ${Number(producto.precio).toFixed(2)}
                </span>
              </button>
            )
          })}

          <div className="border-t border-gray-100">
            <button
              onMouseDown={handleSuggestionMouseDown}   // 👈 ídem
              onClick={() => handleSuggestionClick(`/tienda/buscar?q=${encodeURIComponent(searchTerm.trim())}`)}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 text-sm font-medium transition-colors"
            >
              <Search className="w-4 h-4 flex-shrink-0" />
              Ver todos los resultados para "{searchTerm}"
            </button>
          </div>
        </>
      )}
    </div>
  )

  return (
    <header className="bg-white text-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/tienda" className="flex items-center space-x-2 flex-shrink-0">
            <Image src="/logo_colon_sin_fondo.png" alt="Club Logo" width={40} height={40} className="w-auto h-[40px]" />
            <span className="text-xl font-bold">Shop</span>
          </Link>

          {/* Buscador desktop — ref fijo aquí */}
          <div ref={containerRef} className="hidden md:block relative flex-1 max-w-2xl">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
                  autoComplete="off"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="Buscar">
                  <Search className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </form>
            {showSuggestions && <Dropdown />}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              className="md:hidden text-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/tienda/favoritos" aria-label="Favoritos" className="hidden md:block hover:text-red-500">
              <Heart size={24} />
            </Link>
          </div>
        </div>

        {/* Buscador mobile — ref separado para mobile */}
        <div className="mt-4 md:hidden relative">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
                autoComplete="off"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="Buscar">
                <Search className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </form>
          {showSuggestions && <Dropdown />}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`bg-black text-white ${isMobileMenuOpen ? "block" : "hidden md:block"} relative z-40`}>
        <div className="container mx-auto px-4">
          <div className="max-h-[calc(100vh-148px)] overflow-y-auto">
            <ul className="flex flex-col md:flex-row md:justify-between">
              {categories.map((category) => (
                <li key={category.href} className="relative group">
                  <Link
                    href={category.href}
                    className={`flex items-center px-4 py-3 hover:bg-red-600 transition-colors ${
                      pathname === category.href ? "bg-red-600" : ""
                    }`}
                  >
                    {category.label}
                    {category.hasDropdown && <ChevronDown size={16} className="ml-1" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}