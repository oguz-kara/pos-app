"use client";

import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainNav } from "./main-nav";

export function Sidebar() {
  return (
    <div className="flex h-full flex-col border-r border-border bg-muted/40">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/pos" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">P</span>
          </div>
          <span className="text-lg font-semibold">POS System</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <MainNav />
      </ScrollArea>
    </div>
  );
}
