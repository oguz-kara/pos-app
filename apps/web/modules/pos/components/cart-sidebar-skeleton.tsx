import { Skeleton } from "@/components/ui/skeleton";

export function CartSidebarSkeleton() {
  return (
    <div className="space-y-3 opacity-60">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-background border rounded-lg p-3"
        >
          {/* Product Name - matches font-medium */}
          <Skeleton className="h-6 w-3/4 mb-2" />

          {/* Bottom row - Quantity and Price */}
          <div className="flex justify-between items-center">
            {/* Quantity area - matches button group */}
            <Skeleton className="h-6 w-20" />
            {/* Price - matches font-bold */}
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
