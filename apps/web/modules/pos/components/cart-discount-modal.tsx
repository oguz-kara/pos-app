"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "../utils";

interface CartDiscountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTotal: number;
  onApply: (targetTotal: number) => void;
}

export function CartDiscountModal({
  open,
  onOpenChange,
  currentTotal,
  onApply,
}: CartDiscountModalProps) {
  const [newTotal, setNewTotal] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");

  const newTotalInputRef = useRef<HTMLInputElement>(null);

  // Initialize form when modal opens
  useEffect(() => {
    if (open) {
      setNewTotal("");
      setDiscountAmount("");
    }
  }, [open]);

  // Auto-focus new total input when modal opens
  useEffect(() => {
    if (open && newTotalInputRef.current) {
      setTimeout(() => {
        newTotalInputRef.current?.focus();
        newTotalInputRef.current?.select();
      }, 100);
    }
  }, [open]);

  // Calculate values based on which input is being used
  const newTotalNum = parseFloat(newTotal) || 0;
  const discountAmountNum = parseFloat(discountAmount) || 0;

  // Determine the actual target total based on which field was last edited
  let calculatedTargetTotal = 0;
  let calculatedDiscount = 0;

  if (newTotal && newTotal.trim() !== "") {
    calculatedTargetTotal = newTotalNum;
    calculatedDiscount = currentTotal - newTotalNum;
  } else if (discountAmount && discountAmount.trim() !== "") {
    calculatedDiscount = discountAmountNum;
    calculatedTargetTotal = currentTotal - discountAmountNum;
  }

  const handleNewTotalChange = (value: string) => {
    setNewTotal(value);
    // Auto-calculate discount amount
    if (value && value.trim() !== "") {
      const target = parseFloat(value) || 0;
      const discount = currentTotal - target;
      setDiscountAmount(discount > 0 ? discount.toFixed(2) : "");
    } else {
      setDiscountAmount("");
    }
  };

  const handleDiscountAmountChange = (value: string) => {
    setDiscountAmount(value);
    // Auto-calculate new total
    if (value && value.trim() !== "") {
      const discount = parseFloat(value) || 0;
      const target = currentTotal - discount;
      setNewTotal(target > 0 ? target.toFixed(2) : "");
    } else {
      setNewTotal("");
    }
  };

  const handleApply = () => {
    if (calculatedTargetTotal <= 0) {
      return;
    }
    if (calculatedTargetTotal >= currentTotal) {
      return;
    }
    onApply(calculatedTargetTotal);
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApply();
    }
  };

  const isValid =
    calculatedTargetTotal > 0 && calculatedTargetTotal < currentTotal;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Round Cart Total
          </DialogTitle>
          <div className="text-sm text-muted-foreground mt-2">
            Current Total: {formatCurrency(currentTotal)}
          </div>
        </DialogHeader>

        {/* Form */}
        <div className="space-y-6 py-4" onKeyDown={handleKeyDown}>
          {/* New Total Input (Primary) */}
          <div className="space-y-2">
            <Label htmlFor="newTotal" className="text-base font-semibold">
              New Total
            </Label>
            <Input
              ref={newTotalInputRef}
              id="newTotal"
              type="number"
              step="0.01"
              min="0"
              value={newTotal}
              onChange={(e) => handleNewTotalChange(e.target.value)}
              placeholder={currentTotal.toFixed(2)}
              className="text-xl h-14 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Discount Amount Input (Secondary) */}
          <div className="space-y-2">
            <Label htmlFor="discountAmount" className="text-base font-semibold">
              Discount Amount
            </Label>
            <Input
              id="discountAmount"
              type="number"
              step="0.01"
              min="0"
              value={discountAmount}
              onChange={(e) => handleDiscountAmountChange(e.target.value)}
              placeholder="0.00"
              className="text-lg h-12 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Summary */}
          {isValid && (
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Original Total:</span>
                <span className="font-semibold">
                  {formatCurrency(currentTotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount:</span>
                <span className="font-semibold text-red-600">
                  -{formatCurrency(calculatedDiscount)}
                </span>
              </div>
              <div className="flex justify-between text-base border-t pt-2">
                <span className="font-semibold">New Total:</span>
                <span className="font-bold text-lg">
                  {formatCurrency(calculatedTargetTotal)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel (Esc)
          </Button>
          <Button
            onClick={handleApply}
            disabled={!isValid}
            className="flex-1 bg-primary disabled:opacity-50"
          >
            Apply (Enter)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
