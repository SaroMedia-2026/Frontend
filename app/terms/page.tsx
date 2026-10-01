import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Review the terms and conditions governing the use of Saro Media's website and professional creative and performance marketing services.",
};

export default function TermsPage() {
  const lastUpdated = "October 1, 2026";

  return (
    <div className="min-h-screen bg-[#f8fbfe] text-slate-900">
      <Header />

      <main>
        {/* Header Hero */}
        <section className="border-b border-slate-200/80 bg-white px-4 py-14 md:py-20">
          <div className="mx-auto max-w-[900px] text-center">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0e85f9]">
              Legal Documentation
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
              Terms of Use
            </h1>
            <p className="mt-3 text-sm font-medium text-slate-500">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-[900px] rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-12">
            <div className="prose prose-slate max-w-none text-slate-600">
              <p className="text-base leading-relaxed">
                Welcome to <strong>Saro Media</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms of Use govern your access to and use of our website (saromedia.com.np) and any client engagement agreements for our performance marketing, video production, graphic design, and brand growth services.
              </p>
              <p className="text-base leading-relaxed">
                By accessing or using our website, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not access or use our services.
              </p>

              <hr className="my-8 border-slate-200" />

              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                1. Scope of Services
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                Saro Media provides digital performance marketing, creative strategy, commercial videography, photoshoot sessions, graphic design, and social media handling. Detailed deliverables, scopes of work, and delivery timelines are defined in individual statements of work (SOW) or service proposals agreed upon with clients.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                2. Intellectual Property Rights
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                Unless otherwise agreed in a separate written contract:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-relaxed">
                <li>
                  All materials, logos, branding, website designs, and original content produced by Saro Media on this website remain our exclusive intellectual property.
                </li>
                <li>
                  Upon full payment of agreed project invoices, clients receive the agreed-upon license or ownership rights for custom creative assets delivered specifically for their brand.
                </li>
                <li>
                  Saro Media reserves the right to showcase completed client work and campaign case studies in our portfolio and marketing materials unless protected by an explicit non-disclosure agreement (NDA).
                </li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                3. User & Client Responsibilities
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                When interacting with our website or partnering on client projects, you agree to:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-relaxed">
                <li>Provide accurate and complete information during inquiries and job applications.</li>
                <li>Ensure any media, assets, or trademarks supplied to us for campaigns are owned by you or appropriately licensed.</li>
                <li>Not use our site for any unlawful, fraudulent, or harmful activities, or attempt to compromise website security.</li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                4. Payment & Service Contracts
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                Fees for our creative and marketing services are outlined in specific service proposals. Retainer fees, production milestones, and paid ad media spend must be settled according to agreed invoice payment schedules. Late payments may result in the suspension of active ad campaigns or deferred delivery of finalized assets.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                5. Limitation of Liability
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                While we employ best-in-class performance marketing frameworks and data-backed creative methodologies, external advertising platforms (e.g., Meta, Google, TikTok) operate under independent algorithms and policies. Saro Media is not liable for indirect, incidental, or consequential damages resulting from third-party platform downtime or ad policy changes.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                6. Third-Party Links & Services
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                Our site may contain links to external third-party services or client websites. We are not responsible for the content, privacy practices, or operating terms of those third-party sites.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                7. Governing Law
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                These Terms of Use shall be governed by and construed in accordance with the laws of Nepal. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in Kathmandu, Nepal.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                8. Changes to These Terms
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                We reserve the right to modify these Terms of Use at any time. When updates occur, the &quot;Last updated&quot; date at the top of this page will be revised. Continued use of the website constitutes acceptance of the modified terms.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                9. Contact & Inquiries
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                For questions regarding these Terms of Use or our agency agreements, please reach out to:
              </p>
              <div className="mt-4 rounded-2xl bg-blue-50/60 p-5 border border-blue-100">
                <p className="text-sm font-bold text-slate-900">Saro Media</p>
                <p className="text-sm text-slate-600 mt-1">Kathmandu, Nepal</p>
                <p className="text-sm text-slate-600">Email: vijan@saromedia.com.np</p>
                <div className="mt-3 flex gap-4 text-xs font-bold uppercase tracking-wider text-[#0e85f9]">
                  <Link href="/contact" className="hover:underline">
                    Contact Us →
                  </Link>
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
