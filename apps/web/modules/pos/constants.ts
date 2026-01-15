/**
 * POS Module Constants
 */

export const PAYMENT_METHODS = {
  CASH: "cash",
  CARD: "card",
} as const;

export type PaymentMethod =
  (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: "Nakit",
  card: "Kart",
};

// Stock threshold for low stock warning
export const LOW_STOCK_THRESHOLD = 10;

// Default selling price markup (30% above cost)
export const DEFAULT_MARKUP_PERCENTAGE = 30;

// Receipt number format: YYYY-NNNNNN (e.g., 2025-000042)
export const RECEIPT_NUMBER_FORMAT = /^\d{4}-\d{6}$/;

// Turkish translations
export const TR = {
  currenctStock: "Mevcut stok",
  status: "Durum",
  stockManagement: "Stok yönetimi",
  addStock: "Stok ekle",
  stockLevels: "Stok seviyeleri",
  noProducts: "Urun bulunamadi",

  // Sales
  saleDetails: "Satış Detayları",
  saleDetailsDescription: "Satış detaylarını görüntüleyin",
  items: "Ürünler",
  unitPrice: "Birim Fiyatı",

  // Summary
  totalRevenue: "Toplam Ciro",
  totalProfit: "Toplam Kar",
  totalCost: "Toplam Maliyet",
  salesCount: "Satış Sayısı",
  averageSale: "Ortalama Satış",
  margin: "Kar Marjı",
  costOfGoods: "Ürün Maliyeti",
  // Categories
  categories: "Kategoriler",
  category: "Kategori",
  addCategory: "Kategori Ekle",
  editCategory: "Kategori Düzenle",

  // Products
  products: "Ürünler",
  product: "Ürün",
  addProduct: "Ürün Ekle",
  editProduct: "Ürün Düzenle",
  productName: "Ürün Adı",
  barcode: "Barkod",
  sellingPrice: "Satış Fiyatı",
  active: "Aktif",
  inactive: "Pasif",

  // Stock
  stock: "Stok",
  stockEntry: "Stok Girişi",
  totalStock: "Toplam Stok",
  lowStock: "Düşük Stok",
  outOfStock: "Stok Yok",
  quantity: "Miktar",
  costPrice: "Alış Fiyatı",
  averageCost: "Ortalama Maliyet",
  supplier: "Tedarikçi",
  purchasedAt: "Alım Tarihi",
  remaining: "Kalan",

  // Sales
  sales: "Satışlar",
  sale: "Satış",
  recentSales: "Son Satışlar",
  saleHistoryDescription: "Geçmiş satışları görüntüleyin",
  quickSale: "Hızlı Satış",
  quickSaleDescription:
    "Ürün arayın ve sepete ekleyin. Enter tuşu ile ürün ekleyin, F2 ile ödemeye geçin.",
  newSale: "Yeni Satış",
  saleHistory: "Satış Geçmişi",
  receiptNo: "Fiş No",
  paymentMethod: "Ödeme Yöntemi",
  cash: "Nakit",
  card: "Kart",

  // Cart
  cart: "Sepet",
  addToCart: "Sepete Ekle",
  removeFromCart: "Sepetten Çıkar",
  clearCart: "Sepeti Temizle",
  checkout: "Ödeme",

  // Amounts
  totalAmount: "Toplam Tutar",
  subtotal: "Ara Toplam",
  profit: "Kar",
  revenue: "Ciro",

  // Reports
  reports: "Raporlar",
  daily: "Günlük",
  weekly: "Haftalık",
  monthly: "Aylık",
  dailyReport: "Günlük Rapor",
  weeklyReport: "Haftalık Rapor",
  monthlyReport: "Aylık Rapor",
  dailySummary: "Günlük Özet",
  revenueTrend: "Ciro Trendi",
  revenueVsCost: "Ciro vs Maliyet",

  // Common
  search: "Ara",
  add: "Ekle",
  edit: "Düzenle",
  delete: "Sil",
  save: "Kaydet",
  cancel: "İptal",
  confirm: "Onayla",
  actions: "İşlemler",
  name: "İsim",
  notes: "Notlar",
  date: "Tarih",
  time: "Saat",
  today: "Bugün",
  thisWeek: "Bu Hafta",
  thisMonth: "Bu Ay",
  loading: "Yükleniyor...",
  noData: "Veri bulunamadı",
  success: "Başarılı",
  error: "Hata",
};
