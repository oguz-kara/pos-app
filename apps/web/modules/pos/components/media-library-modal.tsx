"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaLibrary } from "./media-library";
import { Check, X } from "lucide-react";

interface MediaLibraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds?: string[];
  onSelect?: (fileId: string) => void;
  onMultiSelect?: (fileIds: string[]) => void;
  multiSelect?: boolean;
  maxSelect?: number;
  refreshTrigger?: number;
}

export function MediaLibraryModal({
  open,
  onOpenChange,
  selectedIds = [],
  onSelect,
  onMultiSelect,
  multiSelect = false,
  maxSelect,
  refreshTrigger,
}: MediaLibraryModalProps) {
  const [internalSelection, setInternalSelection] = useState<string[]>(selectedIds);

  if (!open) return null;

  const handleConfirm = () => {
    if (multiSelect && onMultiSelect) {
      onMultiSelect(internalSelection);
    }
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-background border rounded-lg shadow-lg w-full max-w-5xl h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b flex-shrink-0 relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
          <h2 className="text-2xl font-semibold">Görsel Kütüphanesi</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Yüklenmiş görsellerinizi arayın ve seçin
          </p>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <MediaLibrary
            selectedIds={internalSelection}
            onSelect={onSelect}
            onMultiSelect={setInternalSelection}
            multiSelect={multiSelect}
            maxSelect={maxSelect}
            refreshTrigger={refreshTrigger}
          />
        </div>

        {/* Footer */}
        {multiSelect && (
          <div className="px-6 py-4 border-t flex-shrink-0 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              İptal
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={internalSelection.length === 0}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              Seç ({internalSelection.length})
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
