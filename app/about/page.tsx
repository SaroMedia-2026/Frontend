"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Target, Zap, Users } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const values = [
  {
    title: "Clear strategy first",
    detail: "Every plan starts from real business goals, not a template of channels to fill.",
  },
  {
    title: "Data behind the creative",
    detail: "Media and creative decisions are backed by what's actually performing, not a hunch.",
  },
  {
    title: "Transparent, fast iteration",
    detail: "You see what's working and what isn't as it happens — no quarterly surprises.",
  },
  {
    title: "Growth over vanity metrics",
    detail: "We optimize for outcomes that compound, not numbers that look good in a screenshot.",
  },
];

const process = [
  {
    step: "01",
    title: "Diagnose",
    detail: "We start by understanding what's actually driving — or blocking — growth today: the offer, the audience, the numbers.",
  },
  {
    step: "02",
    title: "Design",
    detail: "Strategy, creative, and media plans get built together, so nothing ships in isolation from the rest.",
  },
  {
    step: "03",
    title: "Drive",
    detail: "We launch, measure, and adjust in short cycles — doubling down on what works and cutting what doesn't.",
  },
];

const team = [
  {
    name: "Vijan Dharel",
    role: "Chief Executive Officer",
    image:
      "",
  },
  {
    name: "Sushan Dangol",
    role: "Chief Operating Officer",
    image:
      "",
  },
  {
    name: "Subin Mall",
    role: "Chief Financial Officer",
    image:
      "",
  },
];

// Motion Variants
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8fbfe] text-slate-900 overflow-hidden">
      <Header />

      <main>
        {/* HERO SECTION WITH FRAMER MOTION */}
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#edf5fd] via-[#f4f8fc] to-[#f8fbfe] pt-12 pb-16 md:pt-20 md:pb-24">
          {/* Ambient Glowing Background */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/3 top-10 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-[120px]"
          />

          <div className="relative z-10 mx-auto max-w-[1340px] px-4">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-white/85 px-4 py-2 backdrop-blur-md shadow-[0_4px_20px_rgba(14,133,249,0.1)]"
                  >
                    <Sparkles className="h-4 w-4 text-[#0e85f9] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0e85f9]">
                      About Saro
                    </span>
                  </motion.div>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="mt-6 text-4xl font-black tracking-[-0.07em] text-slate-900 md:text-5xl lg:text-[3.6rem] leading-[1.08]"
                >
                  We Build Growth Systems for Brands That Want to{" "}
                  <span className="relative inline-block bg-gradient-to-r from-[#0e85f9] via-sky-500 to-[#0e85f9] bg-clip-text text-transparent">
                    Scale on Purpose.
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg"
                >
                  Saro exists to bring clarity to how businesses scale — sharper strategy, stronger creative execution, and media decisions backed strictly by empirical performance data.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="mt-8 flex flex-wrap items-center gap-8 rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur-md"
                >
                  <div>
                    <div className="text-2xl font-black text-slate-900">Independent</div>
                    <div className="mt-1 text-xs font-semibold text-slate-500">Founder-led agency</div>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <div>
                    <div className="text-2xl font-black text-slate-900">Senior Attention</div>
                    <div className="mt-1 text-xs font-semibold text-slate-500">Focused team of specialists</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Hero Visual Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="overflow-hidden rounded-[2.2rem] border border-white bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                    alt="Members of the Saro team working together"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* OUR STORY SECTION */}
        <section className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-[1340px]">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80"
                  alt="Saro team reviewing campaign strategy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-black tracking-[-0.05em] text-slate-900 md:text-4xl lg:text-[2.6rem]">
                  Built Because Most Agencies Optimize for the Wrong Metrics.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                  Too many growth teams get buried in complex reports that look impressive but mean very little for revenue. Saro was built around a simple principle: know exactly what drives actual conversions, communicate transparently, and double down on winning campaigns.
                </p>

                <blockquote className="mt-8 rounded-2xl border-l-4 border-[#0e85f9] bg-white p-6 shadow-sm">
                  <p className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg">
                    "We'd rather tell a client the plain truth about their numbers than present a deck that hides them."
                  </p>
                  <footer className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#0e85f9]">
                    Vijan Dharel, CEO
                  </footer>
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section>

        {/* METHODOLOGY / PROCESS SECTION */}
        <section className="bg-white px-4 py-16 md:py-24">
          <div className="mx-auto max-w-[1340px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0e85f9]">
                Our Process
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
                How Engagements Run
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-14 grid gap-8 md:grid-cols-3"
            >
              {process.map((item) => (
                <motion.div
                  key={item.step}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-slate-200/90 bg-[#f8fbfe] p-8 shadow-sm transition-all hover:border-blue-300 hover:bg-white hover:shadow-xl"
                >
                  <div className="text-3xl font-black text-[#0e85f9]">{item.step}</div>
                  <h3 className="mt-4 text-2xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CORE VALUES SECTION */}
        <section className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-[1340px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0e85f9]">
                Our Standards
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
                What We Hold Ourselves To
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2"
            >
              {values.map((val) => (
                <motion.div
                  key={val.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.015 }}
                  className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <h3 className="text-xl font-bold text-slate-900">{val.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{val.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/*  TEAM SECTION */}
        <section className="bg-white px-4 py-16 md:py-24">
          <div className="mx-auto max-w-[1340px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14 text-center"
            >
              
              <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
                Meet Our Team
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition-all hover:border-[#0e85f9]/60 hover:shadow-[0_20px_45px_rgba(14,133,249,0.15)]"
                >
                  <div className="overflow-hidden rounded-[1.5rem]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-2xl font-black tracking-[-0.03em] text-slate-900 group-hover:text-[#0e85f9] transition-colors">
                      {member.name}
                    </h3>
                    <div className="mt-1 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0e85f9]">
                      {member.role}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}