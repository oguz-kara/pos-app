import type { Session } from './index';

/**
 * Role-based access control utilities
 *
 * Provides helper functions to check user roles and permissions
 * for the POS application.
 */

export type Role = 'owner' | 'admin' | 'member';

/**
 * Check if a session has admin privileges (owner or admin)
 *
 * @param session - User session object
 * @returns true if user is owner or admin
 *
 * @example
 * ```ts
 * if (isAdmin(session)) {
 *   // Allow access to admin features
 * }
 * ```
 */
export function isAdmin(session: Session | null): boolean {
  if (!session) return false;
  return session.role === 'owner' || session.role === 'admin';
}

/**
 * Check if a session has owner privileges
 *
 * @param session - User session object
 * @returns true if user is owner
 */
export function isOwner(session: Session | null): boolean {
  if (!session) return false;
  return session.role === 'owner';
}

/**
 * Check if a session has member privileges (any authenticated user)
 *
 * @param session - User session object
 * @returns true if user has any valid role
 */
export function isMember(session: Session | null): boolean {
  if (!session) return false;
  return session.role === 'owner' || session.role === 'admin' || session.role === 'member';
}

/**
 * Get a user-friendly label for a role
 *
 * @param role - Role to get label for
 * @returns Localized role label
 */
export function getRoleLabel(role: Role): string {
  const labels: Record<Role, string> = {
    owner: 'Sahibi',
    admin: 'Yönetici',
    member: 'Üye',
  };
  return labels[role];
}

/**
 * Permission definitions for POS operations
 * Maps operations to required roles
 */
export const PERMISSIONS = {
  // Product Management
  'products.view': ['owner', 'admin', 'member'],
  'products.create': ['owner', 'admin'],
  'products.update': ['owner', 'admin'],
  'products.delete': ['owner', 'admin'],

  // Category Management
  'categories.view': ['owner', 'admin', 'member'],
  'categories.create': ['owner', 'admin'],
  'categories.update': ['owner', 'admin'],
  'categories.delete': ['owner', 'admin'],

  // Stock Management
  'stock.view': ['owner', 'admin', 'member'],
  'stock.add': ['owner', 'admin'],
  'stock.bulkAdd': ['owner', 'admin'],

  // Supplier Management
  'suppliers.view': ['owner', 'admin', 'member'],
  'suppliers.create': ['owner', 'admin'],
  'suppliers.update': ['owner', 'admin'],
  'suppliers.delete': ['owner', 'admin'],

  // Sales
  'sales.create': ['owner', 'admin', 'member'],
  'sales.view': ['owner', 'admin', 'member'],
  'sales.refund': ['owner', 'admin'],

  // Reports
  'reports.view': ['owner', 'admin'],
  'reports.generate': ['owner', 'admin'],
  'reports.closeDay': ['owner', 'admin'],

  // Analytics
  'analytics.view': ['owner', 'admin', 'member'],

  // File Management
  'files.upload': ['owner', 'admin'],
  'files.delete': ['owner', 'admin'],
  'files.view': ['owner', 'admin', 'member'],
} as const;

export type Permission = keyof typeof PERMISSIONS;

/**
 * Check if a role has a specific permission
 *
 * @param role - User role to check
 * @param permission - Permission to check
 * @returns true if role has permission
 *
 * @example
 * ```ts
 * if (hasPermission(session.role, 'products.delete')) {
 *   // Allow product deletion
 * }
 * ```
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  const allowedRoles = PERMISSIONS[permission];
  return (allowedRoles as readonly Role[]).includes(role);
}

/**
 * Check if a session has a specific permission
 *
 * @param session - User session object
 * @param permission - Permission to check
 * @returns true if session has permission
 */
export function sessionHasPermission(
  session: Session | null,
  permission: Permission
): boolean {
  if (!session) return false;
  return hasPermission(session.role, permission);
}
