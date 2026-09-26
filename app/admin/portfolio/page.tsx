'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Briefcase,
  Trash2,
  Edit2,
  ExternalLink,
  Upload,
  X,
  Tag,
  Eye,
  Calendar,
} from 'lucide-react';
import { api } from '../../lib/api';
import { TableSetupBanner } from '../components/TableSetupBanner';

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeItem, setActiveItem] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    category: 'branding',
    description: '',
    date: 'March 2026',
    cover_image_url: '',
    cover_image_public_id: '',
    media_type: 'image',
    tags: 'Branding, Design',
    status: 'published',
    display_order: 1,
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await api.getPortfolioAdmin({ limit: 50 });
      setItems(data.items || []);
    } catch (err: any) {
      setError(err?.message || 'Could not load portfolio items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenCreateModal = () => {
    setActiveItem(null);
    setFormData({
      title: '',
      slug: '',
      client: '',
      category: 'branding',
      description: '',
      date: 'March 2026',
      cover_image_url: '',
      cover_image_public_id: '',
      media_type: 'image',
      tags: 'Branding, Design',
      status: 'published',
      display_order: items.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setActiveItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      client: item.client || '',
      category: item.category,
      description: item.description || '',
      date: item.date || '',
      cover_image_url: item.cover_image_url,
      cover_image_public_id: item.cover_image_public_id,
      media_type: item.media_type,
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
      status: item.status,
      display_order: item.display_order,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    const slugified = val
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !activeItem ? slugified : prev.slug,
    }));
  };

  // Upload cover image to Cloudinary via backend
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadRes = await api.uploadFile(file, 'agency/portfolio/covers', 'image');
      setFormData((prev) => ({
        ...prev,
        cover_image_url: uploadRes.secure_url,
        cover_image_public_id: uploadRes.public_id,
      }));
    } catch (err: any) {
      alert(`Image upload failed: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cover_image_url || !formData.cover_image_public_id) {
      alert('Please upload a cover image or provide image URL.');
      return;
    }

    const payload = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (activeItem) {
        await api.updatePortfolio(activeItem.id, payload);
      } else {
        await api.createPortfolio(payload);
      }
      setModalOpen(false);
      fetchItems();
    } catch (err: any) {
      alert(`Error saving portfolio item: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This also removes associated Cloudinary files.`)) {
      return;
    }

    try {
      await api.deletePortfolio(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err: any) {
      alert(`Failed to delete: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
              Agency Portfolio
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
            <Briefcase className="w-7 h-7 text-blue-600" />
            <span>Case Studies & Projects</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Publish client case studies, photoshoots, brand redesigns, and cinematic reels.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <TableSetupBanner tableName="portfolio_items" error={error} onRefresh={fetchPortfolio} />

      {/* Grid of Portfolio Items */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <span>Loading portfolio items...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Portfolio Projects Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Get started by adding your agency&apos;s first client photoshoot, brand project, or video campaign.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold inline-flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Project</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden flex flex-col justify-between group hover:border-blue-300 hover:shadow-md transition-all shadow-xs"
            >
              {/* Media Cover Preview */}
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                {item.cover_image_url ? (
                  <img
                    src={item.cover_image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    No Cover Image
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-md shadow-xs ${
                      item.status === 'featured'
                        ? 'bg-amber-500 text-white'
                        : item.status === 'published'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/90 text-slate-700 backdrop-blur-md shadow-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    {item.client || 'Agency Client'}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {item.description || 'No description provided.'}
                  </p>
                </div>

                {/* Footer metadata & buttons */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{item.date || 'Active'}</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      title="Edit Project"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      title="Delete Project"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-base font-bold text-slate-900">
                {activeItem ? 'Edit Portfolio Project' : 'Create New Portfolio Project'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Luminary Fashion Autumn Reel"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="luminary-fashion-autumn-reel"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Luminary Fashion"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  >
                    <option value="photoshoot">Photoshoot</option>
                    <option value="videography">Videography</option>
                    <option value="branding">Branding</option>
                    <option value="web-development">Web Development</option>
                    <option value="social-media">Social Media & Ads</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="featured">Featured (Top Hero)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Cloudinary Cover Image Upload */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Cover Image (Cloudinary Stream) *
                </label>

                {formData.cover_image_url ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={formData.cover_image_url}
                      alt="Cover preview"
                      className="w-24 h-16 object-cover rounded-lg border border-slate-300"
                    />
                    <div className="overflow-hidden flex-1">
                      <div className="text-xs text-slate-700 truncate font-medium">{formData.cover_image_url}</div>
                      <div className="text-[10px] text-slate-400 truncate">ID: {formData.cover_image_public_id}</div>
                    </div>
                    <label className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs text-slate-700 font-semibold cursor-pointer">
                      Replace
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl bg-white transition-colors">
                    {uploadingImage ? (
                      <div className="flex items-center gap-2 text-xs text-blue-600 font-medium">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <span>Streaming directly to Cloudinary...</span>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center gap-2 cursor-pointer">
                        <Upload className="w-6 h-6 text-blue-600" />
                        <span className="text-xs font-bold text-blue-600">Click to upload cover photo</span>
                        <span className="text-[10px] text-slate-400">JPG, PNG, WEBP up to 50MB</span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Outline the client brief, production setup, and campaign results..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Fashion, Editorial, Milan"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Campaign Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. October 2025"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
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
                  disabled={uploadingImage}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  {activeItem ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
