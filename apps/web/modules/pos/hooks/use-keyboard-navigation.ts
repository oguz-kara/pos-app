import { useState, useEffect } from "react";

interface UseKeyboardNavigationOptions<T> {
  items: T[];
  onSelect: (item: T) => void;
  enabled?: boolean;
}

/**
 * Custom hook for keyboard navigation in lists
 * Handles ArrowUp, ArrowDown, and Enter keys
 * 
 * @param items - Array of items to navigate through
 * @param onSelect - Callback when Enter is pressed or item is selected
 * @param enabled - Whether keyboard navigation is enabled (default: true)
 * @returns selectedIndex - The currently selected index
 */
export function useKeyboardNavigation<T>({
  items,
  onSelect,
  enabled = true,
}: UseKeyboardNavigationOptions<T>) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Reset selected index when items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!enabled || items.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && items[selectedIndex]) {
        e.preventDefault();
        onSelect(items[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onSelect, enabled]);

  return selectedIndex;
}

