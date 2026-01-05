"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "../utils";
import { TR, PAYMENT_METHODS, PAYMENT_METHOD_LABELS } from "../constants";

type PaymentMethod = "cash" | "card";

export function CheckoutDialog({
  open,
  onOpenChange,
  totalAmount,
  onConfirm,
  isLoading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalAmount: number;
  onConfirm: (paymentMethod: PaymentMethod, notes?: string) => Promise<void>;
  isLoading?: boolean;
}) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [notes, setNotes] = useState("");

  const handleConfirm = async () => {
    await onConfirm(paymentMethod, notes || undefined);
    setPaymentMethod("cash");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{TR.checkout}</DialogTitle>
          <DialogDescription>
            Ödeme yöntemini seçin ve satışı tamamlayın
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-2">
              {TR.totalAmount}
            </p>
            <p className="text-4xl font-bold">{formatCurrency(totalAmount)}</p>
          </div>

          <div className="space-y-2">
            <Label>{TR.paymentMethod}</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={PAYMENT_METHODS.CASH} id="cash" />
                <Label htmlFor="cash" className="cursor-pointer">
                  {PAYMENT_METHOD_LABELS.cash}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={PAYMENT_METHODS.CARD} id="card" />
                <Label htmlFor="card" className="cursor-pointer">
                  {PAYMENT_METHOD_LABELS.card}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{TR.notes}</Label>
            <Textarea
              id="notes"
              placeholder="Notlar (opsiyonel)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {TR.cancel}
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading}>
            {TR.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
