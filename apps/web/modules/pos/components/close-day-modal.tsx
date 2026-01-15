'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/modules/pos/utils'
import {
  AlertCircle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { toast } from 'sonner'

interface CloseDayModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expectedCashSales: number
  expectedCardSales: number
  totalRefunds: number
  onSubmit: (cashCounted: number, notes: string) => Promise<void>
}

export function CloseDayModal({
  open,
  onOpenChange,
  expectedCashSales = 0,
  expectedCardSales = 0,
  totalRefunds = 0,
  onSubmit,
}: CloseDayModalProps) {
  const [step, setStep] = useState(1)
  const [cashCounted, setCashCounted] = useState<string>('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      setStep(1)
      setCashCounted('')
      setNotes('')
      setIsSubmitting(false)
    }
  }, [open])

  const cashCountedNum =
    !cashCounted || cashCounted === '' ? 0 : parseFloat(cashCounted) || 0
  const safeGrossCashSales = Number(expectedCashSales) || 0
  const safeRefunds = Number(totalRefunds) || 0
  const safeExpectedCash = safeGrossCashSales - safeRefunds // Net expected cash after refunds
  const safeExpectedCard = Number(expectedCardSales) || 0
  const variance = cashCountedNum - safeExpectedCash
  const totalSales = safeGrossCashSales + safeExpectedCard // Total gross sales
  const variancePercentage =
    safeExpectedCash > 0 ? Math.abs((variance / safeExpectedCash) * 100) : 0

  const handleNext = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      if (!cashCounted || cashCountedNum < 0) {
        toast.error('Lütfen geçerli bir tutar girin')
        return
      }
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      await onSubmit(cashCountedNum, notes)
      toast.success('Gün sonu raporu oluşturuldu!')
      onOpenChange(false)
    } catch (error) {
      console.error('Close day error:', error)
      toast.error('Gün sonu raporu oluşturulamadı')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getVarianceColor = () => {
    if (Math.abs(variance) < 1) return 'text-green-600'
    if (variancePercentage > 5) return 'text-red-600'
    return 'text-orange-600'
  }

  const getVarianceIcon = () => {
    if (Math.abs(variance) < 1)
      return <CheckCircle className="h-10 w-10 text-green-600" />
    if (variance > 0)
      return <TrendingUp className="h-10 w-10 text-orange-600" />
    return <TrendingDown className="h-10 w-10 text-red-600" />
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <span>Gün Sonu Raporu (Z-Raporu)</span>
            <Badge variant="outline">{step}/3</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 overflow-y-auto flex-1 pr-2">
          {step === 1 && (
            <div className="space-y-6">
              {/* Cash Sales Breakdown */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-muted-foreground mb-1">
                    Brüt Nakit Satışlar
                  </p>
                  <div className="text-xl font-bold text-green-700">
                    {formatCurrency(safeGrossCashSales)}
                  </div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-xs text-muted-foreground mb-1">
                    İadeler
                  </p>
                  <div className="text-xl font-bold text-orange-600">
                    -{formatCurrency(safeRefunds)}
                  </div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-muted-foreground mb-1">
                    Net Beklenen Nakit
                  </p>
                  <div className="text-xl font-bold text-blue-700">
                    {formatCurrency(safeExpectedCash)}
                  </div>
                </div>
              </div>

              {/* Card Sales */}
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-xs text-muted-foreground mb-2">
                  Kredi Kartı Satışlar
                </p>
                <div className="text-2xl font-bold text-purple-700">
                  {formatCurrency(safeExpectedCard)}
                </div>
              </div>

              {/* Total Sales */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Toplam Brüt Satış
                </p>
                <div className="text-4xl font-bold text-blue-600">
                  {formatCurrency(totalSales)}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  (Bugün yapılan tüm satışlar)
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Adım 1: Sistem Özeti</p>
                    <p>
                      Kasanızda{' '}
                      <strong>{formatCurrency(safeExpectedCash)}</strong> kadar
                      nakit olmalıdır (brüt nakit satışlar - iadeler). Fiziksel parayı saymaya hazır olduğunuzda
                      İleri&apos;ye tıklayın.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cash-counted" className="text-lg">
                  Kasada Saydığınız Nakit Tutarı
                </Label>
                <Input
                  id="cash-counted"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={cashCounted}
                  onChange={(e) => setCashCounted(e.target.value)}
                  className="text-2xl font-semibold h-14"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Beklenen</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(safeExpectedCash)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sayılan</p>
                  <p className="text-lg font-semibold">
                    {cashCounted ? formatCurrency(cashCountedNum) : '—'}
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="text-sm text-orange-900">
                    <p className="font-semibold mb-1">Adım 2: Nakit Sayımı</p>
                    <p>
                      Kasadaki tüm banknotları ve bozuk paraları dikkatlice
                      sayın ve toplam tutarı girin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {getVarianceIcon()}
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  Fark (Variance)
                </p>
                <div className={`text-3xl font-bold ${getVarianceColor()}`}>
                  {variance >= 0 ? '+' : ''}
                  {formatCurrency(Math.abs(variance))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {variance > 1
                    ? 'Fazla nakit (Fazlalık)'
                    : variance < -1
                      ? 'Eksik nakit (Açık)'
                      : 'Dengeli (Mükemmel!)'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Beklenen Nakit</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(safeExpectedCash)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sayılan Nakit</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(cashCountedNum)}
                  </p>
                </div>
              </div>

              {/* Card and Total Sales Summary */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-600 mb-1">Kart Satışlar</p>
                  <p className="text-lg font-bold text-blue-700">
                    {formatCurrency(safeExpectedCard)}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    (Bankada)
                  </p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-green-600 mb-1">Toplam Satış</p>
                  <p className="text-lg font-bold text-green-700">
                    {formatCurrency(totalSales)}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    (Nakit + Kart)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm">Not (Opsiyonel)</Label>
                <Textarea
                  id="notes"
                  placeholder="Fark varsa açıklama ekleyin..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="text-sm"
                />
              </div>

              {Math.abs(variance) > 1 && (
                <div
                  className={
                    variancePercentage > 5
                      ? 'bg-red-50 border-red-200 text-red-900 border rounded-lg p-4'
                      : 'bg-orange-50 border-orange-200 text-orange-900 border rounded-lg p-4'
                  }
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      className={`h-5 w-5 ${
                        variancePercentage > 5
                          ? 'text-red-600'
                          : 'text-orange-600'
                      } mt-0.5`}
                    />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">
                        {variancePercentage > 5
                          ? 'Yüksek Fark!'
                          : 'Fark Tespit Edildi'}
                      </p>
                      <p>
                        Lütfen sayımınızı kontrol edin ve not alanına açıklama
                        ekleyin.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex justify-between mt-4 pt-4 border-t shrink-0">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1 || isSubmitting}
            >
              Geri
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                İptal
              </Button>
              {step < 3 ? (
                <Button onClick={handleNext}>İleri</Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Kaydediliyor...' : 'Günü Kapat'}
                </Button>
              )}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
