/**
 * Margin Calculator Utility
 * Calculates profit margin and related metrics
 */

export interface MarginCalculation {
  margin: number; // Percentage (0-100)
  marginFormatted: string; // "25.5%"
  profit: number; // Absolute profit amount
  profitFormatted: string; // "₺12.50"
  isValid: boolean;
}

/**
 * Calculate profit margin from cost and selling price
 * Margin % = ((Selling Price - Cost Price) / Selling Price) × 100
 */
export function calculateMargin(
  costPrice: number,
  sellingPrice: number
): MarginCalculation {
  // Validate inputs
  if (
    !isFinite(costPrice) ||
    !isFinite(sellingPrice) ||
    costPrice < 0 ||
    sellingPrice <= 0
  ) {
    return {
      margin: 0,
      marginFormatted: "0%",
      profit: 0,
      profitFormatted: "₺0.00",
      isValid: false,
    };
  }

  const profit = sellingPrice - costPrice;
  const margin = (profit / sellingPrice) * 100;

  return {
    margin,
    marginFormatted: `${margin.toFixed(1)}%`,
    profit,
    profitFormatted: `₺${profit.toFixed(2)}`,
    isValid: true,
  };
}

/**
 * Get margin status color class based on percentage
 */
export function getMarginStatus(margin: number): {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
  className: string;
} {
  if (margin < 0) {
    return {
      label: "Zarar",
      variant: "destructive",
      className: "bg-red-100 text-red-800 border-red-200",
    };
  }

  if (margin < 15) {
    return {
      label: "Düşük",
      variant: "outline",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
  }

  if (margin < 30) {
    return {
      label: "İyi",
      variant: "secondary",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    };
  }

  return {
    label: "Mükemmel",
    variant: "default",
    className: "bg-green-100 text-green-800 border-green-200",
  };
}

/**
 * Calculate suggested selling price from cost and desired margin
 * Selling Price = Cost Price / (1 - Desired Margin %)
 */
export function calculateSuggestedPrice(
  costPrice: number,
  desiredMargin: number
): number {
  if (!isFinite(costPrice) || costPrice <= 0 || desiredMargin >= 100) {
    return 0;
  }

  return costPrice / (1 - desiredMargin / 100);
}
