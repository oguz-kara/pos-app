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

/**
 * Stock Overview Page
 *
 * Shows stock levels for all products with low stock warnings.
 */
export default function StockPage() {
  // TODO: Fetch products with stock info from GraphQL
  const productsWithStock: any[] = [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{TR.STOCK_MANAGEMENT}</h1>
          <p className="text-muted-foreground">
            Tüm ürünlerin stok durumunu görüntüleyin
          </p>
        </div>
        <Link href="/pos/stock/entry">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {TR.ADD_STOCK}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {TR.STOCK_LEVELS}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{TR.PRODUCT_NAME}</TableHead>
                <TableHead>{TR.CURRENT_STOCK}</TableHead>
                <TableHead>{TR.AVERAGE_COST}</TableHead>
                <TableHead>{TR.SELLING_PRICE}</TableHead>
                <TableHead>{TR.STATUS}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productsWithStock.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    {TR.NO_PRODUCTS}
                  </TableCell>
                </TableRow>
              ) : (
                productsWithStock.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{formatCurrency(parseFloat(item.averageCost || "0"))}</TableCell>
                    <TableCell>{formatCurrency(parseFloat(item.sellingPrice))}</TableCell>
                    <TableCell>
                      <StockStatusBadge stock={item.stock} />
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
