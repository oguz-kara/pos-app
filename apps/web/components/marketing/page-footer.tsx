import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import { CONTACT_INFO } from "@/lib/content/types";
import { getAllLocations } from "@/lib/content/locations";

export function PageFooter() {
  // Get priority locations for footer
  const allLocations = getAllLocations();
  const priorityDistricts = allLocations
    .filter(loc => loc.type === "district" && loc.priority <= 2)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 4);

  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Kara Ticaret</h3>
            <p className="text-sm text-muted-foreground">
              2016&apos;dan beri Evka 3&apos;te hizmetinizdeyiz.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">İletişim</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>0545 653 45 99</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{CONTACT_INFO.address.street}, {CONTACT_INFO.address.district}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Pazartesi - Pazar: {CONTACT_INFO.hours.weekdays}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Sayfalar</h3>
            <div className="space-y-2 text-sm">
              <div>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Ana Sayfa
                </Link>
              </div>
              <div>
                <Link
                  href="/kategoriler"
                  className="text-muted-foreground hover:text-primary"
                >
                  Kategoriler
                </Link>
              </div>
              <div>
                <Link
                  href="/hakkimizda"
                  className="text-muted-foreground hover:text-primary"
                >
                  Hakkımızda
                </Link>
              </div>
              <div>
                <Link
                  href="/iletisim"
                  className="text-muted-foreground hover:text-primary"
                >
                  İletişim
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Hizmet Bölgelerimiz</h3>
            <div className="space-y-2 text-sm">
              <div>
                <Link href="/bornova" className="text-muted-foreground hover:text-primary">
                  Bornova
                </Link>
              </div>
              {priorityDistricts.filter(d => d.slug !== "bornova").map((district) => (
                <div key={district.id}>
                  <Link
                    href={`/${district.slug}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {district.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Kara Ticaret. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
