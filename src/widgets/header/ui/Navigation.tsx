import { locale } from "@shared/config/i18n/messages/ru"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@shared/ui/navigation-menu"
import Link from "next/link"
import { nav } from "@shared/config/nav"

export const Navigation = () => {
  const t = locale.header
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {nav.map((item) => (
          <NavigationMenuItem key={item.href}>
            {item.children && item.children.length > 0 ? (
              <>
                <NavigationMenuTrigger className="">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {item.children.map((child) => (
                    <NavigationMenuLink asChild key={child.href}>
                      <Link href={child.href}>{child.title}</Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={item.href}>{item.title}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
