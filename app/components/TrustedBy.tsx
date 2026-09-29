'use client';

import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export function TrustedBy() {
  const [logos, setLogos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .getLogos(false)
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          setLogos(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load logos from backend:', err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!loading && logos.length === 0) {
    return null;
  }

  return (
    <section className="py-10 md:py-14">
      <div className="rounded-[2rem] border border-slate-200 bg-white px-5 py-6 md:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
          Trusted by growing brands
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-8 w-24 rounded-lg bg-slate-100 animate-pulse" />
            ))
          ) : (
            logos.map((logo, idx) => (
            <div
              key={logo.id || logo.client_name || idx}
              className="flex items-center justify-center h-12 w-full px-3 transition-opacity duration-300 hover:opacity-100 opacity-60"
            >
              {logo.logo_url ? (
                <a
                  href={logo.website_link || '#'}
                  target={logo.website_link ? '_blank' : '_self'}
                  rel="noreferrer"
                  className="flex items-center justify-center max-h-9 max-w-[130px] group"
                >
                  <img
                    src={logo.logo_url}
                    alt={logo.client_name}
                    className="max-h-8 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              ) : (
                <span className="text-sm md:text-[1.05rem] font-bold tracking-[-0.05em] text-slate-400">
                  {logo.client_name}
                </span>
              )}
            </div>
          )))}
        </div>
      </div>
    </section>
  );
}
