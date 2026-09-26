'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  ExternalLink,
  Trash2,
  Clock,
  Filter,
  CheckCircle2,
  XCircle,
  Clock3,
  UserCheck,
} from 'lucide-react';
import { api } from '../../lib/api';
import { TableSetupBanner } from '../components/TableSetupBanner';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [activeApplication, setActiveApplication] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getApplications({
        status: statusFilter || undefined,
        limit: 50,
      });
      setApplications(data.items || []);
    } catch (err: any) {
      setError(err?.message || 'Could not load job applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.updateApplicationStatus(id, newStatus);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err: any) {
      alert(`Status update failed: ${err.message}`);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeApplication) return;
    setSavingNotes(true);
    try {
      await api.updateApplicationStatus(
        activeApplication.id,
        activeApplication.status,
        adminNotes
      );
      setApplications((prev) =>
        prev.map((app) =>
          app.id === activeApplication.id ? { ...app, notes: adminNotes } : app
        )
      );
      setActiveApplication(null);
    } catch (err: any) {
      alert(`Failed to save notes: ${err.message}`);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete application from ${name}? Associated resume file will also be deleted from Cloudinary.`)) {
      return;
    }

    try {
      await api.deleteApplication(id);
      setApplications((prev) => prev.filter((a) => a.id !== id));
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
              Recruitment Pipeline
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-rose-500" />
            <span>Job Candidate Applications</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Review incoming candidate applications, inspect resumes, and track candidate pipeline.
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
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
        </div>
      </div>

      <TableSetupBanner tableName="job_applications" error={error} onRefresh={fetchApplications} />

      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Applications Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Candidates applying via your career listings will appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="px-5 py-3.5">Candidate</th>
                  <th className="px-5 py-3.5">Applied Position</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Resume</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900">{app.name}</div>
                      <div className="text-[11px] text-slate-500">{app.email}</div>
                      {app.phone && <div className="text-[10px] text-slate-400">{app.phone}</div>}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800">
                        {app.career?.title || 'General Application'}
                      </div>
                      <div className="text-[10px] text-slate-400">{app.career?.department || 'Agency'}</div>
                    </td>

                    <td className="px-5 py-4 text-slate-500 whitespace-nowrap font-medium">
                      {new Date(app.applied_at).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      {app.resume_url ? (
                        <a
                          href={app.resume_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 text-[11px] font-semibold transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          <span>View Resume</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-slate-400">No file</span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none uppercase tracking-wider ${
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
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
                    </td>

                    <td className="px-5 py-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => {
                          setActiveApplication(app);
                          setAdminNotes(app.notes || '');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer"
                      >
                        {app.notes ? 'Edit Notes' : '+ Note'}
                      </button>
                      <button
                        onClick={() => handleDelete(app.id, app.name)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Internal Notes Modal */}
      {activeApplication && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Candidate Notes: {activeApplication.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Internal hiring notes for {activeApplication.career?.title || 'candidate'}
              </p>
            </div>

            {activeApplication.cover_letter && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">Cover Note:</span>
                <p className="italic leading-relaxed">{activeApplication.cover_letter}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Internal Hiring Notes
              </label>
              <textarea
                rows={4}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="e.g. Portfolio looks exceptional. Inviting for technical director interview."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveApplication(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingNotes}
                onClick={handleSaveNotes}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                {savingNotes ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
