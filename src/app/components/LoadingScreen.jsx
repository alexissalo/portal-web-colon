'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Ajusta este tiempo según tus necesidades

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-red-600 flex items-center justify-center z-[9999]">
      <div className="animate-pulse">
        <Image
          src="/logo_colon_sin_fondo.png" // Reemplaza esto con la ruta real de tu escudo
          alt="Club Shield"
          width={200}
          height={200}
          className="animate-beat"
        />
      </div>
    </div>
  )
}

