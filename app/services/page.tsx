"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

interface ServiceItem {
  title: string;
  image: string;
  alt: string;
  bg: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    title: "Video Editing",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    alt: "Video editing and production",
    bg: "from-[#0e85f9]/90 to-[#0e85f9]/70",
    description: "Professional video editing that brings your stories to life with precision and creativity.",
  },
  {
    title: "Videography",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    alt: "Videography production",
    bg: "from-[#0e85f9]/85 to-[#0e85f9]/65",
    description: "High-quality videography for commercials, interviews, and brand storytelling.",
  },
  {
    title: "Photoshoot",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    alt: "Photoshoot session",
    bg: "from-[#0e85f9]/90 to-[#0e85f9]/70",
    description: "Professional photoshoots that capture your brand's essence and products beautifully.",
  },
  {
    title: "Content Strategy",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    alt: "Content strategy planning",
    bg: "from-[#0e85f9]/85 to-[#0e85f9]/65",
    description: "Strategic content planning to drive engagement, conversions, and brand growth.",
  },
  {
    title: "Graphic Design",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    alt: "Graphic design work",
    bg: "from-[#0e85f9]/90 to-[#0e85f9]/70",
    description: "Stunning graphic design for brands, social media, and marketing campaigns.",
  },
  {
    title: "Social Media Handling",
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80",
    alt: "Social media handling",
    bg: "from-[#0e85f9]/85 to-[#0e85f9]/65",
    description: "Full-service social media management and content creation for your brand.",
  },
  {
    title: "Meta Ad Boosting",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    alt: "Meta ad boosting analytics",
    bg: "from-[#0e85f9]/90 to-[#0e85f9]/70",
    description: "Data-driven ad campaigns that deliver measurable results and ROAS.",
  },
  {
    title: "SEO",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    alt: "SEO strategy and growth",
    bg: "from-[#0e85f9]/85 to-[#0e85f9]/65",
    description: "SEO strategies to boost your organic visibility, traffic, and conversions.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="text-4xl font-black tracking-[-0.08em] text-slate-900 md:text-5xl lg:text-[3.5rem]">
                  Services That Drive{" "}
                  <span className="text-[#0e85f9]">Growth</span>
                </h1>
              </div>
              <div>
                <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                  From content creation to strategic marketing, we offer comprehensive services
                  designed to elevate your brand and connect with your audience authentically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_10px_25px_rgba(15,23,42,0.04)] transition-all hover:border-[#0e85f9] hover:shadow-[0_16px_40px_rgba(14,133,249,0.12)]"
                >
                  <div className="flex flex-col h-full">
                    {/* Image */}
                    <div className="relative overflow-hidden h-[240px]">
                      <img
                        src={service.image}
                        alt={service.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1 p-6">
                      <div>
                        <h2 className="text-2xl font-black tracking-[-0.05em] text-slate-900">
                          {service.title}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">
                          {service.description}
                        </p>
                      </div>

                      {/* Learn More Button */}
                      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#0e85f9] transition group-hover:gap-3">
                        <Link
                          href="/contact"
                          className="flex items-center gap-2"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0e85f9] to-[#0b6fbc] p-8 text-center text-white md:p-16"
            >
              <div className="absolute right-0 top-0 -z-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 -z-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-3xl font-black tracking-[-0.06em] md:text-4xl lg:text-[2.8rem]">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-blue-50 md:text-lg">
                  Let's discuss how we can help your brand achieve its goals and drive meaningful growth.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-bold text-[#0e85f9] transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/work"
                    className="rounded-full border border-white/40 px-8 py-3.5 font-semibold text-white transition-all hover:bg-white/10 hover:border-white"
                  >
                    View Our Work
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}