"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/lib/content/navigation";
import { CONTACT_INFO } from "@/lib/content/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface MobileNavProps {
  items: NavigationItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const toggleItem = (label: string) => {
    setOpenItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <nav className="flex flex-col gap-2 mt-8">
      {items.map((item) => {
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isOpen = openItems.includes(item.label);

        if (!hasSubmenu) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-medium hover:text-primary transition-colors py-2"
            >
              {item.label}
            </Link>
          );
        }

        return (
          <Collapsible
            key={item.label}
            open={isOpen}
            onOpenChange={() => toggleItem(item.label)}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors py-2">
              <span>{item.label}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-2 mt-2">
              {item.submenu?.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className="block py-2 text-base hover:text-primary transition-colors"
                >
                  <div className="font-medium">{subItem.label}</div>
                  {subItem.description && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {subItem.description}
                    </div>
                  )}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        );
      })}

      {/* Contact Info */}
      <div className="border-t pt-4 mt-4">
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="flex items-center gap-2 text-sm mb-3 hover:text-primary"
        >
          <Phone className="h-4 w-4" />
          <span>0545 653 45 99</span>
        </a>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Evka 3, Bornova</span>
        </div>
      </div>
    </nav>
  );
}
