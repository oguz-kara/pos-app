"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DailySummary } from "@/modules/pos/components/daily-summary";
import { ReportCharts } from "@/modules/pos/components/report-charts";
import { TR } from "@/modules/pos/constants";

/**
 * Reports Page
 *
 * Daily/Weekly/Monthly revenue and profit reports with charts.
 */
export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("daily");

  // TODO: Fetch sales summary from GraphQL based on selected period
  const summary = {
    totalRevenue: 0,
    totalCost: 0,
    totalProfit: 0,
    salesCount: 0,
  };

  const chartData: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{TR.REPORTS}</h1>
        <p className="text-muted-foreground">
          Satış ve kâr raporlarını görüntüleyin
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="daily">{TR.DAILY}</TabsTrigger>
          <TabsTrigger value="weekly">{TR.WEEKLY}</TabsTrigger>
          <TabsTrigger value="monthly">{TR.MONTHLY}</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <DailySummary summary={summary} />
          <ReportCharts data={chartData} />
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <DailySummary summary={summary} />
          <ReportCharts data={chartData} />
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <DailySummary summary={summary} />
          <ReportCharts data={chartData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
