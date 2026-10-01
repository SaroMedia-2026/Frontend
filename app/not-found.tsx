import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const metadata = {
  title: "404 - Page Not Found | Saro Media",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fbfe] text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24 text-center">
        <div className="max-w-md mx-auto">
          <p className="text-6xl font-black text-[#0e85f9] md:text-7xl">404</p>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Page Not Found
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#0e85f9] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(14,133,249,0.3)] transition-all hover:bg-[#0d7ae8] hover:shadow-lg"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
