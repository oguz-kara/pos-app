import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { saasConfig } from "@/saas.config";
import { auth } from "@/lib/auth";

/**
 * Landing Page Header - Server Component
 *
 * Session-aware navigation that renders different CTAs based on authentication state.
 * Uses server-side session detection for optimal performance (no client JS, no loading states).
 *
 * Unauthenticated users see: "Sign In" + "Get Started"
 * Authenticated users see: "Go to Dashboard"
 */
export async function LandingHeader() {
  // Server-side session check - happens before HTML is sent to client
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">{saasConfig.metadata.name}</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link href="#features">
            <Button variant="ghost">Features</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>

          {/* Session-aware CTAs (rendered server-side) */}
          {session ? (
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
