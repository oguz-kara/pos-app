import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  UseMutationOptions,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/react-query'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      ...{
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      },
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0]

      throw new Error(message)
    }

    return json.data
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: any; output: any }
  JSON: { input: any; output: any }
}

export type AddStockBulkInput = {
  invoiceRef?: InputMaybe<Scalars['String']['input']>
  items: Array<AddStockLotInput>
}

export type AddStockLotInput = {
  costPrice: Scalars['Float']['input']
  notes?: InputMaybe<Scalars['String']['input']>
  productId: Scalars['String']['input']
  purchasedAt?: InputMaybe<Scalars['DateTime']['input']>
  quantity: Scalars['Int']['input']
  supplierId?: InputMaybe<Scalars['String']['input']>
}

export type AdminOrganization = {
  __typename?: 'AdminOrganization'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  creditBalance?: Maybe<Scalars['Int']['output']>
  id?: Maybe<Scalars['ID']['output']>
  memberCount?: Maybe<Scalars['Int']['output']>
  name?: Maybe<Scalars['String']['output']>
  planId?: Maybe<Scalars['String']['output']>
  slug?: Maybe<Scalars['String']['output']>
  subscriptionStatus?: Maybe<Scalars['String']['output']>
}

export type AdminUser = {
  __typename?: 'AdminUser'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  email?: Maybe<Scalars['String']['output']>
  emailVerified?: Maybe<Scalars['Boolean']['output']>
  id?: Maybe<Scalars['ID']['output']>
  name?: Maybe<Scalars['String']['output']>
  /** Number of organizations this user belongs to */
  organizationCount?: Maybe<Scalars['Int']['output']>
}

export type AttachProductImageInput = {
  fileId: Scalars['String']['input']
  isPrimary?: InputMaybe<Scalars['Boolean']['input']>
  productId: Scalars['String']['input']
}

export type BaseError = {
  __typename?: 'BaseError'
  code?: Maybe<Scalars['String']['output']>
  message?: Maybe<Scalars['String']['output']>
}

export type BillingPlan = {
  __typename?: 'BillingPlan'
  /** Monthly credit grant for hybrid billing */
  creditsPerMonth?: Maybe<Scalars['Int']['output']>
  description?: Maybe<Scalars['String']['output']>
  features?: Maybe<Array<Scalars['String']['output']>>
  id?: Maybe<Scalars['ID']['output']>
  name?: Maybe<Scalars['String']['output']>
  /** Monthly price in dollars */
  priceMonthly?: Maybe<Scalars['Int']['output']>
  /** Yearly price in dollars */
  priceYearly?: Maybe<Scalars['Int']['output']>
}

export type Category = {
  __typename?: 'Category'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['ID']['output']>
  name?: Maybe<Scalars['String']['output']>
  organizationId?: Maybe<Scalars['String']['output']>
}

export type CheckoutResult = {
  __typename?: 'CheckoutResult'
  /** Stripe checkout session ID */
  sessionId?: Maybe<Scalars['String']['output']>
  /** Stripe checkout URL to redirect user to */
  url?: Maybe<Scalars['String']['output']>
}

export type ConfirmUploadInput = {
  fileId: Scalars['String']['input']
  metadata?: InputMaybe<Scalars['JSON']['input']>
  size: Scalars['Int']['input']
}

export type CreateCategoryInput = {
  name: Scalars['String']['input']
}

export type CreateProductInput = {
  barcode?: InputMaybe<Scalars['String']['input']>
  categoryId?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  searchName?: InputMaybe<Scalars['String']['input']>
  sellingPrice: Scalars['Float']['input']
}

export type CreateSaleInput = {
  items: Array<CreateSaleItemInput>
  notes?: InputMaybe<Scalars['String']['input']>
  paymentMethod: Scalars['String']['input']
}

export type CreateSaleItemInput = {
  productId: Scalars['String']['input']
  quantity: Scalars['Int']['input']
  unitPrice: Scalars['Float']['input']
}

export type CreateSupplierInput = {
  address?: InputMaybe<Scalars['String']['input']>
  contactPerson?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  notes?: InputMaybe<Scalars['String']['input']>
  phone?: InputMaybe<Scalars['String']['input']>
}

export type CreditAdjustmentResult = {
  __typename?: 'CreditAdjustmentResult'
  adjustmentAmount?: Maybe<Scalars['Int']['output']>
  newBalance?: Maybe<Scalars['Int']['output']>
  organizationId?: Maybe<Scalars['ID']['output']>
  previousBalance?: Maybe<Scalars['Int']['output']>
  reason?: Maybe<Scalars['String']['output']>
}

export type CreditBalance = {
  __typename?: 'CreditBalance'
  /** Current credit balance */
  balance?: Maybe<Scalars['Int']['output']>
  /** Whether subscription is scheduled to cancel at period end */
  cancelAtPeriodEnd?: Maybe<Scalars['Boolean']['output']>
  /** End date of current billing period */
  currentPeriodEnd?: Maybe<Scalars['DateTime']['output']>
  /** Current subscription plan ID */
  planId?: Maybe<Scalars['String']['output']>
  /** Date when canceled subscription will actually end */
  subscriptionEndDate?: Maybe<Scalars['DateTime']['output']>
  /** Subscription status (active, canceled, etc.) */
  subscriptionStatus?: Maybe<Scalars['String']['output']>
}

export type CreditPack = {
  __typename?: 'CreditPack'
  credits?: Maybe<Scalars['Int']['output']>
  id?: Maybe<Scalars['ID']['output']>
  name?: Maybe<Scalars['String']['output']>
  /** Price in dollars */
  price?: Maybe<Scalars['Int']['output']>
}

export type CreditTransaction = {
  __typename?: 'CreditTransaction'
  /** Credit amount (positive for additions, negative for usage) */
  amount?: Maybe<Scalars['Int']['output']>
  /** Credit balance after this transaction */
  balanceAfter?: Maybe<Scalars['Int']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  metadata?: Maybe<Scalars['JSON']['output']>
  /** Transaction type: purchase, usage, refund, adjustment, subscription_grant */
  type?: Maybe<Scalars['String']['output']>
}

export type CustomerPortalResult = {
  __typename?: 'CustomerPortalResult'
  /** Stripe customer portal URL */
  url?: Maybe<Scalars['String']['output']>
}

export type DailyReport = {
  __typename?: 'DailyReport'
  cardSales?: Maybe<Scalars['String']['output']>
  cashCounted?: Maybe<Scalars['String']['output']>
  cashSales?: Maybe<Scalars['String']['output']>
  cashVariance?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  grossProfit?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  notes?: Maybe<Scalars['String']['output']>
  organizationId?: Maybe<Scalars['String']['output']>
  reportDate?: Maybe<Scalars['DateTime']['output']>
  reportEndTime?: Maybe<Scalars['DateTime']['output']>
  reportStartTime?: Maybe<Scalars['DateTime']['output']>
  totalCost?: Maybe<Scalars['String']['output']>
  totalRefunds?: Maybe<Scalars['String']['output']>
  totalSales?: Maybe<Scalars['String']['output']>
}

export type DashboardStats = {
  __typename?: 'DashboardStats'
  /** New user signups in the last 7 days */
  recentSignups?: Maybe<Scalars['Int']['output']>
  totalOrganizations?: Maybe<Scalars['Int']['output']>
  totalUsers?: Maybe<Scalars['Int']['output']>
}

export type DeleteFileInput = {
  fileId: Scalars['String']['input']
}

export type DetachProductImageInput = {
  fileId: Scalars['String']['input']
  productId: Scalars['String']['input']
}

export type ExistingFile = {
  __typename?: 'ExistingFile'
  filename?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

/** Uploaded file metadata */
export type File = {
  __typename?: 'File'
  contentType?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  fileHash?: Maybe<Scalars['String']['output']>
  filename?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  key?: Maybe<Scalars['String']['output']>
  metadata?: Maybe<Scalars['JSON']['output']>
  organizationId?: Maybe<Scalars['String']['output']>
  size?: Maybe<Scalars['Int']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  url?: Maybe<Scalars['String']['output']>
  userId?: Maybe<Scalars['String']['output']>
}

export type FileUsage = {
  __typename?: 'FileUsage'
  inUse?: Maybe<Scalars['Boolean']['output']>
  productCount?: Maybe<Scalars['Int']['output']>
}

export type GenerateDailyReportInput = {
  cashCounted?: InputMaybe<Scalars['Float']['input']>
  notes?: InputMaybe<Scalars['String']['input']>
}

export type GenerateUploadUrlInput = {
  contentType: Scalars['String']['input']
  fileHash?: InputMaybe<Scalars['String']['input']>
  filename: Scalars['String']['input']
}

export type GetSignedUrlInput = {
  expiresIn?: InputMaybe<Scalars['Int']['input']>
  fileId: Scalars['String']['input']
}

export type HealthStatus = {
  __typename?: 'HealthStatus'
  database?: Maybe<ServiceHealth>
  email?: Maybe<ServiceHealth>
  resend?: Maybe<ServiceHealth>
  stripe?: Maybe<ServiceHealth>
}

export type ListFilesInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

/** Paginated list of files with metadata */
export type ListFilesResponse = {
  __typename?: 'ListFilesResponse'
  files?: Maybe<Array<File>>
  hasMore?: Maybe<Scalars['Boolean']['output']>
  total?: Maybe<Scalars['Int']['output']>
}

export type LowStockItem = {
  __typename?: 'LowStockItem'
  barcode?: Maybe<Scalars['String']['output']>
  currentStock?: Maybe<Scalars['Int']['output']>
  productId?: Maybe<Scalars['ID']['output']>
  productName?: Maybe<Scalars['String']['output']>
}

export enum MemberRole {
  Admin = 'admin',
  Member = 'member',
  Owner = 'owner',
}

export type Mutation = {
  __typename?: 'Mutation'
  addStockBulk?: Maybe<Array<StockLot>>
  addStockLot?: Maybe<StockLot>
  adminAdjustCredits?: Maybe<CreditAdjustmentResult>
  attachProductImage?: Maybe<ProductImage>
  confirmUpload?: Maybe<File>
  createCategory?: Maybe<Category>
  createCheckout?: Maybe<CheckoutResult>
  createCreditCheckout?: Maybe<CheckoutResult>
  createCustomerPortal?: Maybe<CustomerPortalResult>
  createProduct?: Maybe<Product>
  createSale?: Maybe<SaleWithItems>
  createSupplier?: Maybe<Supplier>
  deleteCategory?: Maybe<Scalars['Boolean']['output']>
  deleteFile?: Maybe<Scalars['Boolean']['output']>
  deleteProduct?: Maybe<Scalars['Boolean']['output']>
  deleteSupplier?: Maybe<Scalars['Boolean']['output']>
  detachProductImage?: Maybe<Scalars['Boolean']['output']>
  generateDailyReport?: Maybe<DailyReport>
  generateUploadUrl?: Maybe<PresignedUploadUrl>
  getSignedUrl?: Maybe<SignedUrl>
  markAllNotificationsRead?: Maybe<Scalars['Boolean']['output']>
  markNotificationRead?: Maybe<Notification>
  refundSaleItem?: Maybe<Sale>
  reorderProductImages?: Maybe<Scalars['Boolean']['output']>
  setPrimaryImage?: Maybe<Scalars['Boolean']['output']>
  updateCategory?: Maybe<Category>
  updateProduct?: Maybe<Product>
  updateSupplier?: Maybe<Supplier>
  uploadFile?: Maybe<File>
}

export type MutationAddStockBulkArgs = {
  input: AddStockBulkInput
}

export type MutationAddStockLotArgs = {
  input: AddStockLotInput
}

export type MutationAdminAdjustCreditsArgs = {
  amount: Scalars['Int']['input']
  organizationId: Scalars['String']['input']
  reason: Scalars['String']['input']
}

export type MutationAttachProductImageArgs = {
  input: AttachProductImageInput
}

export type MutationConfirmUploadArgs = {
  input: ConfirmUploadInput
}

export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput
}

export type MutationCreateCheckoutArgs = {
  interval?: InputMaybe<Scalars['String']['input']>
  planId: Scalars['String']['input']
}

export type MutationCreateCreditCheckoutArgs = {
  packId: Scalars['String']['input']
}

export type MutationCreateProductArgs = {
  input: CreateProductInput
}

export type MutationCreateSaleArgs = {
  input: CreateSaleInput
}

export type MutationCreateSupplierArgs = {
  input: CreateSupplierInput
}

export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteFileArgs = {
  input: DeleteFileInput
}

export type MutationDeleteProductArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteSupplierArgs = {
  id: Scalars['String']['input']
}

export type MutationDetachProductImageArgs = {
  input: DetachProductImageInput
}

export type MutationGenerateDailyReportArgs = {
  input: GenerateDailyReportInput
}

export type MutationGenerateUploadUrlArgs = {
  input: GenerateUploadUrlInput
}

export type MutationGetSignedUrlArgs = {
  input: GetSignedUrlInput
}

export type MutationMarkNotificationReadArgs = {
  notificationId: Scalars['String']['input']
}

export type MutationRefundSaleItemArgs = {
  saleItemId: Scalars['String']['input']
}

export type MutationReorderProductImagesArgs = {
  input: ReorderProductImagesInput
}

export type MutationSetPrimaryImageArgs = {
  input: SetPrimaryImageInput
}

export type MutationUpdateCategoryArgs = {
  id: Scalars['String']['input']
  input: UpdateCategoryInput
}

export type MutationUpdateProductArgs = {
  id: Scalars['String']['input']
  input: UpdateProductInput
}

export type MutationUpdateSupplierArgs = {
  id: Scalars['String']['input']
  input: UpdateSupplierInput
}

export type MutationUploadFileArgs = {
  input: UploadFileInput
}

export type Notification = {
  __typename?: 'Notification'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['ID']['output']>
  link?: Maybe<Scalars['String']['output']>
  message?: Maybe<Scalars['String']['output']>
  organizationId?: Maybe<Scalars['String']['output']>
  read?: Maybe<Scalars['Boolean']['output']>
  readAt?: Maybe<Scalars['DateTime']['output']>
  title?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  userId?: Maybe<Scalars['String']['output']>
}

export type Organization = {
  __typename?: 'Organization'
  id?: Maybe<Scalars['ID']['output']>
  logo?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  role?: Maybe<Scalars['String']['output']>
  slug?: Maybe<Scalars['String']['output']>
}

export type PaginatedOrganizations = {
  __typename?: 'PaginatedOrganizations'
  hasMore?: Maybe<Scalars['Boolean']['output']>
  organizations?: Maybe<Array<AdminOrganization>>
  page?: Maybe<Scalars['Int']['output']>
  pageSize?: Maybe<Scalars['Int']['output']>
  total?: Maybe<Scalars['Int']['output']>
}

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers'
  hasMore?: Maybe<Scalars['Boolean']['output']>
  page?: Maybe<Scalars['Int']['output']>
  pageSize?: Maybe<Scalars['Int']['output']>
  total?: Maybe<Scalars['Int']['output']>
  users?: Maybe<Array<AdminUser>>
}

/** Presigned URL for client-side file upload */
export type PresignedUploadUrl = {
  __typename?: 'PresignedUploadUrl'
  existingFile?: Maybe<ExistingFile>
  fileId?: Maybe<Scalars['String']['output']>
  isDuplicate?: Maybe<Scalars['Boolean']['output']>
  key?: Maybe<Scalars['String']['output']>
  publicUrl?: Maybe<Scalars['String']['output']>
  uploadUrl?: Maybe<Scalars['String']['output']>
}

