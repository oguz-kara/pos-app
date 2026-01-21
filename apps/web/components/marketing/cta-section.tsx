import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Navigation } from "lucide-react";
import { CONTACT_INFO } from "@/lib/content/types";

interface CTASectionProps {
  title?: string;
  description?: string;
  variant?: "default" | "compact";
}

export function CTASection({
  title = "Hemen İletişime Geçin",
  description = "Sorularınız için bizi arayabilir, WhatsApp'tan mesaj gönderebilir veya mağazamıza gelebilirsiniz.",
  variant = "default",
}: CTASectionProps) {
  if (variant === "compact") {
    return (
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4">{title}</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={`tel:${CONTACT_INFO.phone}`} className="flex-1">
            <Button className="gap-2 w-full">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">0545 653 45 99</span>
              <span className="sm:hidden">Ara</span>
            </Button>
          </a>
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="outline" className="gap-2 w-full">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`tel:${CONTACT_INFO.phone}`}>
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 w-full sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              0545 653 45 99
            </Button>
          </a>
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </Button>
          </a>
          <a
            href="https://maps.google.com/?q=Kara+Ticaret+Evka 3+Bornova"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 w-full sm:w-auto"
            >
              <Navigation className="h-5 w-5" />
              Yol Tarifi
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
