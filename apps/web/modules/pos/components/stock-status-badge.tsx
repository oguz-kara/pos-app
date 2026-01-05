"use client";

import { Badge } from "@/components/ui/badge";
import { getStockStatus, getStockStatusLabel } from "../utils";

export function StockStatusBadge({
  stock,
  threshold = 10,
}: {
  stock: number;
  threshold?: number;
}) {
  const variant = getStockStatus(stock, threshold);
  const label = getStockStatusLabel(stock, threshold);

  return (
    <Badge variant={variant}>
      {label} ({stock})
    </Badge>
  );
}
