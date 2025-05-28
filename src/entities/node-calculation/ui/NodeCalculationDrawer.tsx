"use client"

import { useRouter } from "next/navigation"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@shared/ui/drawer"
import { Button } from "@shared/ui/button"
import { useEffect, useState } from "react"
import {
  NodeCalculationFull,
  type TNodeCalculationFull,
} from "@entities/node-calculation"
import { ArrowLeft } from "lucide-react"

interface CalcDrawerProps {
  id: string
  isOpen: boolean
  onClose: () => void
}

export function NodeCalculationDrawer({
  id,
  isOpen,
  onClose,
}: CalcDrawerProps) {
  const [loading, setLoading] = useState(true)
  const [calc, setCalc] = useState<TNodeCalculationFull | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen || !id) return

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
  }, [id, isOpen])

  if (!calc && !loading) {
    return null
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-w-[500px] mx-auto">
        <DrawerHeader>
          <DrawerTitle className="text-sm">{calc?.title}</DrawerTitle>
          <DrawerDescription>{calc?.drupal_internal__nid}</DrawerDescription>
        </DrawerHeader>
        {loading ? (
          <div>Загрузка...</div>
        ) : error ? (
          <div>Ошибка: {error}</div>
        ) : calc ? (
          <NodeCalculationFull results={calc} />
        ) : null}
        <DrawerFooter>
          <div className="flex gap-4">
            <div className="flex-1">
              <Button variant="outline" onClick={onClose}>
                <ArrowLeft />
              </Button>
            </div>
            <div className="flex w-full">
              <Button className="w-full">Запрос</Button>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
