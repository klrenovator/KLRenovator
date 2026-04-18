import { Hero } from "@/components/sections/hero";
import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { Gallery } from "@/components/sections/gallery";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { FAQ } from "@/components/sections/faq";
import { CtaContact } from "@/components/sections/cta-contact";
import { ReadyToBook } from "@/components/sections/ready-to-book";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesWithPricing />
      <Gallery />
      <GoogleReviews />
      <FAQ />
      <CtaContact />
      <ReadyToBook />
    </>
  );
}
