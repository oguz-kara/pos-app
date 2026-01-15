import { useState, useEffect, useRef } from "react";

interface UseKeyboardNavigationOptions<T> {
  items: T[];
  onSelect: (item: T) => void;
  enabled?: boolean;
}

interface UseKeyboardNavigationReturn {
  selectedIndex: number;
  shouldScroll: boolean;
}

/**
 * Custom hook for keyboard navigation in lists
 * Handles ArrowUp, ArrowDown, and Enter keys
 *
 * @param items - Array of items to navigate through
 * @param onSelect - Callback when Enter is pressed or item is selected
 * @param enabled - Whether keyboard navigation is enabled (default: true)
 * @returns selectedIndex - The currently selected index
 * @returns shouldScroll - Whether to scroll (only true when arrow keys are used)
 */
export function useKeyboardNavigation<T>({
  items,
  onSelect,
  enabled = true,
}: UseKeyboardNavigationOptions<T>): UseKeyboardNavigationReturn {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);

  // Reset selected index when items change
  useEffect(() => {
    setSelectedIndex(0);
    setShouldScroll(false);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!enabled || items.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in a cart quantity input
      const target = e.target as HTMLElement;
      const isCartQuantityInput = target.hasAttribute("data-cart-quantity-input");

      // Disable all keyboard navigation when focused on cart quantity input
      if (isCartQuantityInput) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
        setShouldScroll(true);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        setShouldScroll(true);
      } else if (e.key === "Enter" && items[selectedIndex]) {
        e.preventDefault();
        onSelect(items[selectedIndex]);
        // Reset selected index after selection
        setSelectedIndex(0);
        setShouldScroll(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onSelect, enabled]);

  return { selectedIndex, shouldScroll };
}

