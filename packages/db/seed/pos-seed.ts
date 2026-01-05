/**
 * POS Seed Data
 *
 * Realistic Turkish hardware and flower shop products for testing.
 * Run this script to populate the database with sample data.
 *
 * Usage:
 *   npx tsx packages/db/seed/pos-seed.ts
 */

import { db } from "../index";
import { categories, products, stockLots, sales, saleItems } from "../schema/pos";

async function seed() {
  console.log("🌱 Starting POS seed...");

  // Get organization ID from environment or use first org
  const orgId = process.env.ORGANIZATION_ID;

  if (!orgId) {
    console.error("❌ ORGANIZATION_ID environment variable not set");
    console.log("Please set ORGANIZATION_ID to your organization UUID");
    process.exit(1);
  }

  try {
    // 1. Create Categories
    console.log("📦 Creating categories...");
    const categoriesData = [
      { name: "Hırdavat", organizationId: orgId },
      { name: "Plastik Ürünler", organizationId: orgId },
      { name: "Elektronik", organizationId: orgId },
      { name: "Musluk Parçaları", organizationId: orgId },
      { name: "Çiçekler", organizationId: orgId },
      { name: "Saksı ve Toprak", organizationId: orgId },
      { name: "Bahçe Aletleri", organizationId: orgId },
      { name: "Yapıştırıcılar", organizationId: orgId },
    ];

    const insertedCategories = await db
      .insert(categories)
      .values(categoriesData)
      .returning();

    console.log(`✅ Created ${insertedCategories.length} categories`);

    // Get category IDs by name for easy reference
    const catMap = new Map(insertedCategories.map((c) => [c.name, c.id]));

    // 2. Create Products
    console.log("🛍️  Creating products...");
    const productsData = [
      // Hırdavat
      {
        name: "Vida Seti (100'lük)",
        barcode: "8690001001",
        categoryId: catMap.get("Hırdavat"),
        sellingPrice: "45.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Somun Takımı",
        barcode: "8690001002",
        categoryId: catMap.get("Hırdavat"),
        sellingPrice: "35.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Civata M8",
        barcode: "8690001003",
        categoryId: catMap.get("Hırdavat"),
        sellingPrice: "2.50",
        organizationId: orgId,
        isActive: true,
      },
      // Plastik Ürünler
      {
        name: "Plastik Kova 10L",
        barcode: "8690002001",
        categoryId: catMap.get("Plastik Ürünler"),
        sellingPrice: "65.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Plastik Leğen Büyük",
        barcode: "8690002002",
        categoryId: catMap.get("Plastik Ürünler"),
        sellingPrice: "85.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Su Bidonu 5L",
        barcode: "8690002003",
        categoryId: catMap.get("Plastik Ürünler"),
        sellingPrice: "55.00",
        organizationId: orgId,
        isActive: true,
      },
      // Elektronik
      {
        name: "Samsung USB Kablo",
        barcode: "8690003001",
        categoryId: catMap.get("Elektronik"),
        sellingPrice: "75.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "iPhone Şarj Kablosu",
        barcode: "8690003002",
        categoryId: catMap.get("Elektronik"),
        sellingPrice: "120.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Pil AA (4'lü)",
        barcode: "8690003003",
        categoryId: catMap.get("Elektronik"),
        sellingPrice: "45.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Ampul LED 9W",
        barcode: "8690003004",
        categoryId: catMap.get("Elektronik"),
        sellingPrice: "35.00",
        organizationId: orgId,
        isActive: true,
      },
      // Musluk Parçaları
      {
        name: "Musluk Contası",
        barcode: "8690004001",
        categoryId: catMap.get("Musluk Parçaları"),
        sellingPrice: "8.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Lavabo Sifonu",
        barcode: "8690004002",
        categoryId: catMap.get("Musluk Parçaları"),
        sellingPrice: "125.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Su Tesisatı Bağlantı",
        barcode: "8690004003",
        categoryId: catMap.get("Musluk Parçaları"),
        sellingPrice: "15.00",
        organizationId: orgId,
        isActive: true,
      },
      // Çiçekler
      {
        name: "Gül Demeti (12 Adet)",
        barcode: null,
        categoryId: catMap.get("Çiçekler"),
        sellingPrice: "350.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Papatya Buketi",
        barcode: null,
        categoryId: catMap.get("Çiçekler"),
        sellingPrice: "150.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Orkide Saksı",
        barcode: null,
        categoryId: catMap.get("Çiçekler"),
        sellingPrice: "280.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Kaktüs Mini",
        barcode: null,
        categoryId: catMap.get("Çiçekler"),
        sellingPrice: "75.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Sukulent Aranjman",
        barcode: null,
        categoryId: catMap.get("Çiçekler"),
        sellingPrice: "180.00",
        organizationId: orgId,
        isActive: true,
      },
      // Saksı ve Toprak
      {
        name: "Saksı Toprağı 5kg",
        barcode: "8690006001",
        categoryId: catMap.get("Saksı ve Toprak"),
        sellingPrice: "65.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Terracotta Saksı Orta",
        barcode: "8690006002",
        categoryId: catMap.get("Saksı ve Toprak"),
        sellingPrice: "95.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Plastik Saksı Set (3'lü)",
        barcode: "8690006003",
        categoryId: catMap.get("Saksı ve Toprak"),
        sellingPrice: "120.00",
        organizationId: orgId,
        isActive: true,
      },
      // Bahçe Aletleri
      {
        name: "Bahçe Makası",
        barcode: "8690007001",
        categoryId: catMap.get("Bahçe Aletleri"),
        sellingPrice: "185.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Sulama Hortumu 20m",
        barcode: "8690007002",
        categoryId: catMap.get("Bahçe Aletleri"),
        sellingPrice: "320.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Bahçe Eldiveni Çift",
        barcode: "8690007003",
        categoryId: catMap.get("Bahçe Aletleri"),
        sellingPrice: "45.00",
        organizationId: orgId,
        isActive: true,
      },
      // Yapıştırıcılar
      {
        name: "Japon Yapıştırıcı",
        barcode: "8690008001",
        categoryId: catMap.get("Yapıştırıcılar"),
        sellingPrice: "28.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Silikon Tabancası",
        barcode: "8690008002",
        categoryId: catMap.get("Yapıştırıcılar"),
        sellingPrice: "95.00",
        organizationId: orgId,
        isActive: true,
      },
      {
        name: "Silikon Kartuş",
        barcode: "8690008003",
        categoryId: catMap.get("Yapıştırıcılar"),
        sellingPrice: "35.00",
        organizationId: orgId,
        isActive: true,
      },
    ];

    const insertedProducts = await db
      .insert(products)
      .values(productsData)
      .returning();

    console.log(`✅ Created ${insertedProducts.length} products`);

    // 3. Create Stock Lots
    console.log("📊 Creating stock lots...");
    const stockLotsData = insertedProducts.flatMap((product) => {
      // Generate 1-3 stock lots per product with different purchase dates and prices
      const lotCount = Math.floor(Math.random() * 2) + 1; // 1-2 lots
      const basePrice = parseFloat(product.sellingPrice) * 0.6; // 60% cost ratio

      return Array.from({ length: lotCount }, (_, i) => {
        const daysAgo = lotCount === 1 ? 30 : (lotCount - i) * 20;
        const purchasedAt = new Date();
        purchasedAt.setDate(purchasedAt.getDate() - daysAgo);

        const priceVariation = (Math.random() * 0.2 - 0.1) + 1; // ±10%
        const costPrice = (basePrice * priceVariation).toFixed(2);

        const quantity = Math.floor(Math.random() * 50) + 20; // 20-70 units
        const remaining = Math.floor(quantity * (0.5 + Math.random() * 0.5)); // 50-100% remaining

        return {
          productId: product.id,
          organizationId: orgId,
          quantity,
          remaining,
          costPrice,
          supplier: i % 2 === 0 ? "Toptan A.Ş." : "Çarşı Tedarik",
          notes: i === 0 ? "İlk stok girişi" : "Yeni parti",
          purchasedAt,
        };
      });
    });

    const insertedStockLots = await db
      .insert(stockLots)
      .values(stockLotsData)
      .returning();

    console.log(`✅ Created ${insertedStockLots.length} stock lots`);

    // 4. Create Sample Sales
    console.log("💰 Creating sample sales...");
    const now = new Date();
    const salesData = [];
    const saleItemsData = [];

    // Create 15-20 sales over the last 7 days
    for (let i = 0; i < 18; i++) {
      const daysAgo = Math.floor(Math.random() * 7);
      const saleDate = new Date(now);
      saleDate.setDate(saleDate.getDate() - daysAgo);
      saleDate.setHours(9 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60));

      const receiptNo = `2025-${String(i + 1).padStart(6, "0")}`;
      const paymentMethod = Math.random() > 0.4 ? "cash" : "card";

      // Select 1-4 random products for this sale
      const itemCount = Math.floor(Math.random() * 3) + 1;
      const selectedProducts = insertedProducts
        .sort(() => Math.random() - 0.5)
        .slice(0, itemCount);

      let totalAmount = 0;
      let totalCost = 0;
      const tempSaleId = `temp-${i}`;

      selectedProducts.forEach((product) => {
        const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 units
        const unitPrice = parseFloat(product.sellingPrice);
        const unitCost = unitPrice * 0.6; // Simplified cost
        const subtotal = unitPrice * quantity;

        totalAmount += subtotal;
        totalCost += unitCost * quantity;

        saleItemsData.push({
          saleId: tempSaleId, // Will be replaced with actual ID
          productId: product.id,
          quantity,
          unitPrice: unitPrice.toFixed(2),
          unitCost: unitCost.toFixed(2),
          subtotal: subtotal.toFixed(2),
          createdAt: saleDate,
        });
      });

      salesData.push({
        organizationId: orgId,
        receiptNo,
        totalAmount: totalAmount.toFixed(2),
        totalCost: totalCost.toFixed(2),
        paymentMethod: paymentMethod as "cash" | "card",
        notes: i % 5 === 0 ? "Müşteri iadesi var" : null,
        createdAt: saleDate,
      });
    }

    const insertedSales = await db.insert(sales).values(salesData).returning();
    console.log(`✅ Created ${insertedSales.length} sales`);

    // Update sale items with actual sale IDs
    const finalSaleItems = saleItemsData.map((item, index) => {
      const saleIndex = salesData.findIndex((s) => {
        // Find which sale this item belongs to by checking if indices align
        const itemsPerSale = Math.floor(saleItemsData.length / salesData.length);
        return Math.floor(index / itemsPerSale) === salesData.indexOf(s);
      });

      return {
        ...item,
        saleId: insertedSales[Math.min(saleIndex, insertedSales.length - 1)].id,
      };
    });

    await db.insert(saleItems).values(finalSaleItems);
    console.log(`✅ Created ${finalSaleItems.length} sale items`);

    console.log("\n🎉 POS seed completed successfully!");
    console.log("\n📈 Summary:");
    console.log(`   Categories: ${insertedCategories.length}`);
    console.log(`   Products: ${insertedProducts.length}`);
    console.log(`   Stock Lots: ${insertedStockLots.length}`);
    console.log(`   Sales: ${insertedSales.length}`);
    console.log(`   Sale Items: ${finalSaleItems.length}`);
    console.log("\n✨ Your POS system is now ready to use!");

  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  }
}

// Run seed
seed()
  .then(() => {
    console.log("\n✅ Seed completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  });
