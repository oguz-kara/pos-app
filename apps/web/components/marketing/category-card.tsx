import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { GBPCategory } from "@/lib/content/types";

interface CategoryCardProps {
  category: GBPCategory;
  variant?: "default" | "compact";
}

export function CategoryCard({ category, variant = "default" }: CategoryCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/kategoriler/${category.slug}`}>
        <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
          <div className="flex items-start gap-4">
            <div className="text-4xl flex-shrink-0">{category.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                {category.isPrimary && (
                  <Badge variant="secondary" className="text-xs">
                    Öne Çıkan
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {category.description}
              </p>
              <div className="flex items-center gap-1 text-primary text-sm font-medium mt-3">
                <span>Detayları Gör</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/kategoriler/${category.slug}`}>
      <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full flex flex-col">
        <div className="text-5xl mb-4">{category.icon}</div>

        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-bold text-xl">{category.name}</h3>
          {category.isPrimary && (
            <Badge variant="default" className="text-xs">
              Birincil
            </Badge>
          )}
        </div>

        <p className="text-muted-foreground mb-4 flex-1">
          {category.description}
        </p>

        <ul className="space-y-2 mb-4">
          {category.benefits.slice(0, 3).map((benefit, idx) => (
            <li key={idx} className="text-sm flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span className="text-muted-foreground">{benefit}</span>
            </li>
          ))}
          {category.benefits.length > 3 && (
            <li className="text-sm text-primary font-medium">
              +{category.benefits.length - 3} daha fazla
            </li>
          )}
        </ul>

        <div className="flex items-center gap-2 text-primary font-medium mt-auto pt-4 border-t">
          <span>Detayları İncele</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </Card>
    </Link>
  );
}
