/**
 * Create Organization and Seed POS Data
 *
 * This script will:
 * 1. Create a default organization if it doesn't exist
 * 2. Run the POS seed data
 */

import { db } from "../index";
import { organizations } from "../schema/auth";
import { categories, products, stockLots, sales, saleItems } from "../schema/pos";
import { eq } from "drizzle-orm";

async function createOrgAndSeed() {
  console.log("🚀 Starting organization creation and seeding...\n");

  try {
    // 1. Check if organization exists
    console.log("📋 Checking for existing organization...");
    let org = await db.query.organizations.findFirst({
      where: eq(organizations.slug, "my-shop"),
    });

    if (!org) {
      console.log("Creating new organization...");
      const [newOrg] = await db
        .insert(organizations)
        .values({
          name: "My Shop",
          slug: "my-shop",
        })
        .returning();
      org = newOrg;
      console.log(`✅ Organization created: ${org.name} (${org.id})\n`);
    } else {
      console.log(`✅ Organization found: ${org.name} (${org.id})\n`);
    }

    const orgId = org.id;

    // 2. Create Categories
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

    console.log(`✅ Created ${insertedCategories.length} categories\n`);

    // Get category IDs by name for easy reference
    const catMap = new Map(insertedCategories.map((c) => [c.name, c.id]));

    // 3. Create Products
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

    console.log(`✅ Created ${insertedProducts.length} products\n`);

    // 4. Create Stock Lots
    console.log("📊 Creating stock lots...");
    const stockLotsData = insertedProducts.flatMap((product) => {
      const lotCount = Math.floor(Math.random() * 2) + 1;
      const basePrice = parseFloat(product.sellingPrice) * 0.6;

      return Array.from({ length: lotCount }, (_, i) => {
        const daysAgo = lotCount === 1 ? 30 : (lotCount - i) * 20;
        const purchasedAt = new Date();
        purchasedAt.setDate(purchasedAt.getDate() - daysAgo);

        const priceVariation = (Math.random() * 0.2 - 0.1) + 1;
        const costPrice = (basePrice * priceVariation).toFixed(2);

        const quantity = Math.floor(Math.random() * 50) + 20;
        const remaining = Math.floor(quantity * (0.5 + Math.random() * 0.5));

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

    console.log(`✅ Created ${insertedStockLots.length} stock lots\n`);

    console.log("🎉 Seeding completed successfully!\n");
    console.log("📈 Summary:");
    console.log(`   Organization: ${org.name} (${org.id})`);
    console.log(`   Categories: ${insertedCategories.length}`);
    console.log(`   Products: ${insertedProducts.length}`);
    console.log(`   Stock Lots: ${insertedStockLots.length}`);
    console.log("\n✨ Your POS system is now ready to use!");
    console.log(`Visit: http://localhost:3000/pos`);

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }

  process.exit(0);
}

createOrgAndSeed();
