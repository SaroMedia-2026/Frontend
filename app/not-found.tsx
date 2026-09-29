import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Home, Briefcase, Mail } from 'lucide-react';
import logo from '@/public/logo.png';

export const metadata = {
  title: '404 - Page Not Found | Saro Media',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image
            src={logo}
            alt="Saro Media Logo"
            width={120}
            height={36}
            className="h-8 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Safety
        </Link>
      </header>

      {/* Main 404 Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* Subtle background glow */}
          <div className="relative inline-block mb-6">
            <span className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-indigo-300 to-slate-600 select-none">
              404
            </span>
            <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-2xl -z-10 pointer-events-none" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Lost in the Digital Void?
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-10">
            The link you followed may be broken, or the page has been moved. Let&apos;s get you back on track to exploring creative excellence.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/25 hover:scale-105 active:scale-95"
            >
              <Home className="w-4 h-4" /> Return to Homepage
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-medium text-sm transition-all hover:scale-105 active:scale-95"
            >
              <Briefcase className="w-4 h-4" /> View Portfolio
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-medium text-sm transition-all hover:scale-105 active:scale-95"
            >
              <Mail className="w-4 h-4" /> Contact Us
            </Link>
          </div>

          {/* Helpful Navigation links */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-4 font-semibold">
              Popular Destinations
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300">
              <Link href="/services" className="hover:text-blue-400 transition-colors">
                Our Services
              </Link>
              <Link href="/about" className="hover:text-blue-400 transition-colors">
                About Saro
              </Link>
              <Link href="/career" className="hover:text-blue-400 transition-colors">
                Careers & Openings
              </Link>
              <Link href="/work" className="hover:text-blue-400 transition-colors">
                Featured Projects
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="px-6 py-6 max-w-7xl mx-auto w-full text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} Saro Media. All rights reserved.
      </footer>
    </main>
  );
}
