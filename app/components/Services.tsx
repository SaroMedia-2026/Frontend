"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "VIDEO EDITING",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    alt: "Video editing work",
  },
  {
    title: "VIDEOGRAPHY",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    alt: "Videography portrait",
  },
  {
    title: "PHOTOSHOOT",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    alt: "Photoshoot session",
  },
  {
    title: "CONTENT STRATEGY",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    alt: "Content strategy planning",
  },
  {
    title: "GRAPHIC DESIGN",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    alt: "Graphic design work",
  },
  {
    title: "SOCIAL MEDIA",
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80",
    alt: "Social media handling",
  },
  {
    title: "META AD BOOSTING",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    alt: "Meta ad boosting analytics",
  },
  {
    title: "SEO",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    alt: "SEO strategy and growth",
  },
];

export function Services() {
  return (
    <>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .services-marquee-track {
          animation: marquee 40s linear infinite;
        }

        .services-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#f9fbff] py-12 md:py-16"
      >
        <div className="mx-auto max-w-[1700px] px-2 md:px-4">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center justify-center md:mb-10">
            <h2 className="text-4xl font-black  tracking-[-0.06em] text-[#0e85f9] md:text-6xl">
              Our Services
            </h2>

            <div className="mt-4 flex items-center gap-4">
              <div className="h-8 w-8 rounded-full border-[2px] border-[#0e85f9] bg-[#eaf5ff]" />
              <div className="h-[2px] w-20 bg-[#a8d7fb] md:w-28" />
            </div>
          </div>

          {/* Marquee Container */}
          <div className="overflow-hidden rounded-[2rem] border border-[#dfeaf2] bg-white p-3 shadow-[0_20px_50px_rgba(14,133,249,0.06)] md:p-4">
            <div className="services-marquee-track flex w-max items-stretch gap-4 md:gap-5">
              {/* Double the services for seamless loop */}
              {[...services, ...services].map((service, index) => (
                <motion.article
                  key={`${service.title}-${index}`}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="group relative w-[280px] overflow-hidden rounded-[1.8rem] border border-[#dfeaf2] bg-[#edf7ff] p-3 shadow-[0_12px_28px_rgba(15,23,42,0.04)] md:w-[340px]"
                >
                  <div className="flex h-full flex-col gap-4">
                    <h3 className="text-2xl font-light uppercase leading-[1.08] tracking-[-0.06em] text-[#111827] md:text-2xl">
                      {service.title}
                    </h3>

                    <div className="overflow-hidden rounded-[1.5rem] bg-white/60">
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="h-[190px] w-full object-cover transition duration-700 group-hover:scale-[1.03] md:h-[245px]"
                      />
                    </div>

                    <div className="pt-1">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full border border-[#d6ebff] bg-white/90 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#0e85f9] transition hover:bg-[#0e85f9] hover:text-white md:px-5 md:py-2.5 md:text-[11px]"
                      >
                        Learn More
                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}