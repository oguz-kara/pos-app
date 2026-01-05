"use client";

import Link from "next/link";
import { saasConfig } from "@/saas.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MainNav } from "./main-nav";
import { OrgSwitcher } from "./org-switcher";
import { UserNav } from "./user-nav";
import { NotificationBell } from "@/components/notifications/notification-bell";

export function Sidebar() {
  return (
    <div className="flex h-full flex-col border-r border-border bg-muted/40">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">J</span>
          </div>
          <span className="text-lg font-semibold">{saasConfig.metadata.name}</span>
        </Link>
      </div>

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

      {/* User Nav & Notifications */}
      <div className="flex items-center justify-between p-4">
        <UserNav />
        <NotificationBell />
      </div>
    </div>
  );
}
