"use client";

import { X, Star, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  id: string;
  url: string;
  filename: string;
  isPrimary?: boolean;
  onRemove?: (id: string) => void;
  onSetPrimary?: (id: string) => void;
  className?: string;
  showActions?: boolean;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export function ImagePreview({
  id,
  url,
  filename,
  isPrimary = false,
  onRemove,
  onSetPrimary,
  className,
  showActions = true,
  selected = false,
  onSelect,
}: ImagePreviewProps) {
  return (
    <div
      className={cn(
        "group relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all bg-muted",
        selected
          ? "border-primary ring-4 ring-primary/30 bg-primary/5"
          : "border-border hover:border-primary/50",
        onSelect && "cursor-pointer",
        className
      )}
      onClick={() => onSelect?.(id)}
    >
      {/* Image */}
      <div className="h-full w-full flex items-center justify-center p-2">
        <img
          src={url}
          alt={filename}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Selected Overlay with Checkmark */}
      {selected && (
        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
          <div className="bg-primary text-primary-foreground rounded-full p-3 shadow-2xl">
            <Check className="h-6 w-6 stroke-[3]" />
          </div>
        </div>
      )}

      {/* Primary Badge */}
      {isPrimary && (
        <Badge
          className="absolute top-2 left-2 bg-primary text-white shadow-md"
          variant="default"
        >
          <Star className="mr-1 h-3 w-3 fill-current" />
          Ana Görsel
        </Badge>
      )}

      {/* Action Buttons Overlay - Show on Hover */}
      {showActions && (onRemove || onSetPrimary) && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
          {onSetPrimary && !isPrimary && (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onSetPrimary(id);
              }}
            >
              <Star className="mr-1 h-4 w-4" />
              Ana Yap
            </Button>
          )}
          {onRemove && (
            <Button
              type="button"
              size="sm"
              variant="destructive"
              className="shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(id);
              }}
            >
              <X className="mr-1 h-4 w-4" />
              Sil
            </Button>
          )}
        </div>
      )}

      {/* Filename Tooltip */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
        <p className="text-xs text-white truncate">{filename}</p>
      </div>
    </div>
  );
}
