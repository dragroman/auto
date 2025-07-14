"use client"

import { ChevronLeft } from "lucide-react"
import { Button } from "./button"
import { useRouter } from "next/navigation"

export const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter()
  return (
    <Button
      variant="link"
      aria-label="Back"
      className={className}
      onClick={() => router.back()}
    >
      <ChevronLeft className="size-6" color="white" />
    </Button>
  )
}
