import { IRateLimitProvider } from "./interface";
import { DisabledRateLimitProvider } from "./disabled";

let cachedProvider: IRateLimitProvider | null = null;

/**
 * Create a rate limit provider instance
 * Currently using disabled provider (no rate limiting)
 * Can be extended to support Upstash or other providers in the future
 */
export function createRateLimitProvider(): IRateLimitProvider {
  if (cachedProvider) {
    return cachedProvider;
  }

  // Using disabled provider - no Redis dependency
  // To enable rate limiting, switch to UpstashRateLimitProvider
  cachedProvider = new DisabledRateLimitProvider();

  return cachedProvider;
}

/**
 * Reset the cached provider (useful for testing)
 */
export function resetRateLimitProvider(): void {
  cachedProvider = null;
}
