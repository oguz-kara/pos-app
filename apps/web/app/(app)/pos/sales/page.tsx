"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/modules/pos/utils";
import { TR } from "@/modules/pos/constants";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Sale, useSalesQuery } from "@/lib/graphql/generated";

/**
 * Sales History Page
 *
 * Lists all sales with filters and summary stats.
 */
export default function SalesPage() {
  const { data } = useSalesQuery();

  const sales = data?.sales || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{TR.saleHistory}</h1>
        <p className="text-muted-foreground">{TR.saleHistoryDescription}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{TR.recentSales}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{TR.receiptNo}</TableHead>
                <TableHead>{TR.date}</TableHead>
                <TableHead>{TR.totalAmount}</TableHead>
                <TableHead>{TR.paymentMethod}</TableHead>
                <TableHead>{TR.profit}</TableHead>
                <TableHead className="text-right">{TR.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    {TR.noData}
                  </TableCell>
                </TableRow>
              ) : (
                sales.map((sale: Sale) => {
                  const profit =
                    parseFloat(sale.totalAmount ?? "0") -
                    parseFloat(sale.totalCost ?? "0");
                  return (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">
                        {sale.receiptNo}
                      </TableCell>
                      <TableCell>
                        {formatDate(new Date(sale.createdAt))}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(parseFloat(sale.totalAmount ?? "0"))}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sale.paymentMethod === "cash"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {sale.paymentMethod === "cash" ? TR.cash : TR.card}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={
                          profit >= 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {formatCurrency(profit)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/pos/sales/${sale.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
