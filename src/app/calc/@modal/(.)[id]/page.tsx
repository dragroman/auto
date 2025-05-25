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
import React from "react"
import {
  NodeCalculationFull,
  type TNodeCalculationFull,
} from "@entities/node-calculation"
import { ArrowLeft } from "lucide-react"

export default function CalcDrawer({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params)

  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [calc, setCalc] = useState<TNodeCalculationFull | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Загрузка данных при монтировании компонента
  useEffect(() => {
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
    setIsOpen(true)
  }, [id])

  const onClose = () => {
    setIsOpen(false)
    setTimeout(() => router.back(), 300)
  }
  if (!calc) {
    return null
  }
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={onClose}>
      <DrawerContent className="max-w-[500px] mx-auto">
        <DrawerHeader>
          <DrawerTitle className="text-sm">{calc.title}</DrawerTitle>
          <DrawerDescription>{calc.drupal_internal__nid}</DrawerDescription>
        </DrawerHeader>
        <NodeCalculationFull results={calc} />
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
