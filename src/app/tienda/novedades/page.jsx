// app/tienda/novedades/page.jsx
import ShopHeader from "../../components/ShopHeader"
import ShopFooter from "../../components/ShopFooter"
import ProductGrid from "../../components/ProductGrid"
import { generateMetadata as generateSeoMetadata } from "@/src/lib/seo"
import Link from "next/link"

export const metadata = generateSeoMetadata({
  title: "Novedades | Tienda Club Colón de Chivilcoy",
  description: "Los últimos productos incorporados a la tienda oficial del Club Colón de Chivilcoy.",
  keywords: ["novedades", "nuevos productos", "tienda", "Club Colón de Chivilcoy"],
})

async function getNovedades() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000"
  try {
    const res = await fetch(`${baseUrl}/api/productos/novedades`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error("Error al cargar novedades")
    return res.json()
  } catch (error) {
    console.error("Error:", error)
    return { productos: [] }
  }
}

export default async function NovedadesPage() {
  const { productos } = await getNovedades()

  return (
    <div className="flex flex-col min-h-screen">
      <ShopHeader />
      <main className="flex-grow container mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm mb-6">
          <Link href="/" className="text-red-600 hover:underline">Home</Link>
          <span className="text-gray-500">/</span>
          <Link href="/tienda" className="text-red-600 hover:underline">Tienda</Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-500">Novedades</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Novedades</h1>
          <p className="text-gray-500">Los últimos productos incorporados a la tienda oficial.</p>
        </div>

        {/* Grid */}
        <ProductGrid products={productos} />

        {/* Volver */}
        <div className="mt-12 text-center">
          <Link href="/tienda" className="inline-flex items-center text-red-600 hover:underline font-medium">
            ← Volver a la tienda
          </Link>
        </div>

      </main>
      <ShopFooter />
    </div>
  )
}