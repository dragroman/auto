import { Menu, MenuSquare } from "lucide-react"

export const MobileNavigation = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <Menu className="w-6 h-6" />
    </div>
  )
}
