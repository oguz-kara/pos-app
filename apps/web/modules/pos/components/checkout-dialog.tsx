"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "../utils";
import { TR } from "../constants";
import { CreditCard, Banknote, ChevronDown } from "lucide-react";

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [receivedAmount, setReceivedAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [showNotesInput, setShowNotesInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const receivedInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setPaymentMethod(null);
      setReceivedAmount("");
      setNotes("");
      setShowNotesInput(false);
      setIsSubmitting(false);
    }
  }, [open]);

  // Auto-focus received amount input when cash is selected
  useEffect(() => {
    if (paymentMethod === "cash" && receivedInputRef.current) {
      setTimeout(() => {
        receivedInputRef.current?.focus();
      }, 100);
    }
  }, [paymentMethod]);

  // Calculate submit eligibility
  const receivedNum = parseFloat(receivedAmount) || 0;
  const change = receivedNum - totalAmount;
  const canSubmit =
    paymentMethod === "card" ||
    (paymentMethod === "cash" && receivedNum >= totalAmount);

  const handleConfirm = useCallback(async () => {
    if (!paymentMethod || !canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onConfirm(paymentMethod, notes || undefined);
      setPaymentMethod(null);
      setReceivedAmount("");
      setNotes("");
    } catch (error) {
      // Error handling - allow retry
      console.error("Sale failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [paymentMethod, canSubmit, isSubmitting, onConfirm, notes]);

  // Auto-round received amount on blur
  const handleReceivedAmountBlur = () => {
    const rounded = Math.round(parseFloat(receivedAmount) * 100) / 100;
    if (!isNaN(rounded) && receivedAmount) {
      setReceivedAmount(rounded.toFixed(2));
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      const isTypingField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Only handle shortcuts when not typing
      if (!isTypingField) {
        // Enter - Select Cash or Complete Sale
        if (e.key === "Enter") {
          e.preventDefault();
          if (!paymentMethod) {
            setPaymentMethod("cash");
          } else if (canSubmit && !isLoading && !isSubmitting) {
            // Complete sale when payment method is selected and valid
            handleConfirm();
          }
        }
        // C - Select Card
        if (e.key === "c" || e.key === "C") {
          e.preventDefault();
          setPaymentMethod("card");
        }
      }

      // Enter in received amount field - submit if valid
      if (
        e.key === "Enter" &&
        target === receivedInputRef.current &&
        paymentMethod === "cash"
      ) {
        const received = parseFloat(receivedAmount) || 0;
        if (received >= totalAmount) {
          handleConfirm();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, paymentMethod, receivedAmount, totalAmount, canSubmit, isLoading, isSubmitting, handleConfirm]);

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
    // For card, auto-set received amount to total
    if (method === "card") {
      setReceivedAmount(totalAmount.toString());
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {/* Header - Massive Total Amount */}
        <DialogHeader className="border-b pb-6">
          <DialogTitle className="text-center">
            <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">
              {TR.totalAmount}
            </div>
            <div className="text-5xl font-black text-gray-900">
              {formatCurrency(totalAmount)}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Payment Method Selection - Only show if not selected yet */}
          {!paymentMethod && (
            <div>
              <div className="text-sm font-semibold text-muted-foreground mb-3 text-center">
                Ödeme Yöntemi Seçin
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Cash Button */}
                <button
                  onClick={() => handlePaymentMethodSelect("cash")}
                  className="h-32 rounded-xl bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 transition-all flex flex-col items-center justify-center gap-2 group"
                >
                  <Banknote className="h-12 w-12 text-green-700 group-hover:scale-110 transition-transform" />
                  <span className="text-xl font-bold text-green-700">
                    Nakit
                  </span>
                  <span className="text-xs text-green-600">[Enter]</span>
                </button>

                {/* Card Button */}
                <button
                  onClick={() => handlePaymentMethodSelect("card")}
                  className="h-32 rounded-xl bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-400 transition-all flex flex-col items-center justify-center gap-2 group"
                >
                  <CreditCard className="h-12 w-12 text-blue-700 group-hover:scale-110 transition-transform" />
                  <span className="text-xl font-bold text-blue-700">Kart</span>
                  <span className="text-xs text-blue-600">[C]</span>
                </button>
              </div>
            </div>
          )}

          {/* Cash Payment Flow */}
          {paymentMethod === "cash" && (
            <div className="space-y-4">
              {/* Selected Method Badge */}
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Banknote className="h-5 w-5" />
                <span className="font-semibold">Nakit Ödeme</span>
                <button
                  onClick={() => setPaymentMethod(null)}
                  className="ml-2 text-xs text-muted-foreground hover:text-foreground underline"
                >
                  Değiştir
                </button>
              </div>

              {/* Received Amount Input */}
              <div>
                <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                  Alınan Tutar
                </label>
                <Input
                  ref={receivedInputRef}
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(e.target.value)}
                  onBlur={handleReceivedAmountBlur}
                  className="text-2xl h-16 text-center font-bold"
                  placeholder="0.00"
                />
              </div>

              {/* Change Display - EMPHASIZED */}
              {receivedNum > 0 && (
                <div
                  className={`p-6 rounded-xl border-4 shadow-lg transition-all ${
                    change >= 0
                      ? "bg-gradient-to-br from-green-50 to-green-100 border-green-400 animate-pulse"
                      : "bg-gradient-to-br from-red-50 to-red-100 border-red-400"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg font-bold text-muted-foreground uppercase tracking-wide">
                      💰 Para Üstü
                    </span>
                    <span
                      className={`text-6xl font-black drop-shadow-lg ${
                        change >= 0 ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {formatCurrency(Math.max(0, change))}
                    </span>
                  </div>
                  {change < 0 && (
                    <p className="text-xs text-red-600 mt-2">
                      Yetersiz tutar! Eksik: {formatCurrency(Math.abs(change))}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Card Payment Flow */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              {/* Selected Method Badge */}
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <CreditCard className="h-5 w-5" />
                <span className="font-semibold">Kart Ödeme</span>
                <button
                  onClick={() => setPaymentMethod(null)}
                  className="ml-2 text-xs text-muted-foreground hover:text-foreground underline"
                >
                  Değiştir
                </button>
              </div>

              <div className="p-6 rounded-lg bg-blue-50 border-2 border-blue-200 text-center">
                <p className="text-sm text-blue-700 mb-2">Toplam Tutar</p>
                <p className="text-4xl font-black text-blue-900">
                  {formatCurrency(totalAmount)}
                </p>
                <p className="text-xs text-blue-600 mt-3">
                  Müşteriden kart ile ödeme alınacak
                </p>
              </div>
            </div>
          )}

          {/* Notes Section (Collapsible) */}
          {paymentMethod && (
            <div>
              <button
                onClick={() => setShowNotesInput(!showNotesInput)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showNotesInput ? "rotate-180" : ""
                  }`}
                />
                <span>Notlar (Opsiyonel)</span>
              </button>
              {showNotesInput && (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Satış notu ekleyin..."
                  rows={3}
                  className="mt-2"
                />
              )}
            </div>
          )}
        </div>

        {/* Footer - Action Buttons */}
        {paymentMethod && (
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading || isSubmitting}
              className="flex-1 h-14 text-base"
            >
              İptal (Esc)
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!canSubmit || isLoading || isSubmitting}
              className="flex-1 h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading || isSubmitting ? "İşleniyor..." : "Satışı Tamamla (Enter)"}
            </Button>
          </div>
        )}

        {/* Keyboard Shortcuts Guide */}
        {!paymentMethod && (
          <div className="text-center text-xs text-muted-foreground border-t pt-3">
            Klavye Kısayolları:{" "}
            <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> Nakit,{" "}
            <kbd className="px-2 py-1 bg-muted rounded">C</kbd> Kart
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