export type Product = {
  __typename?: 'Product'
  barcode?: Maybe<Scalars['String']['output']>
  category?: Maybe<Category>
  categoryId?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  isActive?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  organizationId?: Maybe<Scalars['String']['output']>
  searchName?: Maybe<Scalars['String']['output']>
  sellingPrice?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type ProductAnalytics = {
  __typename?: 'ProductAnalytics'
  averageSalePrice?: Maybe<Scalars['Float']['output']>
  firstSaleDate?: Maybe<Scalars['DateTime']['output']>
  grossProfit?: Maybe<Scalars['Float']['output']>
  lastSaleDate?: Maybe<Scalars['DateTime']['output']>
  profitMargin?: Maybe<Scalars['Float']['output']>
  refundRate?: Maybe<Scalars['Float']['output']>
  refundedUnits?: Maybe<Scalars['Int']['output']>
  totalCost?: Maybe<Scalars['Float']['output']>
  totalRevenue?: Maybe<Scalars['Float']['output']>
  totalUnitsSold?: Maybe<Scalars['Int']['output']>
  transactionCount?: Maybe<Scalars['Int']['output']>
}

export type ProductImage = {
  __typename?: 'ProductImage'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  displayOrder?: Maybe<Scalars['Int']['output']>
  file?: Maybe<File>
  fileId?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  isPrimary?: Maybe<Scalars['Boolean']['output']>
  productId?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type ProductSalesHistoryItem = {
  __typename?: 'ProductSalesHistoryItem'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  paymentMethod?: Maybe<Scalars['String']['output']>
  quantity?: Maybe<Scalars['Int']['output']>
  receiptNo?: Maybe<Scalars['String']['output']>
  saleId?: Maybe<Scalars['String']['output']>
  saleType?: Maybe<Scalars['String']['output']>
  subtotal?: Maybe<Scalars['String']['output']>
  unitCost?: Maybe<Scalars['String']['output']>
  unitPrice?: Maybe<Scalars['String']['output']>
}

export type ProductSalesTrendItem = {
  __typename?: 'ProductSalesTrendItem'
  cost?: Maybe<Scalars['Float']['output']>
  date?: Maybe<Scalars['String']['output']>
  profit?: Maybe<Scalars['Float']['output']>
  revenue?: Maybe<Scalars['Float']['output']>
  unitsSold?: Maybe<Scalars['Int']['output']>
}

export type ProductWithStock = {
  __typename?: 'ProductWithStock'
  averageCost?: Maybe<Scalars['Float']['output']>
  barcode?: Maybe<Scalars['String']['output']>
  category?: Maybe<Category>
  categoryId?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  isActive?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  organizationId?: Maybe<Scalars['String']['output']>
  searchName?: Maybe<Scalars['String']['output']>
  sellingPrice?: Maybe<Scalars['String']['output']>
  totalStock?: Maybe<Scalars['Int']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type Query = {
  __typename?: 'Query'
  adminDashboardStats?: Maybe<DashboardStats>
  adminOrganizations?: Maybe<PaginatedOrganizations>
  adminSystemHealth?: Maybe<HealthStatus>
  adminUsers?: Maybe<PaginatedUsers>
  billingPlans?: Maybe<Array<BillingPlan>>
  categories?: Maybe<Array<Category>>
  creditBalance?: Maybe<CreditBalance>
  creditHistory?: Maybe<Array<CreditTransaction>>
  creditPacks?: Maybe<Array<CreditPack>>
  dailyReports?: Maybe<Array<DailyReport>>
  file?: Maybe<File>
  fileUsage?: Maybe<FileUsage>
  files?: Maybe<Array<File>>
  health?: Maybe<Scalars['String']['output']>
  listFiles?: Maybe<ListFilesResponse>
  lowStockProducts?: Maybe<Array<LowStockItem>>
  notifications?: Maybe<Array<Notification>>
  product?: Maybe<Product>
  productAnalytics?: Maybe<ProductAnalytics>
  productImages?: Maybe<Array<ProductImage>>
  productSalesHistory?: Maybe<Array<ProductSalesHistoryItem>>
  productSalesTrend?: Maybe<Array<ProductSalesTrendItem>>
  productStock?: Maybe<StockInfo>
  products?: Maybe<Array<Product>>
  productsWithStock?: Maybe<Array<ProductWithStock>>
  sale?: Maybe<SaleWithItems>
  sales?: Maybe<Array<Sale>>
  salesHistory?: Maybe<Array<SaleWithItems>>
  salesSummary?: Maybe<SalesSummary>
  salesTrend?: Maybe<Array<SalesTrendItem>>
  stockLogs?: Maybe<Array<StockLog>>
  stockLots?: Maybe<Array<StockLot>>
  supplier?: Maybe<Supplier>
  suppliers?: Maybe<Array<Supplier>>
  todaysPulse?: Maybe<TodaysPulse>
  topProducts?: Maybe<Array<TopProduct>>
  unreadNotificationCount?: Maybe<UnreadCount>
  userOrganizations?: Maybe<Array<Organization>>
}

export type QueryAdminOrganizationsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type QueryAdminUsersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type QueryCreditHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

export type QueryDailyReportsArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type QueryFileArgs = {
  id: Scalars['String']['input']
}

export type QueryFileUsageArgs = {
  fileId: Scalars['String']['input']
}

export type QueryListFilesArgs = {
  input?: InputMaybe<ListFilesInput>
}

export type QueryLowStockProductsArgs = {
  threshold?: InputMaybe<Scalars['Int']['input']>
}

export type QueryNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

export type QueryProductArgs = {
  id: Scalars['String']['input']
}

export type QueryProductAnalyticsArgs = {
  days?: InputMaybe<Scalars['Int']['input']>
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  productId: Scalars['String']['input']
  startDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type QueryProductImagesArgs = {
  productId: Scalars['String']['input']
}

export type QueryProductSalesHistoryArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  productId: Scalars['String']['input']
  startDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type QueryProductSalesTrendArgs = {
  days: Scalars['Int']['input']
  productId: Scalars['String']['input']
}

export type QueryProductStockArgs = {
  productId: Scalars['String']['input']
}

export type QueryProductsArgs = {
  categoryId?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type QueryProductsWithStockArgs = {
  categoryId?: InputMaybe<Scalars['String']['input']>
  lowStockOnly?: InputMaybe<Scalars['Boolean']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  threshold?: InputMaybe<Scalars['Int']['input']>
}

export type QuerySaleArgs = {
  id: Scalars['String']['input']
}

export type QuerySalesArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type QuerySalesHistoryArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  paymentMethod?: InputMaybe<Scalars['String']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  type?: InputMaybe<Scalars['String']['input']>
}

export type QuerySalesSummaryArgs = {
  endDate: Scalars['DateTime']['input']
  startDate: Scalars['DateTime']['input']
}

export type QuerySalesTrendArgs = {
  days?: InputMaybe<Scalars['Int']['input']>
}

export type QueryStockLogsArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  productId?: InputMaybe<Scalars['String']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  type?: InputMaybe<Scalars['String']['input']>
}

export type QueryStockLotsArgs = {
  productId: Scalars['String']['input']
}

export type QuerySupplierArgs = {
  id: Scalars['String']['input']
}

export type QueryTopProductsArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type ReorderProductImagesInput = {
  imageIds: Array<Scalars['String']['input']>
  productId: Scalars['String']['input']
}

export type Sale = {
  __typename?: 'Sale'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['ID']['output']>
  notes?: Maybe<Scalars['String']['output']>
  organizationId?: Maybe<Scalars['String']['output']>
  originalSaleId?: Maybe<Scalars['String']['output']>
  paymentMethod?: Maybe<Scalars['String']['output']>
  receiptNo?: Maybe<Scalars['String']['output']>
  totalAmount?: Maybe<Scalars['String']['output']>
  totalCost?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type SaleItem = {
  __typename?: 'SaleItem'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['ID']['output']>
  product?: Maybe<Product>
  productId?: Maybe<Scalars['String']['output']>
  quantity?: Maybe<Scalars['Int']['output']>
  saleId?: Maybe<Scalars['String']['output']>
  subtotal?: Maybe<Scalars['String']['output']>
  unitCost?: Maybe<Scalars['String']['output']>
  unitPrice?: Maybe<Scalars['String']['output']>
}

export type SaleWithItems = {
  __typename?: 'SaleWithItems'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['ID']['output']>
  items?: Maybe<Array<SaleItem>>
  notes?: Maybe<Scalars['String']['output']>
  organizationId?: Maybe<Scalars['String']['output']>
  originalSaleId?: Maybe<Scalars['String']['output']>
  paymentMethod?: Maybe<Scalars['String']['output']>
  receiptNo?: Maybe<Scalars['String']['output']>
  totalAmount?: Maybe<Scalars['String']['output']>
  totalCost?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type SalesSummary = {
  __typename?: 'SalesSummary'
  endDate?: Maybe<Scalars['DateTime']['output']>
  salesCount?: Maybe<Scalars['Int']['output']>
  startDate?: Maybe<Scalars['DateTime']['output']>
  totalCost?: Maybe<Scalars['Float']['output']>
  totalProfit?: Maybe<Scalars['Float']['output']>
  totalRevenue?: Maybe<Scalars['Float']['output']>
}

export type SalesTrendItem = {
  __typename?: 'SalesTrendItem'
  cost?: Maybe<Scalars['Float']['output']>
  date?: Maybe<Scalars['String']['output']>
  profit?: Maybe<Scalars['Float']['output']>
  sales?: Maybe<Scalars['Float']['output']>
}

export type ServiceHealth = {
  __typename?: 'ServiceHealth'
  /** Response time in milliseconds */
  latency?: Maybe<Scalars['Int']['output']>
  message?: Maybe<Scalars['String']['output']>
  status?: Maybe<ServiceHealthStatus>
}

export enum ServiceHealthStatus {
  Degraded = 'degraded',
  Healthy = 'healthy',
  Unhealthy = 'unhealthy',
}

export type SetPrimaryImageInput = {
  fileId: Scalars['String']['input']
  productId: Scalars['String']['input']
}

/** Temporary signed URL for file access */
export type SignedUrl = {
  __typename?: 'SignedUrl'
  expiresIn?: Maybe<Scalars['Int']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type StockInfo = {
  __typename?: 'StockInfo'
  averageCost?: Maybe<Scalars['Float']['output']>
  lots?: Maybe<Array<StockLot>>
  productId?: Maybe<Scalars['String']['output']>
  totalStock?: Maybe<Scalars['Int']['output']>
}

export type StockLog = {
  __typename?: 'StockLog'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['ID']['output']>
  lotId?: Maybe<Scalars['String']['output']>
  notes?: Maybe<Scalars['String']['output']>
  organizationId?: Maybe<Scalars['String']['output']>
  product?: Maybe<Product>
  productId?: Maybe<Scalars['String']['output']>
  quantity?: Maybe<Scalars['Int']['output']>
  referenceId?: Maybe<Scalars['String']['output']>
  referenceType?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type StockLot = {
  __typename?: 'StockLot'
  costPrice?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['ID']['output']>
  notes?: Maybe<Scalars['String']['output']>
  organizationId?: Maybe<Scalars['String']['output']>
  productId?: Maybe<Scalars['String']['output']>
  purchasedAt?: Maybe<Scalars['DateTime']['output']>
  quantity?: Maybe<Scalars['Int']['output']>
  remaining?: Maybe<Scalars['Int']['output']>
  supplier?: Maybe<Scalars['String']['output']>
  supplierId?: Maybe<Scalars['String']['output']>
}

export enum SubscriptionStatus {
  Active = 'active',
  Canceled = 'canceled',
  Incomplete = 'incomplete',
  PastDue = 'past_due',
  Trialing = 'trialing',
}

export type Supplier = {
  __typename?: 'Supplier'
  address?: Maybe<Scalars['String']['output']>
  contactPerson?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  email?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  name?: Maybe<Scalars['String']['output']>
  notes?: Maybe<Scalars['String']['output']>
  organizationId?: Maybe<Scalars['String']['output']>
  phone?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type TodaysPulse = {
  __typename?: 'TodaysPulse'
  grossProfit?: Maybe<Scalars['Float']['output']>
  totalCost?: Maybe<Scalars['Float']['output']>
  totalRefunds?: Maybe<Scalars['Float']['output']>
  totalSales?: Maybe<Scalars['Float']['output']>
  transactionCount?: Maybe<Scalars['Int']['output']>
}

export type TopProduct = {
  __typename?: 'TopProduct'
  productId?: Maybe<Scalars['ID']['output']>
  productName?: Maybe<Scalars['String']['output']>
  quantitySold?: Maybe<Scalars['Int']['output']>
  revenue?: Maybe<Scalars['Float']['output']>
}

export type UnreadCount = {
  __typename?: 'UnreadCount'
  count?: Maybe<Scalars['Int']['output']>
}

export type UpdateCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type UpdateProductInput = {
  barcode?: InputMaybe<Scalars['String']['input']>
  categoryId?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  searchName?: InputMaybe<Scalars['String']['input']>
  sellingPrice?: InputMaybe<Scalars['Float']['input']>
}

export type UpdateSupplierInput = {
  address?: InputMaybe<Scalars['String']['input']>
  contactPerson?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  notes?: InputMaybe<Scalars['String']['input']>
  phone?: InputMaybe<Scalars['String']['input']>
}

export type UploadFileInput = {
  base64Data: Scalars['String']['input']
  contentType: Scalars['String']['input']
  filename: Scalars['String']['input']
  size: Scalars['Int']['input']
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export type AdminAdjustCreditsMutationVariables = Exact<{
  organizationId: Scalars['String']['input']
  amount: Scalars['Int']['input']
  reason: Scalars['String']['input']
}>

export type AdminAdjustCreditsMutation = {
  __typename?: 'Mutation'
  adminAdjustCredits?: {
    __typename?: 'CreditAdjustmentResult'
    organizationId?: string | null
    previousBalance?: number | null
    newBalance?: number | null
    adjustmentAmount?: number | null
    reason?: string | null
  } | null
}

export type GetAdminUsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}>

export type GetAdminUsersQuery = {
  __typename?: 'Query'
  adminUsers?: {
    __typename?: 'PaginatedUsers'
    total?: number | null
    page?: number | null
    pageSize?: number | null
    hasMore?: boolean | null
    users?: Array<{
      __typename?: 'AdminUser'
      id?: string | null
      name?: string | null
      email?: string | null
      emailVerified?: boolean | null
      createdAt?: any | null
      organizationCount?: number | null
    }> | null
  } | null
}

export type GetAdminOrganizationsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}>

export type GetAdminOrganizationsQuery = {
  __typename?: 'Query'
  adminOrganizations?: {
    __typename?: 'PaginatedOrganizations'
    total?: number | null
    page?: number | null
    pageSize?: number | null
    hasMore?: boolean | null
    organizations?: Array<{
      __typename?: 'AdminOrganization'
      id?: string | null
      name?: string | null
      slug?: string | null
      createdAt?: any | null
      memberCount?: number | null
      planId?: string | null
      creditBalance?: number | null
      subscriptionStatus?: string | null
    }> | null
  } | null
}

export type GetAdminDashboardStatsQueryVariables = Exact<{
  [key: string]: never
}>

export type GetAdminDashboardStatsQuery = {
  __typename?: 'Query'
  adminDashboardStats?: {
    __typename?: 'DashboardStats'
    totalUsers?: number | null
    totalOrganizations?: number | null
    recentSignups?: number | null
  } | null
}

export type GetAdminSystemHealthQueryVariables = Exact<{ [key: string]: never }>

export type GetAdminSystemHealthQuery = {
  __typename?: 'Query'
  adminSystemHealth?: {
    __typename?: 'HealthStatus'
    database?: {
      __typename?: 'ServiceHealth'
      status?: ServiceHealthStatus | null
      message?: string | null
      latency?: number | null
    } | null
    stripe?: {
      __typename?: 'ServiceHealth'
      status?: ServiceHealthStatus | null
      message?: string | null
      latency?: number | null
    } | null
    resend?: {
      __typename?: 'ServiceHealth'
      status?: ServiceHealthStatus | null
      message?: string | null
      latency?: number | null
    } | null
    email?: {
      __typename?: 'ServiceHealth'
      status?: ServiceHealthStatus | null
      message?: string | null
      latency?: number | null
    } | null
  } | null
}

export type CreateCheckoutMutationVariables = Exact<{
  planId: Scalars['String']['input']
  interval?: InputMaybe<Scalars['String']['input']>
}>

export type CreateCheckoutMutation = {
  __typename?: 'Mutation'
  createCheckout?: {
    __typename?: 'CheckoutResult'
    url?: string | null
    sessionId?: string | null
  } | null
}

export type CreateCreditCheckoutMutationVariables = Exact<{
  packId: Scalars['String']['input']
}>

export type CreateCreditCheckoutMutation = {
  __typename?: 'Mutation'
  createCreditCheckout?: {
    __typename?: 'CheckoutResult'
    url?: string | null
    sessionId?: string | null
  } | null
}

export type CreateCustomerPortalMutationVariables = Exact<{
  [key: string]: never
}>

export type CreateCustomerPortalMutation = {
  __typename?: 'Mutation'
  createCustomerPortal?: {
    __typename?: 'CustomerPortalResult'
    url?: string | null
  } | null
}

export type GetCreditBalanceQueryVariables = Exact<{ [key: string]: never }>

export type GetCreditBalanceQuery = {
  __typename?: 'Query'
  creditBalance?: {
    __typename?: 'CreditBalance'
    balance?: number | null
    planId?: string | null
    subscriptionStatus?: string | null
    cancelAtPeriodEnd?: boolean | null
    subscriptionEndDate?: any | null
    currentPeriodEnd?: any | null
  } | null
}

export type GetCreditHistoryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
}>

export type GetCreditHistoryQuery = {
  __typename?: 'Query'
  creditHistory?: Array<{
    __typename?: 'CreditTransaction'
    id?: string | null
    amount?: number | null
    type?: string | null
    description?: string | null
    balanceAfter?: number | null
    createdAt?: any | null
    metadata?: any | null
  }> | null
}

export type GetBillingPlansQueryVariables = Exact<{ [key: string]: never }>

export type GetBillingPlansQuery = {
  __typename?: 'Query'
  billingPlans?: Array<{
    __typename?: 'BillingPlan'
    id?: string | null
    name?: string | null
    description?: string | null
    priceMonthly?: number | null
    priceYearly?: number | null
    creditsPerMonth?: number | null
    features?: Array<string> | null
  }> | null
}

export type GetCreditPacksQueryVariables = Exact<{ [key: string]: never }>

export type GetCreditPacksQuery = {
  __typename?: 'Query'
  creditPacks?: Array<{
    __typename?: 'CreditPack'
    id?: string | null
    name?: string | null
    credits?: number | null
    price?: number | null
  }> | null
}

export type MarkNotificationReadMutationVariables = Exact<{
  notificationId: Scalars['String']['input']
}>

export type MarkNotificationReadMutation = {
  __typename?: 'Mutation'
  markNotificationRead?: {
    __typename?: 'Notification'
    id?: string | null
    read?: boolean | null
    readAt?: any | null
  } | null
}

export type MarkAllNotificationsReadMutationVariables = Exact<{
  [key: string]: never
}>

export type MarkAllNotificationsReadMutation = {
  __typename?: 'Mutation'
  markAllNotificationsRead?: boolean | null
}

export type GetNotificationsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
}>

export type GetNotificationsQuery = {
  __typename?: 'Query'
  notifications?: Array<{
    __typename?: 'Notification'
    id?: string | null
    title?: string | null
    message?: string | null
    type?: string | null
    link?: string | null
    read?: boolean | null
    createdAt?: any | null
    readAt?: any | null
  }> | null
}

export type GetUnreadNotificationCountQueryVariables = Exact<{
  [key: string]: never
}>

export type GetUnreadNotificationCountQuery = {
  __typename?: 'Query'
  unreadNotificationCount?: {
    __typename?: 'UnreadCount'
    count?: number | null
  } | null
}

export type GetUserOrganizationsQueryVariables = Exact<{ [key: string]: never }>

export type GetUserOrganizationsQuery = {
  __typename?: 'Query'
  userOrganizations?: Array<{
    __typename?: 'Organization'
    id?: string | null
    name?: string | null
    slug?: string | null
    role?: string | null
    logo?: string | null
  }> | null
}

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>

export type CategoriesQuery = {
  __typename?: 'Query'
  categories?: Array<{
    __typename?: 'Category'
    id?: string | null
    name?: string | null
    organizationId?: string | null
    createdAt?: any | null
  }> | null
}

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput
}>

export type CreateCategoryMutation = {
  __typename?: 'Mutation'
  createCategory?: {
    __typename?: 'Category'
    id?: string | null
    name?: string | null
    organizationId?: string | null
    createdAt?: any | null
  } | null
}

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['String']['input']
  input: UpdateCategoryInput
}>

export type UpdateCategoryMutation = {
  __typename?: 'Mutation'
  updateCategory?: {
    __typename?: 'Category'
    id?: string | null
    name?: string | null
    organizationId?: string | null
    createdAt?: any | null
  } | null
}

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['String']['input']
}>

export type DeleteCategoryMutation = {
  __typename?: 'Mutation'
  deleteCategory?: boolean | null
}

export type TodaysPulseQueryVariables = Exact<{ [key: string]: never }>

export type TodaysPulseQuery = {
  __typename?: 'Query'
  todaysPulse?: {
    __typename?: 'TodaysPulse'
    totalSales?: number | null
    totalCost?: number | null
    grossProfit?: number | null
    transactionCount?: number | null
    totalRefunds?: number | null
  } | null
}

export type SalesTrendQueryVariables = Exact<{
  days?: InputMaybe<Scalars['Int']['input']>
}>

export type SalesTrendQuery = {
  __typename?: 'Query'
  salesTrend?: Array<{
    __typename?: 'SalesTrendItem'
    date?: string | null
    sales?: number | null
    cost?: number | null
    profit?: number | null
  }> | null
}

export type TopProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  endDate?: InputMaybe<Scalars['DateTime']['input']>
}>

export type TopProductsQuery = {
  __typename?: 'Query'
  topProducts?: Array<{
    __typename?: 'TopProduct'
    productId?: string | null
    productName?: string | null
    quantitySold?: number | null
    revenue?: number | null
  }> | null
}

export type DashboardLowStockQueryVariables = Exact<{
  threshold?: InputMaybe<Scalars['Int']['input']>
}>

export type DashboardLowStockQuery = {
  __typename?: 'Query'
  lowStockProducts?: Array<{
    __typename?: 'LowStockItem'
    productId?: string | null
    productName?: string | null
    currentStock?: number | null
    barcode?: string | null
  }> | null
}

export type ProductSalesHistoryQueryVariables = Exact<{
  productId: Scalars['String']['input']
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
}>

export type ProductSalesHistoryQuery = {
  __typename?: 'Query'
  productSalesHistory?: Array<{
    __typename?: 'ProductSalesHistoryItem'
    saleId?: string | null
    receiptNo?: string | null
    quantity?: number | null
    unitPrice?: string | null
    unitCost?: string | null
    subtotal?: string | null
    paymentMethod?: string | null
    saleType?: string | null
    createdAt?: any | null
  }> | null
}

export type ProductAnalyticsQueryVariables = Exact<{
  productId: Scalars['String']['input']
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  endDate?: InputMaybe<Scalars['DateTime']['input']>
}>

export type ProductAnalyticsQuery = {
  __typename?: 'Query'
  productAnalytics?: {
    __typename?: 'ProductAnalytics'
    totalRevenue?: number | null
    totalUnitsSold?: number | null
    totalCost?: number | null
    grossProfit?: number | null
    profitMargin?: number | null
    averageSalePrice?: number | null
    firstSaleDate?: any | null
    lastSaleDate?: any | null
    transactionCount?: number | null
    refundedUnits?: number | null
    refundRate?: number | null
  } | null
}

export type ProductSalesTrendQueryVariables = Exact<{
  productId: Scalars['String']['input']
  days: Scalars['Int']['input']
}>

export type ProductSalesTrendQuery = {
  __typename?: 'Query'
  productSalesTrend?: Array<{
    __typename?: 'ProductSalesTrendItem'
    date?: string | null
    unitsSold?: number | null
    revenue?: number | null
    cost?: number | null
    profit?: number | null
  }> | null
}

export type ProductWithAnalyticsQueryVariables = Exact<{
  productId: Scalars['String']['input']
  days?: InputMaybe<Scalars['Int']['input']>
}>

export type ProductWithAnalyticsQuery = {
  __typename?: 'Query'
  product?: {
    __typename?: 'Product'
    id?: string | null
    name?: string | null
    searchName?: string | null
    barcode?: string | null
    description?: string | null
    sellingPrice?: string | null
    isActive?: boolean | null
    categoryId?: string | null
    organizationId?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    category?: {
      __typename?: 'Category'
      id?: string | null
      name?: string | null
    } | null
  } | null
  productStock?: {
    __typename?: 'StockInfo'
    totalStock?: number | null
    averageCost?: number | null
    lots?: Array<{
      __typename?: 'StockLot'
      id?: string | null
      productId?: string | null
      quantity?: number | null
      remaining?: number | null
      costPrice?: string | null
      supplier?: string | null
      notes?: string | null
      purchasedAt?: any | null
      createdAt?: any | null
    }> | null
  } | null
  productAnalytics?: {
    __typename?: 'ProductAnalytics'
    totalRevenue?: number | null
    totalUnitsSold?: number | null
    totalCost?: number | null
    grossProfit?: number | null
    profitMargin?: number | null
    averageSalePrice?: number | null
    firstSaleDate?: any | null
    lastSaleDate?: any | null
    transactionCount?: number | null
    refundedUnits?: number | null
    refundRate?: number | null
  } | null
}

export type ProductImagesQueryVariables = Exact<{
  productId: Scalars['String']['input']
}>

export type ProductImagesQuery = {
  __typename?: 'Query'
  productImages?: Array<{
    __typename?: 'ProductImage'
    id?: string | null
    productId?: string | null
    fileId?: string | null
    isPrimary?: boolean | null
    displayOrder?: number | null
    createdAt?: any | null
    updatedAt?: any | null
    file?: {
      __typename?: 'File'
      id?: string | null
      filename?: string | null
      contentType?: string | null
      size?: number | null
      url?: string | null
      fileHash?: string | null
      createdAt?: any | null
    } | null
  }> | null
}

export type AttachProductImageMutationVariables = Exact<{
  input: AttachProductImageInput
}>

export type AttachProductImageMutation = {
  __typename?: 'Mutation'
  attachProductImage?: {
    __typename?: 'ProductImage'
    id?: string | null
    productId?: string | null
    fileId?: string | null
    isPrimary?: boolean | null
    displayOrder?: number | null
  } | null
}

export type DetachProductImageMutationVariables = Exact<{
  input: DetachProductImageInput
}>

export type DetachProductImageMutation = {
  __typename?: 'Mutation'
  detachProductImage?: boolean | null
}

export type SetPrimaryImageMutationVariables = Exact<{
  input: SetPrimaryImageInput
}>

export type SetPrimaryImageMutation = {
  __typename?: 'Mutation'
  setPrimaryImage?: boolean | null
}

export type ReorderProductImagesMutationVariables = Exact<{
  input: ReorderProductImagesInput
}>

export type ReorderProductImagesMutation = {
  __typename?: 'Mutation'
  reorderProductImages?: boolean | null
}

export type FileUsageQueryVariables = Exact<{
  fileId: Scalars['String']['input']
}>

export type FileUsageQuery = {
  __typename?: 'Query'
  fileUsage?: {
    __typename?: 'FileUsage'
    inUse?: boolean | null
    productCount?: number | null
  } | null
}

export type ProductsQueryVariables = Exact<{
  categoryId?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
}>

export type ProductsQuery = {
  __typename?: 'Query'
  products?: Array<{
    __typename?: 'Product'
    id?: string | null
    name?: string | null
    searchName?: string | null
    barcode?: string | null
    description?: string | null
    sellingPrice?: string | null
    isActive?: boolean | null
    categoryId?: string | null
    organizationId?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    category?: {
      __typename?: 'Category'
      id?: string | null
      name?: string | null
    } | null
  }> | null
}

export type ProductQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type ProductQuery = {
  __typename?: 'Query'
  product?: {
    __typename?: 'Product'
    id?: string | null
    name?: string | null
    searchName?: string | null
    barcode?: string | null
    description?: string | null
    sellingPrice?: string | null
    isActive?: boolean | null
    categoryId?: string | null
    organizationId?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    category?: {
      __typename?: 'Category'
      id?: string | null
      name?: string | null
    } | null
  } | null
}

export type ProductsWithStockQueryVariables = Exact<{
  categoryId?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  lowStockOnly?: InputMaybe<Scalars['Boolean']['input']>
  threshold?: InputMaybe<Scalars['Int']['input']>
}>

export type ProductsWithStockQuery = {
  __typename?: 'Query'
  productsWithStock?: Array<{
    __typename?: 'ProductWithStock'
    id?: string | null
    name?: string | null
    searchName?: string | null
    barcode?: string | null
    description?: string | null
    sellingPrice?: string | null
    isActive?: boolean | null
    categoryId?: string | null
    totalStock?: number | null
    averageCost?: number | null
    organizationId?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    category?: {
      __typename?: 'Category'
      id?: string | null
      name?: string | null
    } | null
  }> | null
}

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput
}>

