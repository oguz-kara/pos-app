"use client";

import { CategoryManager } from "@/modules/pos/components/category-manager";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

  const categories = data?.categories || [];

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{TR.CATEGORIES}</h1>
        <p className="text-muted-foreground">
          Ürün kategorilerini yönetin
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{TR.MANAGE_CATEGORIES}</CardTitle>
          <CardDescription>
            Kategorileri ekleyin, düzenleyin veya silin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryManager
            categories={categories}
            onCreateCategory={handleCreate}
            onUpdateCategory={handleUpdate}
            onDeleteCategory={handleDelete}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
