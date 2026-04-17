"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ShopHeader from "../../components/ShopHeader";
import ShopFooter from "../../components/ShopFooter";
import ProductGrid from "../../components/ProductGrid";
import FilterSidebar from "../../components/FilterSidebar";
import SortOptions from "../../components/SortOptions";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  // 1. Separar el priceRange en un ref para que no cause re-renders
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const priceRangeInitialized = useRef(false); // ← FLAG: solo calcular una vez

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number.parseInt(searchParams.get("page") || "1");
  const currentCategory = searchParams.get("categoria") || "";
  const currentSort = searchParams.get("sort") || "";
  const currentSearch = searchParams.get("search") || "";

  // Leer precio desde la URL
  const currentMinPrice = searchParams.get("precioMin")
    ? Number(searchParams.get("precioMin"))
    : priceRange[0];
  const currentMaxPrice = searchParams.get("precioMax")
    ? Number(searchParams.get("precioMax"))
    : priceRange[1];

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12",
      });

      if (currentCategory) params.append("categoria", currentCategory);
      if (currentSearch) params.append("search", currentSearch);
      if (currentSort) {
        const [sortBy, sortOrder] = currentSort.split("-");
        params.append("sortBy", sortBy);
        params.append("sortOrder", sortOrder);
      }

      // ← NUEVO: enviar precio a la API
      const precioMin = searchParams.get("precioMin");
      const precioMax = searchParams.get("precioMax");
      if (precioMin) params.append("precioMin", precioMin);
      if (precioMax) params.append("precioMax", precioMax);

      const response = await fetch(`/api/productos?${params}`);
      const data = await response.json();

      setProductos(data.productos || []);
      setPagination(data.pagination || {});

      // 2. Solo calcular priceRange la primera vez (o al cambiar categoría)
      if (!priceRangeInitialized.current && data.productos?.length > 0) {
        const precios = data.productos.map((p) => Number.parseFloat(p.precio));
        setPriceRange([
          Math.floor(Math.min(...precios)),
          Math.ceil(Math.max(...precios)),
        ]);
        priceRangeInitialized.current = true;
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentCategory, currentSearch, currentSort, searchParams]);

  // 3. Resetear el flag cuando cambia la categoría o búsqueda
  useEffect(() => {
    priceRangeInitialized.current = false;
  }, [currentCategory, currentSearch]);

  // Cargar categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("/api/productos/categorias");
        const data = await response.json();
        setCategorias(data.categorias || []);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);


  const handleFilterChange = useCallback(
    (filters) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (filters.categories && filters.categories.length > 0) {
        params.set("categoria", filters.categories[0]);
      } else {
        params.delete("categoria");
      }

      // ← NUEVO: persistir precio en la URL
      if (filters.priceRange) {
        params.set("precioMin", filters.priceRange[0].toString());
        params.set("precioMax", filters.priceRange[1].toString());
      }

      router.push(`/tienda/productos?${params.toString()}`);
    },
    [searchParams, router],
  );

  const handleSortChange = (option) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Resetear a la primera página

    if (option) {
      params.set("sort", option);
    } else {
      params.delete("sort");
    }

    router.push(`/tienda/productos?${params.toString()}`);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/tienda/productos?${params.toString()}`);
  };

  // Renderizar paginación
  const renderPagination = () => {
    if (!pagination.totalPages || pagination.totalPages <= 1) return null;

    const { page, totalPages } = pagination;
    const pages = [];

    // Lógica de paginación similar a la de noticias
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page <= 3) {
        pages.push(2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push("...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return (
      <div className="flex justify-center mt-12">
        <nav className="inline-flex items-center rounded-md shadow-sm">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
              page === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {pages.map((pageNum, index) => {
            if (pageNum === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                  pageNum === page
                    ? "z-10 bg-red-600 border-red-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
              page === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ShopHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Todos los Productos</h1>
            {pagination.total && (
              <p className="text-gray-600 mt-2">
                Mostrando {productos.length} de {pagination.total} productos
                {currentCategory && ` en ${currentCategory}`}
                {currentSearch && ` para "${currentSearch}"`}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar
            onFilterChange={handleFilterChange}
            categorias={categorias}
            minPrice={priceRange[0]}
            maxPrice={priceRange[1]}
            activeCategory={currentCategory}
            activePriceMin={currentMinPrice}
            activePriceMax={currentMaxPrice}
          />
          <div className="flex-grow">
            <SortOptions
              onSortChange={handleSortChange}
              currentSort={currentSort}
            />

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              </div>
            ) : (
              <>
                <ProductGrid products={productos} />
                {renderPagination()}
              </>
            )}
          </div>
        </div>
      </main>
      <ShopFooter />
    </div>
  );
}
