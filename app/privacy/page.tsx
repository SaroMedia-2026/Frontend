import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn about how Saro Media collects, stores, protects, and handles personal data and client information across our digital platforms.",
};

export default function PrivacyPage() {
  const lastUpdated = "October 1, 2026";

  return (
    <div className="min-h-screen bg-[#f8fbfe] text-slate-900">
      <Header />

      <main>
        {/* Header Hero */}
        <section className="border-b border-slate-200/80 bg-white px-4 py-14 md:py-20">
          <div className="mx-auto max-w-[900px] text-center">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0e85f9]">
              Data Protection & Privacy
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
              Privacy Policy
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
                At <strong>Saro Media</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we take your privacy and the confidentiality of your personal and business data seriously. This Privacy Policy outlines what information we collect when you visit saromedia.com.np, submit project inquiries, or apply for open roles, and how we protect that information.
              </p>

              <hr className="my-8 border-slate-200" />

              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                1. Information We Collect
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                Depending on how you interact with our website, we may collect:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-relaxed">
                <li>
                  <strong>Contact Inquiries:</strong> Name, email address, phone number, company name, and project requirements submitted through our contact form.
                </li>
                <li>
                  <strong>Career Applications:</strong> Candidate name, email address, contact number, resume/CV files, portfolio links, and responses to recruitment screening questions.
                </li>
                <li>
                  <strong>Technical & Usage Data:</strong> Anonymized metrics such as browser type, operating system, pages visited, and session duration to improve website performance (via Vercel Analytics).
                </li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                2. How We Use Your Information
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                We use collected information solely for legitimate business operations:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-relaxed">
                <li>To evaluate project inquiries and communicate tailored strategy proposals.</li>
                <li>To process recruitment applications and assess candidate suitability for roles at Saro Media.</li>
                <li>To maintain, optimize, and secure the operational health of our digital properties.</li>
                <li>To comply with applicable legal obligations and financial documentation standards.</li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                3. Information Sharing & Third Parties
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                We do not sell, rent, or trade your personal information to third parties. We may only disclose your data under the following circumstances:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-relaxed">
                <li>
                  <strong>Trusted Infrastructure Providers:</strong> Secure cloud hosting, database services, and analytics partners operating under strict confidentiality contracts.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by applicable law, regulation, or judicial authority in Nepal.
                </li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                4. Data Storage & Security
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                We implement industry-standard encryption, SSL protocols, and access controls to protect your data against unauthorized access, loss, or misuse. Candidate resumes and client inquiry messages are kept within secure databases accessible only by authorized team members.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                5. Data Retention
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                We retain your personal details only for as long as necessary to fulfill the purposes for which they were collected — such as responding to inquiries, hiring cycles, or providing active client services — or as required by law.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                6. Your Privacy Rights
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                You have the right to request access to the personal data we hold about you, request corrections to inaccurate information, or request the deletion of your contact records or job applicant profile from our database.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                7. Changes to This Privacy Policy
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                We may periodically update this Privacy Policy to reflect changes in our practices or regulatory standards. The revised version will always be posted here with an updated date.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                8. Contact Us
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                If you have questions, feedback, or data privacy requests, please contact our team:
              </p>
              <div className="mt-4 rounded-2xl bg-blue-50/60 p-5 border border-blue-100">
                <p className="text-sm font-bold text-slate-900">Saro Media</p>
                <p className="text-sm text-slate-600 mt-1">Kathmandu, Nepal</p>
                <p className="text-sm text-slate-600">Email: vijan@saromedia.com.np</p>
                <div className="mt-3 flex gap-4 text-xs font-bold uppercase tracking-wider text-[#0e85f9]">
                  <Link href="/contact" className="hover:underline">
                    Contact Us →
                  </Link>
                  <Link href="/terms" className="hover:underline">
                    Terms of Use →
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
