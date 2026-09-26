"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    name: "Skincare Brand Campaign",
    tag: "Social Media Marketing",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-[#eaf5ff]",
    description: "Increased engagement by 340% through targeted social campaigns.",
  },
  {
    name: "Aroma Coffee",
    tag: "Branding & Social Media",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-[#f1f9ff]",
    description: "Built a cohesive brand identity that drove 2.5x store visits.",
  },
  {
    name: "Fitline Gym",
    tag: "Performance Marketing",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-[#edf8ff]",
    description: "Drove 4.2x ROAS through performance-driven ad campaigns.",
  },
  {
    name: "Northstar SaaS",
    tag: "Brand Strategy",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-[#eaf5ff]",
    description: "Generated 3.6x pipeline growth with strategic positioning.",
  },
];

// Show only first 3 projects
const displayedProjects = projects.slice(0, 3);
const hasMoreProjects = projects.length > 3;

export function Projects() {
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-[1.8rem] border border-[#dfeaf2] ${project.accent} p-3 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition-all hover:shadow-[0_18px_50px_rgba(14,133,249,0.08)]`}
            >
              <div className="relative overflow-hidden rounded-[1.3rem]">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[260px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>

              <div className="px-1 pb-1 pt-4">
                <div className="mb-2 inline-flex rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0e85f9]">
                  {project.tag}
                </div>
                <h3 className="text-xl font-black tracking-[-0.05em] text-slate-900 md:text-2xl">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {project.description}
                </p>
  
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600">Case study</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0e85f9] text-white transition-transform group-hover:scale-110">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* "View All Projects" Button - Centered Below */}
        {hasMoreProjects && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-[#0e85f9] px-8 py-3.5 font-semibold text-white shadow-[0_10px_28px_rgba(14,133,249,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(14,133,249,0.35)]"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </motion.section>
  );
}