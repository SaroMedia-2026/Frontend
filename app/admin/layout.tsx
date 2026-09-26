'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  MessageSquareQuote,
  Building2,
  Users,
  FileText,
  Mail,
  Sliders,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { authStorage, api, AdminUser } from '../lib/api';
import logo from '@/public/logo.png';

const navigationItems = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Portfolio', href: '/admin/portfolio', icon: Briefcase },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { name: 'Client Logos', href: '/admin/logos', icon: Building2 },
  { name: 'Careers', href: '/admin/careers', icon: Users },
  { name: 'Applications', href: '/admin/applications', icon: FileText },
  { name: 'Inquiries & Leads', href: '/admin/contacts', icon: Mail },
  { name: 'Site Settings', href: '/admin/settings', icon: Sliders },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setIsReady(true);
      return;
    }

    const token = authStorage.getToken();
    const storedUser = authStorage.getUser();

    if (!token) {
      router.replace('/admin/login');
    } else {
      setUser(storedUser);
      setIsReady(true);
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch {
      authStorage.clearSession();
    }
    router.replace('/admin/login');
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-[#f4f8fb] flex items-center justify-center text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Verifying Saro Admin Session...</p>
        </div>
      </div>
    );
  }

  // Login page has its own dedicated clean frame
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#f4f8fb] text-slate-900 flex flex-col justify-center items-center p-4">
        <style jsx global>{`
          * { cursor: auto !important; }
          button, a, input, select, textarea { cursor: pointer !important; }
          input, textarea { cursor: text !important; }
        `}</style>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f8fb] text-slate-900 flex flex-col antialiased">
      {/* Ensure cursor works naturally across all admin forms and tables */}
      <style jsx global>{`
        * { cursor: auto !important; }
        button, a, select, [role="button"] { cursor: pointer !important; }
        input, textarea { cursor: text !important; }
      `}</style>

      {/* Mobile Top Navbar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white/95 border-b border-slate-200/80 sticky top-0 z-50 backdrop-blur-md shadow-sm">
        <Link href="/admin" className="flex items-center gap-2">
          <Image src={logo} alt="Saro Logo" height={36} width={100} className="h-8 w-auto object-contain" priority />
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/60">
            CMS
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between
            transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-[2px_0_12px_rgba(0,0,0,0.02)]
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div>
            {/* Saro Logo & Badge */}
            <div className="h-20 px-6 hidden lg:flex items-center justify-between border-b border-slate-100">
              <Link href="/admin" className="flex items-center gap-3 group">
                <Image
                  src={logo}
                  alt="Saro Logo"
                  width={140}
                  height={50}
                  className="h-10 w-auto object-contain group-hover:scale-102 transition-transform"
                  priority
                />
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/60">
                  CMS
                </span>
              </Link>
            </div>

            {/* Navigation Section */}
            <div className="px-4 py-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2">
                Navigation
              </div>
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all
                        ${
                          isActive
                            ? 'bg-blue-50/90 text-blue-600 font-semibold border border-blue-200/60 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span>{item.name}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-600" />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* User Profile & Live Site shortcut */}
          <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/50">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all shadow-xs"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                <span>View Live Saro Site</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Opens tab</span>
            </Link>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-blue-100/80 text-blue-600 font-bold flex items-center justify-center text-xs shrink-0">
                  {user?.full_name ? user.full_name[0].toUpperCase() : 'A'}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold text-slate-900 truncate">
                    {user?.full_name || 'Agency Admin'}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@saroagency.com'}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Log out"
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
          <div className="max-w-[1240px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
