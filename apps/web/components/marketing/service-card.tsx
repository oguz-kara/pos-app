import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { GBPService } from "@/lib/content/types";

interface ServiceCardProps {
  service: GBPService;
  categorySlug: string;
  variant?: "default" | "compact";
}

export function ServiceCard({
  service,
  categorySlug,
  variant = "default",
}: ServiceCardProps) {
  const href = `/kategoriler/${categorySlug}/hizmetler/${service.slug}`;

  if (variant === "compact") {
    return (
      <Link href={href}>
        <Card className="p-4 hover:shadow-md transition-all hover:border-primary cursor-pointer h-full">
          <h3 className="font-semibold mb-2">{service.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {service.shortDescription}
          </p>
          <div className="flex items-center gap-1 text-primary text-sm font-medium">
            <span>Detaylar</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer h-full flex flex-col">
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2">{service.name}</h3>
          <p className="text-muted-foreground text-sm">
            {service.shortDescription}
          </p>
        </div>

        {service.highlights.length > 0 && (
          <ul className="space-y-1.5 mb-4 flex-1">
            {service.highlights.slice(0, 4).map((highlight, idx) => (
              <li key={idx} className="text-sm flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span className="text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {service.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {service.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-primary font-medium mt-auto pt-4 border-t">
          <span>Daha Fazla Bilgi</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </Card>
    </Link>
  );
}
