import {
  IRateLimitProvider,
  RateLimitConfig,
  RateLimitResult,
} from "./interface";

/**
 * Disabled rate limiting provider
 * Always allows requests without any rate limiting
 */
export class DisabledRateLimitProvider implements IRateLimitProvider {
  /**
   * Always allows the request
   */
  async limit(
    identifier: string,
    config: RateLimitConfig
  ): Promise<RateLimitResult> {
    return {
      success: true,
      remaining: config.requests,
      reset: Date.now() + config.window * 1000,
      limit: config.requests,
    };
  }

  /**
   * No-op reset
   */
  async reset(identifier: string): Promise<void> {
    // No-op
  }
}
