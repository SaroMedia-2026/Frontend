'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  MessageSquareQuote,
  Building2,
  Users,
  FileText,
  Mail,
  ArrowUpRight,
  RefreshCw,
  Plus,
  AlertTriangle,
  Copy,
  Check,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { api } from '../lib/api';
import { TableSetupBanner } from './components/TableSetupBanner';

export default function AdminOverviewPage() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAnalyticsSummary();
      setSummary(data);
    } catch (err: any) {
      setError(err?.message || 'Could not connect to backend analytics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleCopySqlInstructions = () => {
    navigator.clipboard.writeText(
      `-- Copy contents of backend/supabase/migrations/001_initial_schema.sql and paste into Supabase SQL Editor!`
    );
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const statCards = [
    {
      title: 'Portfolio Projects',
      value: summary?.counts?.portfolio_items ?? 0,
      subtext: 'Published & Featured',
      icon: Briefcase,
      color: 'bg-blue-50 text-blue-600 border-blue-200/60',
      iconBg: 'bg-gradient-to-tr from-blue-600 to-indigo-600',
      href: '/admin/portfolio',
    },
    {
      title: 'Client Reviews',
      value: summary?.counts?.testimonials ?? 0,
      subtext: 'Testimonials Live',
      icon: MessageSquareQuote,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/60',
      iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-600',
      href: '/admin/testimonials',
    },
    {
      title: 'Client Logos',
      value: summary?.counts?.client_logos ?? 0,
      subtext: 'Brand Partners',
      icon: Building2,
      color: 'bg-violet-50 text-violet-600 border-violet-200/60',
      iconBg: 'bg-gradient-to-tr from-violet-600 to-purple-600',
      href: '/admin/logos',
    },
    {
      title: 'Career Openings',
      value: summary?.counts?.careers?.open ?? 0,
      subtext: `${summary?.counts?.careers?.total ?? 0} total listings`,
      icon: Users,
      color: 'bg-amber-50 text-amber-600 border-amber-200/60',
      iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500',
      href: '/admin/careers',
    },
    {
      title: 'New Applications',
      value: summary?.counts?.job_applications?.new ?? 0,
      subtext: `${summary?.counts?.job_applications?.total ?? 0} total received`,
      icon: FileText,
      color: 'bg-rose-50 text-rose-600 border-rose-200/60',
      iconBg: 'bg-gradient-to-tr from-rose-600 to-pink-600',
      href: '/admin/applications',
    },
    {
      title: 'Inbound Leads',
      value: summary?.counts?.contacts?.new ?? 0,
      subtext: `${summary?.counts?.contacts?.total ?? 0} total inquiries`,
      icon: Mail,
      color: 'bg-sky-50 text-sky-600 border-sky-200/60',
      iconBg: 'bg-gradient-to-tr from-sky-500 to-blue-600',
      href: '/admin/contacts',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
              Agency Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Overview Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor incoming client leads, job candidates, and manage website content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSummary}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-slate-700 hover:text-slate-900 text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 shadow-xs transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/portfolio"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Migration Notice Banner (If tables are not created in Supabase yet) */}
      <TableSetupBanner tableName="agency_cms" error={error} onRefresh={fetchSummary} />

      {/* Stat KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all group relative overflow-hidden shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-black tracking-tight text-slate-900">
                  {loading ? '...' : card.value}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                  <span>{card.subtext}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Inbound Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Contact Inquiries */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Latest Inbound Client Inquiries</span>
            </h2>
            <Link
              href="/admin/contacts"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {summary?.recent_activity?.contacts?.length > 0 ? (
              summary.recent_activity.contacts.map((contact: any) => (
                <div
                  key={contact.id}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-slate-900 truncate">{contact.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{contact.subject || contact.email}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        contact.status === 'new'
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      }`}
                    >
                      {contact.status}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {new Date(contact.submitted_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                No contact submissions received yet.
              </div>
            )}
          </div>
        </div>

        {/* Latest Job Applications */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Latest Job Candidates</span>
            </h2>
            <Link
              href="/admin/applications"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {summary?.recent_activity?.applications?.length > 0 ? (
              summary.recent_activity.applications.map((app: any) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-slate-900 truncate">{app.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {app.career?.title || 'General Position'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        app.status === 'new'
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'bg-blue-50 text-blue-600 border border-blue-200'
                      }`}
                    >
                      {app.status}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {new Date(app.applied_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                No job applications received yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
