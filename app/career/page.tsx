"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Mail, MapPin, Briefcase, Users, Sparkles } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const jobs = [
  {
    title: "Video Designer Intern",
    department: "Creative",
    type: "Internship",
    location: "Remote",
    description: "Create compelling motion-first concepts for campaigns, social content, and brand storytelling.",
  },
  {
    title: "Graphic Designer Intern",
    department: "Design",
    type: "Internship",
    location: "Remote",
    description: "Support campaign design systems, social assets, and launch visuals across client work.",
  },
  {
    title: "Paid Media Specialist",
    department: "Performance",
    type: "Full-time",
    location: "Kathmandu, NP",
    description: "Own paid media strategy, channel testing, and optimization across growth campaigns.",
  },
];

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

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-[#f8fbfe] text-slate-900 overflow-hidden">
      <Header />

      <main>
        {/* HERO SECTION WITH FRAMER MOTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#edf5fd] via-[#f4f8fc] to-[#f8fbfe] pt-12 pb-16 md:pt-20 md:pb-24">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute right-10 top-10 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-[120px]"
          />

          <div className="relative z-10 mx-auto max-w-[1340px] px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-3xl text-center"
            >
              <motion.div variants={itemVariants} className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-white/85 px-4 py-2 backdrop-blur-md shadow-sm"
                >
                  <Sparkles className="h-4 w-4 text-[#0e85f9] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0e85f9]">
                    Join Our Team
                  </span>
                </motion.div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="mt-6 text-4xl font-black tracking-[-0.07em] text-slate-900 md:text-6xl lg:text-[4rem] leading-tight"
              >
                Build Your Career at{" "}
                <span className="bg-gradient-to-r from-[#0e85f9] to-sky-500 bg-clip-text text-transparent">
                  Saro
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg"
              >
                We're a creative, data-driven team looking for curious minds who love to learn, experiment, and create work that moves the needle.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* OPEN POSITIONS LIST */}
        <section id="open-roles" className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0e85f9]">
                Current Opportunities
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
                Open Positions
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-4"
            >
              {jobs.map((job) => (
                <motion.div
                  key={job.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all hover:border-[#0e85f9]/60 hover:shadow-xl hover:shadow-[#0e85f9]/8 md:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-black tracking-tight text-slate-900 md:text-2xl transition-colors group-hover:text-[#0e85f9]">
                        {job.title}
                      </h3>
                      
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                        <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[#0e85f9]">
                          <Briefcase className="h-3.5 w-3.5" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                          <Users className="h-3.5 w-3.5 text-slate-500" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                          <MapPin className="h-3.5 w-3.5 text-slate-500" />
                          {job.location}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-slate-600">{job.description}</p>
                    </div>

                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`mailto:careers@saro.agency?subject=Application%20for%20${encodeURIComponent(job.title)}`}
                      className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0e85f9] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_20px_rgba(14,133,249,0.3)] transition-all hover:bg-blue-600 hover:shadow-lg"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* TALENT COMMUNITY CTA */}
        <section className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0e85f9] via-[#0d7ae8] to-[#0753a8] p-10 text-center text-white shadow-[0_30px_70px_rgba(14,133,249,0.3)] md:p-16"
            >
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute right-[-10%] top-[-20%] h-[350px] w-[350px] rounded-full bg-white/20 blur-3xl"
              />

              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                  Not seeing the right role?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-blue-100 md:text-lg">
                  Send us your portfolio and resume — we're always looking for exceptional creative and strategic talent.
                </p>
                <div className="mt-8 flex justify-center">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:careers@saro.agency"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#0e85f9] shadow-lg transition-all hover:bg-blue-50"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Email Us Your Resume</span>
                  </motion.a>
                </div>
                <p className="mt-6 text-xs font-semibold tracking-wider text-blue-100 uppercase">
                  careers@saro.agency
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}