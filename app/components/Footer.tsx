"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { 
  FaLinkedinIn, 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube,
  FaTwitter,
  FaTiktok
} from "react-icons/fa";
import logo from "@/public/white_logo.png";
import logo1 from "@/public/logo.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socials = [
  { label: "LinkedIn", icon: FaLinkedinIn, href: "#" },
  { label: "Facebook", icon: FaFacebookF, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
  { label: "YouTube", icon: FaYoutube, href: "#" },

];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0e85f9] px-4 pb-10 pt-12 text-white md:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          {/* Left Column - Brand Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                  <Image 
                    src={logo1} 
                    alt="Saro logo" 
                    width={120} 
                    height={120} 
                    className="h-full w-full object-contain" 
                  />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-white">
                    Saro Media
                  </p>
                  
                </div>
              </div>

              

              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  Follow Us
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {socials.map((item, index) => (
                    <a
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      className="group flex h-10 w-10 -translate-y-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#0e85f9] hover:shadow-lg hover:shadow-white/20"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <item.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Links & Legal */}
          <div className="flex flex-col gap-8 md:flex-row md:justify-end">
            <div className="min-w-[180px]">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="mt-4 space-y-3 text-[0.98rem] text-white/80">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link 
                      href={item.href} 
                      className="transition-colors duration-200 hover:text-white hover:translate-x-1 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-[190px]">
              <h3 className="text-lg font-semibold text-white">Legal</h3>
              <ul className="mt-4 space-y-3 text-[0.98rem] text-white/80">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <Link 
                      href={item.href} 
                      className="transition-colors duration-200 hover:text-white hover:translate-x-1 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section with Large SARO Text */}
        <div className="relative mt-12 flex flex-col gap-4 overflow-hidden border-t border-white/15 pt-8 md:mt-16 md:flex-row md:items-end md:justify-between">
          <div className="pointer-events-none select-none">
            <div className="text-[20vw] font-black leading-[0.72] tracking-[-0.09em] text-white/12 md:text-[26vw]">
              SARO
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 md:pb-3">
            <div className="text-sm text-white/60">
              
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-white/8 p-3 shadow-[0_12px_32px_rgba(12,25,58,0.2)] backdrop-blur-sm md:h-28 md:w-28">
              <Image 
                src={logo} 
                alt="Saro logo" 
                width={180} 
                height={180} 
                className="h-full w-full object-contain" 
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}