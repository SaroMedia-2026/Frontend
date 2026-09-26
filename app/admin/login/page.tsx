'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';
import logo from '@/public/logo.png';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@saroagency.com');
  const [password, setPassword] = useState('AdminSecurePassword123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.login(email, password);
      router.push('/admin');
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@saroagency.com');
    setPassword('AdminSecurePassword123!');
    setError(null);
  };

  return (
    <div className="w-full max-w-md relative">
      {/* Decorative ambient background glows matching Saro Hero */}
      <div className="pointer-events-none absolute -top-24 -left-20 w-72 h-72 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-sky-100/60 blur-3xl" />

      {/* Brand header */}
      <div className="text-center mb-8 relative z-10">
        <Link href="/" className="inline-block group mb-3">
          <Image
            src={logo}
            alt="Saro Logo"
            width={180}
            height={60}
            className="h-14 w-auto object-contain mx-auto group-hover:scale-102 transition-transform"
            priority
          />
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600">
            Agency CMS Portal
          </span>
        </div>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          Manage your website portfolio, testimonials, career openings, and inbound leads.
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white/95 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative z-10 backdrop-blur-md">
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Authentication Failed</p>
              <p className="text-rose-600/90 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@saroagency.com"
                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-60 transition-all cursor-pointer"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast-Fill */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Fill Seed Admin Credentials</span>
          </button>
        </div>
      </div>

      <div className="text-center mt-6 relative z-10">
        <Link href="/" className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">
          ← Return to Public Website
        </Link>
      </div>
    </div>
  );
}
