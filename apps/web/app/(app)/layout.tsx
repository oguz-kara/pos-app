"use client";

import { useSession } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { LowCreditBanner } from "@/components/billing/low-credit-banner";
import { saasConfig } from "@/saas.config";

/**
 * Authenticated App Layout
 *
 * Provides the main application shell with:
 * - Desktop: Fixed sidebar navigation (w-64)
 * - Mobile: Hamburger menu with Sheet drawer
 * - Authentication check and redirect
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Show loading state while checking auth
  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render app if not authenticated
  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 md:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-background px-4 md:hidden">
          <MobileSidebar />
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg font-bold">J</span>
            </div>
            <span className="text-lg font-semibold">{saasConfig.metadata.name}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {/* Low Credit Warning Banner */}
            <div className="mb-6">
              <LowCreditBanner />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
