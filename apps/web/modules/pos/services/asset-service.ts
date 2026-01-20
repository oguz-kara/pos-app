/**
 * Asset Service for Product Image Management
 *
 * Handles all operations related to product images, including:
 * - Attaching/detaching images from products
 * - Setting primary images
 * - Reordering gallery images
 * - Fetching product images with metadata
 */

import { db, eq, and, asc, productImages, products, files } from '@jetframe/db'
import { NotFoundError } from '@/modules/shared/errors'

/**
 * UUID validation regex
 */
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * Validate that a string is a valid UUID
 */
function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id)
}

/**
 * Validate UUID and throw error if invalid
 */
function validateUUID(id: string, fieldName: string): void {
  if (!isValidUUID(id)) {
    throw new Error(`Invalid UUID format for ${fieldName}: "${id}"`)
  }
}

export type ProductImageWithFile = {
  id: string
  productId: string
  fileId: string
  isPrimary: boolean
  displayOrder: number
  createdAt: Date
  updatedAt: Date
  file: {
    id: string
    filename: string
    contentType: string
    size: number
    url: string
    fileHash: string | null
    createdAt: Date
  }
}

/**
 * Attach an image to a product
 */
export async function attachImageToProduct(
  orgId: string,
  params: {
    productId: string
    fileId: string
    isPrimary?: boolean
  },
): Promise<ProductImageWithFile> {
  // Validate UUIDs (orgId is from auth provider, not a UUID)
  validateUUID(params.productId, 'productId')
  validateUUID(params.fileId, 'fileId')

  // Verify product exists and belongs to org
  const product = await db.query.products.findFirst({
    where: and(
      eq(products.id, params.productId),
      eq(products.organizationId, orgId),
    ),
  })

  if (!product) {
    throw new NotFoundError('Product')
  }

  // Verify file exists and belongs to org
  const file = await db.query.files.findFirst({
    where: and(eq(files.id, params.fileId), eq(files.organizationId, orgId)),
  })

  if (!file) {
    throw new NotFoundError('File')
  }

  // If setting as primary, unset any existing primary image
  if (params.isPrimary) {
    await db
      .update(productImages)
      .set({ isPrimary: false })
      .where(
        and(
          eq(productImages.productId, params.productId),
          eq(productImages.isPrimary, true),
        ),
      )
  }

  // Get max display order
  const maxOrderResult = await db.query.productImages.findMany({
    where: eq(productImages.productId, params.productId),
    orderBy: [asc(productImages.displayOrder)],
  })

  const maxOrder =
    maxOrderResult.length > 0
      ? Math.max(...maxOrderResult.map((img) => img.displayOrder))
      : -1

  // Create product image record
  const [productImage] = await db
    .insert(productImages)
    .values({
      productId: params.productId,
      fileId: params.fileId,
      isPrimary: params.isPrimary || false,
      displayOrder: maxOrder + 1,
    })
    .returning()

  // Fetch with file info
  const result = await db.query.productImages.findFirst({
    where: eq(productImages.id, productImage.id),
    with: {
      file: true,
    },
  })

  return result as unknown as ProductImageWithFile
}

/**
 * Detach an image from a product
 */
export async function detachImageFromProduct(
  orgId: string,
  params: {
    productId: string
    fileId: string
  },
): Promise<void> {
  // Verify product belongs to org
  const product = await db.query.products.findFirst({
    where: and(
      eq(products.id, params.productId),
      eq(products.organizationId, orgId),
    ),
  })

  if (!product) {
    throw new NotFoundError('Product')
  }

  // Delete the product image record
  await db
    .delete(productImages)
    .where(
      and(
        eq(productImages.productId, params.productId),
        eq(productImages.fileId, params.fileId),
      ),
    )
}

/**
 * Set primary image for a product
 */
export async function setPrimaryImage(
  orgId: string,
  params: {
    productId: string
    fileId: string
  },
): Promise<void> {
  // Verify product belongs to org
  const product = await db.query.products.findFirst({
    where: and(
      eq(products.id, params.productId),
      eq(products.organizationId, orgId),
    ),
  })

  if (!product) {
    throw new NotFoundError('Product')
  }

  // Verify the image is attached to the product
  const productImage = await db.query.productImages.findFirst({
    where: and(
      eq(productImages.productId, params.productId),
      eq(productImages.fileId, params.fileId),
    ),
  })

  if (!productImage) {
    throw new NotFoundError('Product Image')
  }

  // Unset all primary images for this product
  await db
    .update(productImages)
    .set({ isPrimary: false })
    .where(eq(productImages.productId, params.productId))

  // Set new primary image
  await db
    .update(productImages)
    .set({ isPrimary: true })
    .where(eq(productImages.id, productImage.id))
}

/**
 * Reorder product images
 */
export async function reorderProductImages(
  orgId: string,
  params: {
    productId: string
    imageIds: string[] // Array of file IDs in desired order
  },
): Promise<void> {
  // Verify product belongs to org
  const product = await db.query.products.findFirst({
    where: and(
      eq(products.id, params.productId),
      eq(products.organizationId, orgId),
    ),
  })

  if (!product) {
    throw new NotFoundError('Product')
  }

  // Update display order for each image
  for (let i = 0; i < params.imageIds.length; i++) {
    await db
      .update(productImages)
      .set({ displayOrder: i })
      .where(
        and(
          eq(productImages.productId, params.productId),
          eq(productImages.fileId, params.imageIds[i]),
        ),
      )
  }
}

/**
 * Get all images for a product
 */
export async function getProductImages(
  orgId: string,
  productId: string,
): Promise<ProductImageWithFile[]> {
  // Verify product belongs to org
  const product = await db.query.products.findFirst({
    where: and(eq(products.id, productId), eq(products.organizationId, orgId)),
  })

  if (!product) {
    throw new NotFoundError('Product')
  }

  // Fetch images with file info
  const images = await db.query.productImages.findMany({
    where: eq(productImages.productId, productId),
    with: {
      file: true,
    },
    orderBy: [asc(productImages.displayOrder)],
  })

  return images as unknown as ProductImageWithFile[]
}

/**
 * Check if a file is used by any products
 */
export async function isFileInUse(
  orgId: string,
  fileId: string,
): Promise<{ inUse: boolean; productCount: number }> {
  // Validate fileId (orgId is from auth provider, not a UUID)
  validateUUID(fileId, 'fileId')

  // Verify file belongs to org
  const file = await db.query.files.findFirst({
    where: and(eq(files.id, fileId), eq(files.organizationId, orgId)),
  })

  if (!file) {
    throw new NotFoundError('File')
  }

  // Count how many products use this file
  const usages = await db.query.productImages.findMany({
    where: eq(productImages.fileId, fileId),
  })

  return {
    inUse: usages.length > 0,
    productCount: usages.length,
  }
}
