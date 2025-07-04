"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import React from "react"
import { RequestCalc } from "@features/request-calc"
import {
  NodeCalculationDrawer,
  type TNodeCalculationFull,
} from "@entities/node-calculation"
import { useSession } from "next-auth/react"

export function NodeCalculationModal({ id }: { id: string }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true) // Сразу true!
  const [loading, setLoading] = useState(true)
  const [calc, setCalc] = useState<TNodeCalculationFull | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { data: session } = useSession()

  const currentUserID = session?.user.id

  // Запускаем загрузку данных сразу
  useEffect(() => {
    if (!id) return

    const fetchCalcData = async () => {
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

  const onClose = () => {
    setIsOpen(false)
    setTimeout(() => router.back(), 300)
  }

  // Показываем Drawer всегда, независимо от состояния calc
  return (
    <NodeCalculationDrawer
      calc={calc}
      loading={loading}
      error={error}
      isOpen={isOpen}
      onClose={onClose}
      actions={
        calc && !loading && !error ? (
          <RequestCalc
            className="w-full"
            node={calc}
            currentUserID={currentUserID}
          />
        ) : null
      }
    />
  )
}
