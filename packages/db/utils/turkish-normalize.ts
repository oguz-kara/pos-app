/**
 * Turkish Character Normalization
 * Converts Turkish characters to ASCII equivalents for fuzzy search
 */

/**
 * Normalize Turkish characters to ASCII
 * Maps all Turkish-specific characters (both lowercase and uppercase):
 * - ç/Ç → c
 * - ğ/Ğ → g
 * - ı/I → i
 * - İ/i → i
 * - ö/Ö → o
 * - ş/Ş → s
 * - ü/Ü → u
 *
 * Examples:
 * - "Çeşme" → "cesme"
 * - "Yapıştırıcı" → "yapistirici"
 * - "Doğan" → "dogan"
 * - "ÖĞRENCI" → "ogrenci"
 */
export function normalizeTurkish(text: string): string {
  if (!text) return "";

  return text
    // Handle uppercase Turkish characters first (before toLowerCase)
    .replace(/İ/g, "i") // Turkish dotted capital I
    .replace(/I/g, "i")  // Turkish dotless capital I
    .replace(/Ç/g, "c")
    .replace(/Ğ/g, "g")
    .replace(/Ö/g, "o")
    .replace(/Ş/g, "s")
    .replace(/Ü/g, "u")
    .toLowerCase()
    // Handle lowercase Turkish characters
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .trim();
}
