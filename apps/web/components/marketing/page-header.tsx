"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Menu } from "lucide-react";
import { CONTACT_INFO } from "@/lib/content/types";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MobileNav } from "./mobile-nav";
import { navigationConfig } from "@/lib/content/navigation";

const SiteNavigation = dynamic(
  () => import("./site-navigation").then((mod) => ({ default: mod.SiteNavigation })),
  { ssr: false }
);



export function PageHeader() {

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container max-w-[1400px] flex h-20 items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logos/logo-black-line.png"
              alt="Kara Ticaret Logo"
              width={280}
              height={64}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation with Shadcn NavigationMenu */}
          <div className="hidden lg:flex">
            <SiteNavigation />
          </div>

          <div className="flex items-center gap-4">
            {/* Contact Info with Styled Phone Number */}
            <div className="hidden md:flex items-center gap-3 text-sm">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
              >
                <Phone className="h-4 w-4" />
                <span>0545 653 45 99</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="hidden xl:inline">Evka 3, Bornova</span>
              </div>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menüyü Aç</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <MobileNav items={navigationConfig} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
