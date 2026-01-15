import { useEffect, RefObject } from 'react'

interface UsePosKeyboardOptions {
  searchInputRef: RefObject<HTMLInputElement | null>
  latestCartItemRef: RefObject<HTMLInputElement | null>
  onTabFromSearch: () => void
  enabled?: boolean
}

/**
 * Custom hook for POS keyboard shortcuts and focus management
 * Handles "ping-pong" focus between search input and cart items
 *
 * @param searchInputRef - Reference to the search input element
 * @param latestCartItemRef - Reference to the most recently added cart item's quantity input
 * @param onTabFromSearch - Callback when Tab is pressed in search input
 * @param enabled - Whether keyboard shortcuts are enabled (default: true)
 */
export function usePosKeyboard({
  searchInputRef,
  latestCartItemRef,
  onTabFromSearch,
  enabled = true,
}: UsePosKeyboardOptions) {
  // Handle Tab key in search input to move to cart
  useEffect(() => {
    if (!enabled) return

    const handleSearchInputKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        // Check if the active element is the search input
        if (document.activeElement === searchInputRef.current) {
          e.preventDefault()
          onTabFromSearch()
          // Focus the latest cart item quantity input
          latestCartItemRef.current?.focus()
          latestCartItemRef.current?.select()
        }
      }
    }

    window.addEventListener('keydown', handleSearchInputKeyDown)
    return () => window.removeEventListener('keydown', handleSearchInputKeyDown)
  }, [searchInputRef, latestCartItemRef, onTabFromSearch, enabled])

  /**
   * Focus the search input programmatically
   */
  const focusSearch = () => {
    searchInputRef.current?.focus()
  }

  /**
   * Focus the latest cart item quantity input
   */
  const focusLatestCartItem = () => {
    latestCartItemRef.current?.focus()
    latestCartItemRef.current?.select()
  }

  return {
    focusSearch,
    focusLatestCartItem,
  }
}
