import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/query-client";
import { PostHogProvider } from "@/modules/analytics/provider";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kara Ticaret - evka 3 Bornova Fidanlık, Çiçekçi ve Hırdavat",
  description: "evka 3'ün köklü fidanlığı ve hırdavatı. Saksılı bitkiler, meyve fidanları, hırdavat, elektrik ve tesisat malzemeleri. İzmir geneli teslimat. 2016'dan beri hizmetinizdeyiz.",
  keywords: "fidanlık evka 3, çiçekçi bornova, hırdavat evka 3, saksılı bitki izmir, meyve fidanı, elektrik malzemeleri, tesisat malzemeleri, nalbur bornova",
  openGraph: {
    title: "Kara Ticaret - evka 3 Fidanlık ve Hırdavat",
    description: "evka 3'ün köklü fidanlığı. Saksılı bitkiler, fidan, hırdavat malzemeleri. İzmir geneli teslimat.",
    type: "website",
    locale: "tr_TR",
    siteName: "Kara Ticaret",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kara Ticaret - evka 3 Fidanlık ve Hırdavat",
    description: "evka 3'ün köklü fidanlığı ve hırdavatı. İzmir geneli teslimat.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://karaticaret.com.tr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://karaticaret.com.tr",
    "name": "Kara Ticaret",
    "description": "evka 3'ün köklü fidanlığı ve hırdavatı. Saksılı bitkiler, fidan, hırdavat, elektrik ve tesisat malzemeleri.",
    "url": "https://karaticaret.com.tr",
    "telephone": "+905456534599",
    "priceRange": "$$",
    "image": "https://karaticaret.com.tr/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Burcu Apt, Cengiz Han Cd No:14, evka 3",
      "addressLocality": "Bornova",
      "addressRegion": "İzmir",
      "postalCode": "35050",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.44",
      "longitude": "27.19"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "22:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "6",
      "bestRating": "5",
      "worstRating": "1"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Bornova"
      },
      {
        "@type": "City",
        "name": "Bayraklı"
      },
      {
        "@type": "City",
        "name": "Karşıyaka"
      },
      {
        "@type": "City",
        "name": "Buca"
      },
      {
        "@type": "City",
        "name": "Konak"
      },
      {
        "@type": "City",
        "name": "Balçova"
      },
      {
        "@type": "City",
        "name": "Narlıdere"
      },
      {
        "@type": "City",
        "name": "Karabağlar"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Ürün ve Hizmetler",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fidanlık ve Saksılı Bitkiler",
            "description": "Saksılı bitkiler, meyve fidanları, süs bitkileri"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Hırdavat Malzemeleri",
            "description": "Nalbur, elektrik, tesisat, banyo malzemeleri"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Elektrik ve Tesisat Montaj",
            "description": "Elektrik montaj, tesisat montaj, tadilat hizmetleri"
          }
        }
      ]
    },
    "sameAs": []
  };

  return (
    <html lang="tr">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
