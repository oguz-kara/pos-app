"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { saasConfig } from "@/saas.config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MainNav } from "./main-nav";
import { OrgSwitcher } from "./org-switcher";
import { UserNav } from "./user-nav";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col">
          {/* Header */}
          <SheetHeader className="border-b border-border px-6 py-4">
            <SheetTitle asChild>
              <Link
                href="/dashboard"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-lg font-bold">J</span>
                </div>
                <span className="text-lg font-semibold">{saasConfig.metadata.name}</span>
              </Link>
            </SheetTitle>
          </SheetHeader>

          {/* Org Switcher */}
          <div className="px-3 py-4">
            <OrgSwitcher />
          </div>

          <Separator />

          {/* Main Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <MainNav />
          </ScrollArea>

          <Separator />

          {/* User Nav */}
          <div className="flex items-center justify-between p-4">
            <UserNav />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
