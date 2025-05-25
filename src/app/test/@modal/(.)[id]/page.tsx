"use client"

import { useRouter } from "next/navigation"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@shared/ui/drawer"
import { Button } from "@shared/ui/button"
import { useEffect, useState, Suspense } from "react"
import React from "react"

// Отдельный компонент для отображения содержимого после загрузки параметров
function DrawerCalc({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)

  return (
    <>
      <DrawerHeader>
        <DrawerTitle className="text-xl">{id}</DrawerTitle>
      </DrawerHeader>
      {/* Здесь можно добавить содержимое */}
    </>
  )
}

// Placeholder для показа во время загрузки
function LoadingContent() {
  return (
    <>
      <DrawerHeader>
        <DrawerTitle className="text-xl">Загрузка...</DrawerTitle>
      </DrawerHeader>
      {/* Здесь можно добавить скелетон или индикатор загрузки */}
    </>
  )
}

export default function ProductDrawer({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true) // Сразу открываем Drawer

  const onClose = () => {
    setIsOpen(false)
    setTimeout(() => router.back(), 300)
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={onClose}>
      <DrawerContent>
        {/* Используем Suspense для отложенной загрузки содержимого */}
        <Suspense fallback={<LoadingContent />}>
          <DrawerCalc params={params} />
        </Suspense>

        <DrawerFooter className="flex flex-row justify-between">
          <Button variant="outline" onClick={onClose}>
            Вернуться
          </Button>
          <Button>Добавить в корзину</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
