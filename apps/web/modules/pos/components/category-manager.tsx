"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { TR } from "../constants";

// We'll replace these with generated hooks after running codegen
// For now, using placeholder types
type Category = {
  id: string;
  name: string;
  createdAt: Date;
};

const categorySchema = z.object({
  name: z.string().min(1, "Kategori adı gerekli").max(255),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function CategoryManager({
  categories,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
  isLoading,
  isCreating,
  isUpdating,
  isDeleting,
}: {
  categories: Category[];
  onCreateCategory: (data: CategoryFormValues) => Promise<void>;
  onUpdateCategory: (id: string, data: CategoryFormValues) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
  isLoading?: boolean;
  isCreating?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      if (editingCategory) {
        await onUpdateCategory(editingCategory.id, data);
      } else {
        await onCreateCategory(data);
      }
      setOpen(false);
      setEditingCategory(null);
      form.reset();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    form.reset({ name: category.name });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu kategoriyi silmek istediğinizden emin misiniz?")) {
      try {
        setDeletingId(id);
        await onDeleteCategory(id);
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setEditingCategory(null);
      form.reset();
    }
    setOpen(newOpen);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center">
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {TR.addCategory}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? TR.editCategory : TR.addCategory}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Kategori bilgilerini güncelleyin"
                  : "Yeni bir kategori ekleyin"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{TR.name}</FormLabel>
                      <FormControl>
                        <Input placeholder="Kategori adı" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOpenChange(false)}
                    disabled={isCreating || isUpdating}
                  >
                    {TR.cancel}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreating || isUpdating}
                  >
                    {isCreating || isUpdating ? "Kaydediliyor..." : TR.save}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          // Skeleton loader
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <Skeleton className="h-6 w-[40%]" />
                <Skeleton className="h-4 w-[25%] mt-2" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          ))
        ) : categories?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {TR.noData}
          </div>
        ) : (
          categories?.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(category.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(category)}
                  disabled={isDeleting && deletingId === category.id}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(category.id)}
                  disabled={isDeleting && deletingId === category.id}
                >
                  {isDeleting && deletingId === category.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
