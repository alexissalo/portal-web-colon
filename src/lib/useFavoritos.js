// src/hooks/useFavoritos.js
"use client"

import { useState, useEffect } from "react"

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favoritos") || "[]")
    setFavoritos(stored)
  }, [])

  const esFavorito = (id) => favoritos.includes(Number(id))

  const toggleFavorito = (id) => {
    const numId = Number(id)
    setFavoritos((prev) => {
      const updated = prev.includes(numId)
        ? prev.filter((f) => f !== numId)
        : [...prev, numId]
      localStorage.setItem("favoritos", JSON.stringify(updated))
      return updated
    })
  }

  const removeFavorito = (id) => {
    const numId = Number(id)
    setFavoritos((prev) => {
      const updated = prev.filter((f) => f !== numId)
      localStorage.setItem("favoritos", JSON.stringify(updated))
      return updated
    })
  }

  return { favoritos, esFavorito, toggleFavorito, removeFavorito }
}