"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Sparkles,
  Tag,
  Calendar,
  Building,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Images,
  Share2,
} from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { api } from "../../lib/api";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.51c0 1.94-.57 3.91-1.74 5.48-1.53 2.06-4.04 3.28-6.6 3.19-2.32-.07-4.54-1.15-5.99-2.96-1.54-1.93-2.09-4.53-1.53-6.94.67-2.88 2.82-5.18 5.68-6.02.94-.28 1.93-.38 2.92-.3v4.06c-.84-.11-1.71.04-2.47.45-.98.53-1.67 1.5-1.84 2.6-.2 1.25.26 2.53 1.19 3.37.94.84 2.27 1.16 3.5.83 1.18-.31 2.1-1.28 2.37-2.46.12-.55.14-1.12.14-1.69V.02z"/>
    </svg>
  );
}

export default function WorkDetailPage() {
  const routeParams = useParams();
  const id =
    typeof routeParams?.id === "string"
      ? routeParams.id
      : Array.isArray(routeParams?.id)
      ? routeParams.id[0]
      : "";

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let mounted = true;
    if (!id) return;

    api
      .getPortfolioById(id)
      .then((data) => {
        if (mounted && data) {
          setProject(data);
        } else if (mounted) {
          setError(true);
        }
      })
      .catch((err) => {
        console.error('Failed to load portfolio item from backend:', err);
        if (mounted) {
          setError(true);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fbfe] text-slate-900 flex flex-col justify-between">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-32">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium text-slate-500">Loading project details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    notFound();
  }

  const title = project?.title || project?.name || "Project Details";
  const clientName = project?.client_name || project?.client || "Agency Partner";
  const clientIndustry = project?.client_industry || "Brand Growth & Digital Production";
  const category = project?.category || "Creative Production";
  const description = project?.description || project?.summary || "";
  const coverImage =
    project?.cover_image_url ||
    project?.image ||
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80";
  const date = project?.date || "2025 - 2026";
  const tags: string[] = project?.tags || [];

  // Social Links controlled directly from Dashboard
  const instagramUrl = project?.instagram_url;
  const facebookUrl = project?.facebook_url;
  const tiktokUrl = project?.tiktok_url;
  const hasSocialLinks = !!(instagramUrl || facebookUrl || tiktokUrl);

  // Filter gallery photos (no videos)
  const rawMedia: any[] = project?.media || [];
  const galleryPhotos = rawMedia.filter(
    (m) => m.resource_type === "image" || !m.url?.endsWith(".mp4")
  );

  // Combine cover image + gallery photos for carousel
  const carouselSlides = [
    { url: coverImage, caption: `${title} - Cover Showcase` },
    ...galleryPhotos.filter((p) => p.url !== coverImage),
  ];

  const deliverables: string[] = Array.isArray(project?.deliverables) ? project.deliverables : [];


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <div className="min-h-screen bg-[#f8fbfe] text-slate-900 overflow-hidden">
      <Header />

      <main className="pb-24 pt-28">
        <div className="mx-auto max-w-[1340px] px-4">
          {/* Top Breadcrumb */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 shadow-xs transition-all hover:bg-[#0e85f9] hover:text-white hover:border-[#0e85f9] cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Work</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 px-3.5 py-1 text-xs font-bold">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <span>Client: {clientName}</span>
            </span>
          </div>

          {loading ? (
            <div className="py-32 text-center text-slate-400">
              <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-semibold">Loading project case study...</p>
            </div>
          ) : (
            <>
              {/* Project Hero Header */}
              <div className="mb-10 max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{category}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.05em] text-slate-900 leading-tight">
                  {title}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                  {description}
                </p>

                {/* SOCIAL MEDIA BUTTONS TO VIEW CLIENT WORK (CONTROLLED FROM DASHBOARD) */}
                {hasSocialLinks && (
                  <div className="mt-6 pt-6 border-t border-slate-200/80">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                      View Client Work On Social Media:
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      {instagramUrl && (
                        <a
                          href={instagramUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white text-xs font-bold shadow-sm hover:opacity-95 hover:shadow-md transition-all cursor-pointer"
                        >
                          <InstagramIcon className="w-4 h-4 text-white" />
                          <span>View on Instagram</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                        </a>
                      )}

                      {facebookUrl && (
                        <a
                          href={facebookUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1877F2] text-white text-xs font-bold shadow-sm hover:bg-[#166fe5] hover:shadow-md transition-all cursor-pointer"
                        >
                          <FacebookIcon className="w-4 h-4 text-white" />
                          <span>View on Facebook</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                        </a>
                      )}

                      {tiktokUrl && (
                        <a
                          href={tiktokUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-bold shadow-sm hover:bg-slate-900 hover:shadow-md transition-all cursor-pointer border border-slate-800"
                        >
                          <TikTokIcon className="w-4 h-4 text-white" />
                          <span>View on TikTok</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>


              {/* OPTIMIZED PHOTO CAROUSEL (CLEAN, FAST, ZERO VIDEO STORAGE) */}
              <section className="mb-16">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                    <Images className="w-4 h-4" />
                    <span>Project Lookbook Carousel</span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">
                    {currentSlide + 1} of {carouselSlides.length} Photos
                  </span>
                </div>

                <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-950 shadow-xl aspect-[16/9] max-h-[620px] min-h-[340px] group">
                  <img
                    src={carouselSlides[currentSlide]?.url || coverImage}
                    alt={carouselSlides[currentSlide]?.caption || title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Caption & Metadata */}
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-1">
                        Lookbook Photo
                      </span>
                      <h3 className="text-lg sm:text-xl font-black">
                        {carouselSlides[currentSlide]?.caption || title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={prevSlide}
                        aria-label="Previous photo"
                        className="p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        aria-label="Next photo"
                        className="p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Slide Indicators */}
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 z-10">
                    {carouselSlides.map((_, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => setCurrentSlide(sIdx)}
                        aria-label={`Go to slide ${sIdx + 1}`}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          currentSlide === sIdx ? "w-6 bg-white" : "w-2 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Challenge, Client Details & Services Provided Grid */}
              <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] mb-16 items-start">
                {/* Left: Solution & Strategy */}
                <div className="space-y-6 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">
                      Strategic Execution
                    </h3>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      The Challenge & Agency Solution
                    </h2>
                    <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                      {description} Each deliverable was custom-engineered to elevate brand perception, reinforce premium market positioning, and turn attention into high-retention commercial demand.
                    </p>
                  </div>

                  {/* Client Profile Card */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      <span>Client Details</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">Client Brand</span>
                        <span className="text-slate-900 font-bold">{clientName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Category</span>
                        <span className="text-slate-900 font-bold">{category}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Timeline</span>
                        <span className="text-slate-900 font-bold">{date}</span>
                      </div>
                    </div>
                  </div>

                  {tags.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Disciplines & Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-3.5 py-1 text-xs font-bold transition-colors"
                          >
                            <Tag className="w-3 h-3 text-blue-500" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Deliverables Scope Checklist */}
                <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">
                    Scope of Work
                  </h3>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight mb-4">
                    Services Provided
                  </h2>

                  <ul className="space-y-3">
                    {deliverables.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-slate-800">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 mt-0.5">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <Link
                      href="/contact"
                      className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                    >
                      <span>Inquire for Similar Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* OTHER PHOTOS GALLERY BELOW */}
              {carouselSlides.length > 1 && (
                <section className="mb-16">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                        Visual Assets & Lookbook Gallery
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        High-resolution photography deliverables produced for {clientName}.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {carouselSlides.map((photo, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => setCurrentSlide(pIdx)}
                        className={`group rounded-3xl overflow-hidden bg-white border transition-all cursor-pointer shadow-xs flex flex-col justify-between ${
                          currentSlide === pIdx
                            ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                          <img
                            src={photo.url}
                            alt={photo.caption || title}
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                        {photo.caption && (
                          <div className="p-4 text-xs font-semibold text-slate-700 bg-slate-50/70 border-t border-slate-100">
                            {photo.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Bottom Inquire CTA Card */}
              <section className="rounded-[2.5rem] bg-gradient-to-br from-[#0e85f9] via-[#0d7ae8] to-[#0753a8] p-10 sm:p-14 text-center text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                    Ready to elevate your brand?
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                    Let&apos;s Build Your Next Landmark Campaign
                  </h2>
                  <p className="text-sm text-blue-100 leading-relaxed max-w-lg mx-auto">
                    From photoshoot art direction to multi-channel performance growth, our team is ready to scale your business.
                  </p>
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/contact"
                      className="px-8 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-50 text-sm font-bold shadow-lg transition-all cursor-pointer"
                    >
                      Start a Project Discussion →
                    </Link>
                    <Link
                      href="/work"
                      className="px-8 py-3.5 rounded-full bg-blue-700/60 hover:bg-blue-700 text-white text-sm font-bold border border-blue-400/40 transition-colors cursor-pointer"
                    >
                      Explore More Projects
                    </Link>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
