import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image 
                src="/logo_colon_sin_fondo.png" 
                alt="Club Logo" 
                width={60} 
                height={60}
                className="w-auto h-[60px]"
              />
              <div className="flex flex-col">
                <span className="text-xs">Club Social y Deportivo</span>
                <span className="text-base font-bold">Colon de Chivilcoy</span>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Dirección: Vicente lopez 170, Chivilcoy 6620<br />
              Sede social<br />
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">El Club</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/el-club/datos" className="hover:text-red-500">Informacion</Link></li>
              <li><Link href="/el-club/instalaciones" className="hover:text-red-500">Instalaciones</Link></li>
              <li><Link href="/el-club/historia" className="hover:text-red-500">Historia</Link></li>
              <li><Link href="/el-club/camiseta" className="hover:text-red-500">Camiseta</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Deportes</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/futbol" className="hover:text-red-500">Fútbol</Link></li>
              <li><Link href="/basquet" className="hover:text-red-500">Básquet</Link></li>
              <li><Link href="/voley" className="hover:text-red-500">Voley</Link></li>
              <li><Link href="/tenis" className="hover:text-red-500">Tenis</Link></li>
              <li><Link href="/patin" className="hover:text-red-500">Patin</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Redes Sociales</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/clubcolonchivilcoyoficial/" className="hover:text-red-500" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.instagram.com/clubcolonchivilcoy/" className="hover:text-red-500" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.youtube.com/@clubcolonchivilcoy" className="hover:text-red-500" target="_blank" rel="noopener noreferrer">Youtube</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Club Social y Deportivo
          Colon de Chivilcoy. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

