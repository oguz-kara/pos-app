import { IRateLimitProvider } from "./interface";
import { UpstashRateLimitProvider } from "./upstash";

let cachedProvider: IRateLimitProvider | null = null;

/**
 * Create a rate limit provider instance
 * Currently hardcoded to use Upstash, but can be extended to support multiple providers
 * following the same pattern as billing/email modules
 */
export function createRateLimitProvider(): IRateLimitProvider {
  if (cachedProvider) {
    return cachedProvider;
  }

  // For now, we only support Upstash
  // In the future, this could be configurable via saas.config.ts
  // e.g., if (saasConfig.rateLimiting.provider === 'upstash') { ... }
  cachedProvider = new UpstashRateLimitProvider();

  return cachedProvider;
}

/**
 * Reset the cached provider (useful for testing)
 */
export function resetRateLimitProvider(): void {
  cachedProvider = null;
}
