/**
 * Client-safe utility functions for POS module
 * These functions can be used in both client and server components
 */

/**
 * Format currency for Turkish locale
 */
export function formatCurrency(amount: number | string): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(num);
}

/**
 * Format date for Turkish locale
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("tr-TR").format(d);
}

/**
 * Format datetime for Turkish locale
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(d);
}

/**
 * Calculate selling price with markup
 */
export function calculateSellingPrice(
  costPrice: number,
  markupPercentage: number = 30
): number {
  return costPrice * (1 + markupPercentage / 100);
}

/**
 * Get stock status badge variant
 */
export function getStockStatus(
  stock: number,
  threshold: number = 10
): "default" | "secondary" | "destructive" {
  if (stock <= 0) return "destructive";
  if (stock <= threshold) return "secondary";
  return "default";
}

/**
 * Get stock status label
 */
export function getStockStatusLabel(
  stock: number,
  threshold: number = 10
): string {
  if (stock <= 0) return "Stokta Yok";
  if (stock <= threshold) return "Düşük Stok";
  return "Stokta Var";
}
