"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import React from "react"
import { NodeCalculationDrawer } from "@entities/node-calculation"

export default function CalcDrawerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const onClose = () => {
    setIsOpen(false)
    setTimeout(() => router.back(), 300)
  }

  return <NodeCalculationDrawer id={id} isOpen={isOpen} onClose={onClose} />
}
