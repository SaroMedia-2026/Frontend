'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Mail,
  Filter,
  Check,
  RefreshCw,
  Search,
  Copy,
  Inbox,
  Send,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Trash2,
} from 'lucide-react';
import { api } from '../../lib/api';
import { TableSetupBanner } from '../components/TableSetupBanner';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Detail Modal State
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedContact) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedContact]);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getContacts({
        status: statusFilter || undefined,
        limit: 150,
      });
      const list = Array.isArray(data) ? data : data?.items || [];
      setContacts(list);
    } catch (err: any) {
      setError(err?.message || 'Could not load contact submissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    setCurrentPage(1);
  }, [statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.updateContactStatus(id, newStatus);
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (err: any) {
      alert(`Status update failed: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete inquiry from "${name}"?`)) return;
    try {
      await api.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(null);
      }
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openDetails = (contact: any) => {
    setSelectedContact(contact);
    if (contact.status === 'new') {
      handleStatusChange(contact.id, 'read');
    }
  };

  // Filter contacts by search
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    const q = searchQuery.toLowerCase();
    return contacts.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q) ||
        c.subject?.toLowerCase().includes(q) ||
        c.message?.toLowerCase().includes(q)
    );
  }, [contacts, searchQuery]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination Calculations
  const totalItems = filteredContacts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedContacts = filteredContacts.slice(startIndex, startIndex + pageSize);

  const newCount = contacts.filter((c) => c.status === 'new').length;
  const repliedCount = contacts.filter((c) => c.status === 'replied').length;
  const readCount = contacts.filter((c) => c.status === 'read').length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
              Agency Inquiries
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
            <Mail className="w-7 h-7 text-blue-600" />
            <span>Client Leads & Messages</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Clean overview with essential details. Click <strong>View</strong> on any lead to see full message and reply.
          </p>
        </div>

        {/* Quick KPI Counters */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <div className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs flex items-center gap-2">
            <Inbox className="w-3.5 h-3.5 text-slate-400" />
            <span>Total: <strong>{contacts.length}</strong></span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 shadow-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>New: <strong>{newCount}</strong></span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 shadow-xs">
            <span>Replied: <strong>{repliedCount}</strong></span>
          </div>
          <button
            onClick={fetchContacts}
            disabled={loading}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      <TableSetupBanner tableName="contact_submissions" error={error} onRefresh={fetchContacts} />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, email, subject..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-xs"
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
              <option value="">All Statuses ({contacts.length})</option>
              <option value="new">New ({newCount})</option>
              <option value="read">Read ({readCount})</option>
              <option value="replied">Replied ({repliedCount})</option>
              <option value="archived">Archived</option>
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

      {/* CLEAN, MINIMAL LEADS TABLE */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400">
            <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs font-medium">Loading inquiries...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">
              {searchQuery ? 'No Inquiries Match Search' : 'No Inquiries Found'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Client messages submitted from the Contact Us page will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4 w-28">Status</th>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4 w-32">Date</th>
                  <th className="py-3 px-4 w-28 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    onClick={() => openDetails(contact)}
                    className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                  >
                    {/* Status Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          contact.status === 'new'
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : contact.status === 'replied'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : contact.status === 'archived'
                            ? 'bg-slate-100 text-slate-500 border-slate-200'
                            : 'bg-blue-50 text-blue-600 border-blue-200'
                        }`}
                      >
                        {contact.status === 'new' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        )}
                        {contact.status}
                      </span>
                    </td>

                    {/* Client Name (No initial avatar circle) */}
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      <span className="truncate max-w-[200px] block">{contact.name}</span>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      <span className="truncate block max-w-[200px]">{contact.email}</span>
                    </td>

                    {/* Subject (No note icon/capsule) */}
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      <span className="truncate max-w-[260px] block">
                        {contact.subject || 'General Inquiry'}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                      {new Date(contact.submitted_at).toLocaleDateString(undefined, {
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
                          openDetails(contact);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-bold text-xs transition-all shadow-2xs group-hover:bg-blue-600 group-hover:text-white cursor-pointer"
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
        {!loading && filteredContacts.length > 0 && (
          <div className="border-t border-slate-200 px-5 py-3.5 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-500">
              Showing <strong className="text-slate-800">{startIndex + 1}</strong> to{' '}
              <strong className="text-slate-800">
                {Math.min(startIndex + pageSize, totalItems)}
              </strong>{' '}
              of <strong className="text-slate-800">{totalItems}</strong> inquiries
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
                            ? 'bg-blue-600 text-white shadow-xs'
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

      {/* FULL INQUIRY DETAILS MODAL (ALL DATA DISPLAYED, NO INTERNAL NOTES, NO INITIAL AVATAR) */}
      {selectedContact && (
        <div
          onClick={() => setSelectedContact(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto overscroll-contain"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Modal Header (No circular initial avatar) */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">{selectedContact.name}</h3>
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 mt-1">
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {selectedContact.email}
                  </a>
                  {selectedContact.phone && <span>• Phone: {selectedContact.phone}</span>}
                  <span>
                    • {new Date(selectedContact.submitted_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Selector in Modal */}
            <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Inquiry Status:
              </span>
              <select
                value={selectedContact.status}
                onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-white border-slate-300 text-slate-800 uppercase tracking-wider cursor-pointer shadow-xs focus:outline-none focus:border-blue-600"
              >
                <option value="new">● New (Unread)</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Subject
              </span>
              <div className="text-sm font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                {selectedContact.subject || 'No Subject Specified'}
              </div>
            </div>

            {/* Message Body with Copy Action */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Full Message
                </span>
                <button
                  onClick={() => handleCopyMessage(selectedContact.id, selectedContact.message)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  {copiedId === selectedContact.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Message</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-medium">
                {selectedContact.message}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => handleDelete(selectedContact.id, selectedContact.name)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Inquiry</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(
                    selectedContact.subject || 'Your inquiry to Saro Agency'
                  )}&body=${encodeURIComponent(
                    `\n\n--- Original Inquiry ---\nFrom: ${selectedContact.name} <${selectedContact.email}>\nMessage: ${selectedContact.message}`
                  )}`}
                  onClick={() => {
                    handleStatusChange(selectedContact.id, 'replied');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