export type CreateProductMutation = {
  __typename?: 'Mutation'
  createProduct?: {
    __typename?: 'Product'
    id?: string | null
    name?: string | null
    searchName?: string | null
    barcode?: string | null
    description?: string | null
    sellingPrice?: string | null
    isActive?: boolean | null
    categoryId?: string | null
    organizationId?: string | null
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['String']['input']
  input: UpdateProductInput
}>

export type UpdateProductMutation = {
  __typename?: 'Mutation'
  updateProduct?: {
    __typename?: 'Product'
    id?: string | null
    name?: string | null
    searchName?: string | null
    barcode?: string | null
    description?: string | null
    sellingPrice?: string | null
    isActive?: boolean | null
    categoryId?: string | null
    organizationId?: string | null
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['String']['input']
}>

export type DeleteProductMutation = {
  __typename?: 'Mutation'
  deleteProduct?: boolean | null
}

export type DailyReportsQueryVariables = Exact<{
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
}>

export type DailyReportsQuery = {
  __typename?: 'Query'
  dailyReports?: Array<{
    __typename?: 'DailyReport'
    id?: string | null
    organizationId?: string | null
    reportDate?: any | null
    reportStartTime?: any | null
    reportEndTime?: any | null
    totalSales?: string | null
    totalRefunds?: string | null
    totalCost?: string | null
    grossProfit?: string | null
    cashSales?: string | null
    cardSales?: string | null
    cashCounted?: string | null
    cashVariance?: string | null
    notes?: string | null
    createdAt?: any | null
  }> | null
}

export type GenerateDailyReportMutationVariables = Exact<{
  input: GenerateDailyReportInput
}>

export type GenerateDailyReportMutation = {
  __typename?: 'Mutation'
  generateDailyReport?: {
    __typename?: 'DailyReport'
    id?: string | null
    organizationId?: string | null
    reportDate?: any | null
    reportStartTime?: any | null
    reportEndTime?: any | null
    totalSales?: string | null
    totalRefunds?: string | null
    totalCost?: string | null
    grossProfit?: string | null
    cashSales?: string | null
    cardSales?: string | null
    cashCounted?: string | null
    cashVariance?: string | null
    notes?: string | null
    createdAt?: any | null
  } | null
}

export type TodaysCashSalesQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input']
  endDate: Scalars['DateTime']['input']
}>

export type TodaysCashSalesQuery = {
  __typename?: 'Query'
  salesHistory?: Array<{
    __typename?: 'SaleWithItems'
    id?: string | null
    totalAmount?: string | null
    createdAt?: any | null
  }> | null
}

export type TodaysCardSalesQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input']
  endDate: Scalars['DateTime']['input']
}>

export type TodaysCardSalesQuery = {
  __typename?: 'Query'
  salesHistory?: Array<{
    __typename?: 'SaleWithItems'
    id?: string | null
    totalAmount?: string | null
    createdAt?: any | null
  }> | null
}

export type TodaysRefundsQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input']
  endDate: Scalars['DateTime']['input']
}>

export type TodaysRefundsQuery = {
  __typename?: 'Query'
  salesHistory?: Array<{
    __typename?: 'SaleWithItems'
    id?: string | null
    totalAmount?: string | null
    paymentMethod?: string | null
    createdAt?: any | null
  }> | null
}

export type SalesHistoryQueryVariables = Exact<{
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  paymentMethod?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
}>

export type SalesHistoryQuery = {
  __typename?: 'Query'
  salesHistory?: Array<{
    __typename?: 'SaleWithItems'
    id?: string | null
    receiptNo?: string | null
    type?: string | null
    originalSaleId?: string | null
    totalAmount?: string | null
    totalCost?: string | null
    paymentMethod?: string | null
    notes?: string | null
    organizationId?: string | null
    createdAt?: any | null
    items?: Array<{
      __typename?: 'SaleItem'
      id?: string | null
      saleId?: string | null
      productId?: string | null
      quantity?: number | null
      unitPrice?: string | null
      unitCost?: string | null
      subtotal?: string | null
      createdAt?: any | null
      product?: {
        __typename?: 'Product'
        id?: string | null
        name?: string | null
        barcode?: string | null
        sellingPrice?: string | null
      } | null
    }> | null
  }> | null
}

export type CreateSaleMutationVariables = Exact<{
  input: CreateSaleInput
}>

export type CreateSaleMutation = {
  __typename?: 'Mutation'
  createSale?: {
    __typename?: 'SaleWithItems'
    id?: string | null
    receiptNo?: string | null
    type?: string | null
    totalAmount?: string | null
    totalCost?: string | null
    paymentMethod?: string | null
    notes?: string | null
    organizationId?: string | null
    createdAt?: any | null
  } | null
}

export type RefundSaleItemMutationVariables = Exact<{
  saleItemId: Scalars['String']['input']
}>

export type RefundSaleItemMutation = {
  __typename?: 'Mutation'
  refundSaleItem?: {
    __typename?: 'Sale'
    id?: string | null
    receiptNo?: string | null
    type?: string | null
    originalSaleId?: string | null
    totalAmount?: string | null
    totalCost?: string | null
    paymentMethod?: string | null
    notes?: string | null
    organizationId?: string | null
    createdAt?: any | null
  } | null
}

export type ProductStockQueryVariables = Exact<{
  productId: Scalars['String']['input']
}>

export type ProductStockQuery = {
  __typename?: 'Query'
  productStock?: {
    __typename?: 'StockInfo'
    productId?: string | null
    totalStock?: number | null
    averageCost?: number | null
    lots?: Array<{
      __typename?: 'StockLot'
      id?: string | null
      productId?: string | null
      supplierId?: string | null
      quantity?: number | null
      remaining?: number | null
      costPrice?: string | null
      supplier?: string | null
      notes?: string | null
      purchasedAt?: any | null
      organizationId?: string | null
      createdAt?: any | null
    }> | null
  } | null
}

export type StockLotsQueryVariables = Exact<{
  productId: Scalars['String']['input']
}>

export type StockLotsQuery = {
  __typename?: 'Query'
  stockLots?: Array<{
    __typename?: 'StockLot'
    id?: string | null
    productId?: string | null
    quantity?: number | null
    remaining?: number | null
    costPrice?: string | null
    supplier?: string | null
    notes?: string | null
    purchasedAt?: any | null
    organizationId?: string | null
    createdAt?: any | null
  }> | null
}

export type AddStockLotMutationVariables = Exact<{
  input: AddStockLotInput
}>

export type AddStockLotMutation = {
  __typename?: 'Mutation'
  addStockLot?: {
    __typename?: 'StockLot'
    id?: string | null
    productId?: string | null
    quantity?: number | null
    remaining?: number | null
    costPrice?: string | null
    supplier?: string | null
    notes?: string | null
    purchasedAt?: any | null
    organizationId?: string | null
    createdAt?: any | null
  } | null
}

export type AddStockBulkMutationVariables = Exact<{
  input: AddStockBulkInput
}>

export type AddStockBulkMutation = {
  __typename?: 'Mutation'
  addStockBulk?: Array<{
    __typename?: 'StockLot'
    id?: string | null
    productId?: string | null
    quantity?: number | null
    remaining?: number | null
    costPrice?: string | null
    supplier?: string | null
    notes?: string | null
    purchasedAt?: any | null
    organizationId?: string | null
    createdAt?: any | null
  }> | null
}

export type StockLogsQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
}>

export type StockLogsQuery = {
  __typename?: 'Query'
  stockLogs?: Array<{
    __typename?: 'StockLog'
    id?: string | null
    organizationId?: string | null
    productId?: string | null
    lotId?: string | null
    type?: string | null
    quantity?: number | null
    referenceType?: string | null
    referenceId?: string | null
    notes?: string | null
    createdAt?: any | null
    product?: {
      __typename?: 'Product'
      id?: string | null
      name?: string | null
      barcode?: string | null
      sellingPrice?: string | null
    } | null
  }> | null
}

export type SuppliersQueryVariables = Exact<{ [key: string]: never }>

export type SuppliersQuery = {
  __typename?: 'Query'
  suppliers?: Array<{
    __typename?: 'Supplier'
    id?: string | null
    name?: string | null
    contactPerson?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: any | null
    updatedAt?: any | null
  }> | null
}

