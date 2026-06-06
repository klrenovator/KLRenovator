import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { siteConfig } from "@/config/site";

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: siteConfig.name,
    legalName: siteConfig.parentCompany,
    url: "https://www.klrenovator.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.klrenovator.com/logo/image.png",
      width: 400,
      height: 400,
    },
    image: "https://www.klrenovator.com/logo/image.png",
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressStreet,
      addressLocality: siteConfig.addressCity,
      postalCode: siteConfig.addressPostal,
      addressRegion: siteConfig.addressState,
      addressCountry: siteConfig.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geoLat,
      longitude: siteConfig.geoLng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: siteConfig.areas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviewRating,
      reviewCount: siteConfig.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Aircond Services Kuala Lumpur & Selangor",
      itemListElement: siteConfig.services.map((service, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.short,
          url: `https://www.klrenovator.com/services/${service.slug}`,
          provider: {
            "@type": "HomeAndConstructionBusiness",
            name: siteConfig.name,
          },
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: service.startPrice,
          priceCurrency: "MYR",
          description: `Starting from RM ${service.startPrice}`,
        },
      })),
    },
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.instagram,
      siteConfig.links.tiktok,
      siteConfig.links.googleBusiness,
    ],
    priceRange: "RM 88 – RM 2,000",
    currenciesAccepted: "MYR",
    paymentAccepted: "Cash, Bank Transfer, Online Transfer",
    keywords:
      "aircond service KL, aircond service Selangor, chemical wash, chemical overhaul, gas top up, aircond repair Kuala Lumpur, aircond installation Malaysia",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.klrenovator.com/#website",
    name: siteConfig.name,
    url: "https://www.klrenovator.com",
    description: siteConfig.tagline,
    publisher: {
      "@id": "https://www.klrenovator.com/#business",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.klrenovator.com/services/{search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <Hero />
      <StatsBand />
      <ServicesWithPricing />
      <WhyChooseUs />
      <GoogleReviews />
      <CoverageAreas />
      <ReadyToBook />
    </>
  );
}
