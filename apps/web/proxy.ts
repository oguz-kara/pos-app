import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth/server";

/**
 * Proxy - Route Protection
 *
 * Note: Proxy always runs on Node.js runtime (cannot be configured)
 *
 * Protects routes that require authentication:
 * - /pos/* - Point of Sale interface
 * - /dashboard/* - Analytics dashboard
 * - /api/graphql - GraphQL API (handles auth in resolvers)
 *
 * Public routes:
 * - /login - Login page
 * - /signup - Signup page
 * - /api/auth/* - Better-Auth API routes (includes magic link verification)
 * - / - Landing page
 * - /about, /pricing, /features - Marketing pages
 */

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip proxy for static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts")
  ) {
    return NextResponse.next();
  }

  // Allow authentication API routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Allow GraphQL API (auth is handled in resolvers)
  if (pathname.startsWith("/api/graphql")) {
    return NextResponse.next();
  }

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/signup", "/about", "/pricing", "/features"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protected route patterns
  const protectedPatterns = ["/pos", "/dashboard"];
  const isProtectedRoute = protectedPatterns.some((pattern) =>
    pathname.startsWith(pattern)
  );

  if (!isProtectedRoute) {
    // Route is not protected, allow access
    return NextResponse.next();
  }

  // Check authentication for protected routes
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      // Redirect to login if not authenticated
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // User is authenticated, allow access
    return NextResponse.next();
  } catch (error) {
    console.error("Proxy auth error:", error);
    // Redirect to login on error for safety
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
