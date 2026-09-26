"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Send,
  Sparkles
} from "lucide-react";
import { 
  FaInstagram, 
  FaLinkedinIn, 
  FaFacebookF, 
  FaYoutube
} from "react-icons/fa";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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
              <motion.div variants={itemVariants} className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-white/85 px-4 py-2 backdrop-blur-md shadow-sm"
                >
                  <Sparkles className="h-4 w-4 text-[#0e85f9] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0e85f9]">
                    Contact Us
                  </span>
                </motion.div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="mt-6 text-4xl font-black tracking-[-0.07em] text-slate-900 md:text-6xl lg:text-[4rem] leading-tight"
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
        <section className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-[1340px]">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              
              {/* Left Column - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="rounded-[2.2rem] border border-slate-200/90 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.05)] md:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0e85f9]">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-slate-900">Get In Touch</h3>
                      <p className="text-xs text-slate-500">We respond within 24 business hours</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Email */}
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 rounded-2xl p-3.5 transition-all hover:bg-blue-50/60"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0e85f9] transition-colors group-hover:bg-[#0e85f9] group-hover:text-white">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email</div>
                        <a href="mailto:info@saro.com.np" className="text-base font-semibold text-slate-900 transition-colors hover:text-[#0e85f9]">
                          info@saro.com.np
                        </a>
                      </div>
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 rounded-2xl p-3.5 transition-all hover:bg-blue-50/60"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0e85f9] transition-colors group-hover:bg-[#0e85f9] group-hover:text-white">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone</div>
                        <div className="flex flex-col text-base font-semibold text-slate-900">
                          <a href="tel:+9779742936812" className="transition-colors hover:text-[#0e85f9]">
                            +977 9742936812
                          </a>
                          <a href="tel:+9779813183939" className="transition-colors hover:text-[#0e85f9]">
                            +977 9813183939
                          </a>
                        </div>
                      </div>
                    </motion.div>

                    {/* Address */}
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 rounded-2xl p-3.5 transition-all hover:bg-blue-50/60"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0e85f9] transition-colors group-hover:bg-[#0e85f9] group-hover:text-white">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</div>
                        <div className="text-base font-semibold text-slate-900 leading-snug">
                          Thankot, Kalimati<br />Kathmandu, Nepal
                        </div>
                      </div>
                    </motion.div>

                    {/* Careers Link */}
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
                        { icon: FaInstagram, label: "Instagram" },
                        { icon: FaLinkedinIn, label: "LinkedIn" },
                        { icon: FaFacebookF, label: "Facebook" },
                        { icon: FaYoutube, label: "YouTube" },
                      ].map((item, i) => (
                        <motion.a
                          key={i}
                          whileHover={{ scale: 1.12, y: -2 }}
                          whileTap={{ scale: 0.92 }}
                          href="#"
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

                  <form className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                          First Name <span className="text-[#0e85f9]">*</span>
                        </label>
                        <input 
                          type="text"
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
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-[#0e85f9] focus:bg-white focus:shadow-md focus:shadow-[#0e85f9]/10" 
                          placeholder="Doe" 
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Email Address <span className="text-[#0e85f9]">*</span>
                      </label>
                      <input 
                        type="email" 
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-[#0e85f9] focus:bg-white focus:shadow-md focus:shadow-[#0e85f9]/10" 
                        placeholder="you@company.com" 
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Message <span className="text-[#0e85f9]">*</span>
                      </label>
                      <textarea 
                        rows={5} 
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-[#0e85f9] focus:bg-white focus:shadow-md focus:shadow-[#0e85f9]/10 resize-y min-h-[130px]" 
                        placeholder="Tell us about your project, goals, or required services..." 
                        required
                      />
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className="group relative w-full overflow-hidden rounded-2xl bg-[#0e85f9] px-6 py-4 font-bold text-white shadow-[0_10px_25px_rgba(14,133,249,0.3)] transition-all hover:bg-blue-600 hover:shadow-xl cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.12em]">
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </motion.button>
                  </form>
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