export type SupplierQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type SupplierQuery = {
  __typename?: 'Query'
  supplier?: {
    __typename?: 'Supplier'
    id?: string | null
    name?: string | null
    contactPerson?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

export type CreateSupplierMutationVariables = Exact<{
  input: CreateSupplierInput
}>

export type CreateSupplierMutation = {
  __typename?: 'Mutation'
  createSupplier?: {
    __typename?: 'Supplier'
    id?: string | null
    name?: string | null
    contactPerson?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

export type UpdateSupplierMutationVariables = Exact<{
  id: Scalars['String']['input']
  input: UpdateSupplierInput
}>

export type UpdateSupplierMutation = {
  __typename?: 'Mutation'
  updateSupplier?: {
    __typename?: 'Supplier'
    id?: string | null
    name?: string | null
    contactPerson?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

export type DeleteSupplierMutationVariables = Exact<{
  id: Scalars['String']['input']
}>

export type DeleteSupplierMutation = {
  __typename?: 'Mutation'
  deleteSupplier?: boolean | null
}

export type ListFilesQueryVariables = Exact<{
  input?: InputMaybe<ListFilesInput>
}>

export type ListFilesQuery = {
  __typename?: 'Query'
  listFiles?: {
    __typename?: 'ListFilesResponse'
    total?: number | null
    hasMore?: boolean | null
    files?: Array<{
      __typename?: 'File'
      id?: string | null
      filename?: string | null
      contentType?: string | null
      size?: number | null
      url?: string | null
      fileHash?: string | null
      createdAt?: any | null
    }> | null
  } | null
}

export type DeleteFileMutationVariables = Exact<{
  input: DeleteFileInput
}>

export type DeleteFileMutation = {
  __typename?: 'Mutation'
  deleteFile?: boolean | null
}

export type GenerateUploadUrlMutationVariables = Exact<{
  input: GenerateUploadUrlInput
}>

export type GenerateUploadUrlMutation = {
  __typename?: 'Mutation'
  generateUploadUrl?: {
    __typename?: 'PresignedUploadUrl'
    uploadUrl?: string | null
    key?: string | null
    fileId?: string | null
    publicUrl?: string | null
    isDuplicate?: boolean | null
    existingFile?: {
      __typename?: 'ExistingFile'
      id?: string | null
      filename?: string | null
      url?: string | null
    } | null
  } | null
}

export type ConfirmUploadMutationVariables = Exact<{
  input: ConfirmUploadInput
}>

export type ConfirmUploadMutation = {
  __typename?: 'Mutation'
  confirmUpload?: {
    __typename?: 'File'
    id?: string | null
    filename?: string | null
    contentType?: string | null
    size?: number | null
    url?: string | null
    fileHash?: string | null
    createdAt?: any | null
  } | null
}

export const AdminAdjustCreditsDocument = `
    mutation AdminAdjustCredits($organizationId: String!, $amount: Int!, $reason: String!) {
  adminAdjustCredits(
    organizationId: $organizationId
    amount: $amount
    reason: $reason
  ) {
    organizationId
    previousBalance
    newBalance
    adjustmentAmount
    reason
  }
}
    `

export const useAdminAdjustCreditsMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    AdminAdjustCreditsMutation,
    TError,
    AdminAdjustCreditsMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    AdminAdjustCreditsMutation,
    TError,
    AdminAdjustCreditsMutationVariables,
    TContext
  >({
    mutationKey: ['AdminAdjustCredits'],
    mutationFn: (variables?: AdminAdjustCreditsMutationVariables) =>
      fetcher<AdminAdjustCreditsMutation, AdminAdjustCreditsMutationVariables>(
        AdminAdjustCreditsDocument,
        variables,
      )(),
    ...options,
  })
}

useAdminAdjustCreditsMutation.fetcher = (
  variables: AdminAdjustCreditsMutationVariables,
) =>
  fetcher<AdminAdjustCreditsMutation, AdminAdjustCreditsMutationVariables>(
    AdminAdjustCreditsDocument,
    variables,
  )

export const GetAdminUsersDocument = `
    query GetAdminUsers($page: Int, $pageSize: Int, $search: String) {
  adminUsers(page: $page, pageSize: $pageSize, search: $search) {
    users {
      id
      name
      email
      emailVerified
      createdAt
      organizationCount
    }
    total
    page
    pageSize
    hasMore
  }
}
    `

export const useGetAdminUsersQuery = <
  TData = GetAdminUsersQuery,
  TError = unknown,
>(
  variables?: GetAdminUsersQueryVariables,
  options?: Omit<
    UseQueryOptions<GetAdminUsersQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetAdminUsersQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetAdminUsersQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetAdminUsers']
        : ['GetAdminUsers', variables],
    queryFn: fetcher<GetAdminUsersQuery, GetAdminUsersQueryVariables>(
      GetAdminUsersDocument,
      variables,
    ),
    ...options,
  })
}

useGetAdminUsersQuery.getKey = (variables?: GetAdminUsersQueryVariables) =>
  variables === undefined ? ['GetAdminUsers'] : ['GetAdminUsers', variables]

export const useInfiniteGetAdminUsersQuery = <
  TData = InfiniteData<GetAdminUsersQuery>,
  TError = unknown,
>(
  variables: GetAdminUsersQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetAdminUsersQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetAdminUsersQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetAdminUsersQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['GetAdminUsers.infinite']
            : ['GetAdminUsers.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetAdminUsersQuery, GetAdminUsersQueryVariables>(
            GetAdminUsersDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetAdminUsersQuery.getKey = (
  variables?: GetAdminUsersQueryVariables,
) =>
  variables === undefined
    ? ['GetAdminUsers.infinite']
    : ['GetAdminUsers.infinite', variables]

useGetAdminUsersQuery.fetcher = (variables?: GetAdminUsersQueryVariables) =>
  fetcher<GetAdminUsersQuery, GetAdminUsersQueryVariables>(
    GetAdminUsersDocument,
    variables,
  )

export const GetAdminOrganizationsDocument = `
    query GetAdminOrganizations($page: Int, $pageSize: Int, $search: String) {
  adminOrganizations(page: $page, pageSize: $pageSize, search: $search) {
    organizations {
      id
      name
      slug
      createdAt
      memberCount
      planId
      creditBalance
      subscriptionStatus
    }
    total
    page
    pageSize
    hasMore
  }
}
    `

export const useGetAdminOrganizationsQuery = <
  TData = GetAdminOrganizationsQuery,
  TError = unknown,
>(
  variables?: GetAdminOrganizationsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetAdminOrganizationsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetAdminOrganizationsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useQuery<GetAdminOrganizationsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetAdminOrganizations']
        : ['GetAdminOrganizations', variables],
    queryFn: fetcher<
      GetAdminOrganizationsQuery,
      GetAdminOrganizationsQueryVariables
    >(GetAdminOrganizationsDocument, variables),
    ...options,
  })
}

useGetAdminOrganizationsQuery.getKey = (
  variables?: GetAdminOrganizationsQueryVariables,
) =>
  variables === undefined
    ? ['GetAdminOrganizations']
    : ['GetAdminOrganizations', variables]

export const useInfiniteGetAdminOrganizationsQuery = <
  TData = InfiniteData<GetAdminOrganizationsQuery>,
  TError = unknown,
>(
  variables: GetAdminOrganizationsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetAdminOrganizationsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetAdminOrganizationsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetAdminOrganizationsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['GetAdminOrganizations.infinite']
            : ['GetAdminOrganizations.infinite', variables],
        queryFn: (metaData) =>
          fetcher<
            GetAdminOrganizationsQuery,
            GetAdminOrganizationsQueryVariables
          >(GetAdminOrganizationsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetAdminOrganizationsQuery.getKey = (
  variables?: GetAdminOrganizationsQueryVariables,
) =>
  variables === undefined
    ? ['GetAdminOrganizations.infinite']
    : ['GetAdminOrganizations.infinite', variables]

useGetAdminOrganizationsQuery.fetcher = (
  variables?: GetAdminOrganizationsQueryVariables,
) =>
  fetcher<GetAdminOrganizationsQuery, GetAdminOrganizationsQueryVariables>(
    GetAdminOrganizationsDocument,
    variables,
  )

export const GetAdminDashboardStatsDocument = `
    query GetAdminDashboardStats {
  adminDashboardStats {
    totalUsers
    totalOrganizations
    recentSignups
  }
}
    `

export const useGetAdminDashboardStatsQuery = <
  TData = GetAdminDashboardStatsQuery,
  TError = unknown,
>(
  variables?: GetAdminDashboardStatsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetAdminDashboardStatsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetAdminDashboardStatsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useQuery<GetAdminDashboardStatsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetAdminDashboardStats']
        : ['GetAdminDashboardStats', variables],
    queryFn: fetcher<
      GetAdminDashboardStatsQuery,
      GetAdminDashboardStatsQueryVariables
    >(GetAdminDashboardStatsDocument, variables),
    ...options,
  })
}

useGetAdminDashboardStatsQuery.getKey = (
  variables?: GetAdminDashboardStatsQueryVariables,
) =>
  variables === undefined
    ? ['GetAdminDashboardStats']
    : ['GetAdminDashboardStats', variables]

export const useInfiniteGetAdminDashboardStatsQuery = <
  TData = InfiniteData<GetAdminDashboardStatsQuery>,
  TError = unknown,
>(
  variables: GetAdminDashboardStatsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetAdminDashboardStatsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetAdminDashboardStatsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetAdminDashboardStatsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['GetAdminDashboardStats.infinite']
            : ['GetAdminDashboardStats.infinite', variables],
        queryFn: (metaData) =>
          fetcher<
            GetAdminDashboardStatsQuery,
            GetAdminDashboardStatsQueryVariables
          >(GetAdminDashboardStatsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetAdminDashboardStatsQuery.getKey = (
  variables?: GetAdminDashboardStatsQueryVariables,
) =>
  variables === undefined
    ? ['GetAdminDashboardStats.infinite']
    : ['GetAdminDashboardStats.infinite', variables]

useGetAdminDashboardStatsQuery.fetcher = (
  variables?: GetAdminDashboardStatsQueryVariables,
) =>
  fetcher<GetAdminDashboardStatsQuery, GetAdminDashboardStatsQueryVariables>(
    GetAdminDashboardStatsDocument,
    variables,
  )

export const GetAdminSystemHealthDocument = `
    query GetAdminSystemHealth {
  adminSystemHealth {
    database {
      status
      message
      latency
    }
    stripe {
      status
      message
      latency
    }
    resend {
      status
      message
      latency
    }
    email {
      status
      message
      latency
    }
  }
}
    `

export const useGetAdminSystemHealthQuery = <
  TData = GetAdminSystemHealthQuery,
  TError = unknown,
>(
  variables?: GetAdminSystemHealthQueryVariables,
  options?: Omit<
    UseQueryOptions<GetAdminSystemHealthQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetAdminSystemHealthQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useQuery<GetAdminSystemHealthQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetAdminSystemHealth']
        : ['GetAdminSystemHealth', variables],
    queryFn: fetcher<
      GetAdminSystemHealthQuery,
      GetAdminSystemHealthQueryVariables
    >(GetAdminSystemHealthDocument, variables),
    ...options,
  })
}

useGetAdminSystemHealthQuery.getKey = (
  variables?: GetAdminSystemHealthQueryVariables,
) =>
  variables === undefined
    ? ['GetAdminSystemHealth']
    : ['GetAdminSystemHealth', variables]

export const useInfiniteGetAdminSystemHealthQuery = <
  TData = InfiniteData<GetAdminSystemHealthQuery>,
  TError = unknown,
>(
  variables: GetAdminSystemHealthQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetAdminSystemHealthQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetAdminSystemHealthQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetAdminSystemHealthQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['GetAdminSystemHealth.infinite']
            : ['GetAdminSystemHealth.infinite', variables],
        queryFn: (metaData) =>
          fetcher<
            GetAdminSystemHealthQuery,
            GetAdminSystemHealthQueryVariables
          >(GetAdminSystemHealthDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetAdminSystemHealthQuery.getKey = (
  variables?: GetAdminSystemHealthQueryVariables,
) =>
  variables === undefined
    ? ['GetAdminSystemHealth.infinite']
    : ['GetAdminSystemHealth.infinite', variables]

useGetAdminSystemHealthQuery.fetcher = (
  variables?: GetAdminSystemHealthQueryVariables,
) =>
  fetcher<GetAdminSystemHealthQuery, GetAdminSystemHealthQueryVariables>(
    GetAdminSystemHealthDocument,
    variables,
  )

export const CreateCheckoutDocument = `
    mutation CreateCheckout($planId: String!, $interval: String) {
  createCheckout(planId: $planId, interval: $interval) {
    url
    sessionId
  }
}
    `

export const useCreateCheckoutMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateCheckoutMutation,
    TError,
    CreateCheckoutMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CreateCheckoutMutation,
    TError,
    CreateCheckoutMutationVariables,
    TContext
  >({
    mutationKey: ['CreateCheckout'],
    mutationFn: (variables?: CreateCheckoutMutationVariables) =>
      fetcher<CreateCheckoutMutation, CreateCheckoutMutationVariables>(
        CreateCheckoutDocument,
        variables,
      )(),
    ...options,
  })
}

useCreateCheckoutMutation.fetcher = (
  variables: CreateCheckoutMutationVariables,
) =>
  fetcher<CreateCheckoutMutation, CreateCheckoutMutationVariables>(
    CreateCheckoutDocument,
    variables,
  )

export const CreateCreditCheckoutDocument = `
    mutation CreateCreditCheckout($packId: String!) {
  createCreditCheckout(packId: $packId) {
    url
    sessionId
  }
}
    `

export const useCreateCreditCheckoutMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    CreateCreditCheckoutMutation,
    TError,
    CreateCreditCheckoutMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CreateCreditCheckoutMutation,
    TError,
    CreateCreditCheckoutMutationVariables,
    TContext
  >({
    mutationKey: ['CreateCreditCheckout'],
    mutationFn: (variables?: CreateCreditCheckoutMutationVariables) =>
      fetcher<
        CreateCreditCheckoutMutation,
        CreateCreditCheckoutMutationVariables
      >(CreateCreditCheckoutDocument, variables)(),
    ...options,
  })
}

useCreateCreditCheckoutMutation.fetcher = (
  variables: CreateCreditCheckoutMutationVariables,
) =>
  fetcher<CreateCreditCheckoutMutation, CreateCreditCheckoutMutationVariables>(
    CreateCreditCheckoutDocument,
    variables,
  )

export const CreateCustomerPortalDocument = `
    mutation CreateCustomerPortal {
  createCustomerPortal {
    url
  }
}
    `

export const useCreateCustomerPortalMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    CreateCustomerPortalMutation,
    TError,
    CreateCustomerPortalMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CreateCustomerPortalMutation,
    TError,
    CreateCustomerPortalMutationVariables,
    TContext
  >({
    mutationKey: ['CreateCustomerPortal'],
    mutationFn: (variables?: CreateCustomerPortalMutationVariables) =>
      fetcher<
        CreateCustomerPortalMutation,
        CreateCustomerPortalMutationVariables
      >(CreateCustomerPortalDocument, variables)(),
    ...options,
  })
}

useCreateCustomerPortalMutation.fetcher = (
  variables?: CreateCustomerPortalMutationVariables,
) =>
  fetcher<CreateCustomerPortalMutation, CreateCustomerPortalMutationVariables>(
    CreateCustomerPortalDocument,
    variables,
  )

export const GetCreditBalanceDocument = `
    query GetCreditBalance {
  creditBalance {
    balance
    planId
    subscriptionStatus
    cancelAtPeriodEnd
    subscriptionEndDate
    currentPeriodEnd
  }
}
    `

export const useGetCreditBalanceQuery = <
  TData = GetCreditBalanceQuery,
  TError = unknown,
>(
  variables?: GetCreditBalanceQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCreditBalanceQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetCreditBalanceQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetCreditBalanceQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetCreditBalance']
        : ['GetCreditBalance', variables],
    queryFn: fetcher<GetCreditBalanceQuery, GetCreditBalanceQueryVariables>(
      GetCreditBalanceDocument,
      variables,
    ),
    ...options,
  })
}

useGetCreditBalanceQuery.getKey = (
  variables?: GetCreditBalanceQueryVariables,
) =>
  variables === undefined
    ? ['GetCreditBalance']
    : ['GetCreditBalance', variables]

export const useInfiniteGetCreditBalanceQuery = <
  TData = InfiniteData<GetCreditBalanceQuery>,
  TError = unknown,
>(
  variables: GetCreditBalanceQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetCreditBalanceQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetCreditBalanceQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetCreditBalanceQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['GetCreditBalance.infinite']
            : ['GetCreditBalance.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetCreditBalanceQuery, GetCreditBalanceQueryVariables>(
            GetCreditBalanceDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetCreditBalanceQuery.getKey = (
  variables?: GetCreditBalanceQueryVariables,
) =>
  variables === undefined
    ? ['GetCreditBalance.infinite']
    : ['GetCreditBalance.infinite', variables]

useGetCreditBalanceQuery.fetcher = (
  variables?: GetCreditBalanceQueryVariables,
) =>
  fetcher<GetCreditBalanceQuery, GetCreditBalanceQueryVariables>(
    GetCreditBalanceDocument,
    variables,
  )

export const GetCreditHistoryDocument = `
    query GetCreditHistory($limit: Int) {
  creditHistory(limit: $limit) {
    id
    amount
    type
    description
    balanceAfter
    createdAt
    metadata
  }
}
    `

export const useGetCreditHistoryQuery = <
  TData = GetCreditHistoryQuery,
  TError = unknown,
>(
  variables?: GetCreditHistoryQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCreditHistoryQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetCreditHistoryQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetCreditHistoryQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetCreditHistory']
        : ['GetCreditHistory', variables],
    queryFn: fetcher<GetCreditHistoryQuery, GetCreditHistoryQueryVariables>(
      GetCreditHistoryDocument,
      variables,
    ),
    ...options,
  })
}

useGetCreditHistoryQuery.getKey = (
  variables?: GetCreditHistoryQueryVariables,
) =>
  variables === undefined
    ? ['GetCreditHistory']
    : ['GetCreditHistory', variables]

export const useInfiniteGetCreditHistoryQuery = <
  TData = InfiniteData<GetCreditHistoryQuery>,
  TError = unknown,
>(
  variables: GetCreditHistoryQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetCreditHistoryQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetCreditHistoryQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetCreditHistoryQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['GetCreditHistory.infinite']
            : ['GetCreditHistory.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetCreditHistoryQuery, GetCreditHistoryQueryVariables>(
            GetCreditHistoryDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetCreditHistoryQuery.getKey = (
  variables?: GetCreditHistoryQueryVariables,
) =>
  variables === undefined
    ? ['GetCreditHistory.infinite']
    : ['GetCreditHistory.infinite', variables]

useGetCreditHistoryQuery.fetcher = (
  variables?: GetCreditHistoryQueryVariables,
) =>
  fetcher<GetCreditHistoryQuery, GetCreditHistoryQueryVariables>(
    GetCreditHistoryDocument,
    variables,
  )

export const GetBillingPlansDocument = `
    query GetBillingPlans {
  billingPlans {
    id
    name
    description
    priceMonthly
    priceYearly
    creditsPerMonth
    features
  }
}
    `

export const useGetBillingPlansQuery = <
  TData = GetBillingPlansQuery,
  TError = unknown,
>(
  variables?: GetBillingPlansQueryVariables,
  options?: Omit<
    UseQueryOptions<GetBillingPlansQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetBillingPlansQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetBillingPlansQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetBillingPlans']
        : ['GetBillingPlans', variables],
    queryFn: fetcher<GetBillingPlansQuery, GetBillingPlansQueryVariables>(
      GetBillingPlansDocument,
      variables,
    ),
    ...options,
  })
}

useGetBillingPlansQuery.getKey = (variables?: GetBillingPlansQueryVariables) =>
  variables === undefined ? ['GetBillingPlans'] : ['GetBillingPlans', variables]

export const useInfiniteGetBillingPlansQuery = <
  TData = InfiniteData<GetBillingPlansQuery>,
  TError = unknown,
