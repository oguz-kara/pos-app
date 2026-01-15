'use client'

import { useState } from 'react'
import { Upload, ImageIcon, Star, FolderOpen } from 'lucide-react'
import { AssetUploader } from './asset-uploader'
import { MediaLibrary } from './media-library'
import { ImagePreview } from './image-preview'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useListFilesQuery } from '@/lib/graphql/generated'

export interface AssetManagerValue {
  featuredImageId?: string
  galleryImageIds?: string[]
}

interface AssetManagerProps {
  value?: AssetManagerValue
  onChange?: (value: AssetManagerValue) => void
  maxGalleryImages?: number
  required?: boolean
  className?: string
}

export function AssetManager({
  value = {},
  onChange,
  maxGalleryImages = 5,
  required = false,
  className,
}: AssetManagerProps) {
  const [libraryRefreshTrigger, setLibraryRefreshTrigger] = useState(0)

  const { featuredImageId, galleryImageIds = [] } = value
  const allSelectedIds = [
    ...(featuredImageId ? [featuredImageId] : []),
    ...galleryImageIds,
  ]

  // Fetch files to get actual URLs
  const { data: filesData } = useListFilesQuery()
  const files = filesData?.listFiles?.files || []

  // Helper to get file URL by ID
  const getFileUrl = (fileId: string) => {
    const file = files.find((f) => f.id === fileId)
    return file?.url || null
  }

  const getFileName = (fileId: string) => {
    const file = files.find((f) => f.id === fileId)
    return file?.filename || 'Image'
  }

  // Handle file upload success
  const handleUploadSuccess = (fileId: string) => {
    // If no featured image, set the first upload as featured
    if (!featuredImageId) {
      onChange?.({
        ...value,
        featuredImageId: fileId,
      })
    } else {
      // Otherwise add to gallery
      const newGalleryIds = [...galleryImageIds, fileId]
      onChange?.({
        ...value,
        galleryImageIds: newGalleryIds,
      })
    }

    // Trigger library refresh
    setLibraryRefreshTrigger((prev) => prev + 1)
  }

  // Handle selection from library
  const handleLibrarySelect = (fileId: string) => {
    if (allSelectedIds.includes(fileId)) {
      // Deselect
      handleRemove(fileId)
    } else {
      // Select - add as featured if none, otherwise gallery
      if (!featuredImageId) {
        onChange?.({
          ...value,
          featuredImageId: fileId,
        })
      } else if (galleryImageIds.length < maxGalleryImages) {
        onChange?.({
          ...value,
          galleryImageIds: [...galleryImageIds, fileId],
        })
      }
    }
  }

  // Set primary image
  const handleSetPrimary = (fileId: string) => {
    if (fileId === featuredImageId) return

    // Move current featured to gallery
    const newGalleryIds = featuredImageId
      ? [featuredImageId, ...galleryImageIds.filter((id) => id !== fileId)]
      : galleryImageIds.filter((id) => id !== fileId)

    onChange?.({
      featuredImageId: fileId,
      galleryImageIds: newGalleryIds,
    })
  }

  // Remove image
  const handleRemove = (fileId: string) => {
    if (fileId === featuredImageId) {
      // Remove featured image and promote first gallery image if available
      const [newFeatured, ...remainingGallery] = galleryImageIds
      onChange?.({
        featuredImageId: newFeatured || undefined,
        galleryImageIds: remainingGallery,
      })
    } else {
      // Remove from gallery
      onChange?.({
        ...value,
        galleryImageIds: galleryImageIds.filter((id) => id !== fileId),
      })
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Selected Images Preview */}
      {allSelectedIds.length > 0 && (
        <div className="space-y-3">
          <Label className="text-base font-semibold">Seçili Görseller</Label>

          {featuredImageId && getFileUrl(featuredImageId) && (
            <div>
              <Label className="flex items-center gap-2 mb-2 text-sm">
                <Star className="h-4 w-4 fill-current text-primary" />
                Ana Görsel
              </Label>
              <div className="w-24">
                <ImagePreview
                  id={featuredImageId}
                  url={getFileUrl(featuredImageId)!}
                  filename={getFileName(featuredImageId)}
                  isPrimary={true}
                  onRemove={handleRemove}
                  showActions={true}
                />
              </div>
            </div>
          )}

          {galleryImageIds.length > 0 && (
            <div>
              <Label className="flex items-center gap-2 mb-2 text-sm">
                <ImageIcon className="h-4 w-4" />
                Galeri ({galleryImageIds.length}/{maxGalleryImages})
              </Label>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {galleryImageIds
                  .filter((fileId) => getFileUrl(fileId))
                  .map((fileId) => (
                    <ImagePreview
                      key={fileId}
                      id={fileId}
                      url={getFileUrl(fileId)!}
                      filename={getFileName(fileId)}
                      onRemove={handleRemove}
                      onSetPrimary={handleSetPrimary}
                      showActions={true}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tabs for Upload and Library */}
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Görsel Yükle
          </TabsTrigger>
          <TabsTrigger value="library" className="gap-2">
            <FolderOpen className="h-4 w-4" />
            Kütüphane
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-4">
          <AssetUploader
            onUploadSuccess={handleUploadSuccess}
            maxFiles={maxGalleryImages + 1 - allSelectedIds.length}
          />
        </TabsContent>

        <TabsContent value="library" className="mt-4">
          <div className="border rounded-lg overflow-hidden h-[500px]">
            <MediaLibrary
              selectedIds={allSelectedIds}
              onSelect={handleLibrarySelect}
              refreshTrigger={libraryRefreshTrigger}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Required field indicator */}
      {required && allSelectedIds.length === 0 && (
        <p className="text-sm text-destructive">
          En az bir görsel yüklemeniz gerekiyor
        </p>
      )}
    </div>
  )
}
