/**
 * Retry utility with exponential backoff
 * Useful for network operations that may fail transiently
 */

export interface RetryOptions {
  maxAttempts?: number; // Default: 3
  baseDelay?: number; // Default: 1000ms (1 second)
  maxDelay?: number; // Default: 10000ms (10 seconds)
  onRetry?: (attempt: number, error: Error) => void;
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    onRetry,
  } = options;

  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // If this was the last attempt, throw the error
      if (attempt === maxAttempts) {
        throw lastError;
      }

      // Calculate exponential backoff delay: baseDelay * 2^(attempt-1)
      // Example: 1000ms, 2000ms, 4000ms
      const exponentialDelay = Math.min(
        baseDelay * Math.pow(2, attempt - 1),
        maxDelay
      );

      // Add random jitter (±25%) to prevent thundering herd
      const jitter = exponentialDelay * 0.25 * (Math.random() - 0.5);
      const delay = exponentialDelay + jitter;

      // Notify caller of retry
      if (onRetry) {
        onRetry(attempt, lastError);
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // TypeScript requires this, but it's unreachable
  throw lastError!;
}

/**
 * Check if error is a network error (vs business logic error)
 * Network errors should be retried, business logic errors should not
 */
export function isNetworkError(error: any): boolean {
  if (!error) return false;

  // Check error message for common network error patterns
  const errorMessage = error.message?.toLowerCase() || '';
  const networkErrorPatterns = [
    'network',
    'timeout',
    'fetch',
    'connection',
    'econnrefused',
    'enotfound',
    'etimedout',
  ];

  return networkErrorPatterns.some((pattern) =>
    errorMessage.includes(pattern)
  );
}