>(
  variables: GetBillingPlansQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetBillingPlansQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetBillingPlansQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetBillingPlansQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['GetBillingPlans.infinite']
            : ['GetBillingPlans.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetBillingPlansQuery, GetBillingPlansQueryVariables>(
            GetBillingPlansDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetBillingPlansQuery.getKey = (
  variables?: GetBillingPlansQueryVariables,
) =>
  variables === undefined
    ? ['GetBillingPlans.infinite']
    : ['GetBillingPlans.infinite', variables]

useGetBillingPlansQuery.fetcher = (variables?: GetBillingPlansQueryVariables) =>
  fetcher<GetBillingPlansQuery, GetBillingPlansQueryVariables>(
    GetBillingPlansDocument,
    variables,
  )

export const GetCreditPacksDocument = `
    query GetCreditPacks {
  creditPacks {
    id
    name
    credits
    price
  }
}
    `

export const useGetCreditPacksQuery = <
  TData = GetCreditPacksQuery,
  TError = unknown,
>(
  variables?: GetCreditPacksQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCreditPacksQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetCreditPacksQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetCreditPacksQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetCreditPacks']
        : ['GetCreditPacks', variables],
    queryFn: fetcher<GetCreditPacksQuery, GetCreditPacksQueryVariables>(
      GetCreditPacksDocument,
      variables,
    ),
    ...options,
  })
}

useGetCreditPacksQuery.getKey = (variables?: GetCreditPacksQueryVariables) =>
  variables === undefined ? ['GetCreditPacks'] : ['GetCreditPacks', variables]

export const useInfiniteGetCreditPacksQuery = <
  TData = InfiniteData<GetCreditPacksQuery>,
  TError = unknown,
>(
  variables: GetCreditPacksQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetCreditPacksQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetCreditPacksQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetCreditPacksQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['GetCreditPacks.infinite']
            : ['GetCreditPacks.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetCreditPacksQuery, GetCreditPacksQueryVariables>(
            GetCreditPacksDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetCreditPacksQuery.getKey = (
  variables?: GetCreditPacksQueryVariables,
) =>
  variables === undefined
    ? ['GetCreditPacks.infinite']
    : ['GetCreditPacks.infinite', variables]

useGetCreditPacksQuery.fetcher = (variables?: GetCreditPacksQueryVariables) =>
  fetcher<GetCreditPacksQuery, GetCreditPacksQueryVariables>(
    GetCreditPacksDocument,
    variables,
  )

export const MarkNotificationReadDocument = `
    mutation MarkNotificationRead($notificationId: String!) {
  markNotificationRead(notificationId: $notificationId) {
    id
    read
    readAt
  }
}
    `

export const useMarkNotificationReadMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    MarkNotificationReadMutation,
    TError,
    MarkNotificationReadMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    MarkNotificationReadMutation,
    TError,
    MarkNotificationReadMutationVariables,
    TContext
  >({
    mutationKey: ['MarkNotificationRead'],
    mutationFn: (variables?: MarkNotificationReadMutationVariables) =>
      fetcher<
        MarkNotificationReadMutation,
        MarkNotificationReadMutationVariables
      >(MarkNotificationReadDocument, variables)(),
    ...options,
  })
}

useMarkNotificationReadMutation.fetcher = (
  variables: MarkNotificationReadMutationVariables,
) =>
  fetcher<MarkNotificationReadMutation, MarkNotificationReadMutationVariables>(
    MarkNotificationReadDocument,
    variables,
  )

export const MarkAllNotificationsReadDocument = `
    mutation MarkAllNotificationsRead {
  markAllNotificationsRead
}
    `

export const useMarkAllNotificationsReadMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    MarkAllNotificationsReadMutation,
    TError,
    MarkAllNotificationsReadMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    MarkAllNotificationsReadMutation,
    TError,
    MarkAllNotificationsReadMutationVariables,
    TContext
  >({
    mutationKey: ['MarkAllNotificationsRead'],
    mutationFn: (variables?: MarkAllNotificationsReadMutationVariables) =>
      fetcher<
        MarkAllNotificationsReadMutation,
        MarkAllNotificationsReadMutationVariables
      >(MarkAllNotificationsReadDocument, variables)(),
    ...options,
  })
}

useMarkAllNotificationsReadMutation.fetcher = (
  variables?: MarkAllNotificationsReadMutationVariables,
) =>
  fetcher<
    MarkAllNotificationsReadMutation,
    MarkAllNotificationsReadMutationVariables
  >(MarkAllNotificationsReadDocument, variables)

export const GetNotificationsDocument = `
    query GetNotifications($limit: Int) {
  notifications(limit: $limit) {
    id
    title
    message
    type
    link
    read
    createdAt
    readAt
  }
}
    `

export const useGetNotificationsQuery = <
  TData = GetNotificationsQuery,
  TError = unknown,
>(
  variables?: GetNotificationsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetNotificationsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetNotificationsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetNotificationsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetNotifications']
        : ['GetNotifications', variables],
    queryFn: fetcher<GetNotificationsQuery, GetNotificationsQueryVariables>(
      GetNotificationsDocument,
      variables,
    ),
    ...options,
  })
}

useGetNotificationsQuery.getKey = (
  variables?: GetNotificationsQueryVariables,
) =>
  variables === undefined
    ? ['GetNotifications']
    : ['GetNotifications', variables]

export const useInfiniteGetNotificationsQuery = <
  TData = InfiniteData<GetNotificationsQuery>,
  TError = unknown,
>(
  variables: GetNotificationsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetNotificationsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetNotificationsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetNotificationsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['GetNotifications.infinite']
            : ['GetNotifications.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetNotificationsQuery, GetNotificationsQueryVariables>(
            GetNotificationsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetNotificationsQuery.getKey = (
  variables?: GetNotificationsQueryVariables,
) =>
  variables === undefined
    ? ['GetNotifications.infinite']
    : ['GetNotifications.infinite', variables]

useGetNotificationsQuery.fetcher = (
  variables?: GetNotificationsQueryVariables,
) =>
  fetcher<GetNotificationsQuery, GetNotificationsQueryVariables>(
    GetNotificationsDocument,
    variables,
  )

export const GetUnreadNotificationCountDocument = `
    query GetUnreadNotificationCount {
  unreadNotificationCount {
    count
  }
}
    `

export const useGetUnreadNotificationCountQuery = <
  TData = GetUnreadNotificationCountQuery,
  TError = unknown,
>(
  variables?: GetUnreadNotificationCountQueryVariables,
  options?: Omit<
    UseQueryOptions<GetUnreadNotificationCountQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetUnreadNotificationCountQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useQuery<GetUnreadNotificationCountQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetUnreadNotificationCount']
        : ['GetUnreadNotificationCount', variables],
    queryFn: fetcher<
      GetUnreadNotificationCountQuery,
      GetUnreadNotificationCountQueryVariables
    >(GetUnreadNotificationCountDocument, variables),
    ...options,
  })
}

useGetUnreadNotificationCountQuery.getKey = (
  variables?: GetUnreadNotificationCountQueryVariables,
) =>
  variables === undefined
    ? ['GetUnreadNotificationCount']
    : ['GetUnreadNotificationCount', variables]

export const useInfiniteGetUnreadNotificationCountQuery = <
  TData = InfiniteData<GetUnreadNotificationCountQuery>,
  TError = unknown,
>(
  variables: GetUnreadNotificationCountQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetUnreadNotificationCountQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetUnreadNotificationCountQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetUnreadNotificationCountQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['GetUnreadNotificationCount.infinite']
            : ['GetUnreadNotificationCount.infinite', variables],
        queryFn: (metaData) =>
          fetcher<
            GetUnreadNotificationCountQuery,
            GetUnreadNotificationCountQueryVariables
          >(GetUnreadNotificationCountDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetUnreadNotificationCountQuery.getKey = (
  variables?: GetUnreadNotificationCountQueryVariables,
) =>
  variables === undefined
    ? ['GetUnreadNotificationCount.infinite']
    : ['GetUnreadNotificationCount.infinite', variables]

useGetUnreadNotificationCountQuery.fetcher = (
  variables?: GetUnreadNotificationCountQueryVariables,
) =>
  fetcher<
    GetUnreadNotificationCountQuery,
    GetUnreadNotificationCountQueryVariables
  >(GetUnreadNotificationCountDocument, variables)

export const GetUserOrganizationsDocument = `
    query GetUserOrganizations {
  userOrganizations {
    id
    name
    slug
    role
    logo
  }
}
    `

export const useGetUserOrganizationsQuery = <
  TData = GetUserOrganizationsQuery,
  TError = unknown,
>(
  variables?: GetUserOrganizationsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetUserOrganizationsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetUserOrganizationsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useQuery<GetUserOrganizationsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetUserOrganizations']
        : ['GetUserOrganizations', variables],
    queryFn: fetcher<
      GetUserOrganizationsQuery,
      GetUserOrganizationsQueryVariables
    >(GetUserOrganizationsDocument, variables),
    ...options,
  })
}

useGetUserOrganizationsQuery.getKey = (
  variables?: GetUserOrganizationsQueryVariables,
) =>
  variables === undefined
    ? ['GetUserOrganizations']
    : ['GetUserOrganizations', variables]

export const useInfiniteGetUserOrganizationsQuery = <
  TData = InfiniteData<GetUserOrganizationsQuery>,
  TError = unknown,
>(
  variables: GetUserOrganizationsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetUserOrganizationsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetUserOrganizationsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetUserOrganizationsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['GetUserOrganizations.infinite']
            : ['GetUserOrganizations.infinite', variables],
        queryFn: (metaData) =>
          fetcher<
            GetUserOrganizationsQuery,
            GetUserOrganizationsQueryVariables
          >(GetUserOrganizationsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetUserOrganizationsQuery.getKey = (
  variables?: GetUserOrganizationsQueryVariables,
) =>
  variables === undefined
    ? ['GetUserOrganizations.infinite']
    : ['GetUserOrganizations.infinite', variables]

useGetUserOrganizationsQuery.fetcher = (
  variables?: GetUserOrganizationsQueryVariables,
) =>
  fetcher<GetUserOrganizationsQuery, GetUserOrganizationsQueryVariables>(
    GetUserOrganizationsDocument,
    variables,
  )

export const CategoriesDocument = `
    query Categories {
  categories {
    id
    name
    organizationId
    createdAt
  }
}
    `

export const useCategoriesQuery = <TData = CategoriesQuery, TError = unknown>(
  variables?: CategoriesQueryVariables,
  options?: Omit<
    UseQueryOptions<CategoriesQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<CategoriesQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<CategoriesQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['Categories'] : ['Categories', variables],
    queryFn: fetcher<CategoriesQuery, CategoriesQueryVariables>(
      CategoriesDocument,
      variables,
    ),
    ...options,
  })
}

useCategoriesQuery.getKey = (variables?: CategoriesQueryVariables) =>
  variables === undefined ? ['Categories'] : ['Categories', variables]

export const useInfiniteCategoriesQuery = <
  TData = InfiniteData<CategoriesQuery>,
  TError = unknown,
>(
  variables: CategoriesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<CategoriesQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      CategoriesQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<CategoriesQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['Categories.infinite']
            : ['Categories.infinite', variables],
        queryFn: (metaData) =>
          fetcher<CategoriesQuery, CategoriesQueryVariables>(
            CategoriesDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteCategoriesQuery.getKey = (variables?: CategoriesQueryVariables) =>
  variables === undefined
    ? ['Categories.infinite']
    : ['Categories.infinite', variables]

useCategoriesQuery.fetcher = (variables?: CategoriesQueryVariables) =>
  fetcher<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    variables,
  )

export const CreateCategoryDocument = `
    mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    id
    name
    organizationId
    createdAt
  }
}
    `

export const useCreateCategoryMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateCategoryMutation,
    TError,
    CreateCategoryMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CreateCategoryMutation,
    TError,
    CreateCategoryMutationVariables,
    TContext
  >({
    mutationKey: ['CreateCategory'],
    mutationFn: (variables?: CreateCategoryMutationVariables) =>
      fetcher<CreateCategoryMutation, CreateCategoryMutationVariables>(
        CreateCategoryDocument,
        variables,
      )(),
    ...options,
  })
}

useCreateCategoryMutation.fetcher = (
  variables: CreateCategoryMutationVariables,
) =>
  fetcher<CreateCategoryMutation, CreateCategoryMutationVariables>(
    CreateCategoryDocument,
    variables,
  )

export const UpdateCategoryDocument = `
    mutation UpdateCategory($id: String!, $input: UpdateCategoryInput!) {
  updateCategory(id: $id, input: $input) {
    id
    name
    organizationId
    createdAt
  }
}
    `

export const useUpdateCategoryMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateCategoryMutation,
    TError,
    UpdateCategoryMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    UpdateCategoryMutation,
    TError,
    UpdateCategoryMutationVariables,
    TContext
  >({
    mutationKey: ['UpdateCategory'],
    mutationFn: (variables?: UpdateCategoryMutationVariables) =>
      fetcher<UpdateCategoryMutation, UpdateCategoryMutationVariables>(
        UpdateCategoryDocument,
        variables,
      )(),
    ...options,
  })
}

useUpdateCategoryMutation.fetcher = (
  variables: UpdateCategoryMutationVariables,
) =>
  fetcher<UpdateCategoryMutation, UpdateCategoryMutationVariables>(
    UpdateCategoryDocument,
    variables,
  )

export const DeleteCategoryDocument = `
    mutation DeleteCategory($id: String!) {
  deleteCategory(id: $id)
}
    `

export const useDeleteCategoryMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteCategoryMutation,
    TError,
    DeleteCategoryMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    DeleteCategoryMutation,
    TError,
    DeleteCategoryMutationVariables,
    TContext
  >({
    mutationKey: ['DeleteCategory'],
    mutationFn: (variables?: DeleteCategoryMutationVariables) =>
      fetcher<DeleteCategoryMutation, DeleteCategoryMutationVariables>(
        DeleteCategoryDocument,
        variables,
      )(),
    ...options,
  })
}

useDeleteCategoryMutation.fetcher = (
  variables: DeleteCategoryMutationVariables,
) =>
  fetcher<DeleteCategoryMutation, DeleteCategoryMutationVariables>(
    DeleteCategoryDocument,
    variables,
  )

export const TodaysPulseDocument = `
    query TodaysPulse {
  todaysPulse {
    totalSales
    totalCost
    grossProfit
    transactionCount
    totalRefunds
  }
}
    `

export const useTodaysPulseQuery = <TData = TodaysPulseQuery, TError = unknown>(
  variables?: TodaysPulseQueryVariables,
  options?: Omit<
    UseQueryOptions<TodaysPulseQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<TodaysPulseQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<TodaysPulseQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['TodaysPulse'] : ['TodaysPulse', variables],
    queryFn: fetcher<TodaysPulseQuery, TodaysPulseQueryVariables>(
      TodaysPulseDocument,
      variables,
    ),
    ...options,
  })
}

useTodaysPulseQuery.getKey = (variables?: TodaysPulseQueryVariables) =>
  variables === undefined ? ['TodaysPulse'] : ['TodaysPulse', variables]

export const useInfiniteTodaysPulseQuery = <
  TData = InfiniteData<TodaysPulseQuery>,
  TError = unknown,
>(
  variables: TodaysPulseQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<TodaysPulseQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      TodaysPulseQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<TodaysPulseQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['TodaysPulse.infinite']
            : ['TodaysPulse.infinite', variables],
        queryFn: (metaData) =>
          fetcher<TodaysPulseQuery, TodaysPulseQueryVariables>(
            TodaysPulseDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteTodaysPulseQuery.getKey = (variables?: TodaysPulseQueryVariables) =>
  variables === undefined
    ? ['TodaysPulse.infinite']
    : ['TodaysPulse.infinite', variables]

useTodaysPulseQuery.fetcher = (variables?: TodaysPulseQueryVariables) =>
  fetcher<TodaysPulseQuery, TodaysPulseQueryVariables>(
    TodaysPulseDocument,
    variables,
  )

export const SalesTrendDocument = `
    query SalesTrend($days: Int) {
  salesTrend(days: $days) {
    date
    sales
    cost
    profit
  }
}
    `

export const useSalesTrendQuery = <TData = SalesTrendQuery, TError = unknown>(
  variables?: SalesTrendQueryVariables,
  options?: Omit<
    UseQueryOptions<SalesTrendQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<SalesTrendQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<SalesTrendQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['SalesTrend'] : ['SalesTrend', variables],
    queryFn: fetcher<SalesTrendQuery, SalesTrendQueryVariables>(
      SalesTrendDocument,
      variables,
    ),
    ...options,
  })
}

useSalesTrendQuery.getKey = (variables?: SalesTrendQueryVariables) =>
  variables === undefined ? ['SalesTrend'] : ['SalesTrend', variables]

export const useInfiniteSalesTrendQuery = <
  TData = InfiniteData<SalesTrendQuery>,
  TError = unknown,
>(
  variables: SalesTrendQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<SalesTrendQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      SalesTrendQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<SalesTrendQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['SalesTrend.infinite']
            : ['SalesTrend.infinite', variables],
        queryFn: (metaData) =>
          fetcher<SalesTrendQuery, SalesTrendQueryVariables>(
            SalesTrendDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteSalesTrendQuery.getKey = (variables?: SalesTrendQueryVariables) =>
  variables === undefined
    ? ['SalesTrend.infinite']
    : ['SalesTrend.infinite', variables]

useSalesTrendQuery.fetcher = (variables?: SalesTrendQueryVariables) =>
  fetcher<SalesTrendQuery, SalesTrendQueryVariables>(
    SalesTrendDocument,
    variables,
  )

export const TopProductsDocument = `
    query TopProducts($limit: Int, $startDate: DateTime, $endDate: DateTime) {
  topProducts(limit: $limit, startDate: $startDate, endDate: $endDate) {
    productId
    productName
    quantitySold
    revenue
  }
}
    `

export const useTopProductsQuery = <TData = TopProductsQuery, TError = unknown>(
  variables?: TopProductsQueryVariables,
  options?: Omit<
    UseQueryOptions<TopProductsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<TopProductsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<TopProductsQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['TopProducts'] : ['TopProducts', variables],
    queryFn: fetcher<TopProductsQuery, TopProductsQueryVariables>(
      TopProductsDocument,
      variables,
    ),
    ...options,
  })
}

useTopProductsQuery.getKey = (variables?: TopProductsQueryVariables) =>
  variables === undefined ? ['TopProducts'] : ['TopProducts', variables]

export const useInfiniteTopProductsQuery = <
  TData = InfiniteData<TopProductsQuery>,
  TError = unknown,
