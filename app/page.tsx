import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { ReadyToBook } from "@/components/sections/ready-to-book";

export default function Home() {
  return (
    <>
      {/* 1. Dynamic Hero Branding Section with Primary Phone Trigger */}
      <Hero />
      
      {/* 2. Fact-Dense Operational Stats (5000+ Happy Klang Valley Clients) */}
      <StatsBand />
      
      {/* 3. Core Aircond Services Grid 
        Optimization Fix: Removed mismatched TypeScript limit prop to perfectly align 
        with internal siteConfig data mapping for full search semantic index.
      */}
      <ServicesWithPricing />
      
      {/* 4. Local Trust & Value Proposition (HVAC Expertise, R32 balancing, Brand support) */}
      <WhyChooseUs />
      
      {/* 5. Social Proof Integration from Kuala Lumpur & Selangor clients */}
      <GoogleReviews />
      
      {/* 6. High-Conversion Lead Capture Footer Banner */}
      <ReadyToBook />
    </>
  );
}
