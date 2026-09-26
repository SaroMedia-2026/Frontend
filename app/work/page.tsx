"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles, TrendingUp, Award, Layers } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const projects = [
  {
    id: "glow-co",
    name: "Glow & Co. Skincare",
    category: "Social Media Marketing",
    result: "+214% Sales Growth",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "aroma-coffee",
    name: "Aroma Coffee Roasters",
    category: "Branding & Strategy",
    result: "3.6x Pipeline Growth",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "fitline-gym",
    name: "Fitline Gym Campaign",
    category: "Video Production",
    result: "1.2M Reel Views",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "fintrack-app",
    name: "FinTrack - Finance App",
    category: "Web Design",
    result: "+180% App Downloads",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "nepal-campaign",
    name: "Nepal Tourism Campaign",
    category: "Social Media Marketing",
    result: "5.4M Impressions",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "soundx-ads",
    name: "SoundX - Meta Ads",
    category: "Paid Campaigns",
    result: "4.1x Meta ROAS",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
];

const categories = [
  "All",
  "Social Media Marketing",
  "Branding & Strategy",
  "Video Production",
  "Paid Campaigns",
  "Web Design",
];



const PROJECTS_PER_PAGE = 6;

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: { duration: 0.25 },
  },
};

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PROJECTS_PER_PAGE;
  const displayedProjects = filteredProjects.slice(
    startIdx,
    startIdx + PROJECTS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f8fbfe] text-slate-900 overflow-hidden">
      <Header />

      <main>
       
        <p className="text-center text-4xl font-bold text-[#0e85f9] mt-16 mb-16">Our Work</p>


        
        <section className="sticky top-[72px] z-40 border-b border-slate-200/80 bg-white/90 px-4 py-5 backdrop-blur-xl shadow-sm">
          <div className="mx-auto max-w-[1340px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <motion.button
                      type="button"
                      key={category}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleCategoryChange(category)}
                      className="relative rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-200 cursor-pointer"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeWorkTabPill"
                          className="absolute inset-0 rounded-full bg-[#0e85f9] shadow-[0_8px_20px_rgba(14,133,249,0.3)]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span
                        className={`relative z-10 ${
                          isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {category}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Project Count Indicator */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Layers className="h-4 w-4 text-[#0e85f9]" />
                <span>
                  Showing <strong className="text-slate-900">{filteredProjects.length}</strong> Projects
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS GRID WITH STAGGER & ANIMATEPRESENCE */}
        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-[1340px]">
            <motion.div
              layout
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {displayedProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Link
                      href={`/work/${project.id}`}
                      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white p-3.5 shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-[#0e85f9]/60 hover:shadow-[0_22px_50px_rgba(14,133,249,0.18)]"
                    >
                      {/* Image Container */}
                      <div className="relative h-[280px] overflow-hidden rounded-[1.5rem] md:h-[320px]">
                        <motion.img
                          src={project.image}
                          alt={project.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                        {/* Top Category Badge */}
                        <div className="absolute left-3.5 top-3.5">
                          <span className="inline-flex rounded-full bg-white/90 px-3.5 py-1 text-[11px] font-bold text-slate-900 backdrop-blur-md shadow-sm">
                            {project.category}
                          </span>
                        </div>

                     

                        {/* Bottom Title & Action Arrow */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                          <div>
                            <h3 className="text-xl font-black tracking-[-0.04em] text-white md:text-2xl transition-colors group-hover:text-blue-200">
                              {project.name}
                            </h3>
                          </div>

                          <motion.span
                            whileHover={{ scale: 1.1 }}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0e85f9] shadow-lg transition-all group-hover:bg-[#0e85f9] group-hover:text-white"
                          >
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                          </motion.span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls with Motion */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-14 flex justify-center gap-2"
              >
                {Array.from({ length: totalPages }).map((_, index) => (
                  <motion.button
                    type="button"
                    key={index + 1}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all cursor-pointer ${
                      currentPage === index + 1
                        ? "bg-[#0e85f9] text-white shadow-[0_8px_20px_rgba(14,133,249,0.3)]"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-[#0e85f9] hover:text-[#0e85f9]"
                    }`}
                  >
                    {index + 1}
                  </motion.button>
                ))}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-2 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:border-[#0e85f9] hover:text-[#0e85f9] cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>

       
      </main>

      <Footer />
    </div>
  );
}