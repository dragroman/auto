"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@shared/ui/drawer"
import { Button } from "@shared/ui/button"
import { Spinner } from "@shared/ui/spinner"
import { ReactNode } from "react"
import {
  NodeCalculationFull,
  type TNodeCalculationFull,
} from "@entities/node-calculation"
import { ArrowLeft } from "lucide-react"

interface NodeCalculationDrawerProps {
  calc: TNodeCalculationFull | null
  loading: boolean
  error: string | null
  isOpen: boolean
  onClose: () => void
  actions?: ReactNode
}

export function NodeCalculationDrawer({
  calc,
  loading,
  error,
  isOpen,
  onClose,
  actions,
}: NodeCalculationDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-w-[500px] mx-auto">
        <DrawerHeader>
          <DrawerTitle className="text-sm">{calc?.title}</DrawerTitle>
          <DrawerClose />
        </DrawerHeader>

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="p-4 text-center text-red-500">Ошибка: {error}</div>
        ) : calc ? (
          <NodeCalculationFull scroll={true} results={calc} />
        ) : (
          <div className="p-4 text-center text-gray-500">Данные не найдены</div>
        )}

        <DrawerFooter>
          <div className="flex gap-4">
            <div className="flex-1">
              <Button variant="outline" onClick={onClose}>
                <ArrowLeft />
              </Button>
            </div>
            <div className="flex w-full">{actions}</div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
