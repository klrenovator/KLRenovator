import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { PrimaryJobPhoto } from "@/components/primary-job-photo";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// ─────────────────────────────────────────────────────────────────────────
// Terms of Service (Part 4 legal-gap fix).
//
// The site previously shipped only a Privacy Policy. Booking-flow users are
// asked to confirm quotes, admit technicians to their property and pay on
// completion — all of which should be governed by published terms. Content
// below reflects only rules the business already states elsewhere on the
// site (transparent pricing confirmed before work, 1-month workmanship
// warranty, payment after completion, cancellation via WhatsApp) — no new
// commercial claims are invented here.
// ─────────────────────────────────────────────────────────────────────────

const LAST_UPDATED = "22 August 2026";

export const metadata: Metadata = {
  title: "Terms of Service | KL Renovator",
  description:
    padMetaDescription("Terms of service for KL Renovator (Multicore Dynamics Resources): quotations, pricing, payment, 1-month workmanship warranty, cancellations and site access for aircond services in KL & Selangor."),
  openGraph: {
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [{
      url: "https://www.klrenovator.com/hero/aux-aircond-ceiling-cassette-service-petaling-jaya-20.webp",
      width: 1200,
      height: 630,
      alt: "KL Renovator terms of service",
    }],
  },
  alternates: buildTrilingualHreflang("/terms-of-service", "en"),
  robots: { index: true, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-slate-100 py-7 last:border-0">
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.klrenovator.com/" },
        { name: "Terms of Service", url: "https://www.klrenovator.com/terms-of-service" },
      ]} />
      <h2 className="mb-3 text-lg font-black text-slate-900">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-sky-600">Legal</p>
      <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>

      <div className="mt-8 max-w-xl">
        <PrimaryJobPhoto
          seed="https://www.klrenovator.com/terms-of-service"
          pageUrl="https://www.klrenovator.com/terms-of-service"
          title="KL Renovator Terms of Service"
          locale="en"
          hints={["installation"]}
          sizes="(min-width: 1024px) 576px, (min-width: 640px) 80vw, 100vw"
        />
      </div>
      <div className="mt-8">
        <Section title="1. Who we are">
          <p>
            These terms apply to aircond installation, servicing, repair and related services
            supplied by <strong>{siteConfig.legalName}</strong>, trading as{" "}
            <strong>{siteConfig.name}</strong> (SSM registration {siteConfig.ssmFull}), in
            Kuala Lumpur and Selangor, Malaysia. By confirming a booking you accept these terms.
          </p>
        </Section>

        <Section title="2. Quotations and pricing">
          <p>
            Prices published on this website (for example basic servicing from RM 99, pressure
            chemical wash from RM 120 and wall-mounted installation from RM 199) are starting
            prices. The final price depends on your unit type, HP size, pipe run and site
            conditions. Every price is confirmed with you — on WhatsApp or on site — before any
            work begins. We do not proceed on the basis of an unconfirmed price.
          </p>
          <p>
            Where extra materials are needed (for example copper pipe beyond the included 7 ft,
            at RM 17–27/ft depending on HP), the extra cost is measured, quoted and approved by
            you on site before drilling or installation starts.
          </p>
        </Section>

        <Section title="3. Appointment bookings">
          <p>
            Bookings made through this website are requests for an appointment slot. A booking is
            confirmed only when we reply confirming the date and time. Same-day availability
            depends on technician routing and is not guaranteed. We will inform you as early as
            possible if a slot must be rescheduled.
          </p>
        </Section>

        <Section title="4. Payment">
          <p>
            We accept cash, bank transfer, DuitNow and e-wallet payment. Credit card payment can
            be arranged for larger jobs when agreed in advance. Unless agreed otherwise for
            large projects, payment is collected after the work is completed and you have
            verified the unit is working — no upfront payment is required for standard services.
          </p>
        </Section>

        <Section title="5. Workmanship warranty">
          <p>
            Servicing, repair and installation work carried out by us is covered by a
            <strong> 1-month workmanship warranty</strong> from the date of completion. If a
            problem covered by this warranty arises within that period, contact us on WhatsApp
            at {siteConfig.phoneDisplay} and we will return to rectify the work. The warranty
            covers workmanship only; it does not cover manufacturer defects, parts failure
            unrelated to our work, physical damage after handover, or faults caused by work
            performed by others.
          </p>
        </Section>

        <Section title="6. Cancellations and rescheduling">
          <p>
            You may cancel or reschedule a confirmed appointment at no charge by contacting us
            on WhatsApp as early as possible before the scheduled time. If a technician has
            already travelled to your address and the job is cancelled on arrival, a travel fee
            may apply. Repeated no-shows may require advance confirmation for future bookings.
          </p>
        </Section>

        <Section title="7. Site access, safety and building rules">
          <p>
            You are responsible for providing safe and lawful access to the units to be worked
            on, including any approvals, deposits or service-lift bookings your building
            management requires for high-rise work. Our technicians follow each building&apos;s
            security and access procedure. We cannot be responsible for delays caused by missing
            building approvals, locked areas, hazardous access or unsupported electrical supply.
          </p>
        </Section>

        <Section title="8. Older units and existing conditions">
          <p>
            Many units we service in KL and Selangor are 10 years or older. Where servicing or
            dismantling an aged unit risks exposing pre-existing faults (for example a weakened
            capacitor, brittle piping or corroded drain pans), we will flag the risk and quote
            before any additional work. We are not liable for pre-existing defects that are not
            caused by our work.
          </p>
        </Section>

        <Section title="9. Liability">
          <p>
            Our liability for any claim arising from the services is limited to the amount paid
            for the work concerned. Nothing in these terms excludes liability that cannot be
            excluded under Malaysian law.
          </p>
        </Section>

        <Section title="10. Governing law">
          <p>
            These terms are governed by the laws of Malaysia. Any dispute arising from them is
            subject to the jurisdiction of the Malaysian courts.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            Questions about these terms: WhatsApp {siteConfig.phoneDisplay} or email{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-sky-700 underline">
              {siteConfig.email}
            </a>
            . See also our{" "}
            <NextLink href="/privacy-policy" className="font-semibold text-sky-700 underline">
              Privacy Policy
            </NextLink>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
