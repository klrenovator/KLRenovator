import { Hero } from "@/components/sections/hero";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { CtaContact } from "@/components/sections/cta-contact";
import { ReadyToBook } from "@/components/sections/ready-to-book";

export default function Home() {
  return (
    <>
      <Hero />
      <GoogleReviews />
      <ServicesWithPricing />
      <CtaContact />
      <ReadyToBook />
    </>
  );
}
