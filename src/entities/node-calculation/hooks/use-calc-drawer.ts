"use client"

import { useState } from "react"

export function useCalcDrawer() {
  const [selectedCalcId, setSelectedCalcId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openCalc = (id: string) => {
    setSelectedCalcId(id)
    setIsOpen(true)
  }

  const closeCalc = () => {
    setIsOpen(false)
    setSelectedCalcId(null)
  }

  return {
    selectedCalcId,
    isOpen,
    openCalc,
    closeCalc,
  }
}
