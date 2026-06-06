import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { ReadyToBook } from "@/components/sections/ready-to-book";

export default function Home() {
  return (
    <>
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
