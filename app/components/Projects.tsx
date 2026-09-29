"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { api } from "../lib/api";

export function Projects() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let mounted = true;
    api
      .getPortfolio({ limit: 6 })
      .then((res: any) => {
        const list = res?.items || res || [];
        if (mounted && Array.isArray(list)) {
          setItems(list.slice(0, 3));
          setHasMore(list.length > 3 || (res?.total && res.total > 3));
        }
      })
      .catch((err) => {
        console.error('Failed to load portfolio items from backend:', err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-10 md:py-14"
    >
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mb-12 text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0e85f9]">
            Our Work
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-slate-900 md:text-[3.2rem]">
            Featured Projects
          </h2>
        </div>

        {/* Grid Layout - 3 Projects */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="overflow-hidden rounded-[1.8rem] border border-[#dfeaf2] bg-[#f7fbff] p-3 animate-pulse"
              >
                <div className="rounded-[1.3rem] aspect-video bg-slate-200/80" />
                <div className="px-1 pt-4 pb-2 space-y-3">
                  <div className="h-4 w-20 rounded-full bg-slate-200/80" />
                  <div className="h-6 w-3/4 rounded bg-slate-200/80" />
                  <div className="h-4 w-full rounded bg-slate-200/70" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <p className="text-sm font-medium">No projects available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((project, index) => {
            const projectUrl = `/work/${project.slug || project.id}`;
            const cover = project.cover_image_url || project.image || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80';
            const categoryName = project.category || project.tag || 'Creative';
            const title = project.title || project.name;

            return (
              <motion.article
                key={project.id || project.slug || title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[1.8rem] border border-[#dfeaf2] bg-[#f7fbff] p-3 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition-all hover:shadow-[0_18px_50px_rgba(14,133,249,0.08)] flex flex-col justify-between"
              >
                <div>
                  <div className="relative overflow-hidden rounded-[1.3rem] aspect-video">
                    <img
                      src={cover}
                      alt={title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    {project.client && (
                      <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
                        {project.client}
                      </span>
                    )}
                  </div>

                  <div className="px-1 pb-1 pt-4">
                    <div className="mb-2 inline-flex rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0e85f9] shadow-xs">
                      {categoryName}
                    </div>
                    <h3 className="text-xl font-black tracking-[-0.05em] text-slate-900 md:text-2xl line-clamp-1">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 px-1 pb-1 flex items-center justify-between pt-2 border-t border-slate-100">
                  <Link href={projectUrl} className="text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
                    View Project
                  </Link>
                  <Link
                    href={projectUrl}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0e85f9] text-white transition-transform group-hover:scale-110 shadow-sm"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
          </div>
        )}

        {/* "View All Projects" Button */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-[#0e85f9] px-8 py-3.5 font-semibold text-white shadow-[0_10px_28px_rgba(14,133,249,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(14,133,249,0.35)]"
            >
              <span>View All Projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </motion.section>
  );
}