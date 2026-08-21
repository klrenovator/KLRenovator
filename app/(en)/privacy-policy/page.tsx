import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { PrimaryJobPhoto } from "@/components/primary-job-photo";

// ─────────────────────────────────────────────────────────────────────────
// Privacy policy.
//
// The site collects names, phone numbers and full home addresses through
// the booking form and stores them in Supabase plus Google Calendar. Under
// Malaysia's Personal Data Protection Act 2010 a data user must issue a
// written notice covering what is collected, why, who it is disclosed to,
// and how the individual can access or correct it.
// ─────────────────────────────────────────────────────────────────────────

const LAST_UPDATED = "06 August 2026";

export const metadata: Metadata = {
  title: "Privacy Policy | KL Renovator",
  description:
    padMetaDescription("How KL Renovator (Multicore Dynamics Resources) collects, uses, stores and protects your personal data under Malaysia's PDPA 2010."),
  openGraph: {
    type: "website",
    locale: "en_MY",
    images: [{
      url: "https://www.klrenovator.com/hero/aux-aircond-ceiling-cassette-service-petaling-jaya-20.webp",
      width: 1200,
      height: 630,
      alt: "KL Renovator privacy policy",
    }],
  },
  alternates: buildTrilingualHreflang("/privacy-policy", "en"),
  robots: { index: true, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-slate-100 py-7 last:border-0">
      <h2 className="mb-3 text-lg font-black text-slate-900">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-sky-600">Legal</p>
      <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        Last updated: {LAST_UPDATED} · Issued under the Personal Data Protection Act 2010
        (Malaysia)
      </p>

      <div className="mt-8 max-w-xl">
        <PrimaryJobPhoto
          seed="https://www.klrenovator.com/privacy-policy"
          pageUrl="https://www.klrenovator.com/privacy-policy"
          title="KL Renovator Privacy Policy"
          locale="en"
          hints={["basic-servicing"]}
          sizes="(min-width: 1024px) 576px, (min-width: 640px) 80vw, 100vw"
        />
      </div>
      <div className="mt-8">
        <Section title="1. Who we are">
          <p>
            This website is operated by <strong>{siteConfig.legalName}</strong>, trading as{" "}
            <strong>{siteConfig.name}</strong> (SSM registration {siteConfig.ssmFull}), an air
            conditioning installation and servicing company operating in Kuala Lumpur and Selangor,
            Malaysia. In this policy, &ldquo;we&rdquo; and &ldquo;us&rdquo; refer to that company.
          </p>
        </Section>

        <Section title="2. What personal data we collect">
          <p>We collect only what we need to quote for and carry out the work you ask us to do:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <strong>Booking and enquiry details</strong> — your name, phone number, service
              address, the service requested, aircond type, size and quantity, and your preferred
              appointment date and time.
            </li>
            <li>
              <strong>Installation details</strong> — property type, floor level, approximate copper
              pipe run, and whether you already own the unit. These determine the quote and whether
              building management approval is needed.
            </li>
            <li>
              <strong>Messages you send us</strong> — the content of WhatsApp messages, calls and
              emails you initiate.
            </li>
            <li>
              <strong>Technical and usage data</strong> — IP address, browser type, pages visited
              and referring site, collected through Google Analytics 4 and Microsoft Clarity.
            </li>
          </ul>
          <p>
            We do not collect payment card details on this website, and we do not knowingly collect
            data from children.
          </p>
        </Section>

        <Section title="3. Why we use it">
          <ul className="ml-5 list-disc space-y-1.5">
            <li>To prepare quotations and confirm pricing before work begins.</li>
            <li>To schedule technicians and reach you about your appointment.</li>
            <li>To honour the workmanship warranty on work we have carried out.</li>
            <li>To meet accounting, tax and other legal record-keeping obligations.</li>
            <li>To understand which pages and services visitors find useful, in aggregate.</li>
          </ul>
          <p>
            We do not sell your personal data, and we do not share it with third parties for their
            own marketing.
          </p>
        </Section>

        <Section title="4. Who we disclose it to">
          <p>
            Your data is shared only with service providers who help us run the business, and only
            to the extent they need it:
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <strong>Supabase</strong> — secure database hosting for booking records.
            </li>
            <li>
              <strong>Google (Calendar &amp; Analytics)</strong> — appointment scheduling for our
              technicians, and aggregated website analytics.
            </li>
            <li>
              <strong>Microsoft Clarity</strong> — aggregated usage analytics.
            </li>
            <li>
              <strong>Vercel</strong> — website and application hosting.
            </li>
            <li>
              <strong>Our technicians</strong> — the name, contact number and address needed to
              attend your appointment.
            </li>
          </ul>
          <p>
            Some of these providers process data on servers outside Malaysia. We rely on their
            contractual and technical safeguards for those transfers.
          </p>
        </Section>

        <Section title="5. How long we keep it">
          <p>
            Booking records are retained for up to seven years to satisfy Malaysian tax and
            accounting requirements and to support warranty claims. Analytics data is retained
            according to the default retention period of the analytics provider. Enquiries that do
            not become bookings are removed once they are no longer needed.
          </p>
        </Section>

        <Section title="6. How we protect it">
          <p>
            Data is transmitted over HTTPS, stored with access-controlled credentials, and our admin
            booking area is protected by server-side authentication. Access is limited to staff who
            need it to do their job. No system can be guaranteed completely secure, but we take
            reasonable technical and organisational measures to protect your information.
          </p>
        </Section>

        <Section title="7. Your rights under the PDPA">
          <p>You have the right to:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>Request access to the personal data we hold about you.</li>
            <li>Request correction of data that is inaccurate, incomplete or out of date.</li>
            <li>Withdraw consent to further processing, or limit how we use your data.</li>
            <li>Request deletion of your data where we are not legally required to keep it.</li>
          </ul>
          <p>
            To exercise any of these, contact us using the details in section 9. We will respond
            within 21 days as required by the PDPA. There is no charge for a reasonable request.
          </p>
        </Section>

        <Section title="8. Cookies and analytics">
          <p>
            We use Google Analytics 4 and Microsoft Clarity to understand how the site is used —
            for example which installation pages people read, and where they drop off. These tools
            set cookies and record aggregated interaction data. You can block cookies in your
            browser settings, or install the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="font-semibold text-sky-600 underline"
            >
              Google Analytics opt-out add-on
            </a>
            . The website will continue to work normally.
          </p>
        </Section>

        <Section title="9. Contact us">
          <p>
            For any question about this policy or about your personal data, contact{" "}
            <strong>{siteConfig.legalName}</strong>:
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              Email:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-sky-600 underline"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              Phone / WhatsApp:{" "}
              <a href={`tel:${siteConfig.phone}`} className="font-semibold text-sky-600 underline">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>Address: {siteConfig.address}</li>
          </ul>
        </Section>

        <Section title="10. Changes to this policy">
          <p>
            We may update this policy as our services or legal obligations change. The
            &ldquo;last updated&rdquo; date at the top of this page always reflects the current
            version.
          </p>
        </Section>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-sm text-slate-600">
          Questions about a booking instead?{" "}
          <NextLink href="/contact" className="font-black text-sky-600 hover:text-sky-800">
            Contact us
          </NextLink>
          .
        </p>
      </div>
    </div>
  );
}
