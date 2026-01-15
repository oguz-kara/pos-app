"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onFocus?: () => void;
  className?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      placeholder = "Ara...",
      autoFocus = false,
      onKeyDown,
      onFocus,
      className,
    },
    ref
  ) => {
    return (
      <div className="bg-background">
        <div className="relative">
          {/* Icon Container: Absolute, Full Height, Flex Center -> Guarantees perfect alignment */}
          <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>

          <Input
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            autoFocus={autoFocus}
            placeholder={placeholder}
            // pl-10 pushes text to right to make room for icon
            // h-12 makes it large and touch-friendly
            className={cn("pl-10 h-12 text-lg", className)}
          />
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
