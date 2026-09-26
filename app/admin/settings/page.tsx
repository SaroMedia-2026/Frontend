'use client';

import React, { useState, useEffect } from 'react';
import { Sliders, Save, CheckCircle, Globe, Mail } from 'lucide-react';
import { api } from '../../lib/api';
import { TableSetupBanner } from '../components/TableSetupBanner';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    hero_headline: '',
    hero_subheadline: '',
    hero_cta_text: '',
    hero_cta_link: '',
    meta_title: '',
    meta_description: '',
    contact_email: '',
    contact_phone: '',
    social_links: {
      instagram: '',
      linkedin: '',
      twitter: '',
      youtube: '',
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getSiteSettings();
      if (data) {
        setSettings({
          ...data,
          social_links: data.social_links || {},
        });
      }
    } catch (err: any) {
      setError(err?.message || 'Could not load site settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);

    try {
      await api.updateSiteSettings(settings);
      setSuccessMessage('Site settings updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      alert(`Failed to update settings: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
              Agency Configuration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
            <Sliders className="w-7 h-7 text-blue-600" />
            <span>Site & Hero Content Settings</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure homepage hero typography, call-to-action buttons, meta SEO, and agency contact details.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving || loading}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all self-start sm:self-auto cursor-pointer"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      <TableSetupBanner tableName="site_settings" error={error} onRefresh={fetchSettings} />

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading settings...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hero Section Configuration */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Homepage Hero Content</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Main Headline
              </label>
              <input
                type="text"
                value={settings.hero_headline || ''}
                onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
                placeholder="Transforming Brands Into Digital Legacies"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Sub-Headline
              </label>
              <textarea
                rows={3}
                value={settings.hero_subheadline || ''}
                onChange={(e) => setSettings({ ...settings, hero_subheadline: e.target.value })}
                placeholder="We craft compelling digital experiences, high-converting campaigns, and visual stories that elevate your brand."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={settings.hero_cta_text || ''}
                  onChange={(e) => setSettings({ ...settings, hero_cta_text: e.target.value })}
                  placeholder="Explore Our Work"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  CTA Destination URL
                </label>
                <input
                  type="text"
                  value={settings.hero_cta_link || ''}
                  onChange={(e) => setSettings({ ...settings, hero_cta_link: e.target.value })}
                  placeholder="/work or /contact"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Agency Contact Details */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Agency Contact Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Public Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contact_email || ''}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  placeholder="hello@saroagency.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Public Phone Number
                </label>
                <input
                  type="text"
                  value={settings.contact_phone || ''}
                  onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                  placeholder="+1 (555) 234-5678"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Social Media Links
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.social_links?.instagram || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social_links: { ...settings.social_links, instagram: e.target.value },
                    })
                  }
                  placeholder="https://instagram.com/saroagency"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.social_links?.linkedin || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social_links: { ...settings.social_links, linkedin: e.target.value },
                    })
                  }
                  placeholder="https://linkedin.com/company/saroagency"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Saving...' : 'Save All Settings'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
