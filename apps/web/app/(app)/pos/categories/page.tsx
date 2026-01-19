"use client";

import { CategoryManager } from "@/modules/pos/components/category-manager";
import { TR } from "@/modules/pos/constants";
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/lib/graphql/generated";
import { toast } from "sonner";

/**
 * Categories Management Page
 *
 * Simple CRUD interface for managing product categories.
 */
export default function CategoriesPage() {
  const { data, isLoading, refetch } = useCategoriesQuery();
  const createCategory = useCreateCategoryMutation();
  const updateCategory = useUpdateCategoryMutation();
  const deleteCategory = useDeleteCategoryMutation();

  const categories = (data?.categories || [])
    .filter((c): c is NonNullable<typeof c> => c != null && c.id != null && c.name != null)
    .map((c) => ({
      id: c.id!,
      name: c.name!,
      createdAt: new Date(c.createdAt),
    }));

  const handleCreate = async (formData: { name: string }) => {
    try {
      await createCategory.mutateAsync({ input: formData });
      toast.success("Kategori oluşturuldu");
      refetch();
    } catch (error) {
      toast.error("Kategori oluşturulurken hata oluştu");
      throw error;
    }
  };

  const handleUpdate = async (id: string, formData: { name: string }) => {
    try {
      await updateCategory.mutateAsync({ id, input: formData });
      toast.success("Kategori güncellendi");
      refetch();
    } catch (error) {
      toast.error("Kategori güncellenirken hata oluştu");
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory.mutateAsync({ id });
      toast.success("Kategori silindi");
      refetch();
    } catch (error) {
      toast.error("Kategori silinirken hata oluştu");
      throw error;
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{TR.categories}</h1>
        <p className="text-muted-foreground">
          Ürün kategorilerini yönetin
        </p>
      </div>

      <CategoryManager
        categories={categories}
        onCreateCategory={handleCreate}
        onUpdateCategory={handleUpdate}
        onDeleteCategory={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