>(
  variables: TopProductsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<TopProductsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      TopProductsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<TopProductsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['TopProducts.infinite']
            : ['TopProducts.infinite', variables],
        queryFn: (metaData) =>
          fetcher<TopProductsQuery, TopProductsQueryVariables>(
            TopProductsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteTopProductsQuery.getKey = (variables?: TopProductsQueryVariables) =>
  variables === undefined
    ? ['TopProducts.infinite']
    : ['TopProducts.infinite', variables]

useTopProductsQuery.fetcher = (variables?: TopProductsQueryVariables) =>
  fetcher<TopProductsQuery, TopProductsQueryVariables>(
    TopProductsDocument,
    variables,
  )

export const DashboardLowStockDocument = `
    query DashboardLowStock($threshold: Int) {
  lowStockProducts(threshold: $threshold) {
    productId
    productName
    currentStock
    barcode
  }
}
    `

export const useDashboardLowStockQuery = <
  TData = DashboardLowStockQuery,
  TError = unknown,
>(
  variables?: DashboardLowStockQueryVariables,
  options?: Omit<
    UseQueryOptions<DashboardLowStockQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      DashboardLowStockQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useQuery<DashboardLowStockQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['DashboardLowStock']
        : ['DashboardLowStock', variables],
    queryFn: fetcher<DashboardLowStockQuery, DashboardLowStockQueryVariables>(
      DashboardLowStockDocument,
      variables,
    ),
    ...options,
  })
}

useDashboardLowStockQuery.getKey = (
  variables?: DashboardLowStockQueryVariables,
) =>
  variables === undefined
    ? ['DashboardLowStock']
    : ['DashboardLowStock', variables]

export const useInfiniteDashboardLowStockQuery = <
  TData = InfiniteData<DashboardLowStockQuery>,
  TError = unknown,
