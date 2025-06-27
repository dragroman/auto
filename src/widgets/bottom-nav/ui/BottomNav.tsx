"use client"

import React from "react"
import {
  Home,
  Calculator,
  MessageCircle,
  Phone,
  User,
  CarIcon,
} from "lucide-react"
import { cn } from "@shared/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: number
}

const MobileBottomNav = () => {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Главная",
      icon: Home,
      href: "/",
    },
    {
      id: "calculator",
      label: "Калькулятор",
      icon: Calculator,
      href: "/calc",
    },
    {
      id: "cars",
      label: "Авто",
      icon: CarIcon,
      href: "/cars",
      badge: 2,
    },
    {
      id: "contacts",
      label: "Контакты",
      icon: Phone,
      href: "/contact",
    },
    {
      id: "profile",
      label: "Профиль",
      icon: User,
      href: "/dashboard",
    },
  ]

  // Функция для определения активной вкладки на основе текущего пути
  const isActiveTab = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Spacer для контента, чтобы он не перекрывался меню */}
      <div className="h-20 md:hidden" />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = isActiveTab(item.href)

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center min-w-0 flex-1 px-1 py-1 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-lg",
                  "tap-highlight-transparent",
                  isActive
                    ? "text-red-600"
                    : "text-gray-500 hover:text-gray-700 active:text-red-500"
                )}
                aria-label={item.label}
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      "w-6 h-6 transition-transform duration-200",
                      isActive && "scale-110"
                    )}
                  />

                  {/* TODO: Badge для уведомлений */}
                  {/* {item.badge && item.badge > 0 && (
                    <span
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium min-w-[16px] h-4 flex items-center justify-center rounded-full px-1"
                      style={{ fontSize: "10px" }}
                    >
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )} */}
                </div>

                <span
                  className={cn(
                    "text-xs font-medium mt-1 leading-none truncate max-w-full",
                    "transition-colors duration-200"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>

        {/* iOS Home Indicator */}
        <div className="flex justify-center pb-1">
          <div className="w-32 h-1 bg-black/20 rounded-full" />
        </div>
      </nav>
    </>
  )
}

// Экспортируемый компонент
export const BottomNav = () => {
  return <MobileBottomNav />
}
