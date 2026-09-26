'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Clock, Trash2, Filter, Phone, Check } from 'lucide-react';
import { api } from '../../lib/api';
import { TableSetupBanner } from '../components/TableSetupBanner';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getContacts({
        status: statusFilter || undefined,
        limit: 50,
      });
      setContacts(data.items || []);
    } catch (err: any) {
      setError(err?.message || 'Could not load contact submissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.updateContactStatus(id, newStatus);
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }
    } catch (err: any) {
      alert(`Status update failed: ${err.message}`);
    }
  };

  const handleOpenDetail = (contact: any) => {
    setSelectedContact(contact);
    setNotes(contact.notes || '');

    // Auto mark as read if new
    if (contact.status === 'new') {
      handleStatusChange(contact.id, 'read');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedContact) return;
    setSavingNotes(true);
    try {
      await api.updateContactStatus(selectedContact.id, selectedContact.status, notes);
      setContacts((prev) =>
        prev.map((c) => (c.id === selectedContact.id ? { ...c, notes } : c))
      );
      alert('Internal lead notes updated successfully!');
    } catch (err: any) {
      alert(`Failed to save notes: ${err.message}`);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete message from "${name}"?`)) return;
    try {
      await api.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (selectedContact?.id === id) setSelectedContact(null);
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
              Inbound Business Leads
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
            <Mail className="w-7 h-7 text-sky-500" />
            <span>Client Inquiries & Leads</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Track inquiries submitted via the agency Contact Us form and qualify new business leads.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600 shadow-xs"
          >
            <option value="">All Leads</option>
            <option value="new">New (Unread)</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <TableSetupBanner tableName="contact_submissions" error={error} onRefresh={fetchContacts} />

      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading inquiries...</div>
      ) : contacts.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
          <Mail className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Contact Inquiries</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Messages from potential clients will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of Inquiries (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            {contacts.map((c) => {
              const isSelected = selectedContact?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => handleOpenDetail(c)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                    isSelected
                      ? 'bg-blue-50/50 border-blue-500 shadow-sm'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{c.name}</span>
                        {c.status === 'new' && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold border border-rose-200">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5 font-medium">
                        {c.subject || 'New Project Inquiry'}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {new Date(c.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {c.message}
                  </p>

                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-medium text-slate-500">{c.email}</span>
                    <span className="capitalize font-semibold text-blue-600">{c.status}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lead Detail Panel (Right 1 col) */}
          <div className="lg:col-span-1">
            {selectedContact ? (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-5 sticky top-6 shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{selectedContact.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{selectedContact.email}</p>
                    {selectedContact.phone && (
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-blue-600" />
                        <span>{selectedContact.phone}</span>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(selectedContact.id, selectedContact.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Status Selector */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Lead Status
                  </label>
                  <select
                    value={selectedContact.status}
                    onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value="new">New (Unread)</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Full Message */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {selectedContact.subject || 'Message Content'}
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>

                {/* Quick mailto reply button */}
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(
                    selectedContact.subject || 'Your inquiry to Saro Agency'
                  )}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email Client</span>
                </a>

                {/* Internal Notes */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Internal Lead Notes
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Budget discussed: $25k. Forwarded to Head of Strategy."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white leading-relaxed"
                  />
                  <button
                    onClick={handleSaveNotes}
                    disabled={savingNotes}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {savingNotes ? 'Saving...' : 'Save Lead Notes'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-400 shadow-xs">
                Select an inquiry on the left to read full message and record internal notes.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
