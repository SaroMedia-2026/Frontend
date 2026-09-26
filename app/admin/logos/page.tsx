'use client';

import React, { useState, useEffect } from 'react';
import { Building2, Plus, Trash2, Edit2, Upload, X, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { api } from '../../lib/api';
import { TableSetupBanner } from '../components/TableSetupBanner';

export default function AdminLogosPage() {
  const [logos, setLogos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [activeItem, setActiveItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    client_name: '',
    logo_url: '',
    cloudinary_public_id: '',
    website_link: '',
    display_order: 1,
    is_active: true,
  });

  const fetchLogos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getLogos(true);
      setLogos(data || []);
    } catch (err: any) {
      setError(err?.message || 'Could not load client logos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const handleOpenCreateModal = () => {
    setActiveItem(null);
    setFormData({
      client_name: '',
      logo_url: '',
      cloudinary_public_id: '',
      website_link: '',
      display_order: logos.length + 1,
      is_active: true,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setActiveItem(item);
    setFormData({
      client_name: item.client_name,
      logo_url: item.logo_url,
      cloudinary_public_id: item.cloudinary_public_id,
      website_link: item.website_link || '',
      display_order: item.display_order,
      is_active: item.is_active,
    });
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const uploadRes = await api.uploadFile(file, 'agency/client-logos', 'image');
      setFormData((prev) => ({
        ...prev,
        logo_url: uploadRes.secure_url,
        cloudinary_public_id: uploadRes.public_id,
      }));
    } catch (err: any) {
      alert(`Logo upload failed: ${err.message}`);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.logo_url) {
      alert('Please upload a logo image.');
      return;
    }

    try {
      if (activeItem) {
        await api.updateLogo(activeItem.id, formData);
      } else {
        await api.createLogo(formData);
      }
      setModalOpen(false);
      fetchLogos();
    } catch (err: any) {
      alert(`Error saving logo: ${err.message}`);
    }
  };

  const handleToggleActive = async (item: any) => {
    try {
      await api.updateLogo(item.id, { is_active: !item.is_active });
      setLogos((prev) =>
        prev.map((l) => (l.id === item.id ? { ...l, is_active: !l.is_active } : l))
      );
    } catch (err: any) {
      alert(`Error updating: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete logo for "${name}"?`)) return;
    try {
      await api.deleteLogo(id);
      setLogos((prev) => prev.filter((l) => l.id !== id));
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
              Brand Partnerships
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
            <Building2 className="w-7 h-7 text-violet-600" />
            <span>Client Logos & Marquee</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage partner logos displayed on the homepage trusted-by marquee strip.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-blue-500/20 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Brand Logo</span>
        </button>
      </div>

      <TableSetupBanner tableName="client_logos" error={error} onRefresh={fetchLogos} />

      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading logos...</div>
      ) : logos.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
          <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Client Logos Added</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Upload logos of brands and enterprise partners you have collaborated with.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col justify-between items-center text-center group hover:border-slate-300 hover:shadow-md transition-all shadow-xs"
            >
              <div className="w-full h-20 flex items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100 mb-3">
                {logo.logo_url ? (
                  <img
                    src={logo.logo_url}
                    alt={logo.client_name}
                    className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="text-xs text-slate-400 font-bold">{logo.client_name}</span>
                )}
              </div>

              <div className="w-full">
                <div className="text-xs font-bold text-slate-900 truncate">{logo.client_name}</div>
                {logo.website_link ? (
                  <a
                    href={logo.website_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-blue-600 hover:underline truncate inline-flex items-center gap-1 mt-0.5 font-medium"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ) : (
                  <div className="text-[10px] text-slate-400">No link</div>
                )}
              </div>

              <div className="w-full mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(logo)}
                  title={logo.is_active ? 'Active on site' : 'Hidden'}
                  className={`p-1 rounded-md text-[10px] flex items-center gap-1 cursor-pointer font-bold uppercase tracking-wider ${
                    logo.is_active ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                >
                  {logo.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{logo.is_active ? 'Active' : 'Hidden'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(logo)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-800 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(logo.id, logo.client_name)}
                    className="p-1 rounded-md text-slate-400 hover:text-rose-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-base font-bold text-slate-900">
                {activeItem ? 'Edit Brand Logo' : 'Add Brand Logo'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Client / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="e.g. Luminary Fashion"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.website_link}
                  onChange={(e) => setFormData({ ...formData, website_link: e.target.value })}
                  placeholder="https://luminaryfashion.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              {/* Logo Upload to Cloudinary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Logo Image (Cloudinary) *
                </label>
                <div className="flex items-center gap-3">
                  {formData.logo_url ? (
                    <div className="w-16 h-12 rounded-lg bg-white border border-slate-300 flex items-center justify-center p-1">
                      <img src={formData.logo_url} alt="Logo" className="max-h-full max-w-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-16 h-12 rounded-lg bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-400 text-xs">
                      No Logo
                    </div>
                  )}

                  <label className="px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs text-slate-700 font-semibold cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-blue-600" />
                    <span>{uploadingLogo ? 'Streaming...' : 'Upload SVG / PNG'}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-white border-slate-300"
                />
                <label htmlFor="activeCheck" className="text-xs text-slate-700 font-semibold cursor-pointer">
                  Active (visible on website marquee)
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingLogo}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  {activeItem ? 'Save Changes' : 'Save Logo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
