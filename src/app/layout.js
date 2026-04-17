// src/app/layout.js (componente del servidor)

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";  // Importa el SessionProvider para usar en el cliente
import React from "react"; // Agregado para la compatibilidad con React
import { generateMetadata } from "../lib/seo"

const inter = Inter({ subsets: ["latin"] })

export const metadata = generateMetadata({
  title: "Club Colon de Chivilcoy",
  description: "Sitio oficial del Club Colon Chivilcoy",
  keywords: ["fútbol", "deportes", "club", "Argentina"],
})

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Aquí podrías mover el SessionProvider a un componente del cliente */}
        {children}
      </body>
    </html>
  );
}
