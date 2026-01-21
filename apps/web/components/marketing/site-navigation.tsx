"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navigationConfig } from "@/lib/content/navigation";

export function SiteNavigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationConfig.map((item) => {
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          if (!hasSubmenu) {
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link
                    href={item.href}
                    className={cn(
                      isActive && "bg-accent text-accent-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuTrigger
                className={cn(
                  isActive && "bg-accent text-accent-foreground"
                )}
              >
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[280px] gap-1 p-4">
                  {item.submenu?.map((subItem) => (
                    <ListItem
                      key={subItem.href}
                      href={subItem.href}
                      title={subItem.label}
                    >
                      {subItem.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
