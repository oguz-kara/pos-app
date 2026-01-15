/**
 * Multiplier search syntax result
 */
export interface MultiplierParseResult {
  quantity: number;
  searchTerm: string;
  hasMultiplier: boolean;
}

/**
 * Parses search string for multiplier syntax (e.g., "3*Coke" or "3 * Coke")
 *
 * @param searchString - The search input string
 * @returns Object containing quantity, searchTerm, and whether multiplier was found
 *
 * @example
 * parseMultiplier("3*Coke") // { quantity: 3, searchTerm: "Coke", hasMultiplier: true }
 * parseMultiplier("3 * Cola") // { quantity: 3, searchTerm: "Cola", hasMultiplier: true }
 * parseMultiplier("Pepsi") // { quantity: 1, searchTerm: "Pepsi", hasMultiplier: false }
 * parseMultiplier("10*") // { quantity: 10, searchTerm: "", hasMultiplier: true }
 */
export function parseMultiplier(searchString: string): MultiplierParseResult {
  // Regex to match: number followed by optional spaces, *, optional spaces, and the rest
  const multiplierRegex = /^(\d+)\s*\*\s*(.*)$/;
  const match = searchString.match(multiplierRegex);

  if (match) {
    const quantity = parseInt(match[1], 10);
    const searchTerm = match[2].trim();

    return {
      quantity: quantity > 0 ? quantity : 1, // Ensure positive quantity
      searchTerm,
      hasMultiplier: true,
    };
  }

  // No multiplier found, return defaults
  return {
    quantity: 1,
    searchTerm: searchString,
    hasMultiplier: false,
  };
}
