import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn about how Saro Media uses cookies and similar tracking technologies to improve website functionality, performance, and user experience.",
};

export default function CookiesPage() {
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
              Cookie Policy
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
                This Cookie Policy explains how <strong>Saro Media</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar technologies when you visit our website at saromedia.com.np. It describes what these technologies are, why we use them, and your rights to control their use.
              </p>

              <hr className="my-8 border-slate-200" />

              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                1. What Are Cookies?
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used by web developers to make websites work efficiently, provide personalized experiences, and provide analytics insights to website owners.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                2. How We Use Cookies
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                We use cookies to enhance your browsing experience, maintain website stability, analyze performance, and understand how visitors interact with our portfolio and service offerings.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                3. Types of Cookies We Use
              </h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-slate-200/90 bg-[#f8fbfe] p-5">
                  <h3 className="text-lg font-bold text-slate-900">Essential / Strictly Necessary Cookies</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                    These cookies are necessary for the website to function properly. They enable core features such as page navigation, access to secure administrative areas, and CSRF protection. The website cannot function properly without these cookies.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-[#f8fbfe] p-5">
                  <h3 className="text-lg font-bold text-slate-900">Performance & Analytics Cookies</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                    These cookies collect aggregate, anonymized information about how visitors navigate our site (such as most visited case studies, error rates, and load times via Vercel Analytics). They help us continually optimize page load speeds and user experience.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-[#f8fbfe] p-5">
                  <h3 className="text-lg font-bold text-slate-900">Functionality Cookies</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                    These cookies remember your preferences (such as language selection or form inputs) to deliver a more seamless and personalized interaction on subsequent visits.
                  </p>
                </div>
              </div>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                4. Third-Party Technologies
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                Some third-party providers may set cookies when you interact with embedded features on our site, including:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-relaxed">
                <li><strong>Vercel Web Analytics:</strong> Privacy-friendly, cookieless or lightweight performance monitoring.</li>
                <li><strong>Google Maps:</strong> Embedded interactive maps on our contact page to help clients locate our Kathmandu office.</li>
                <li><strong>Social Media Links:</strong> External links to our official social media channels (Instagram, Facebook, LinkedIn, YouTube).</li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                5. How to Manage and Disable Cookies
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                You can control and manage cookies through your web browser settings. Most browsers allow you to block cookies, delete existing cookies, or receive a warning before a cookie is stored. Please note that disabling essential cookies may impact certain interactive features of our website.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-relaxed">
                <li><strong>Google Chrome:</strong> Settings → Privacy and security → Third-party cookies</li>
                <li><strong>Apple Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Mozilla Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data</li>
                <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions</li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                6. Updates to This Cookie Policy
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                We may update this policy periodically to reflect changes in the cookies we use or for legal and operational requirements. Please check this page regularly to stay informed.
              </p>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                7. Questions & Contact
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                If you have any questions regarding our use of cookies or related privacy practices, please contact us:
              </p>
              <div className="mt-4 rounded-2xl bg-blue-50/60 p-5 border border-blue-100">
                <p className="text-sm font-bold text-slate-900">Saro Media</p>
                <p className="text-sm text-slate-600 mt-1">Kathmandu, Nepal</p>
                <p className="text-sm text-slate-600">Email: vijan@saromedia.com.np</p>
                <div className="mt-3 flex gap-4 text-xs font-bold uppercase tracking-wider text-[#0e85f9]">
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy →
                  </Link>
                  <Link href="/terms" className="hover:underline">
                    Terms of Use →
                  </Link>
                  <Link href="/contact" className="hover:underline">
                    Contact Us →
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
