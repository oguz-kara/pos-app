"use client";

import { useSalesSummaryQuery } from "@/lib/graphql/generated";
import { DailySummary } from "@/modules/pos/components/daily-summary";
import { TR } from "@/modules/pos/constants";

export default function Page() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { data: summaryData } = useSalesSummaryQuery({
    startDate: today,
    endDate: tomorrow,
  });

  const todaySummary = {
    totalRevenue: summaryData?.salesSummary?.totalRevenue || 0,
    totalCost: summaryData?.salesSummary?.totalCost || 0,
    totalProfit: summaryData?.salesSummary?.totalProfit || 0,
    salesCount: summaryData?.salesSummary?.salesCount || 0,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{TR.quickSale}</h1>
        <p className="text-muted-foreground">{TR.quickSaleDescription}</p>
      </div>

      {/* Daily Summary */}
      <DailySummary summary={todaySummary} />
    </div>
  );
}
