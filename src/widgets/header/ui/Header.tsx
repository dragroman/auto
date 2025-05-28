import { DesktopNavigation } from "./DesktopNavigation"
import { MobileNavigation } from "./MobileNavigation"
import { Logo } from "./Logo"
import { User2 } from "lucide-react"
import Link from "next/link"

export const Header = () => {
  return (
    <header>
      <div className="container flex items-center justify-between py-4 mx-auto">
        <Logo />
        <div className="flex gap-2 items-center">
          <DesktopNavigation className="" />
          {/* <MobileNavigation className="block md:hidden" /> */}
          <Link href="/dashboard">
            <User2 className="w-5 h-5 bg-primary rounded-full p-2 box-content hover:bg-primary/80" />
          </Link>
        </div>
      </div>
    </header>
  )
}
