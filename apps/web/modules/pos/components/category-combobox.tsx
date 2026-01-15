"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCategoriesQuery, useCreateCategoryMutation } from "@/lib/graphql/generated";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CategoryComboboxProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function CategoryCombobox({
  value,
  onValueChange,
  placeholder = "Kategori seçin...",
}: CategoryComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const queryClient = useQueryClient();

  const { data: categoriesData, isLoading } = useCategoriesQuery();
  const categories = categoriesData?.categories || [];

  const createCategoryMutation = useCreateCategoryMutation({
    onSuccess: (data) => {
      toast.success("Kategori oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      onValueChange(data.createCategory.id);
      setOpen(false);
      setSearch("");
    },
    onError: (error: any) => {
      toast.error(error.message || "Kategori oluşturulamadı");
    },
  });

  const selectedCategory = categories.find((cat) => cat.id === value);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateCategory = async () => {
    if (!search.trim()) {
      toast.error("Kategori adı boş olamaz");
      return;
    }

    await createCategoryMutation.mutateAsync({
      input: {
        name: search.trim(),
      },
    });
  };

  const showCreateButton = search.trim() && filteredCategories.length === 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCategory ? selectedCategory.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Kategori ara..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Yükleniyor...</CommandEmpty>
            ) : filteredCategories.length === 0 && !showCreateButton ? (
              <CommandEmpty>Kategori bulunamadı.</CommandEmpty>
            ) : null}

            {filteredCategories.length > 0 && (
              <CommandGroup>
                {filteredCategories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.id}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === category.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {showCreateButton && (
              <CommandGroup>
                <CommandItem
                  onSelect={handleCreateCategory}
                  disabled={createCategoryMutation.isPending}
                  className="text-primary"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {createCategoryMutation.isPending
                    ? "Oluşturuluyor..."
                    : `"${search}" kategorisini oluştur`}
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
