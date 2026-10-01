"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            : "border-b border-slate-200/50 bg-white/85 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-3 py-2 md:px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="Saro home">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center justify-center"
            >
              <Image
                src={logo}
                alt="Saro Logo"
                width={360}
                height={120}
                priority
                className="h-16 w-auto object-contain md:h-20"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`relative inline-flex items-center px-1 py-2 text-[0.98rem] font-medium tracking-[-0.02em] transition-all duration-300 ${
                      isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>

                  {isActive && (
                    <div className="absolute left-1/2 top-full mt-1 flex -translate-x-1/2 items-center gap-1.5">
                      <span className="block h-[2px] w-7 rounded-full bg-[#0e85f9]" />
                      <span className="block h-1.5 w-1.5 rounded-full bg-[#0e85f9]" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-flex items-center justify-center rounded-full bg-[#0e85f9] px-6 py-2.5 text-base font-semibold text-white shadow-[0_8px_24px_rgba(14,133,249,0.35)] transition-all hover:shadow-[0_12px_32px_rgba(14,133,249,0.45)] hover:bg-[#0d7ae8] group"
          >
            <span>Let's Talk</span>
            <motion.span
              className="ml-2 inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              →
            </motion.span>
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm md:hidden hover:bg-white transition-colors"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="relative h-5 w-5"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: -6 },
                  open: { rotate: 45, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-slate-700"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1, x: 0 },
                  open: { opacity: 0, x: 10 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-slate-700"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 6 },
                  open: { rotate: -45, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-slate-700"
              />
            </motion.div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-[300px] bg-white/95 backdrop-blur-xl border-l border-slate-200/80 shadow-2xl md:hidden"
          >
            <div className="flex h-full flex-col p-6 pt-24">
              {/* Mobile Logo */}
              <div className="mb-6 px-4">
                <Image
                  src={logo}
                  alt="Saro Logo"
                  width={320}
                  height={172}
                  className="h-10 w-auto object-contain"
                />
              </div>

              {/* Mobile Nav Items */}
              <div className="flex-1 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-xl transition-all ${
                        pathname === item.href
                          ? "bg-blue-50 text-[#0e85f9]"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      {pathname === item.href && (
                        <span className="flex items-center gap-1.5">
                          <span className="block h-[2px] w-5 rounded-full bg-[#0e85f9]" />
                          <span className="block h-1.5 w-1.5 rounded-full bg-[#0e85f9]" />
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.a
                href="/contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 flex items-center justify-center rounded-xl bg-[#0e85f9] px-6 py-4 text-base font-semibold text-white shadow-[0_8px_24px_rgba(14,133,249,0.35)] hover:bg-[#0d7ae8] transition-colors"
              >
                Let's Talk <span className="ml-2">→</span>
              </motion.a>

              {/* Mobile Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 border-t border-slate-200/60 pt-6"
              >
                <p className="text-xs text-slate-500 text-center">
                  © 2026 Saro Media
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-[68px]" />
    </>
  );
}