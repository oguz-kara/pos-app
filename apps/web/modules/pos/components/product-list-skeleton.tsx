import { Skeleton } from "@/components/ui/skeleton";

export function ProductListSkeleton() {
  return (
    <div className="p-4 space-y-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="w-full p-4 rounded-lg border-2 border-border"
        >
          <div className="flex justify-between items-start">
            {/* Left Side - Product Info */}
            <div className="flex-1">
              {/* Product Name - matches text-lg font-semibold */}
              <Skeleton className="h-7 w-[60%]" />
              {/* Barcode - matches text-sm */}
              <Skeleton className="h-5 w-[30%] mt-1" />
            </div>

            {/* Right Side - Meta */}
            <div className="text-right ml-4">
              {/* Price - matches text-lg font-bold */}
              <Skeleton className="h-7 w-24 ml-auto" />
              {/* Stock - matches text-sm */}
              <Skeleton className="h-5 w-20 ml-auto mt-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
