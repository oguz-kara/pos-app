'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Combobox } from '@/components/ui/combobox'
import {
  useSuppliersQuery,
  useCreateSupplierMutation,
} from '@/lib/graphql/generated'

export interface SupplierComboboxProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function SupplierCombobox({
  value,
  onValueChange,
  placeholder = 'Select supplier...',
  className,
  disabled = false,
}: SupplierComboboxProps) {
  // Fetch suppliers
  const { data: suppliersData, isLoading, refetch } = useSuppliersQuery()

  // Create supplier mutation
  const createSupplierMutation = useCreateSupplierMutation({
    onSuccess: (data) => {
      // Refetch suppliers list
      refetch()

      // Auto-select the newly created supplier
      if (data.createSupplier?.id) {
        onValueChange?.(data.createSupplier.id)
      }

      toast.success(`Tedarikçi eklendi: ${data.createSupplier?.name}`)
    },
    // FIX 1: Explicitly type the error as 'Error' to access .message
    onError: (error: Error) => {
      toast.error(`Hata: ${error.message}`)
    },
  })

  const suppliers = React.useMemo(() => {
    return (
      (suppliersData?.suppliers || [])
        // FIX 2: Guard Clause
        // First, filter out items that don't have an ID or Name (broken data)
        .filter((s) => s.id && s.name)
        // Then map them. TypeScript now knows s.id and s.name are truthy strings.
        .map((supplier) => ({
          value: supplier.id as string,
          label: supplier.name as string,
        }))
    )
  }, [suppliersData])

  const handleCreateNew = (inputValue: string) => {
    createSupplierMutation.mutate({
      input: {
        name: inputValue,
      },
    })
  }

  if (isLoading) {
    return (
      <Combobox
        options={[]}
        value={value}
        placeholder="Loading suppliers..."
        disabled={true}
        className={className}
      />
    )
  }

  return (
    <Combobox
      options={suppliers}
      value={value}
      onValueChange={onValueChange}
      onCreateNew={handleCreateNew}
      placeholder={placeholder}
      searchPlaceholder="Search or create supplier..."
      emptyText="No suppliers found"
      createText={(inputValue) => `Create "${inputValue}"`}
      className={className}
      disabled={disabled || createSupplierMutation.isPending}
    />
  )
}
