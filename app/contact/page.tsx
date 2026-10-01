"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Send,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { 
  FaInstagram, 
  FaLinkedinIn, 
  FaFacebookF, 
  FaYoutube
} from "react-icons/fa";
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

export default function ContactPage() {
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    api
      .getSiteSettings()
      .then((data) => {
        if (mounted && data) {
          setSettings(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load site settings:', err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    if (!fullName) {
      setError("Please provide your name.");
      setSubmitting(false);
      return;
    }

    try {
      await api.submitContact({
        name: fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject || undefined,
        message: formData.message,
      });

      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      setError(err?.message || "Failed to submit message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbfe] text-slate-900 overflow-hidden">
      <Header />

      <main>
        {/* HERO SECTION WITH FRAMER MOTION */}
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#edf5fd] via-[#f4f8fc] to-[#f8fbfe] pt-12 pb-16 md:pt-20 md:pb-24">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/4 top-10 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-[120px]"
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
                Let's Create Something{" "}
                <span className="bg-gradient-to-r from-[#0e85f9] to-sky-500 bg-clip-text text-transparent">
                  Great
                </span>{" "}
                Together
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg"
              >
                Have a project in mind or want to explore growth opportunities? Our strategy and creative team is ready to collaborate.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION - INFO & FORM */}
        <section className="relative px-4 pb-20 pt-4 md:pb-28">
          <div className="mx-auto max-w-[1340px]">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
              {/* Left Column - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="rounded-[2.2rem] border border-slate-200/90 bg-white p-8 shadow-[0_15px_40px_rgba(15,23,42,0.05)] md:p-10">
                  <div className="inline-flex rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0e85f9]">
                    Get In Touch
                  </div>

                  <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                    We'd Love to Hear From You
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Whether you're looking for high-performance paid ads, luxury brand direction, or commercial videography, our leadership team is ready to assist.
                  </p>

                  <div className="mt-8 space-y-4">
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 rounded-2xl p-3.5 transition-all hover:bg-blue-50/60"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0e85f9] transition-colors group-hover:bg-[#0e85f9] group-hover:text-white">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Us</div>
                        <a
                          href={`mailto:${settings?.contact_email || 'hello@saroagency.com'}`}
                          className="text-base font-bold text-slate-900 transition-colors group-hover:text-[#0e85f9]"
                        >
                          {settings?.contact_email || 'hello@saroagency.com'}
                        </a>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 rounded-2xl p-3.5 transition-all hover:bg-blue-50/60"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0e85f9] transition-colors group-hover:bg-[#0e85f9] group-hover:text-white">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Call Us</div>
                        <a
                          href={`tel:${settings?.contact_phone || '+1 (555) 234-5678'}`}
                          className="text-base font-bold text-slate-900 transition-colors group-hover:text-[#0e85f9]"
                        >
                          {settings?.contact_phone || '+1 (555) 234-5678'}
                        </a>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 rounded-2xl p-3.5 transition-all hover:bg-blue-50/60"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0e85f9] transition-colors group-hover:bg-[#0e85f9] group-hover:text-white">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Visit Us</div>
                        <div className="text-base font-bold text-slate-900">
                          {settings?.address || 'Thankot, Kalimati, Kathmandu, Nepal'}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 rounded-2xl p-3.5 transition-all hover:bg-blue-50/60"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0e85f9] transition-colors group-hover:bg-[#0e85f9] group-hover:text-white">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Join Us</div>
                        <Link href="/career" className="text-base font-bold text-[#0e85f9] transition-colors hover:underline">
                          View Open Positions →
                        </Link>
                      </div>
                    </motion.div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Follow Us</p>
                    <div className="mt-3 flex gap-3">
                      {[
                        { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
                        { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
                        { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
                        { icon: FaYoutube, label: "YouTube", href: "https://youtube.com" },
                      ].map((item, i) => (
                        <motion.a
                          key={i}
                          whileHover={{ scale: 1.12, y: -2 }}
                          whileTap={{ scale: 0.92 }}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={item.label}
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-all hover:bg-[#0e85f9] hover:text-white hover:shadow-lg hover:shadow-[#0e85f9]/30"
                        >
                          <item.icon className="h-5 w-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="rounded-[2.2rem] border border-slate-200/90 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.05)] md:p-10">
                  <div className="mb-6">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                      Send Us a Message
                    </h2>
                    <p className="mt-1.5 text-sm text-slate-600">
                      Fill out the form below and our strategy team will be in touch.
                    </p>
                  </div>

                  {success ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center"
                    >
                      <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                      <h3 className="text-xl font-bold text-emerald-900">Thank You! Message Received</h3>
                      <p className="text-sm text-emerald-700 mt-2 max-w-md mx-auto">
                        Your inquiry has been stored directly in our agency CMS. Our strategy team will review your project details and follow up within 24 hours.
                      </p>
                      <button
                        onClick={() => setSuccess(false)}
                        className="mt-6 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Send Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {error && (
                        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            First Name <span className="text-[#0e85f9]">*</span>
                          </label>
                          <input 
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-[#0e85f9] focus:bg-white focus:shadow-md focus:shadow-[#0e85f9]/10" 
                            placeholder="John" 
                            required
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Last Name <span className="text-[#0e85f9]">*</span>
                          </label>
                          <input 
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-[#0e85f9] focus:bg-white focus:shadow-md focus:shadow-[#0e85f9]/10" 
                            placeholder="Doe" 
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Email Address <span className="text-[#0e85f9]">*</span>
                          </label>
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-[#0e85f9] focus:bg-white focus:shadow-md focus:shadow-[#0e85f9]/10" 
                            placeholder="you@company.com" 
                            required
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Phone Number
                          </label>
                          <input 
                            type="tel" 
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-[#0e85f9] focus:bg-white focus:shadow-md focus:shadow-[#0e85f9]/10" 
                            placeholder="+1 (555) 000-0000" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Subject / Project Type
                        </label>
                        <input 
                          type="text" 
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-[#0e85f9] focus:bg-white focus:shadow-md focus:shadow-[#0e85f9]/10" 
                          placeholder="e.g. Paid Meta Ads, Rebranding, Videography" 
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Message <span className="text-[#0e85f9]">*</span>
                        </label>
                        <textarea 
                          rows={5} 
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-[#0e85f9] focus:bg-white focus:shadow-md focus:shadow-[#0e85f9]/10 resize-y min-h-[130px]" 
                          placeholder="Tell us about your project, goals, or required services..." 
                          required
                        />
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        disabled={submitting}
                        className="group relative w-full overflow-hidden rounded-2xl bg-[#0e85f9] px-6 py-4 font-bold text-white shadow-[0_10px_25px_rgba(14,133,249,0.3)] transition-all hover:bg-blue-600 hover:shadow-xl cursor-pointer disabled:opacity-50"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.12em]">
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending Inquiry...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              <span>Send Message</span>
                              <span className="transition-transform group-hover:translate-x-1">→</span>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MAP SECTION WITH MOTION */}
        <section className="px-4 pb-16 md:pb-24">
          <div className="mx-auto max-w-[1340px]">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d646.1932512878042!2d85.2790899451439!3d27.691251991912864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snp!4v1788188719009!5m2!1sen!2snp"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="Saro Office Location"
              />
            </motion.div>
            <div className="mt-4 text-center">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <MapPin className="inline h-4 w-4 mr-1 text-[#0e85f9]" />
                Thankot, Kalimati, Kathmandu, Nepal
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}