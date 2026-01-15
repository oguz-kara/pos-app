"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface TagInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  separator?: string;
}

/**
 * TagInput Component
 *
 * A tag/keyword manager that converts comma-separated text into visual badges.
 * - Press Enter or Comma to create a tag
 * - Press Backspace on empty input to remove last tag
 * - Output format: comma-joined string (e.g., "W-40, C-55")
 */
const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ className, value, onChange, separator = ", ", placeholder, ...props }, ref) => {
    const [pendingText, setPendingText] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Normalize value to always be a string
    const normalizedValue = value ?? "";

    // Parse tags from comma-separated string
    const tags = React.useMemo(() => {
      if (!normalizedValue || normalizedValue.trim() === "") return [];
      return normalizedValue
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }, [normalizedValue]);

    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current!);

    const addTag = (text: string) => {
      const trimmedText = text.trim();
      if (trimmedText === "") return;

      // Check if tag already exists
      if (tags.includes(trimmedText)) {
        setPendingText("");
        return;
      }

      // Add new tag
      const newTags = [...tags, trimmedText];
      const newValue = newTags.join(separator);
      onChange?.(newValue);
      setPendingText("");
    };

    const removeTag = (indexToRemove: number) => {
      const newTags = tags.filter((_, index) => index !== indexToRemove);
      const newValue = newTags.length > 0 ? newTags.join(separator) : "";
      onChange?.(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Enter or Comma: Create tag
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(pendingText);
      }
      // Backspace on empty input: Delete last tag
      else if (e.key === "Backspace" && pendingText === "") {
        e.preventDefault();
        if (tags.length > 0) {
          removeTag(tags.length - 1);
        }
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPendingText(e.target.value);
    };

    const handleContainerClick = () => {
      inputRef.current?.focus();
    };

    return (
      <div
        className={cn(
          "flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors",
          "focus-within:outline-none focus-within:ring-1 focus-within:ring-ring",
          "cursor-text",
          className
        )}
        onClick={handleContainerClick}
      >
        {/* Render tags as badges */}
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="gap-1 pr-1.5 py-0.5 text-xs font-medium"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="rounded-full hover:bg-secondary-foreground/20 p-0.5 transition-colors"
              aria-label={`Remove ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        {/* Input for new tags */}
        <input
          ref={inputRef}
          type="text"
          value={pendingText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className={cn(
            "flex-1 min-w-[120px] bg-transparent outline-none placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...props}
        />
      </div>
    );
  }
);

TagInput.displayName = "TagInput";

export { TagInput };
