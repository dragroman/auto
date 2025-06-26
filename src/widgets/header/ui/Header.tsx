import { DesktopNavigation } from "./DesktopNavigation"
import { MobileNavigation } from "./MobileNavigation"
import { Logo } from "./Logo"
import { User2 } from "lucide-react"
import Link from "next/link"

export const Header = ({ title }: { title: string }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex gap-4 items-center">
        <Logo />
        {title && (
          <h1 className="text-xl font-bold inline md:hidden">{title}</h1>
        )}
      </div>
    </header>
  )
}
