"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { api } from "../lib/api";

export function Testimonials() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    api
      .getTestimonials(false)
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load testimonials from backend:', err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  const goToPrevious = () =>
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));

  const goToNext = () =>
    setActiveIndex((prev) => (prev + 1) % items.length);

  if (!loading && items.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-10 md:py-14"
    >
      <div className="mb-8 text-center">
        <div className="text-[24px] font-bold uppercase tracking-[0.22em] text-blue-600">
          What Our Clients Say
        </div>
      </div>

      <div className="mx-auto max-w-[1200px]">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white px-4 py-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] md:px-8 md:py-8">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-[#0e85f9] text-white shadow-sm transition hover:border-blue-200 hover:text-blue-600 md:left-6 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#0e85f9] text-white shadow-[0_12px_24px_rgba(14,133,249,0.25)] transition hover:bg-blue-600 md:right-6 cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
          </button>

          <motion.div
            className="flex"
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            {items.map((item, idx) => {
              const rating = item.rating || 5;
              const photo = item.photo_url;
              return (
                <div key={item.id || item.client_name || idx} className="w-full shrink-0 px-0 md:px-10">
                  <motion.article
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="mx-auto max-w-3xl py-3 text-center md:py-6"
                  >
                    <div className="mb-5 flex items-center justify-center gap-1.5 text-amber-400">
                      {Array.from({ length: rating }).map((_, rIndex) => (
                        <span key={rIndex}>★</span>
                      ))}
                    </div>

                    <p className="text-lg leading-8 text-slate-700 md:text-[1.7rem] md:leading-[2.1rem]">
                      “{item.testimonial_text}”
                    </p>

                    <div className="mt-8 flex items-center justify-center gap-3">
                      {photo ? (
                        <img
                          src={photo}
                          alt={item.client_name}
                          className="h-12 w-12 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-slate-200 text-base font-bold text-slate-700">
                          {item.client_name ? item.client_name.charAt(0) : "S"}
                        </div>
                      )}
                      <div className="text-left">
                        <div className="font-bold text-slate-900">{item.client_name}</div>
                        <div className="text-xs text-slate-500">{item.company || "Client"}</div>
                      </div>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
