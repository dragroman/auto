import { DesktopNavigation } from "./DesktopNavigation"
import { MobileNavigation } from "./MobileNavigation"
import { Logo } from "./Logo"

export const Header = () => {
  return (
    <header>
      <div className="container flex items-center justify-between py-4 mx-auto">
        <Logo />
        <DesktopNavigation />
        <MobileNavigation />
      </div>
    </header>
  )
}
