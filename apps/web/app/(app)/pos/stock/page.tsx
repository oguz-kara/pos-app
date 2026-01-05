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
import { StockStatusBadge } from "@/modules/pos/components/stock-status-badge";
import { formatCurrency } from "@/modules/pos/utils";
import { TR } from "@/modules/pos/constants";
import { Plus, Package } from "lucide-react";
import Link from "next/link";
import { ProductWithStock } from "@/lib/graphql/generated";

/**
 * Stock Overview Page
 *
 * Shows stock levels for all products with low stock warnings.
 */
export default function StockPage() {
  // TODO: Fetch products with stock info from GraphQL
  const productsWithStock: ProductWithStock[] = [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {TR.stockManagement}
          </h1>
          <p className="text-muted-foreground">
            Tüm ürünlerin stok durumunu görüntüleyin
          </p>
        </div>
        <Link href="/pos/stock/entry">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {TR.addStock}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {TR.stockLevels}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{TR.productName}</TableHead>
                <TableHead>{TR.currenctStock}</TableHead>
                <TableHead>{TR.averageCost}</TableHead>
                <TableHead>{TR.sellingPrice}</TableHead>
                <TableHead>{TR.status}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productsWithStock.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    {TR.noProducts}
                  </TableCell>
                </TableRow>
              ) : (
                productsWithStock.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.totalStock ?? 0}</TableCell>
                    <TableCell>
                      {formatCurrency(item.averageCost ?? 0)}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(parseFloat(item.sellingPrice ?? "0"))}
                    </TableCell>
                    <TableCell>
                      <StockStatusBadge stock={item.totalStock ?? 0} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
