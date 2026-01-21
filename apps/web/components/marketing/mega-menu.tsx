"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { NavigationItem } from "@/lib/content/navigation";

interface MegaMenuProps {
  item: NavigationItem;
  isActive?: boolean;
}

export function MegaMenu({ item, isActive = false }: MegaMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const hasSubmenu = item.submenu && item.submenu.length > 0;

  const handleMouseEnter = () => {
    if (hasSubmenu) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasSubmenu) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 150);
    }
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!hasSubmenu) {
    return (
      <Link
        href={item.href}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </Link>

      {isOpen && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 z-50">
          <div className="bg-white border rounded-lg shadow-lg p-4 min-w-[280px] max-w-[320px]">
            <div className="space-y-1">
              {item.submenu?.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className="block px-4 py-3 rounded-md hover:bg-muted transition-colors group"
                >
                  <div className="font-medium text-sm group-hover:text-primary transition-colors">
                    {subItem.label}
                  </div>
                  {subItem.description && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {subItem.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
