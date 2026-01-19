'use client'

import { useState, useEffect } from 'react'
import { Search, Trash2, Loader2, ImageIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ImagePreview } from './image-preview'
import {
  useListFilesQuery,
  useDeleteFileMutation,
  useFileUsageQuery,
} from '@/lib/graphql/generated'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface MediaLibraryProps {
  selectedIds?: string[]
  onSelect?: (fileId: string) => void
  onMultiSelect?: (fileIds: string[]) => void
  multiSelect?: boolean
  maxSelect?: number
  refreshTrigger?: number
}

export function MediaLibrary({
  selectedIds = [],
  onSelect,
  onMultiSelect,
  multiSelect = false,
  maxSelect,
  refreshTrigger,
}: MediaLibraryProps) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [fileToDelete, setFileToDelete] = useState<string | null>(null)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  // Query files
  const { data, isLoading, refetch } = useListFilesQuery(
    {
      input: {
        offset: 0,
        limit: 100,
        search: debouncedSearch.trim() || undefined,
      },
    },
    {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  )

  const files = data?.listFiles?.files || []
  const hasMore = data?.listFiles?.hasMore || false

  // Delete mutation
  const deleteMutation = useDeleteFileMutation()

  // Check usage
  const { data: usageData, isLoading: isCheckingUsage } = useFileUsageQuery(
    { fileId: fileToDelete || '' },
    { enabled: !!fileToDelete },
  )

  const fileUsage = usageData?.fileUsage

  // Handle selection
  const handleSelect = (fileId: string) => {
    if (multiSelect && onMultiSelect) {
      const isSelected = selectedIds.includes(fileId)
      let newSelection: string[]

      if (isSelected) {
        newSelection = selectedIds.filter((id) => id !== fileId)
      } else {
        if (maxSelect && selectedIds.length >= maxSelect) {
          toast.error(`En fazla ${maxSelect} görsel seçebilirsiniz`)
          return
        }
        newSelection = [...selectedIds, fileId]
      }

      onMultiSelect(newSelection)
    } else if (onSelect) {
      onSelect(fileId)
    }
  }

  // Handle delete
  const handleDeleteClick = (fileId: string) => {
    setFileToDelete(fileId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!fileToDelete) return

    try {
      await deleteMutation.mutateAsync({
        input: { fileId: fileToDelete },
      })
      toast.success('Görsel silindi')
      refetch()
      setDeleteDialogOpen(false)
      setFileToDelete(null)
    } catch (error) {
      toast.error('Görsel silinirken hata oluştu')
      console.error('Delete error:', error)
    }
  }

  // Refetch trigger
  useEffect(() => {
    if (refreshTrigger !== undefined) {
      refetch()
    }
  }, [refreshTrigger, refetch])

  return (
    <div className="flex flex-col w-full h-full">
      {/* Search Bar */}
      <div className="p-4 border-b bg-background flex-shrink-0">
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            placeholder="Görsellerde ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
        {selectedIds.length > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            {selectedIds.length} görsel seçildi
          </p>
        )}
      </div>

      {/* Files Grid */}
      <div className="w-full flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
            <p>{search ? 'Görsel bulunamadı' : 'Henüz görsel yüklenmemiş'}</p>
          </div>
        ) : (
          <div className="p-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              {files.map((file) => {
                // 1. Guard Clause: Skip files that are functionally broken (no ID or URL)
                if (!file?.id || !file?.url) return null

                return (
                  <ImagePreview
                    key={file.id}
                    id={file.id}
                    url={file.url}
                    // 2. Fallback Fix: If filename is null/undefined, use an empty string or default
                    // This satisfies TypeScript's strict string requirement.
                    filename={file.filename || 'Untitled'}
                    selected={selectedIds.includes(file.id)}
                    onSelect={handleSelect}
                    onRemove={(id) => handleDeleteClick(id)}
                    showActions={true}
                  />
                )
              })}
            </div>

            {hasMore && (
              <div className="text-center text-sm text-muted-foreground mt-4 pb-2">
                Showing first {files.length} items. Use search to find more.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Görseli sil</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="py-4">
            {isCheckingUsage ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Kullanım kontrolü yapılıyor...
              </div>
            ) : fileUsage?.inUse ? (
              <div className="space-y-3">
                <Alert variant="destructive">
                  <AlertDescription>
                    <strong>Uyarı:</strong> Bu görsel şu anda{' '}
                    <strong>{fileUsage.productCount} üründe</strong>{' '}
                    kullanılıyor.
                  </AlertDescription>
                </Alert>
                <p className="text-sm text-muted-foreground">
                  Bu görseli silmek istediğinizden emin misiniz? Görseli
                  kullanan ürünlerde görsel görüntülenemeyecek. Bu işlem geri
                  alınamaz.
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Bu görseli silmek istediğinizden emin misiniz? Bu işlem geri
                alınamaz.
              </p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isCheckingUsage || deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Siliniyor...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  {fileUsage?.inUse ? 'Yine de Sil' : 'Sil'}
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
