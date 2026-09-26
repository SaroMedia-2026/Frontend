"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

const projects = {
  "glow-co": {
    name: "Glow & Co. Skincare",
    service: "Social Media Marketing",
    result: "+214% Sales Growth in 90 Days",
    summary:
      "A complete social media strategy and UGC creative overhaul that exponentially increased brand awareness and direct-to-consumer sales.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
    deliverables: ["Short-form Reels & TikToks", "Influencer Partnerships", "Audience Funnel Setup"],
  },
  "aroma-coffee": {
    name: "Aroma Coffee Roasters",
    service: "Branding & Strategy",
    result: "3.6x Pipeline Growth",
    summary:
      "Built a cohesive modern brand identity, packaging design, and targeted local social campaigns driving record foot traffic and online coffee subscription sales.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    deliverables: ["Brand Identity & Packaging", "Social Content Strategy", "Omnichannel Ad Funnels"],
  },
  "fitline-gym": {
    name: "Fitline Gym Campaign",
    service: "Video Production",
    result: "1.2M+ Reel Views",
    summary:
      "High-energy video campaign showcasing personal transformation stories, producing high viral reach and a surge in new gym memberships.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80",
    deliverables: ["4K Cinema Shoot", "Sound Mastering", "Social Ad Creatives"],
  },
  "fintrack-app": {
    name: "FinTrack - Finance App",
    service: "Web Design & Conversion",
    result: "+180% App Downloads",
    summary:
      "Redesigned the core user acquisition funnel and landing pages to boost app install rates and user retention.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    deliverables: ["UI/UX Redesign", "Conversion Rate Optimization", "Landing Page Build"],
  },
  "nepal-campaign": {
    name: "Nepal Tourism Campaign",
    service: "Social Media Marketing",
    result: "5.4M+ Impressions",
    summary:
      "Integrated destination marketing campaign combining stunning aerial videography and storytelling across major social networks.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    deliverables: ["Drone & On-Site Filming", "Multi-Platform Distribution", "Influencer Hype"],
  },
  "soundx-ads": {
    name: "SoundX - Meta Ads",
    service: "Paid Campaigns",
    result: "4.1x Meta ROAS",
    summary:
      "High-velocity creative testing and Meta ad scaling system that generated massive ROAS gains for audio hardware launch.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    deliverables: ["Ad Creative Testing", "Pixel & CAPI Setup", "Scale Scaling Systems"],
  },
} as const;

export default function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const project = projects[id as keyof typeof projects];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8fbfe] text-slate-900 overflow-hidden">
      <Header />

      <main className="pb-24 pt-28">
        <div className="mx-auto max-w-[1240px] px-4">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 shadow-sm transition-all hover:bg-[#0e85f9] hover:text-white hover:border-[#0e85f9]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Work</span>
            </Link>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
          >
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Image Section */}
              <div className="relative min-h-[380px] lg:min-h-[480px]">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <span className="inline-flex rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 backdrop-blur-md shadow-sm">
                    {project.service}
                  </span>
                  <h1 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white md:text-5xl">
                    {project.name}
                  </h1>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-between p-6 md:p-12">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-[#0e85f9]/10 px-4 py-2.5 text-sm font-black text-[#0e85f9]">
                    <Sparkles className="h-4 w-4 text-[#0e85f9]" />
                    <span>{project.result}</span>
                  </div>

                  <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Project Overview
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                    {project.summary}
                  </p>

                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      Deliverables Provided
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {project.deliverables.map((item) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center gap-3 text-sm font-semibold text-slate-800"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[#0e85f9]">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0e85f9] px-6 py-4 font-bold text-white shadow-[0_10px_25px_rgba(14,133,249,0.3)] transition-all hover:bg-blue-600 hover:shadow-lg"
                  >
                    <span>Achieve Results Like This</span>
                    <TrendingUp className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
