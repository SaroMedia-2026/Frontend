"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MapPin,
  Briefcase,
  Users,
  Upload,
  CheckCircle,
  AlertCircle,
  X,
  FileText,
  Loader2,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { api } from "../lib/api";

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
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Application Modal State
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedJob]);

  useEffect(() => {
    let mounted = true;
    api
      .getCareers(false)
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          setJobs(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load careers from backend:', err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleOpenApplyModal = (job: any) => {
    setSelectedJob(job);
    setCandidateName("");
    setCandidateEmail("");
    setCandidatePhone("");
    setCoverLetter("");
    setCustomAnswers({});
    setResumeFile(null);
    setApplySuccess(false);
    setApplyError(null);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setApplyError("Please select a resume file (PDF or Word document).");
      return;
    }

    // Validate required custom questions
    if (selectedJob?.custom_questions && Array.isArray(selectedJob.custom_questions)) {
      for (const q of selectedJob.custom_questions) {
        if (q.required && (!customAnswers[q.question] || !customAnswers[q.question].trim())) {
          setApplyError(`Please answer the required question: "${q.question}"`);
          return;
        }
      }
    }

    setSubmitting(true);
    setApplyError(null);

    try {
      const formData = new FormData();
      formData.append("name", candidateName);
      formData.append("email", candidateEmail);
      if (candidatePhone) formData.append("phone", candidatePhone);
      if (coverLetter) formData.append("cover_letter", coverLetter);
      formData.append("resume", resumeFile);
      if (Object.keys(customAnswers).length > 0) {
        formData.append("answers", JSON.stringify(customAnswers));
      }

      await api.submitApplication(selectedJob.id, formData);
      setApplySuccess(true);
    } catch (err: any) {
      setApplyError(err?.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-black tracking-[-0.07em] text-slate-900 md:text-6xl lg:text-[4rem] leading-tight"
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
                We're a collective of creative directors, performance strategists, and cinematic visual artists shaping tomorrow's top brands.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* OPEN POSITIONS SECTION */}
        <section className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0e85f9]">
                  Opportunities
                </span>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Open Positions
                </h2>
              </div>
              <p className="text-xs font-semibold text-slate-500">
                Showing {jobs.length} active positions
              </p>
            </div>

            {loading ? (
              <div className="py-20 text-center text-slate-400">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm">Loading available career opportunities...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="py-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 p-8">
                <p className="text-base font-semibold">No open roles currently posted.</p>
                <p className="text-xs text-slate-400 mt-1">Check back soon or send us your open application below.</p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                    className="group rounded-[1.8rem] border border-slate-200/90 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all hover:border-[#0e85f9]/50 hover:shadow-[0_15px_40px_rgba(14,133,249,0.1)] md:p-8"
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      <div className="max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-black tracking-tight text-slate-900 md:text-2xl">
                            {job.title}
                          </h3>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                          <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[#0e85f9]">
                            <Briefcase className="h-3.5 w-3.5" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-700 capitalize">
                            <Users className="h-3.5 w-3.5 text-slate-500" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                            <MapPin className="h-3.5 w-3.5 text-slate-500" />
                            {job.location}
                          </span>
                        </div>
                        <p className="mt-3.5 text-sm text-slate-600 leading-relaxed">
                          {job.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleOpenApplyModal(job)}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0e85f9] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_20px_rgba(14,133,249,0.3)] transition-all hover:bg-blue-600 hover:shadow-lg cursor-pointer self-start md:self-center"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
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
              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                  Not seeing the right role?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-blue-100 md:text-lg">
                  Send us your portfolio and resume — we're always looking for exceptional creative and strategic talent.
                </p>
                <div className="mt-8 flex justify-center">
                  <a
                    href="mailto:careers@saroagency.com"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#0e85f9] shadow-lg transition-all hover:bg-blue-50"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Email Us Your Resume</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* APPLICATION MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <div
            onClick={() => setSelectedJob(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto overscroll-contain"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute right-5 top-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
                  Job Application
                </span>
                <h3 className="text-2xl font-black tracking-tight text-slate-900 mt-1">
                  {selectedJob.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedJob.department} • {selectedJob.location}
                </p>
              </div>

              {applySuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-bold text-slate-900">Application Submitted!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                    Your resume has been saved directly to our hiring database. Our recruitment team will review your profile and reach out if there's a strong fit.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  {applyError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{applyError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="Jane Doe"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="email"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        placeholder="jane@example.com"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={candidatePhone}
                        onChange={(e) => setCandidatePhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Resume (PDF / DOCX) <span className="text-blue-600">*</span>
                    </label>
                    <div className="mt-1 flex items-center gap-3">
                      <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 cursor-pointer text-xs font-semibold text-slate-700 transition-colors">
                        <Upload className="w-4 h-4 text-blue-600" />
                        <span>{resumeFile ? resumeFile.name : "Choose File"}</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setResumeFile(e.target.files[0]);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      {resumeFile && (
                        <span className="text-[11px] text-slate-500">
                          {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Cover Letter or Notes
                    </label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Briefly highlight your portfolio link, agency experience, and why you want to join Saro..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white resize-y"
                    />
                  </div>

                  {/* CUSTOM SCREENING QUESTIONS */}
                  {selectedJob.custom_questions && selectedJob.custom_questions.length > 0 && (
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        Screening Questions
                      </span>
                      {selectedJob.custom_questions.map((q: any, idx: number) => (
                        <div key={q.id || idx}>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            {q.question} {q.required && <span className="text-blue-600">*</span>}
                          </label>
                          <input
                            type="text"
                            required={q.required}
                            value={customAnswers[q.question] || ""}
                            onChange={(e) =>
                              setCustomAnswers((prev) => ({
                                ...prev,
                                [q.question]: e.target.value,
                              }))
                            }
                            placeholder="Your answer..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Uploading Resume & Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Application</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}