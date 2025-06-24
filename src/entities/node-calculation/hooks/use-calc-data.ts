"use client"

import { useEffect, useState } from "react"
import { TNodeCalculationFull } from "../model/types"

export const useCalcData = (id: string) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [calc, setCalc] = useState<TNodeCalculationFull | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  useEffect(() => {
    const fetchCalcData = async () => {
      if (!id) return
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/price-calculator/calc/${id}`)

        if (!response.ok) {
          throw new Error(`Ошибка при получении товара: ${response.status}`)
        }

        const calcData = await response.json()
        setCalc(calcData)
      } catch (error) {
        console.error("Error fetching calc:", error)
        setError(error instanceof Error ? error.message : "Неизвестная ошибка")
      } finally {
        setLoading(false)
      }
    }

    fetchCalcData()
  }, [id])

  return { calc, loading, error }
}
