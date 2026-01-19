import {
  IRateLimitProvider,
  RateLimitConfig,
  RateLimitResult,
} from './interface'

/**
 * Disabled rate limiting provider
 * Always allows requests without any rate limiting
 */
export class DisabledRateLimitProvider implements IRateLimitProvider {
  /**
   * Always allows the request
   */
  async limit(
    _identifier: string, // FIX 2: Prefix with '_' to silence "unused variable" error
    config: RateLimitConfig,
  ): Promise<RateLimitResult> {
    return {
      success: true,
      remaining: config.requests,
      // FIX 1: Removed invalid math (config.window * 1000) because config.window is a string.
      // Since rate limiting is disabled, the reset time is irrelevant.
      reset: Date.now(),
      limit: config.requests,
    }
  }

  /**
   * No-op reset
   */
  async reset(_identifier: string): Promise<void> {
    console.log(`Identifier is reset `, _identifier)
  }
}
