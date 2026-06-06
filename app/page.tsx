import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { ReadyToBook } from "@/components/sections/ready-to-book";

export default function Home() {
  return (
    <>
      {/* 1. Dynamic Hero Slideshow */}
      <Hero />

      {/* 2. Trust Stats — premium white design */}
      <StatsBand />

      {/* 3. Services Grid — No prices, View Details links */}
      <ServicesWithPricing />

      {/* 4. Why Choose Us — with brands row */}
      <WhyChooseUs />

      {/* 5. Customer Testimonials Carousel */}
      <Testimonials />

      {/* 6. Google Reviews widget */}
      <GoogleReviews />

      {/* 7. Coverage Areas — Klang Valley map */}
      <CoverageAreas />

      {/* 8. High-Conversion CTA Banner */}
      <ReadyToBook />
    </>
  );
}