>(
  variables: DashboardLowStockQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<DashboardLowStockQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      DashboardLowStockQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<DashboardLowStockQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['DashboardLowStock.infinite']
            : ['DashboardLowStock.infinite', variables],
        queryFn: (metaData) =>
          fetcher<DashboardLowStockQuery, DashboardLowStockQueryVariables>(
            DashboardLowStockDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteDashboardLowStockQuery.getKey = (
  variables?: DashboardLowStockQueryVariables,
) =>
  variables === undefined
    ? ['DashboardLowStock.infinite']
    : ['DashboardLowStock.infinite', variables]

useDashboardLowStockQuery.fetcher = (
  variables?: DashboardLowStockQueryVariables,
) =>
  fetcher<DashboardLowStockQuery, DashboardLowStockQueryVariables>(
    DashboardLowStockDocument,
    variables,
  )

export const ProductSalesHistoryDocument = `
    query ProductSalesHistory($productId: String!, $startDate: DateTime, $endDate: DateTime, $limit: Int) {
  productSalesHistory(
    productId: $productId
    startDate: $startDate
    endDate: $endDate
    limit: $limit
  ) {
    saleId
    receiptNo
    quantity
    unitPrice
    unitCost
    subtotal
    paymentMethod
    saleType
    createdAt
  }
}
    `

export const useProductSalesHistoryQuery = <
  TData = ProductSalesHistoryQuery,
  TError = unknown,
>(
  variables: ProductSalesHistoryQueryVariables,
  options?: Omit<
    UseQueryOptions<ProductSalesHistoryQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      ProductSalesHistoryQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useQuery<ProductSalesHistoryQuery, TError, TData>({
    queryKey: ['ProductSalesHistory', variables],
    queryFn: fetcher<
      ProductSalesHistoryQuery,
      ProductSalesHistoryQueryVariables
    >(ProductSalesHistoryDocument, variables),
    ...options,
  })
}

useProductSalesHistoryQuery.getKey = (
  variables: ProductSalesHistoryQueryVariables,
) => ['ProductSalesHistory', variables]

export const useInfiniteProductSalesHistoryQuery = <
  TData = InfiniteData<ProductSalesHistoryQuery>,
  TError = unknown,
>(
  variables: ProductSalesHistoryQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ProductSalesHistoryQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ProductSalesHistoryQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<ProductSalesHistoryQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? [
          'ProductSalesHistory.infinite',
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<ProductSalesHistoryQuery, ProductSalesHistoryQueryVariables>(
            ProductSalesHistoryDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteProductSalesHistoryQuery.getKey = (
  variables: ProductSalesHistoryQueryVariables,
) => ['ProductSalesHistory.infinite', variables]

useProductSalesHistoryQuery.fetcher = (
  variables: ProductSalesHistoryQueryVariables,
) =>
  fetcher<ProductSalesHistoryQuery, ProductSalesHistoryQueryVariables>(
    ProductSalesHistoryDocument,
    variables,
  )

export const ProductAnalyticsDocument = `
    query ProductAnalytics($productId: String!, $startDate: DateTime, $endDate: DateTime) {
  productAnalytics(
    productId: $productId
    startDate: $startDate
    endDate: $endDate
  ) {
    totalRevenue
    totalUnitsSold
    totalCost
    grossProfit
    profitMargin
    averageSalePrice
    firstSaleDate
    lastSaleDate
    transactionCount
    refundedUnits
    refundRate
  }
}
    `

export const useProductAnalyticsQuery = <
  TData = ProductAnalyticsQuery,
  TError = unknown,
>(
  variables: ProductAnalyticsQueryVariables,
  options?: Omit<
    UseQueryOptions<ProductAnalyticsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<ProductAnalyticsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<ProductAnalyticsQuery, TError, TData>({
    queryKey: ['ProductAnalytics', variables],
    queryFn: fetcher<ProductAnalyticsQuery, ProductAnalyticsQueryVariables>(
      ProductAnalyticsDocument,
      variables,
    ),
    ...options,
  })
}

useProductAnalyticsQuery.getKey = (
  variables: ProductAnalyticsQueryVariables,
) => ['ProductAnalytics', variables]

export const useInfiniteProductAnalyticsQuery = <
  TData = InfiniteData<ProductAnalyticsQuery>,
  TError = unknown,
>(
  variables: ProductAnalyticsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ProductAnalyticsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ProductAnalyticsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<ProductAnalyticsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['ProductAnalytics.infinite', variables],
        queryFn: (metaData) =>
          fetcher<ProductAnalyticsQuery, ProductAnalyticsQueryVariables>(
            ProductAnalyticsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteProductAnalyticsQuery.getKey = (
  variables: ProductAnalyticsQueryVariables,
) => ['ProductAnalytics.infinite', variables]

useProductAnalyticsQuery.fetcher = (
  variables: ProductAnalyticsQueryVariables,
) =>
  fetcher<ProductAnalyticsQuery, ProductAnalyticsQueryVariables>(
    ProductAnalyticsDocument,
    variables,
  )

export const ProductSalesTrendDocument = `
    query ProductSalesTrend($productId: String!, $days: Int!) {
  productSalesTrend(productId: $productId, days: $days) {
    date
    unitsSold
    revenue
    cost
    profit
  }
}
    `

export const useProductSalesTrendQuery = <
  TData = ProductSalesTrendQuery,
  TError = unknown,
>(
  variables: ProductSalesTrendQueryVariables,
  options?: Omit<
    UseQueryOptions<ProductSalesTrendQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      ProductSalesTrendQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useQuery<ProductSalesTrendQuery, TError, TData>({
    queryKey: ['ProductSalesTrend', variables],
    queryFn: fetcher<ProductSalesTrendQuery, ProductSalesTrendQueryVariables>(
      ProductSalesTrendDocument,
      variables,
    ),
    ...options,
  })
}

useProductSalesTrendQuery.getKey = (
  variables: ProductSalesTrendQueryVariables,
) => ['ProductSalesTrend', variables]

export const useInfiniteProductSalesTrendQuery = <
  TData = InfiniteData<ProductSalesTrendQuery>,
  TError = unknown,
>(
  variables: ProductSalesTrendQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ProductSalesTrendQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ProductSalesTrendQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<ProductSalesTrendQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['ProductSalesTrend.infinite', variables],
        queryFn: (metaData) =>
          fetcher<ProductSalesTrendQuery, ProductSalesTrendQueryVariables>(
            ProductSalesTrendDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteProductSalesTrendQuery.getKey = (
  variables: ProductSalesTrendQueryVariables,
) => ['ProductSalesTrend.infinite', variables]

useProductSalesTrendQuery.fetcher = (
  variables: ProductSalesTrendQueryVariables,
) =>
  fetcher<ProductSalesTrendQuery, ProductSalesTrendQueryVariables>(
    ProductSalesTrendDocument,
    variables,
  )

export const ProductWithAnalyticsDocument = `
    query ProductWithAnalytics($productId: String!, $days: Int) {
  product(id: $productId) {
    id
    name
    searchName
    barcode
    description
    sellingPrice
    isActive
    categoryId
    organizationId
    createdAt
    updatedAt
    category {
      id
      name
    }
  }
  productStock(productId: $productId) {
    totalStock
    averageCost
    lots {
      id
      productId
      quantity
      remaining
      costPrice
      supplier
      notes
      purchasedAt
      createdAt
    }
  }
  productAnalytics(productId: $productId, days: $days) {
    totalRevenue
    totalUnitsSold
    totalCost
    grossProfit
    profitMargin
    averageSalePrice
    firstSaleDate
    lastSaleDate
    transactionCount
    refundedUnits
    refundRate
  }
}
    `

export const useProductWithAnalyticsQuery = <
  TData = ProductWithAnalyticsQuery,
  TError = unknown,
>(
  variables: ProductWithAnalyticsQueryVariables,
  options?: Omit<
    UseQueryOptions<ProductWithAnalyticsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      ProductWithAnalyticsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useQuery<ProductWithAnalyticsQuery, TError, TData>({
    queryKey: ['ProductWithAnalytics', variables],
    queryFn: fetcher<
      ProductWithAnalyticsQuery,
      ProductWithAnalyticsQueryVariables
    >(ProductWithAnalyticsDocument, variables),
    ...options,
  })
}

useProductWithAnalyticsQuery.getKey = (
  variables: ProductWithAnalyticsQueryVariables,
) => ['ProductWithAnalytics', variables]

export const useInfiniteProductWithAnalyticsQuery = <
  TData = InfiniteData<ProductWithAnalyticsQuery>,
  TError = unknown,
>(
  variables: ProductWithAnalyticsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ProductWithAnalyticsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ProductWithAnalyticsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<ProductWithAnalyticsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? [
          'ProductWithAnalytics.infinite',
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            ProductWithAnalyticsQuery,
            ProductWithAnalyticsQueryVariables
          >(ProductWithAnalyticsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteProductWithAnalyticsQuery.getKey = (
  variables: ProductWithAnalyticsQueryVariables,
) => ['ProductWithAnalytics.infinite', variables]

useProductWithAnalyticsQuery.fetcher = (
  variables: ProductWithAnalyticsQueryVariables,
) =>
  fetcher<ProductWithAnalyticsQuery, ProductWithAnalyticsQueryVariables>(
    ProductWithAnalyticsDocument,
    variables,
  )

export const ProductImagesDocument = `
    query ProductImages($productId: String!) {
  productImages(productId: $productId) {
    id
    productId
    fileId
    isPrimary
    displayOrder
    createdAt
    updatedAt
    file {
      id
      filename
      contentType
      size
      url
      fileHash
      createdAt
    }
  }
}
    `

export const useProductImagesQuery = <
  TData = ProductImagesQuery,
  TError = unknown,
>(
  variables: ProductImagesQueryVariables,
  options?: Omit<
    UseQueryOptions<ProductImagesQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<ProductImagesQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<ProductImagesQuery, TError, TData>({
    queryKey: ['ProductImages', variables],
    queryFn: fetcher<ProductImagesQuery, ProductImagesQueryVariables>(
      ProductImagesDocument,
      variables,
    ),
    ...options,
  })
}

useProductImagesQuery.getKey = (variables: ProductImagesQueryVariables) => [
  'ProductImages',
  variables,
]

export const useInfiniteProductImagesQuery = <
  TData = InfiniteData<ProductImagesQuery>,
  TError = unknown,
>(
  variables: ProductImagesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ProductImagesQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ProductImagesQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<ProductImagesQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['ProductImages.infinite', variables],
        queryFn: (metaData) =>
          fetcher<ProductImagesQuery, ProductImagesQueryVariables>(
            ProductImagesDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteProductImagesQuery.getKey = (
  variables: ProductImagesQueryVariables,
) => ['ProductImages.infinite', variables]

useProductImagesQuery.fetcher = (variables: ProductImagesQueryVariables) =>
  fetcher<ProductImagesQuery, ProductImagesQueryVariables>(
    ProductImagesDocument,
    variables,
  )

export const AttachProductImageDocument = `
    mutation AttachProductImage($input: AttachProductImageInput!) {
  attachProductImage(input: $input) {
    id
    productId
    fileId
    isPrimary
    displayOrder
  }
}
    `

export const useAttachProductImageMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    AttachProductImageMutation,
    TError,
    AttachProductImageMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    AttachProductImageMutation,
    TError,
    AttachProductImageMutationVariables,
    TContext
  >({
    mutationKey: ['AttachProductImage'],
    mutationFn: (variables?: AttachProductImageMutationVariables) =>
      fetcher<AttachProductImageMutation, AttachProductImageMutationVariables>(
        AttachProductImageDocument,
        variables,
      )(),
    ...options,
  })
}

useAttachProductImageMutation.fetcher = (
  variables: AttachProductImageMutationVariables,
) =>
  fetcher<AttachProductImageMutation, AttachProductImageMutationVariables>(
    AttachProductImageDocument,
    variables,
  )

export const DetachProductImageDocument = `
    mutation DetachProductImage($input: DetachProductImageInput!) {
  detachProductImage(input: $input)
}
    `

export const useDetachProductImageMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    DetachProductImageMutation,
    TError,
    DetachProductImageMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    DetachProductImageMutation,
    TError,
    DetachProductImageMutationVariables,
    TContext
  >({
    mutationKey: ['DetachProductImage'],
    mutationFn: (variables?: DetachProductImageMutationVariables) =>
      fetcher<DetachProductImageMutation, DetachProductImageMutationVariables>(
        DetachProductImageDocument,
        variables,
      )(),
    ...options,
  })
}

useDetachProductImageMutation.fetcher = (
  variables: DetachProductImageMutationVariables,
) =>
  fetcher<DetachProductImageMutation, DetachProductImageMutationVariables>(
    DetachProductImageDocument,
    variables,
  )

export const SetPrimaryImageDocument = `
    mutation SetPrimaryImage($input: SetPrimaryImageInput!) {
  setPrimaryImage(input: $input)
}
    `

export const useSetPrimaryImageMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    SetPrimaryImageMutation,
    TError,
    SetPrimaryImageMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    SetPrimaryImageMutation,
    TError,
    SetPrimaryImageMutationVariables,
    TContext
  >({
    mutationKey: ['SetPrimaryImage'],
    mutationFn: (variables?: SetPrimaryImageMutationVariables) =>
      fetcher<SetPrimaryImageMutation, SetPrimaryImageMutationVariables>(
        SetPrimaryImageDocument,
        variables,
      )(),
    ...options,
  })
}

useSetPrimaryImageMutation.fetcher = (
  variables: SetPrimaryImageMutationVariables,
) =>
  fetcher<SetPrimaryImageMutation, SetPrimaryImageMutationVariables>(
    SetPrimaryImageDocument,
    variables,
  )

export const ReorderProductImagesDocument = `
    mutation ReorderProductImages($input: ReorderProductImagesInput!) {
  reorderProductImages(input: $input)
}
    `

export const useReorderProductImagesMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    ReorderProductImagesMutation,
    TError,
    ReorderProductImagesMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    ReorderProductImagesMutation,
    TError,
    ReorderProductImagesMutationVariables,
    TContext
  >({
    mutationKey: ['ReorderProductImages'],
    mutationFn: (variables?: ReorderProductImagesMutationVariables) =>
      fetcher<
        ReorderProductImagesMutation,
        ReorderProductImagesMutationVariables
      >(ReorderProductImagesDocument, variables)(),
    ...options,
  })
}

useReorderProductImagesMutation.fetcher = (
  variables: ReorderProductImagesMutationVariables,
) =>
  fetcher<ReorderProductImagesMutation, ReorderProductImagesMutationVariables>(
    ReorderProductImagesDocument,
    variables,
  )

export const FileUsageDocument = `
    query FileUsage($fileId: String!) {
  fileUsage(fileId: $fileId) {
    inUse
    productCount
  }
}
    `

export const useFileUsageQuery = <TData = FileUsageQuery, TError = unknown>(
  variables: FileUsageQueryVariables,
  options?: Omit<UseQueryOptions<FileUsageQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<FileUsageQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<FileUsageQuery, TError, TData>({
    queryKey: ['FileUsage', variables],
    queryFn: fetcher<FileUsageQuery, FileUsageQueryVariables>(
      FileUsageDocument,
      variables,
    ),
    ...options,
  })
}

useFileUsageQuery.getKey = (variables: FileUsageQueryVariables) => [
  'FileUsage',
  variables,
]

export const useInfiniteFileUsageQuery = <
  TData = InfiniteData<FileUsageQuery>,
  TError = unknown,
>(
  variables: FileUsageQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<FileUsageQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      FileUsageQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<FileUsageQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['FileUsage.infinite', variables],
        queryFn: (metaData) =>
          fetcher<FileUsageQuery, FileUsageQueryVariables>(FileUsageDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteFileUsageQuery.getKey = (variables: FileUsageQueryVariables) => [
  'FileUsage.infinite',
  variables,
]

useFileUsageQuery.fetcher = (variables: FileUsageQueryVariables) =>
  fetcher<FileUsageQuery, FileUsageQueryVariables>(FileUsageDocument, variables)

export const ProductsDocument = `
    query Products($categoryId: String, $search: String, $isActive: Boolean) {
  products(categoryId: $categoryId, search: $search, isActive: $isActive) {
    id
    name
    searchName
    barcode
    description
    sellingPrice
    isActive
    categoryId
    organizationId
    createdAt
    updatedAt
    category {
      id
      name
    }
  }
}
    `

export const useProductsQuery = <TData = ProductsQuery, TError = unknown>(
  variables?: ProductsQueryVariables,
  options?: Omit<UseQueryOptions<ProductsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<ProductsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<ProductsQuery, TError, TData>({
    queryKey: variables === undefined ? ['Products'] : ['Products', variables],
    queryFn: fetcher<ProductsQuery, ProductsQueryVariables>(
      ProductsDocument,
      variables,
    ),
    ...options,
  })
}

useProductsQuery.getKey = (variables?: ProductsQueryVariables) =>
  variables === undefined ? ['Products'] : ['Products', variables]

export const useInfiniteProductsQuery = <
  TData = InfiniteData<ProductsQuery>,
  TError = unknown,
>(
  variables: ProductsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ProductsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<ProductsQuery, TError, TData>['queryKey']
  },
) => {
  return useInfiniteQuery<ProductsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['Products.infinite']
            : ['Products.infinite', variables],
        queryFn: (metaData) =>
          fetcher<ProductsQuery, ProductsQueryVariables>(ProductsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteProductsQuery.getKey = (variables?: ProductsQueryVariables) =>
  variables === undefined
    ? ['Products.infinite']
    : ['Products.infinite', variables]

useProductsQuery.fetcher = (variables?: ProductsQueryVariables) =>
  fetcher<ProductsQuery, ProductsQueryVariables>(ProductsDocument, variables)

export const ProductDocument = `
    query Product($id: String!) {
  product(id: $id) {
    id
    name
    searchName
    barcode
    description
    sellingPrice
    isActive
    categoryId
    organizationId
    createdAt
    updatedAt
    category {
      id
      name
    }
  }
}
    `

export const useProductQuery = <TData = ProductQuery, TError = unknown>(
  variables: ProductQueryVariables,
  options?: Omit<UseQueryOptions<ProductQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<ProductQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<ProductQuery, TError, TData>({
    queryKey: ['Product', variables],
    queryFn: fetcher<ProductQuery, ProductQueryVariables>(
      ProductDocument,
      variables,
    ),
    ...options,
  })
}

useProductQuery.getKey = (variables: ProductQueryVariables) => [
  'Product',
  variables,
]

export const useInfiniteProductQuery = <
  TData = InfiniteData<ProductQuery>,
  TError = unknown,
>(
  variables: ProductQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ProductQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<ProductQuery, TError, TData>['queryKey']
  },
) => {
  return useInfiniteQuery<ProductQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['Product.infinite', variables],
        queryFn: (metaData) =>
          fetcher<ProductQuery, ProductQueryVariables>(ProductDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteProductQuery.getKey = (variables: ProductQueryVariables) => [
  'Product.infinite',
  variables,
]

useProductQuery.fetcher = (variables: ProductQueryVariables) =>
  fetcher<ProductQuery, ProductQueryVariables>(ProductDocument, variables)

export const ProductsWithStockDocument = `
    query ProductsWithStock($categoryId: String, $search: String, $lowStockOnly: Boolean, $threshold: Int) {
  productsWithStock(
    categoryId: $categoryId
    search: $search
    lowStockOnly: $lowStockOnly
    threshold: $threshold
  ) {
    id
    name
    searchName
    barcode
    description
    sellingPrice
    isActive
    categoryId
    totalStock
    averageCost
    organizationId
    createdAt
    updatedAt
    category {
      id
      name
    }
  }
}
    `

export const useProductsWithStockQuery = <
  TData = ProductsWithStockQuery,
  TError = unknown,
>(
  variables?: ProductsWithStockQueryVariables,
  options?: Omit<
    UseQueryOptions<ProductsWithStockQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      ProductsWithStockQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useQuery<ProductsWithStockQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['ProductsWithStock']
        : ['ProductsWithStock', variables],
    queryFn: fetcher<ProductsWithStockQuery, ProductsWithStockQueryVariables>(
      ProductsWithStockDocument,
      variables,
    ),
    ...options,
  })
}

useProductsWithStockQuery.getKey = (
  variables?: ProductsWithStockQueryVariables,
) =>
  variables === undefined
    ? ['ProductsWithStock']
    : ['ProductsWithStock', variables]

export const useInfiniteProductsWithStockQuery = <
  TData = InfiniteData<ProductsWithStockQuery>,
  TError = unknown,
>(
  variables: ProductsWithStockQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ProductsWithStockQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ProductsWithStockQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<ProductsWithStockQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['ProductsWithStock.infinite']
            : ['ProductsWithStock.infinite', variables],
        queryFn: (metaData) =>
          fetcher<ProductsWithStockQuery, ProductsWithStockQueryVariables>(
            ProductsWithStockDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteProductsWithStockQuery.getKey = (
  variables?: ProductsWithStockQueryVariables,
) =>
  variables === undefined
    ? ['ProductsWithStock.infinite']
    : ['ProductsWithStock.infinite', variables]

useProductsWithStockQuery.fetcher = (
  variables?: ProductsWithStockQueryVariables,
) =>
  fetcher<ProductsWithStockQuery, ProductsWithStockQueryVariables>(
    ProductsWithStockDocument,
    variables,
  )

export const CreateProductDocument = `
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    name
    searchName
    barcode
    description
    sellingPrice
    isActive
    categoryId
    organizationId
    createdAt
    updatedAt
  }
}
    `

export const useCreateProductMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateProductMutation,
    TError,
    CreateProductMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CreateProductMutation,
    TError,
    CreateProductMutationVariables,
    TContext
  >({
    mutationKey: ['CreateProduct'],
    mutationFn: (variables?: CreateProductMutationVariables) =>
      fetcher<CreateProductMutation, CreateProductMutationVariables>(
        CreateProductDocument,
        variables,
      )(),
    ...options,
  })
}

useCreateProductMutation.fetcher = (
  variables: CreateProductMutationVariables,
) =>
  fetcher<CreateProductMutation, CreateProductMutationVariables>(
    CreateProductDocument,
    variables,
  )

export const UpdateProductDocument = `
    mutation UpdateProduct($id: String!, $input: UpdateProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
    name
    searchName
    barcode
    description
    sellingPrice
    isActive
    categoryId
    organizationId
    createdAt
    updatedAt
  }
}
    `

export const useUpdateProductMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateProductMutation,
    TError,
    UpdateProductMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    UpdateProductMutation,
    TError,
    UpdateProductMutationVariables,
    TContext
  >({
    mutationKey: ['UpdateProduct'],
    mutationFn: (variables?: UpdateProductMutationVariables) =>
      fetcher<UpdateProductMutation, UpdateProductMutationVariables>(
        UpdateProductDocument,
        variables,
      )(),
    ...options,
  })
}

useUpdateProductMutation.fetcher = (
  variables: UpdateProductMutationVariables,
) =>
  fetcher<UpdateProductMutation, UpdateProductMutationVariables>(
    UpdateProductDocument,
    variables,
  )

export const DeleteProductDocument = `
    mutation DeleteProduct($id: String!) {
  deleteProduct(id: $id)
}
    `

export const useDeleteProductMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteProductMutation,
    TError,
    DeleteProductMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    DeleteProductMutation,
    TError,
    DeleteProductMutationVariables,
    TContext
  >({
    mutationKey: ['DeleteProduct'],
    mutationFn: (variables?: DeleteProductMutationVariables) =>
      fetcher<DeleteProductMutation, DeleteProductMutationVariables>(
        DeleteProductDocument,
        variables,
      )(),
    ...options,
  })
}

useDeleteProductMutation.fetcher = (
  variables: DeleteProductMutationVariables,
) =>
  fetcher<DeleteProductMutation, DeleteProductMutationVariables>(
    DeleteProductDocument,
    variables,
  )

export const DailyReportsDocument = `
    query DailyReports($startDate: DateTime, $endDate: DateTime, $limit: Int) {
  dailyReports(startDate: $startDate, endDate: $endDate, limit: $limit) {
    id
    organizationId
    reportDate
    reportStartTime
    reportEndTime
    totalSales
    totalRefunds
    totalCost
    grossProfit
    cashSales
    cardSales
    cashCounted
    cashVariance
    notes
    createdAt
  }
}
    `

export const useDailyReportsQuery = <
  TData = DailyReportsQuery,
  TError = unknown,
>(
  variables?: DailyReportsQueryVariables,
  options?: Omit<
    UseQueryOptions<DailyReportsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<DailyReportsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<DailyReportsQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['DailyReports'] : ['DailyReports', variables],
    queryFn: fetcher<DailyReportsQuery, DailyReportsQueryVariables>(
      DailyReportsDocument,
      variables,
    ),
    ...options,
  })
}

useDailyReportsQuery.getKey = (variables?: DailyReportsQueryVariables) =>
  variables === undefined ? ['DailyReports'] : ['DailyReports', variables]

export const useInfiniteDailyReportsQuery = <
  TData = InfiniteData<DailyReportsQuery>,
  TError = unknown,
>(
  variables: DailyReportsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<DailyReportsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      DailyReportsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<DailyReportsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['DailyReports.infinite']
            : ['DailyReports.infinite', variables],
        queryFn: (metaData) =>
          fetcher<DailyReportsQuery, DailyReportsQueryVariables>(
            DailyReportsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteDailyReportsQuery.getKey = (
  variables?: DailyReportsQueryVariables,
) =>
  variables === undefined
    ? ['DailyReports.infinite']
    : ['DailyReports.infinite', variables]

useDailyReportsQuery.fetcher = (variables?: DailyReportsQueryVariables) =>
  fetcher<DailyReportsQuery, DailyReportsQueryVariables>(
    DailyReportsDocument,
    variables,
  )

export const GenerateDailyReportDocument = `
    mutation GenerateDailyReport($input: GenerateDailyReportInput!) {
  generateDailyReport(input: $input) {
    id
    organizationId
    reportDate
    reportStartTime
    reportEndTime
    totalSales
    totalRefunds
    totalCost
    grossProfit
    cashSales
    cardSales
    cashCounted
    cashVariance
    notes
    createdAt
  }
}
    `

export const useGenerateDailyReportMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    GenerateDailyReportMutation,
    TError,
    GenerateDailyReportMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    GenerateDailyReportMutation,
    TError,
    GenerateDailyReportMutationVariables,
    TContext
  >({
    mutationKey: ['GenerateDailyReport'],
    mutationFn: (variables?: GenerateDailyReportMutationVariables) =>
      fetcher<
        GenerateDailyReportMutation,
        GenerateDailyReportMutationVariables
      >(GenerateDailyReportDocument, variables)(),
    ...options,
  })
}

useGenerateDailyReportMutation.fetcher = (
  variables: GenerateDailyReportMutationVariables,
) =>
  fetcher<GenerateDailyReportMutation, GenerateDailyReportMutationVariables>(
    GenerateDailyReportDocument,
    variables,
  )

export const TodaysCashSalesDocument = `
    query TodaysCashSales($startDate: DateTime!, $endDate: DateTime!) {
  salesHistory(
    paymentMethod: "cash"
    type: "SALE"
    startDate: $startDate
    endDate: $endDate
  ) {
    id
    totalAmount
    createdAt
  }
}
    `

export const useTodaysCashSalesQuery = <
  TData = TodaysCashSalesQuery,
  TError = unknown,
>(
  variables: TodaysCashSalesQueryVariables,
  options?: Omit<
    UseQueryOptions<TodaysCashSalesQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<TodaysCashSalesQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<TodaysCashSalesQuery, TError, TData>({
    queryKey: ['TodaysCashSales', variables],
    queryFn: fetcher<TodaysCashSalesQuery, TodaysCashSalesQueryVariables>(
      TodaysCashSalesDocument,
      variables,
    ),
    ...options,
  })
}

useTodaysCashSalesQuery.getKey = (variables: TodaysCashSalesQueryVariables) => [
  'TodaysCashSales',
  variables,
]

export const useInfiniteTodaysCashSalesQuery = <
  TData = InfiniteData<TodaysCashSalesQuery>,
  TError = unknown,
>(
  variables: TodaysCashSalesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<TodaysCashSalesQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      TodaysCashSalesQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<TodaysCashSalesQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['TodaysCashSales.infinite', variables],
        queryFn: (metaData) =>
          fetcher<TodaysCashSalesQuery, TodaysCashSalesQueryVariables>(
            TodaysCashSalesDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteTodaysCashSalesQuery.getKey = (
  variables: TodaysCashSalesQueryVariables,
) => ['TodaysCashSales.infinite', variables]

useTodaysCashSalesQuery.fetcher = (variables: TodaysCashSalesQueryVariables) =>
  fetcher<TodaysCashSalesQuery, TodaysCashSalesQueryVariables>(
    TodaysCashSalesDocument,
    variables,
  )

export const TodaysCardSalesDocument = `
    query TodaysCardSales($startDate: DateTime!, $endDate: DateTime!) {
  salesHistory(
    paymentMethod: "card"
    type: "SALE"
    startDate: $startDate
    endDate: $endDate
  ) {
    id
    totalAmount
    createdAt
  }
}
    `

export const useTodaysCardSalesQuery = <
  TData = TodaysCardSalesQuery,
  TError = unknown,
>(
  variables: TodaysCardSalesQueryVariables,
  options?: Omit<
    UseQueryOptions<TodaysCardSalesQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<TodaysCardSalesQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<TodaysCardSalesQuery, TError, TData>({
    queryKey: ['TodaysCardSales', variables],
    queryFn: fetcher<TodaysCardSalesQuery, TodaysCardSalesQueryVariables>(
      TodaysCardSalesDocument,
      variables,
    ),
    ...options,
  })
}

useTodaysCardSalesQuery.getKey = (variables: TodaysCardSalesQueryVariables) => [
  'TodaysCardSales',
  variables,
]

export const useInfiniteTodaysCardSalesQuery = <
  TData = InfiniteData<TodaysCardSalesQuery>,
  TError = unknown,
>(
  variables: TodaysCardSalesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<TodaysCardSalesQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      TodaysCardSalesQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<TodaysCardSalesQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['TodaysCardSales.infinite', variables],
        queryFn: (metaData) =>
          fetcher<TodaysCardSalesQuery, TodaysCardSalesQueryVariables>(
            TodaysCardSalesDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteTodaysCardSalesQuery.getKey = (
  variables: TodaysCardSalesQueryVariables,
) => ['TodaysCardSales.infinite', variables]

useTodaysCardSalesQuery.fetcher = (variables: TodaysCardSalesQueryVariables) =>
  fetcher<TodaysCardSalesQuery, TodaysCardSalesQueryVariables>(
    TodaysCardSalesDocument,
    variables,
  )

export const TodaysRefundsDocument = `
    query TodaysRefunds($startDate: DateTime!, $endDate: DateTime!) {
  salesHistory(type: "REFUND", startDate: $startDate, endDate: $endDate) {
    id
    totalAmount
    paymentMethod
    createdAt
  }
}
    `

export const useTodaysRefundsQuery = <
  TData = TodaysRefundsQuery,
  TError = unknown,
>(
  variables: TodaysRefundsQueryVariables,
  options?: Omit<
    UseQueryOptions<TodaysRefundsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<TodaysRefundsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<TodaysRefundsQuery, TError, TData>({
    queryKey: ['TodaysRefunds', variables],
    queryFn: fetcher<TodaysRefundsQuery, TodaysRefundsQueryVariables>(
      TodaysRefundsDocument,
      variables,
    ),
    ...options,
  })
}

useTodaysRefundsQuery.getKey = (variables: TodaysRefundsQueryVariables) => [
  'TodaysRefunds',
  variables,
]

export const useInfiniteTodaysRefundsQuery = <
  TData = InfiniteData<TodaysRefundsQuery>,
  TError = unknown,
>(
  variables: TodaysRefundsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<TodaysRefundsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      TodaysRefundsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<TodaysRefundsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['TodaysRefunds.infinite', variables],
        queryFn: (metaData) =>
          fetcher<TodaysRefundsQuery, TodaysRefundsQueryVariables>(
            TodaysRefundsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteTodaysRefundsQuery.getKey = (
  variables: TodaysRefundsQueryVariables,
) => ['TodaysRefunds.infinite', variables]

useTodaysRefundsQuery.fetcher = (variables: TodaysRefundsQueryVariables) =>
  fetcher<TodaysRefundsQuery, TodaysRefundsQueryVariables>(
    TodaysRefundsDocument,
    variables,
  )

export const SalesHistoryDocument = `
    query SalesHistory($startDate: DateTime, $endDate: DateTime, $paymentMethod: String, $type: String, $limit: Int) {
  salesHistory(
    startDate: $startDate
    endDate: $endDate
    paymentMethod: $paymentMethod
    type: $type
    limit: $limit
  ) {
    id
    receiptNo
    type
    originalSaleId
    totalAmount
    totalCost
    paymentMethod
    notes
    organizationId
    createdAt
    items {
      id
      saleId
      productId
      quantity
      unitPrice
      unitCost
      subtotal
      createdAt
      product {
        id
        name
        barcode
        sellingPrice
      }
    }
  }
}
    `

export const useSalesHistoryQuery = <
  TData = SalesHistoryQuery,
  TError = unknown,
>(
  variables?: SalesHistoryQueryVariables,
  options?: Omit<
    UseQueryOptions<SalesHistoryQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<SalesHistoryQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<SalesHistoryQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['SalesHistory'] : ['SalesHistory', variables],
    queryFn: fetcher<SalesHistoryQuery, SalesHistoryQueryVariables>(
      SalesHistoryDocument,
      variables,
    ),
    ...options,
  })
}

useSalesHistoryQuery.getKey = (variables?: SalesHistoryQueryVariables) =>
  variables === undefined ? ['SalesHistory'] : ['SalesHistory', variables]

export const useInfiniteSalesHistoryQuery = <
  TData = InfiniteData<SalesHistoryQuery>,
  TError = unknown,
>(
  variables: SalesHistoryQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<SalesHistoryQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      SalesHistoryQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<SalesHistoryQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['SalesHistory.infinite']
            : ['SalesHistory.infinite', variables],
        queryFn: (metaData) =>
          fetcher<SalesHistoryQuery, SalesHistoryQueryVariables>(
            SalesHistoryDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteSalesHistoryQuery.getKey = (
  variables?: SalesHistoryQueryVariables,
) =>
  variables === undefined
    ? ['SalesHistory.infinite']
    : ['SalesHistory.infinite', variables]

useSalesHistoryQuery.fetcher = (variables?: SalesHistoryQueryVariables) =>
  fetcher<SalesHistoryQuery, SalesHistoryQueryVariables>(
    SalesHistoryDocument,
    variables,
  )

export const CreateSaleDocument = `
    mutation CreateSale($input: CreateSaleInput!) {
  createSale(input: $input) {
    id
    receiptNo
    type
    totalAmount
    totalCost
    paymentMethod
    notes
    organizationId
    createdAt
  }
}
    `

export const useCreateSaleMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateSaleMutation,
    TError,
    CreateSaleMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CreateSaleMutation,
    TError,
    CreateSaleMutationVariables,
    TContext
  >({
    mutationKey: ['CreateSale'],
    mutationFn: (variables?: CreateSaleMutationVariables) =>
      fetcher<CreateSaleMutation, CreateSaleMutationVariables>(
        CreateSaleDocument,
        variables,
      )(),
    ...options,
  })
}

useCreateSaleMutation.fetcher = (variables: CreateSaleMutationVariables) =>
  fetcher<CreateSaleMutation, CreateSaleMutationVariables>(
    CreateSaleDocument,
    variables,
  )

export const RefundSaleItemDocument = `
    mutation RefundSaleItem($saleItemId: String!) {
  refundSaleItem(saleItemId: $saleItemId) {
    id
    receiptNo
    type
    originalSaleId
    totalAmount
    totalCost
    paymentMethod
    notes
    organizationId
    createdAt
  }
}
    `

export const useRefundSaleItemMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    RefundSaleItemMutation,
    TError,
    RefundSaleItemMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    RefundSaleItemMutation,
    TError,
    RefundSaleItemMutationVariables,
    TContext
  >({
    mutationKey: ['RefundSaleItem'],
    mutationFn: (variables?: RefundSaleItemMutationVariables) =>
      fetcher<RefundSaleItemMutation, RefundSaleItemMutationVariables>(
        RefundSaleItemDocument,
        variables,
      )(),
    ...options,
  })
}

useRefundSaleItemMutation.fetcher = (
  variables: RefundSaleItemMutationVariables,
) =>
  fetcher<RefundSaleItemMutation, RefundSaleItemMutationVariables>(
    RefundSaleItemDocument,
    variables,
  )

export const ProductStockDocument = `
    query ProductStock($productId: String!) {
  productStock(productId: $productId) {
    productId
    totalStock
    averageCost
    lots {
      id
      productId
      supplierId
      quantity
      remaining
      costPrice
      supplier
      notes
      purchasedAt
      organizationId
      createdAt
    }
  }
}
    `

export const useProductStockQuery = <
  TData = ProductStockQuery,
  TError = unknown,
>(
  variables: ProductStockQueryVariables,
  options?: Omit<
    UseQueryOptions<ProductStockQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<ProductStockQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<ProductStockQuery, TError, TData>({
    queryKey: ['ProductStock', variables],
    queryFn: fetcher<ProductStockQuery, ProductStockQueryVariables>(
      ProductStockDocument,
      variables,
    ),
    ...options,
  })
}

useProductStockQuery.getKey = (variables: ProductStockQueryVariables) => [
  'ProductStock',
  variables,
]

export const useInfiniteProductStockQuery = <
  TData = InfiniteData<ProductStockQuery>,
  TError = unknown,
>(
  variables: ProductStockQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ProductStockQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ProductStockQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<ProductStockQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['ProductStock.infinite', variables],
        queryFn: (metaData) =>
          fetcher<ProductStockQuery, ProductStockQueryVariables>(
            ProductStockDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteProductStockQuery.getKey = (
  variables: ProductStockQueryVariables,
) => ['ProductStock.infinite', variables]

useProductStockQuery.fetcher = (variables: ProductStockQueryVariables) =>
  fetcher<ProductStockQuery, ProductStockQueryVariables>(
    ProductStockDocument,
    variables,
  )

export const StockLotsDocument = `
    query StockLots($productId: String!) {
  stockLots(productId: $productId) {
    id
    productId
    quantity
    remaining
    costPrice
    supplier
    notes
    purchasedAt
    organizationId
    createdAt
  }
}
    `

export const useStockLotsQuery = <TData = StockLotsQuery, TError = unknown>(
  variables: StockLotsQueryVariables,
  options?: Omit<UseQueryOptions<StockLotsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<StockLotsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<StockLotsQuery, TError, TData>({
    queryKey: ['StockLots', variables],
    queryFn: fetcher<StockLotsQuery, StockLotsQueryVariables>(
      StockLotsDocument,
      variables,
    ),
    ...options,
  })
}

useStockLotsQuery.getKey = (variables: StockLotsQueryVariables) => [
  'StockLots',
  variables,
]

export const useInfiniteStockLotsQuery = <
  TData = InfiniteData<StockLotsQuery>,
  TError = unknown,
>(
  variables: StockLotsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<StockLotsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      StockLotsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<StockLotsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['StockLots.infinite', variables],
        queryFn: (metaData) =>
          fetcher<StockLotsQuery, StockLotsQueryVariables>(StockLotsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteStockLotsQuery.getKey = (variables: StockLotsQueryVariables) => [
  'StockLots.infinite',
  variables,
]

useStockLotsQuery.fetcher = (variables: StockLotsQueryVariables) =>
  fetcher<StockLotsQuery, StockLotsQueryVariables>(StockLotsDocument, variables)

export const AddStockLotDocument = `
    mutation AddStockLot($input: AddStockLotInput!) {
  addStockLot(input: $input) {
    id
    productId
    quantity
    remaining
    costPrice
    supplier
    notes
    purchasedAt
    organizationId
    createdAt
  }
}
    `

export const useAddStockLotMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    AddStockLotMutation,
    TError,
    AddStockLotMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    AddStockLotMutation,
    TError,
    AddStockLotMutationVariables,
    TContext
  >({
    mutationKey: ['AddStockLot'],
    mutationFn: (variables?: AddStockLotMutationVariables) =>
      fetcher<AddStockLotMutation, AddStockLotMutationVariables>(
        AddStockLotDocument,
        variables,
      )(),
    ...options,
  })
}

useAddStockLotMutation.fetcher = (variables: AddStockLotMutationVariables) =>
  fetcher<AddStockLotMutation, AddStockLotMutationVariables>(
    AddStockLotDocument,
    variables,
  )

export const AddStockBulkDocument = `
    mutation AddStockBulk($input: AddStockBulkInput!) {
  addStockBulk(input: $input) {
    id
    productId
    quantity
    remaining
    costPrice
    supplier
    notes
    purchasedAt
    organizationId
    createdAt
  }
}
    `

export const useAddStockBulkMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    AddStockBulkMutation,
    TError,
    AddStockBulkMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    AddStockBulkMutation,
    TError,
    AddStockBulkMutationVariables,
    TContext
  >({
    mutationKey: ['AddStockBulk'],
    mutationFn: (variables?: AddStockBulkMutationVariables) =>
      fetcher<AddStockBulkMutation, AddStockBulkMutationVariables>(
        AddStockBulkDocument,
        variables,
      )(),
    ...options,
  })
}

useAddStockBulkMutation.fetcher = (variables: AddStockBulkMutationVariables) =>
  fetcher<AddStockBulkMutation, AddStockBulkMutationVariables>(
    AddStockBulkDocument,
    variables,
  )

export const StockLogsDocument = `
    query StockLogs($productId: String, $type: String, $startDate: DateTime, $endDate: DateTime, $limit: Int) {
  stockLogs(
    productId: $productId
    type: $type
    startDate: $startDate
    endDate: $endDate
    limit: $limit
  ) {
    id
    organizationId
    productId
    lotId
    type
    quantity
    referenceType
    referenceId
    notes
    createdAt
    product {
      id
      name
      barcode
      sellingPrice
    }
  }
}
    `

export const useStockLogsQuery = <TData = StockLogsQuery, TError = unknown>(
  variables?: StockLogsQueryVariables,
  options?: Omit<UseQueryOptions<StockLogsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<StockLogsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<StockLogsQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['StockLogs'] : ['StockLogs', variables],
    queryFn: fetcher<StockLogsQuery, StockLogsQueryVariables>(
      StockLogsDocument,
      variables,
    ),
    ...options,
  })
}

useStockLogsQuery.getKey = (variables?: StockLogsQueryVariables) =>
  variables === undefined ? ['StockLogs'] : ['StockLogs', variables]

export const useInfiniteStockLogsQuery = <
  TData = InfiniteData<StockLogsQuery>,
  TError = unknown,
>(
  variables: StockLogsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<StockLogsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      StockLogsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<StockLogsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['StockLogs.infinite']
            : ['StockLogs.infinite', variables],
        queryFn: (metaData) =>
          fetcher<StockLogsQuery, StockLogsQueryVariables>(StockLogsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteStockLogsQuery.getKey = (variables?: StockLogsQueryVariables) =>
  variables === undefined
    ? ['StockLogs.infinite']
    : ['StockLogs.infinite', variables]

useStockLogsQuery.fetcher = (variables?: StockLogsQueryVariables) =>
  fetcher<StockLogsQuery, StockLogsQueryVariables>(StockLogsDocument, variables)

export const SuppliersDocument = `
    query Suppliers {
  suppliers {
    id
    name
    contactPerson
    phone
    email
    address
    notes
    createdAt
    updatedAt
  }
}
    `

export const useSuppliersQuery = <TData = SuppliersQuery, TError = unknown>(
  variables?: SuppliersQueryVariables,
  options?: Omit<UseQueryOptions<SuppliersQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<SuppliersQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<SuppliersQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['Suppliers'] : ['Suppliers', variables],
    queryFn: fetcher<SuppliersQuery, SuppliersQueryVariables>(
      SuppliersDocument,
      variables,
    ),
    ...options,
  })
}

useSuppliersQuery.getKey = (variables?: SuppliersQueryVariables) =>
  variables === undefined ? ['Suppliers'] : ['Suppliers', variables]

export const useInfiniteSuppliersQuery = <
  TData = InfiniteData<SuppliersQuery>,
  TError = unknown,
>(
  variables: SuppliersQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<SuppliersQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      SuppliersQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<SuppliersQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['Suppliers.infinite']
            : ['Suppliers.infinite', variables],
        queryFn: (metaData) =>
          fetcher<SuppliersQuery, SuppliersQueryVariables>(SuppliersDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteSuppliersQuery.getKey = (variables?: SuppliersQueryVariables) =>
  variables === undefined
    ? ['Suppliers.infinite']
    : ['Suppliers.infinite', variables]

useSuppliersQuery.fetcher = (variables?: SuppliersQueryVariables) =>
  fetcher<SuppliersQuery, SuppliersQueryVariables>(SuppliersDocument, variables)

export const SupplierDocument = `
    query Supplier($id: String!) {
  supplier(id: $id) {
    id
    name
    contactPerson
    phone
    email
    address
    notes
    createdAt
    updatedAt
  }
}
    `

export const useSupplierQuery = <TData = SupplierQuery, TError = unknown>(
  variables: SupplierQueryVariables,
  options?: Omit<UseQueryOptions<SupplierQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<SupplierQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<SupplierQuery, TError, TData>({
    queryKey: ['Supplier', variables],
    queryFn: fetcher<SupplierQuery, SupplierQueryVariables>(
      SupplierDocument,
      variables,
    ),
    ...options,
  })
}

useSupplierQuery.getKey = (variables: SupplierQueryVariables) => [
  'Supplier',
  variables,
]

export const useInfiniteSupplierQuery = <
  TData = InfiniteData<SupplierQuery>,
  TError = unknown,
>(
  variables: SupplierQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<SupplierQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<SupplierQuery, TError, TData>['queryKey']
  },
) => {
  return useInfiniteQuery<SupplierQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['Supplier.infinite', variables],
        queryFn: (metaData) =>
          fetcher<SupplierQuery, SupplierQueryVariables>(SupplierDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteSupplierQuery.getKey = (variables: SupplierQueryVariables) => [
  'Supplier.infinite',
  variables,
]

useSupplierQuery.fetcher = (variables: SupplierQueryVariables) =>
  fetcher<SupplierQuery, SupplierQueryVariables>(SupplierDocument, variables)

export const CreateSupplierDocument = `
    mutation CreateSupplier($input: CreateSupplierInput!) {
  createSupplier(input: $input) {
    id
    name
    contactPerson
    phone
    email
    address
    notes
    createdAt
    updatedAt
  }
}
    `

export const useCreateSupplierMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateSupplierMutation,
    TError,
    CreateSupplierMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CreateSupplierMutation,
    TError,
    CreateSupplierMutationVariables,
    TContext
  >({
    mutationKey: ['CreateSupplier'],
    mutationFn: (variables?: CreateSupplierMutationVariables) =>
      fetcher<CreateSupplierMutation, CreateSupplierMutationVariables>(
        CreateSupplierDocument,
        variables,
      )(),
    ...options,
  })
}

useCreateSupplierMutation.fetcher = (
  variables: CreateSupplierMutationVariables,
) =>
  fetcher<CreateSupplierMutation, CreateSupplierMutationVariables>(
    CreateSupplierDocument,
    variables,
  )

export const UpdateSupplierDocument = `
    mutation UpdateSupplier($id: String!, $input: UpdateSupplierInput!) {
  updateSupplier(id: $id, input: $input) {
    id
    name
    contactPerson
    phone
    email
    address
    notes
    createdAt
    updatedAt
  }
}
    `

export const useUpdateSupplierMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateSupplierMutation,
    TError,
    UpdateSupplierMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    UpdateSupplierMutation,
    TError,
    UpdateSupplierMutationVariables,
    TContext
  >({
    mutationKey: ['UpdateSupplier'],
    mutationFn: (variables?: UpdateSupplierMutationVariables) =>
      fetcher<UpdateSupplierMutation, UpdateSupplierMutationVariables>(
        UpdateSupplierDocument,
        variables,
      )(),
    ...options,
  })
}

useUpdateSupplierMutation.fetcher = (
  variables: UpdateSupplierMutationVariables,
) =>
  fetcher<UpdateSupplierMutation, UpdateSupplierMutationVariables>(
    UpdateSupplierDocument,
    variables,
  )

export const DeleteSupplierDocument = `
    mutation DeleteSupplier($id: String!) {
  deleteSupplier(id: $id)
}
    `

export const useDeleteSupplierMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteSupplierMutation,
    TError,
    DeleteSupplierMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    DeleteSupplierMutation,
    TError,
    DeleteSupplierMutationVariables,
    TContext
  >({
    mutationKey: ['DeleteSupplier'],
    mutationFn: (variables?: DeleteSupplierMutationVariables) =>
      fetcher<DeleteSupplierMutation, DeleteSupplierMutationVariables>(
        DeleteSupplierDocument,
        variables,
      )(),
    ...options,
  })
}

useDeleteSupplierMutation.fetcher = (
  variables: DeleteSupplierMutationVariables,
) =>
  fetcher<DeleteSupplierMutation, DeleteSupplierMutationVariables>(
    DeleteSupplierDocument,
    variables,
  )

export const ListFilesDocument = `
    query ListFiles($input: ListFilesInput) {
  listFiles(input: $input) {
    files {
      id
      filename
      contentType
      size
      url
      fileHash
      createdAt
    }
    total
    hasMore
  }
}
    `

export const useListFilesQuery = <TData = ListFilesQuery, TError = unknown>(
  variables?: ListFilesQueryVariables,
  options?: Omit<UseQueryOptions<ListFilesQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<ListFilesQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<ListFilesQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['ListFiles'] : ['ListFiles', variables],
    queryFn: fetcher<ListFilesQuery, ListFilesQueryVariables>(
      ListFilesDocument,
      variables,
    ),
    ...options,
  })
}

useListFilesQuery.getKey = (variables?: ListFilesQueryVariables) =>
  variables === undefined ? ['ListFiles'] : ['ListFiles', variables]

export const useInfiniteListFilesQuery = <
  TData = InfiniteData<ListFilesQuery>,
  TError = unknown,
>(
  variables: ListFilesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ListFilesQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ListFilesQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<ListFilesQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ['ListFiles.infinite']
            : ['ListFiles.infinite', variables],
        queryFn: (metaData) =>
          fetcher<ListFilesQuery, ListFilesQueryVariables>(ListFilesDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteListFilesQuery.getKey = (variables?: ListFilesQueryVariables) =>
  variables === undefined
    ? ['ListFiles.infinite']
    : ['ListFiles.infinite', variables]

useListFilesQuery.fetcher = (variables?: ListFilesQueryVariables) =>
  fetcher<ListFilesQuery, ListFilesQueryVariables>(ListFilesDocument, variables)

export const DeleteFileDocument = `
    mutation DeleteFile($input: DeleteFileInput!) {
  deleteFile(input: $input)
}
    `

export const useDeleteFileMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteFileMutation,
    TError,
    DeleteFileMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    DeleteFileMutation,
    TError,
    DeleteFileMutationVariables,
    TContext
  >({
    mutationKey: ['DeleteFile'],
    mutationFn: (variables?: DeleteFileMutationVariables) =>
      fetcher<DeleteFileMutation, DeleteFileMutationVariables>(
        DeleteFileDocument,
        variables,
      )(),
    ...options,
  })
}

useDeleteFileMutation.fetcher = (variables: DeleteFileMutationVariables) =>
  fetcher<DeleteFileMutation, DeleteFileMutationVariables>(
    DeleteFileDocument,
    variables,
  )

export const GenerateUploadUrlDocument = `
    mutation GenerateUploadUrl($input: GenerateUploadUrlInput!) {
  generateUploadUrl(input: $input) {
    uploadUrl
    key
    fileId
    publicUrl
    isDuplicate
    existingFile {
      id
      filename
      url
    }
  }
}
    `

export const useGenerateUploadUrlMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    GenerateUploadUrlMutation,
    TError,
    GenerateUploadUrlMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    GenerateUploadUrlMutation,
    TError,
    GenerateUploadUrlMutationVariables,
    TContext
  >({
    mutationKey: ['GenerateUploadUrl'],
    mutationFn: (variables?: GenerateUploadUrlMutationVariables) =>
      fetcher<GenerateUploadUrlMutation, GenerateUploadUrlMutationVariables>(
        GenerateUploadUrlDocument,
        variables,
      )(),
    ...options,
  })
}

useGenerateUploadUrlMutation.fetcher = (
  variables: GenerateUploadUrlMutationVariables,
) =>
  fetcher<GenerateUploadUrlMutation, GenerateUploadUrlMutationVariables>(
    GenerateUploadUrlDocument,
    variables,
  )

export const ConfirmUploadDocument = `
    mutation ConfirmUpload($input: ConfirmUploadInput!) {
  confirmUpload(input: $input) {
    id
    filename
    contentType
    size
    url
    fileHash
    createdAt
  }
}
    `

export const useConfirmUploadMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    ConfirmUploadMutation,
    TError,
    ConfirmUploadMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    ConfirmUploadMutation,
    TError,
    ConfirmUploadMutationVariables,
    TContext
  >({
    mutationKey: ['ConfirmUpload'],
    mutationFn: (variables?: ConfirmUploadMutationVariables) =>
      fetcher<ConfirmUploadMutation, ConfirmUploadMutationVariables>(
        ConfirmUploadDocument,
        variables,
      )(),
    ...options,
  })
}

useConfirmUploadMutation.fetcher = (
  variables: ConfirmUploadMutationVariables,
) =>
  fetcher<ConfirmUploadMutation, ConfirmUploadMutationVariables>(
    ConfirmUploadDocument,
    variables,
  )
