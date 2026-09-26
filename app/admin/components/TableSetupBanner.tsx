'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from 'lucide-react';
import { api } from '../../lib/api';

interface TableSetupBannerProps {
  tableName: string;
  error?: string | null;
  onRefresh?: () => void;
}

export function TableSetupBanner({ tableName, error, onRefresh }: TableSetupBannerProps) {
  const [copied, setCopied] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState<string | null>(null);
  const [seedError, setSeedError] = useState<string | null>(null);
  const [showSql, setShowSql] = useState(false);
  const [rawSql, setRawSql] = useState<string | null>(null);
  const [loadingSql, setLoadingSql] = useState(false);

  if (!error || !error.includes('schema cache')) {
    return null;
  }

  const handleCopySql = async () => {
    try {
      setLoadingSql(true);
      let sql = rawSql;
      if (!sql) {
        const res = await api.getSchemaSql();
        sql = res.sql;
        setRawSql(sql);
      }
      if (sql) {
        await navigator.clipboard.writeText(sql);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (err: any) {
      alert(`Could not copy SQL automatically: ${err.message}. Please copy from backend/supabase/migrations/001_initial_schema.sql`);
    } finally {
      setLoadingSql(false);
    }
  };

  const handleToggleViewSql = async () => {
    if (!showSql && !rawSql) {
      try {
        setLoadingSql(true);
        const res = await api.getSchemaSql();
        setRawSql(res.sql);
      } catch (err: any) {
        console.error('Failed to load SQL', err);
      } finally {
        setLoadingSql(false);
      }
    }
    setShowSql(!showSql);
  };

  const handleRunSeed = async () => {
    setSeeding(true);
    setSeedError(null);
    setSeedSuccess(null);
    try {
      const res = await api.seedDatabase();
      setSeedSuccess('Database seeded with sample agency content!');
      setTimeout(() => {
        if (onRefresh) {
          onRefresh();
        } else {
          window.location.reload();
        }
      }, 1500);
    } catch (err: any) {
      setSeedError(
        err?.message ||
          'Failed to seed. Please verify you clicked "RUN" in the Supabase SQL Editor first.'
      );
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 shadow-sm mb-6">
      <div className="flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-3 flex-1">
          <div>
            <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2 flex-wrap">
              <span>Database Table Not Found in Supabase:</span>
              <code className="bg-amber-100/90 text-amber-900 px-2 py-0.5 rounded font-mono text-xs font-semibold">
                public.{tableName}
              </code>
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed mt-1">
              Your Supabase credentials are valid, but the PostgreSQL database tables have not been created yet in your Supabase project. Complete the one-time 2-minute setup below:
            </p>
          </div>

          {/* Step by step callout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200/70 text-xs">
              <span className="font-bold text-amber-900 block mb-1">Step 1: Copy SQL</span>
              <p className="text-slate-600 text-[11px]">
                Click below to copy the complete schema migration script to your clipboard.
              </p>
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200/70 text-xs">
              <span className="font-bold text-amber-900 block mb-1">Step 2: Run in Supabase</span>
              <p className="text-slate-600 text-[11px]">
                Open the Supabase SQL editor, paste the script, and click <strong className="text-emerald-700">RUN</strong>.
              </p>
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200/70 text-xs">
              <span className="font-bold text-amber-900 block mb-1">Step 3: Seed & Refresh</span>
              <p className="text-slate-600 text-[11px]">
                Click "Seed Sample Data" below to populate projects, reviews, and client logos.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopySql}
              disabled={loadingSql}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>SQL Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{loadingSql ? 'Loading...' : 'Copy Full SQL Migration'}</span>
                </>
              )}
            </button>

            <a
              href="https://supabase.com/dashboard/project/cexwuqkrstuqfmbqkwss/sql/new"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-amber-100/60 text-amber-900 text-xs font-semibold border border-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
              <span>Open Supabase SQL Editor</span>
            </a>

            <button
              onClick={handleRunSeed}
              disabled={seeding}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {seeding ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Seeding Database...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                  <span>Seed Sample Data</span>
                </>
              )}
            </button>

            <button
              onClick={handleToggleViewSql}
              className="px-3 py-2 rounded-xl text-amber-800 hover:text-amber-950 hover:bg-amber-100/50 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ml-auto"
            >
              <span>{showSql ? 'Hide SQL Code' : 'View SQL Code'}</span>
              {showSql ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Feedback messages */}
          {seedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{seedSuccess} Reloading...</span>
            </div>
          )}

          {seedError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{seedError}</span>
            </div>
          )}

          {/* Collapsible raw SQL view */}
          {showSql && (
            <div className="mt-3 p-4 bg-slate-900 rounded-xl text-slate-100 text-[11px] font-mono border border-slate-800 overflow-x-auto max-h-72">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-slate-400">backend/supabase/migrations/001_initial_schema.sql</span>
                <button
                  onClick={handleCopySql}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="whitespace-pre">{rawSql || 'Loading SQL...'}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
