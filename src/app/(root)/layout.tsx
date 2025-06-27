import { Toaster } from "@shared/ui/sonner"
import { BottomNav } from "@widgets/bottom-nav"
import { Footer } from "@widgets/footer"
import { Header } from "@widgets/header"
import { ReactNode } from "react"

export default async function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="max-w-(--breakpoint-md) px-4 mx-auto py-4">
      <Toaster position="top-right" />
      <main className="container mx-auto">{children}</main>
      <BottomNav />
    </div>
  )
}
