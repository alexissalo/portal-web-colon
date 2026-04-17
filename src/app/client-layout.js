// src/app/client-layout.js (componente del cliente)

'use client';

import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
