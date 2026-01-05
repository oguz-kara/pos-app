"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CreditCard,
  Settings,
  ShoppingCart,
  Package,
  Box,
  Receipt,
  BarChart3,
  Tags,
  LayoutDashboardIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "POS",
    href: "/pos",
    icon: ShoppingCart,
    subItems: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboardIcon,
      },
      {
        title: "Hızlı Satış",
        href: "/pos",
        icon: ShoppingCart,
      },
      {
        title: "Ürünler",
        href: "/pos/products",
        icon: Package,
      },
      {
        title: "Stok",
        href: "/pos/stock",
        icon: Box,
      },
      {
        title: "Satışlar",
        href: "/pos/sales",
        icon: Receipt,
      },
      {
        title: "Raporlar",
        href: "/pos/reports",
        icon: BarChart3,
      },
      {
        title: "Kategoriler",
        href: "/pos/categories",
        icon: Tags,
      },
    ],
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const hasSubItems = "subItems" in item && item.subItems;

        return (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
            {hasSubItems && (
              <div className="ml-4 mt-1 space-y-1">
                {item.subItems.map((subItem) => {
                  const SubIcon = subItem.icon;
                  const isSubActive = pathname === subItem.href;

                  return (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isSubActive
                          ? "bg-secondary text-secondary-foreground"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground"
                      )}
                    >
                      <SubIcon className="h-3 w-3" />
                      {subItem.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
