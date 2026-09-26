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
  Image as ImageIcon,
  Share2,
  Check,
} from 'lucide-react';
import { api } from '../../lib/api';
import { TableSetupBanner } from '../components/TableSetupBanner';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TikTokIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.51c0 1.94-.57 3.91-1.74 5.48-1.53 2.06-4.04 3.28-6.6 3.19-2.32-.07-4.54-1.15-5.99-2.96-1.54-1.93-2.09-4.53-1.53-6.94.67-2.88 2.82-5.18 5.68-6.02.94-.28 1.93-.38 2.92-.3v4.06c-.84-.11-1.71.04-2.47.45-.98.53-1.67 1.5-1.84 2.6-.2 1.25.26 2.53 1.19 3.37.94.84 2.27 1.16 3.5.83 1.18-.31 2.1-1.28 2.37-2.46.12-.55.14-1.12.14-1.69V.02z"/>
    </svg>
  );
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
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
    instagram_url: '',
    facebook_url: '',
    tiktok_url: '',
  });

  // Gallery Photos for Carousel & Showcase Below
  const [galleryPhotos, setGalleryPhotos] = useState<
    Array<{ url: string; public_id: string; caption?: string }>
  >([]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await api.getPortfolioAdmin({ limit: 50 });
      const list = Array.isArray(data) ? data : data?.items || [];
      setItems(list);
    } catch (err: any) {
      setError(err?.message || 'Could not load portfolio items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Lock background scroll when modal is open
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
      instagram_url: 'https://instagram.com',
      facebook_url: 'https://facebook.com',
      tiktok_url: 'https://tiktok.com',
    });
    setGalleryPhotos([]);
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
      instagram_url: item.instagram_url || '',
      facebook_url: item.facebook_url || '',
      tiktok_url: item.tiktok_url || '',
    });

    const existingPhotos = (item.media || [])
      .filter((m: any) => m.resource_type === 'image' || !m.url?.endsWith('.mp4'))
      .map((m: any) => ({
        url: m.url,
        public_id: m.public_id,
        caption: m.caption || '',
      }));
    setGalleryPhotos(existingPhotos);
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

  // Upload Cover Image
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      const uploadRes = await api.uploadFile(file, 'agency/portfolio/covers', 'image');
      setFormData((prev) => ({
        ...prev,
        cover_image_url: uploadRes.secure_url,
        cover_image_public_id: uploadRes.public_id,
      }));
    } catch (err: any) {
      alert(`Cover image upload failed: ${err.message}`);
    } finally {
      setUploadingCover(false);
    }
  };

  // Upload Additional Gallery Photo
  const handleGalleryPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const res = await api.uploadFile(file, 'agency/portfolio/gallery', 'image');
        setGalleryPhotos((prev) => [
          ...prev,
          {
            url: res.secure_url,
            public_id: res.public_id,
            caption: '',
          },
        ]);
      }
    } catch (err: any) {
      alert(`Gallery photo upload failed: ${err.message}`);
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleRemoveGalleryPhoto = (index: number) => {
    setGalleryPhotos((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCaptionChange = (index: number, caption: string) => {
    setGalleryPhotos((prev) =>
      prev.map((photo, idx) => (idx === index ? { ...photo, caption } : photo))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cover_image_url || !formData.cover_image_public_id) {
      alert('Please upload a cover image or provide an image URL.');
      return;
    }

    const payload = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      media: galleryPhotos.map((photo, idx) => ({
        url: photo.url,
        public_id: photo.public_id,
        resource_type: 'image',
        caption: photo.caption || null,
        display_order: idx + 1,
      })),
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
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This also removes associated Cloudinary files.`
      )
    ) {
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
      {/* Top Header */}
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
            Publish client case studies, photoshoots, and lookbook photo carousels with social links.
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

      <TableSetupBanner tableName="portfolio_items" error={error} onRefresh={fetchItems} />

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
            Add your agency&apos;s first client photoshoot, brand project, or case study.
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

                  {/* Social Links Badges */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Work Links:
                    </span>
                    {item.instagram_url && (
                      <span title="Instagram Link Configured" className="text-pink-600">
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {item.facebook_url && (
                      <span title="Facebook Link Configured" className="text-blue-600">
                        <FacebookIcon className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {item.tiktok_url && (
                      <span title="TikTok Link Configured" className="text-slate-800">
                        <TikTokIcon className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {item.media?.length > 0 && (
                      <span className="text-[10px] text-slate-500 font-semibold ml-auto flex items-center gap-1">
                        <ImageIcon className="w-3 h-3 text-slate-400" />
                        <span>{item.media.length} photos</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer metadata & buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{item.date || 'Active'}</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`/work/${item.slug || item.id}`}
                      target="_blank"
                      rel="noreferrer"
                      title="View Public Page"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </a>
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
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-base font-bold text-slate-900">
                {activeItem ? 'Edit Portfolio Project' : 'Create New Portfolio Project'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Title & Slug */}
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
                    placeholder="e.g. Luminary Fashion Autumn Lookbook"
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
                    placeholder="luminary-fashion-autumn-lookbook"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Client, Category, Status */}
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

              {/* 1. COVER PHOTO UPLOAD */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Main Cover Photo *
                  </label>
                  <span className="text-[10px] text-slate-400">Optimized image only (no video)</span>
                </div>

                {formData.cover_image_url ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={formData.cover_image_url}
                      alt="Cover preview"
                      className="w-24 h-16 object-cover rounded-lg border border-slate-300"
                    />
                    <div className="overflow-hidden flex-1">
                      <div className="text-xs text-slate-700 truncate font-medium">
                        {formData.cover_image_url}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        ID: {formData.cover_image_public_id}
                      </div>
                    </div>
                    <label className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs text-slate-700 font-semibold cursor-pointer">
                      Replace
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl bg-white transition-colors">
                    {uploadingCover ? (
                      <div className="flex items-center gap-2 text-xs text-blue-600 font-medium">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <span>Uploading cover photo to Cloudinary...</span>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center gap-2 cursor-pointer">
                        <Upload className="w-6 h-6 text-blue-600" />
                        <span className="text-xs font-bold text-blue-600">
                          Click to upload cover photo
                        </span>
                        <span className="text-[10px] text-slate-400">JPG, PNG, WEBP up to 20MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>

              {/* 2. OTHER PHOTOS (CAROUSEL & GALLERY BELOW) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Other Photos (Carousel & Gallery Below)
                    </label>
                    <p className="text-[11px] text-slate-500">
                      These photos will display in the smooth lookbook carousel on the public page.
                    </p>
                  </div>

                  <label className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Photos</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleGalleryPhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {uploadingGallery && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 text-xs flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span>Uploading photos to Cloudinary...</span>
                  </div>
                )}

                {galleryPhotos.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {galleryPhotos.map((photo, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-xl border border-slate-200 bg-white overflow-hidden p-2 space-y-1.5 shadow-xs"
                      >
                        <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100">
                          <img
                            src={photo.url}
                            alt={`Photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryPhoto(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={photo.caption || ''}
                          onChange={(e) => handleCaptionChange(idx, e.target.value)}
                          placeholder="Photo caption..."
                          className="w-full text-[11px] px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl bg-white">
                    No additional carousel photos added yet. Click &quot;Add Photos&quot; above to upload gallery images.
                  </div>
                )}
              </div>

              {/* 3. CLIENT SOCIAL MEDIA LINKS (CONTROLS THE INSTAGRAM, FACEBOOK, TIKTOK BUTTONS) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-blue-600" />
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Client Social Media Work Links
                  </label>
                </div>
                <p className="text-[11px] text-slate-500">
                  Provide links to the client&apos;s active social profiles. These power the Instagram, Facebook, and TikTok buttons on the public case study page.
                </p>

                <div className="space-y-3">
                  {/* Instagram */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 border border-pink-200">
                      <InstagramIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="url"
                      value={formData.instagram_url}
                      onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                      placeholder="https://instagram.com/clientusername"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Facebook */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                      <FacebookIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="url"
                      value={formData.facebook_url}
                      onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                      placeholder="https://facebook.com/clientpagename"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* TikTok */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 border border-slate-300">
                      <TikTokIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="url"
                      value={formData.tiktok_url}
                      onChange={(e) => setFormData({ ...formData, tiktok_url: e.target.value })}
                      placeholder="https://tiktok.com/@clientusername"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Outline the client brief, photoshoot direction, and campaign outcomes..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white leading-relaxed"
                />
              </div>

              {/* Tags & Campaign Date */}
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
                  disabled={uploadingCover || uploadingGallery}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50"
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
