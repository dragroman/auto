import { Navigation } from "./Navigation"
import { Logo } from "./Logo"

export const Header = () => {
  return (
    <header>
      <div className="container flex items-center justify-between py-6 mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  )
}
