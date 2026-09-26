'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  ExternalLink,
  Trash2,
  Filter,
  Check,
  RefreshCw,
  Search,
  Copy,
  Users,
  Send,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  HelpCircle,
} from 'lucide-react';
import { api } from '../../lib/api';
import { TableSetupBanner } from '../components/TableSetupBanner';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Detail Modal State
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedApp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedApp]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getApplications({
        status: statusFilter || undefined,
        limit: 150,
      });
      const list = Array.isArray(data) ? data : data?.items || [];
      setApplications(list);
    } catch (err: any) {
      setError(err?.message || 'Could not load job applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    setCurrentPage(1);
  }, [statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.updateApplicationStatus(id, newStatus);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (err: any) {
      alert(`Status update failed: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Delete application from "${name}"? Associated resume file will also be removed.`
      )
    ) {
      return;
    }

    try {
      await api.deleteApplication(id);
      setApplications((prev) => prev.filter((a) => a.id !== id));
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(null);
      }
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleCopyNote = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openDetails = (app: any) => {
    setSelectedApp(app);
    if (app.status === 'new') {
      handleStatusChange(app.id, 'reviewed');
    }
  };

  // Filter applications by search query
  const filteredApplications = useMemo(() => {
    if (!searchQuery.trim()) return applications;
    const q = searchQuery.toLowerCase();
    return applications.filter(
      (app) =>
        app.name?.toLowerCase().includes(q) ||
        app.email?.toLowerCase().includes(q) ||
        app.phone?.toLowerCase().includes(q) ||
        app.career?.title?.toLowerCase().includes(q) ||
        app.cover_letter?.toLowerCase().includes(q)
    );
  }, [applications, searchQuery]);

  // Reset to page 1 on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination Calculations
  const totalItems = filteredApplications.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + pageSize);

  const newCount = applications.filter((a) => a.status === 'new').length;
  const reviewedCount = applications.filter((a) => a.status === 'reviewed').length;
  const shortlistedCount = applications.filter((a) => a.status === 'shortlisted').length;
  const hiredCount = applications.filter((a) => a.status === 'hired').length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
              Recruitment Pipeline
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
            <Users className="w-7 h-7 text-indigo-600" />
            <span>Job Applications & Candidates</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Clean candidate overview. Click <strong>View</strong> to review resume, screening answers, and cover note.
          </p>
        </div>

        {/* Quick KPI Counters */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <div className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs flex items-center gap-2">
            <span>Total: <strong>{applications.length}</strong></span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 shadow-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>New: <strong>{newCount}</strong></span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 shadow-xs">
            <span>Shortlisted: <strong>{shortlistedCount}</strong></span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-700 shadow-xs">
            <span>Hired: <strong>{hiredCount}</strong></span>
          </div>
          <button
            onClick={fetchApplications}
            disabled={loading}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
            title="Refresh Applications"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
        </div>
      </div>

      <TableSetupBanner tableName="job_applications" error={error} onRefresh={fetchApplications} />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by candidate name, email, role..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="">All Statuses ({applications.length})</option>
              <option value="new">New ({newCount})</option>
              <option value="reviewed">Reviewed ({reviewedCount})</option>
              <option value="shortlisted">Shortlisted ({shortlistedCount})</option>
              <option value="hired">Hired ({hiredCount})</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Rows Per Page */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
            <span className="text-[11px] font-semibold text-slate-500">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* CLEAN, MINIMAL CANDIDATE TABLE */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400">
            <div className="w-7 h-7 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs font-medium">Loading candidate applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">
              {searchQuery ? 'No Candidates Match Search' : 'No Applications Found'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Candidates applying via your career listings will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4 w-32">Status</th>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Applied Role</th>
                  <th className="py-3 px-4 w-32">Date</th>
                  <th className="py-3 px-4 w-28 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedApplications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => openDetails(app)}
                    className="hover:bg-indigo-50/30 transition-colors cursor-pointer group"
                  >
                    {/* Status / Stage Pill */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          app.status === 'new'
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : app.status === 'shortlisted'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : app.status === 'hired'
                            ? 'bg-purple-50 text-purple-600 border-purple-200'
                            : app.status === 'rejected'
                            ? 'bg-slate-100 text-slate-500 border-slate-200'
                            : 'bg-blue-50 text-blue-600 border-blue-200'
                        }`}
                      >
                        {app.status === 'new' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        )}
                        {app.status}
                      </span>
                    </td>

                    {/* Candidate Name (No circle with initial letter) */}
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      <span className="truncate max-w-[200px] block">{app.name}</span>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      <span className="truncate block max-w-[200px]">{app.email}</span>
                    </td>

                    {/* Applied Role (Plain text, no capsule, no icon) */}
                    <td className="py-3.5 px-4 font-medium text-slate-800 whitespace-nowrap">
                      <span className="truncate block max-w-[240px]">
                        {app.career?.title || 'Open Position'}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                      {new Date(app.applied_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* View Button */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetails(app);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs transition-all shadow-2xs group-hover:bg-indigo-600 group-hover:text-white cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {!loading && filteredApplications.length > 0 && (
          <div className="border-t border-slate-200 px-5 py-3.5 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-500">
              Showing <strong className="text-slate-800">{startIndex + 1}</strong> to{' '}
              <strong className="text-slate-800">
                {Math.min(startIndex + pageSize, totalItems)}
              </strong>{' '}
              of <strong className="text-slate-800">{totalItems}</strong> candidates
            </div>

            <div className="flex items-center gap-1.5">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  if (
                    pNum === 1 ||
                    pNum === totalPages ||
                    (pNum >= safeCurrentPage - 1 && pNum <= safeCurrentPage + 1)
                  ) {
                    return (
                      <button
                        key={pNum}
                        onClick={() => setCurrentPage(pNum)}
                        className={`w-8 h-8 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          safeCurrentPage === pNum
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pNum}
                      </button>
                    );
                  }
                  if (
                    pNum === safeCurrentPage - 2 ||
                    pNum === safeCurrentPage + 2
                  ) {
                    return (
                      <span key={pNum} className="px-1 text-slate-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FULL CANDIDATE DETAILS MODAL */}
      {selectedApp && (
        <div
          onClick={() => setSelectedApp(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto overscroll-contain"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Modal Header (No avatar circle, plain text role) */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-black text-slate-900">{selectedApp.name}</h3>
                  <span className="text-xs font-bold text-indigo-600">
                    • {selectedApp.career?.title || 'Open Position'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 mt-1">
                  <a
                    href={`mailto:${selectedApp.email}`}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    {selectedApp.email}
                  </a>
                  {selectedApp.phone && <span>• Phone: {selectedApp.phone}</span>}
                  <span>• Applied: {new Date(selectedApp.applied_at).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stage Selector & Resume Download Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Candidate Stage:
                </span>
                <select
                  value={selectedApp.status}
                  onChange={(e) => handleStatusChange(selectedApp.id, e.target.value)}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-white border-slate-300 text-slate-800 uppercase tracking-wider cursor-pointer shadow-xs focus:outline-none focus:border-indigo-600"
                >
                  <option value="new">● New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {selectedApp.resume_url && (
                <a
                  href={selectedApp.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Resume Document</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                </a>
              )}
            </div>

            {/* CUSTOM SCREENING QUESTIONS & ANSWERS */}
            {selectedApp.answers && Object.keys(selectedApp.answers).length > 0 && (
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Custom Screening Questions & Answers</span>
                </span>
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  {Object.entries(selectedApp.answers).map(([question, answer]: [string, any], idx: number) => (
                    <div key={idx} className="pb-2.5 border-b border-slate-200/60 last:border-b-0 last:pb-0">
                      <span className="text-xs font-bold text-slate-800 block mb-0.5">
                        {question}
                      </span>
                      <p className="text-xs text-slate-900 bg-white p-2.5 rounded-xl border border-slate-200/60 font-medium">
                        {answer || <span className="text-slate-400 italic font-normal">No answer submitted</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Candidate Cover Note */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Cover Note / Message
                </span>
                {selectedApp.cover_letter && (
                  <button
                    onClick={() => handleCopyNote(selectedApp.id, selectedApp.cover_letter)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    {copiedId === selectedApp.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Note</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-medium">
                {selectedApp.cover_letter || (
                  <span className="text-slate-400 italic font-normal">
                    No cover note provided by applicant.
                  </span>
                )}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => handleDelete(selectedApp.id, selectedApp.name)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Application</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedApp.email}?subject=Application for ${encodeURIComponent(
                    selectedApp.career?.title || 'Open Position'
                  )} at Saro Agency`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Email Candidate</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
