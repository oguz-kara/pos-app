import { useMemo } from "react";

type Product = {
  id: string;
  name: string;
  barcode: string | null;
  sellingPrice: string;
  totalStock?: number;
};

type CartItem = {
  product: Product;
  quantity: number;
  unitPrice: number;
};

/**
 * Calculate proportional discount distribution across cart items
 * @param cartItems - Current cart items
 * @param targetTotal - Target total amount after discount
 * @returns New cart items with updated unitPrice values
 */
export function calculateCartDiscount(
  cartItems: CartItem[],
  targetTotal: number | null
): CartItem[] {
  if (!targetTotal || targetTotal <= 0 || cartItems.length === 0) {
    return cartItems;
  }

  // Calculate original total
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  // If target is greater than or equal to original, no discount needed
  if (targetTotal >= originalTotal) {
    return cartItems;
  }

  // Calculate total discount needed
  const totalDiscount = originalTotal - targetTotal;

  // Calculate total subtotal for weight calculation
  const totalSubtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  if (totalSubtotal === 0) {
    return cartItems;
  }

  // Distribute discount proportionally
  const itemsWithDiscounts = cartItems.map((item) => {
    const itemSubtotal = item.unitPrice * item.quantity;
    const itemWeight = itemSubtotal / totalSubtotal;
    const itemDiscount = totalDiscount * itemWeight;

    // Calculate new unit price
    const discountPerUnit = itemDiscount / item.quantity;
    const newUnitPrice = Math.max(0, item.unitPrice - discountPerUnit);

    return {
      ...item,
      unitPrice: newUnitPrice,
    };
  });

  // Handle rounding errors by adjusting the largest item
  const newTotal = itemsWithDiscounts.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const roundingError = targetTotal - newTotal;

  if (Math.abs(roundingError) > 0.01) {
    // Find the item with the largest subtotal
    const largestItemIndex = itemsWithDiscounts.reduce(
      (maxIndex, item, index) => {
        const currentSubtotal = item.unitPrice * item.quantity;
        const maxSubtotal =
          itemsWithDiscounts[maxIndex].unitPrice *
          itemsWithDiscounts[maxIndex].quantity;
        return currentSubtotal > maxSubtotal ? index : maxIndex;
      },
      0
    );

    // Adjust the largest item to account for rounding error
    const largestItem = itemsWithDiscounts[largestItemIndex];
    const adjustmentPerUnit = roundingError / largestItem.quantity;
    const adjustedUnitPrice = Math.max(
      0,
      largestItem.unitPrice + adjustmentPerUnit
    );

    itemsWithDiscounts[largestItemIndex] = {
      ...largestItem,
      unitPrice: adjustedUnitPrice,
    };
  }

  return itemsWithDiscounts;
}

/**
 * Hook to calculate proportional discount distribution across cart items
 * @param cartItems - Current cart items
 * @param targetTotal - Target total amount after discount
 * @returns New cart items with updated unitPrice values
 */
export function useCartDiscount(
  cartItems: CartItem[],
  targetTotal: number | null
): CartItem[] {
  return useMemo(
    () => calculateCartDiscount(cartItems, targetTotal),
    [cartItems, targetTotal]
  );
}

