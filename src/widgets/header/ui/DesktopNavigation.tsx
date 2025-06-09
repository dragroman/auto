import { getMenu } from "@entities/menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@shared/ui/navigation-menu"
import Link from "next/link"

export const DesktopNavigation = async ({
  className,
}: {
  className?: string
}) => {
  const nav = await getMenu()
  return (
    <NavigationMenu className={className}>
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
