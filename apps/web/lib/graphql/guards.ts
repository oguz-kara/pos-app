import type { Context } from './context';
import {
  NotAuthenticatedError,
  NotAuthorizedError,
} from '@/modules/shared/errors';

/**
 * GraphQL Authentication & Authorization Guards
 *
 * These guards enforce authentication and authorization at the resolver level.
 * They throw appropriate errors that are formatted for GraphQL responses.
 */

/**
 * Require authentication for a resolver
 * Throws NotAuthenticatedError if no session exists
 *
 * @param ctx - GraphQL context
 * @returns Non-null session object
 * @throws NotAuthenticatedError
 *
 * @example
 * ```ts
 * builder.queryField("myProtectedQuery", (t) =>
 *   t.field({
 *     resolve: async (_, args, ctx) => {
 *       const session = requireAuth(ctx);
 *       // session is guaranteed to be non-null here
 *       return doSomething(session.userId);
 *     },
 *   })
 * );
 * ```
 */
export function requireAuth(ctx: Context): NonNullable<Context['session']> {
  if (!ctx.session) {
    throw new NotAuthenticatedError('You must be logged in to perform this action');
  }
  return ctx.session;
}

/**
 * Require admin role for a resolver
 * Checks if user has 'owner' or 'admin' role
 *
 * @param ctx - GraphQL context
 * @returns Non-null session object with admin role
 * @throws NotAuthenticatedError if not logged in
 * @throws NotAuthorizedError if not an admin
 *
 * @example
 * ```ts
 * builder.mutationField("deleteProduct", (t) =>
 *   t.field({
 *     resolve: async (_, args, ctx) => {
 *       const session = requireAdmin(ctx);
 *       // Only admins/owners reach this point
 *       return deleteProduct(args.id);
 *     },
 *   })
 * );
 * ```
 */
export function requireAdmin(ctx: Context): NonNullable<Context['session']> {
  const session = requireAuth(ctx);

  if (session.role !== 'owner' && session.role !== 'admin') {
    throw new NotAuthorizedError('Only administrators can perform this action');
  }

  return session;
}

/**
 * Get organization ID from authenticated session
 * This is the primary tenant isolation mechanism
 *
 * @param ctx - GraphQL context
 * @returns Active organization ID
 * @throws NotAuthenticatedError if not logged in
 *
 * @example
 * ```ts
 * builder.queryField("products", (t) =>
 *   t.field({
 *     resolve: async (_, args, ctx) => {
 *       const orgId = getOrgId(ctx);
 *       return posService.getProducts(orgId);
 *     },
 *   })
 * );
 * ```
 */
export function getOrgId(ctx: Context): string {
  const session = requireAuth(ctx);
  return session.activeOrganizationId;
}

/**
 * Check if current user has admin privileges
 * Non-throwing version for conditional logic
 *
 * @param ctx - GraphQL context
 * @returns true if user is owner or admin, false otherwise
 *
 * @example
 * ```ts
 * const canDelete = isAdmin(ctx);
 * if (canDelete) {
 *   // Show delete button
 * }
 * ```
 */
export function isAdmin(ctx: Context): boolean {
  if (!ctx.session) return false;
  return ctx.session.role === 'owner' || ctx.session.role === 'admin';
}
