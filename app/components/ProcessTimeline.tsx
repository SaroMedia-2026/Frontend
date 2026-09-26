"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  Compass, 
  Rocket, 
  Search, 
  TrendingUp,
  Zap,
  Sparkles
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Understanding your brand, goals & audience",
    icon: Search,
    color: "bg-[#0e85f9]",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    shadowColor: "shadow-blue-200/50",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Crafting a data-driven marketing plan",
    icon: Compass,
    color: "bg-[#0e85f9]",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    shadowColor: "shadow-blue-200/50",
  },
  {
    number: "03",
    title: "Execute",
    description: "Launching campaigns across channels",
    icon: Rocket,
    color: "bg-[#0e85f9]",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    shadowColor: "shadow-blue-200/50",
  },
  {
    number: "04",
    title: "Optimize",
    description: "Tracking performance & refining in real time",
    icon: BarChart3,
    color: "bg-[#0e85f9]",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    shadowColor: "shadow-blue-200/50",
  },
  {
    number: "05",
    title: "Grow",
    description: "Scaling what works, reporting results",
    icon: TrendingUp,
    color: "bg-[#0e85f9]",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    shadowColor: "shadow-blue-200/50",
  },
];

export function ProcessTimeline() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[360px] w-[780px] -translate-y-8 rounded-full bg-blue-50/70 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute top-1/2 right-0 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Our Process
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          </div>
          
          <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.06em] text-slate-900">
            How We <span className="text-[#0e85f9]">Work</span>
          </h2>
          
          <p className="mx-auto mt-3 max-w-2xl text-base md:text-lg text-slate-600 leading-relaxed">
            A clear, collaborative system that turns ideas into measurable growth.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Connecting Line with Gradient */}
          <div className="absolute left-0 right-0 top-[88px] h-[3px]">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 rounded-full bg-blue-200" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-[#0e85f9] origin-left"
                style={{ transformOrigin: "left" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isOdd = index % 2 !== 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.5 }}
                  className={`relative ${isOdd ? "mt-20" : ""}`}
                >
                  {/* Step Number */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="relative flex items-center justify-center mb-6"
                  >
                    <div className={`relative w-20 h-20 rounded-full bg-white border-2 ${step.borderColor} shadow-lg ${step.shadowColor} flex items-center justify-center group transition-all duration-300 hover:shadow-xl`}>
                      {/* Animated Background */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5, type: "spring" }}
                        className={`absolute inset-0 rounded-full ${step.color} opacity-10`}
                      />
                      
                      {/* Glow Effect */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                        className="absolute -inset-2 rounded-full bg-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      />

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <span className={`block text-xs font-bold ${step.textColor} tracking-wider`}>
                          {step.number}
                        </span>
                        <Icon className={`h-5 w-5 ${step.textColor} mt-1`} />
                      </div>

                      {/* Pulse Ring */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                        className={`absolute inset-0 rounded-full border-2 ${step.borderColor} opacity-0 group-hover:opacity-100`}
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.12, duration: 0.4 }}
                    className="text-center"
                  >
                    <motion.h3
                      whileHover={{ scale: 1.05 }}
                      className="text-lg font-bold tracking-[-0.04em] text-slate-900 mb-2"
                    >
                      {step.title}
                    </motion.h3>
                    <p className="text-sm leading-relaxed text-slate-600 max-w-[180px] mx-auto">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Arrow Indicator */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="absolute -right-3 top-1/2 -translate-y-1/2 text-blue-300"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2"
          >
            {steps.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-1.5 h-1.5 rounded-full bg-blue-400"
              />
            ))}
          </motion.div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="relative pl-16"
                >
                  {/* Vertical Line */}
                  <div className="absolute left-5 top-0 bottom-0 w-0.5">
                    <div className="absolute inset-0 rounded-full bg-blue-200" />
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                      className="absolute inset-0 rounded-full bg-[#0e85f9] origin-top"
                      style={{ transformOrigin: "top" }}
                    />
                  </div>

                  {/* Node */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-blue-200 shadow-md flex items-center justify-center z-10"
                  >
                    <Icon className="h-4 w-4 text-blue-600" />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ 
                      y: -4,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className={`rounded-2xl border ${step.borderColor} bg-white/80 backdrop-blur-sm p-5 shadow-lg ${step.shadowColor} hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className={`text-xs font-bold ${step.textColor} tracking-wider`}>
                          {step.number}
                        </span>
                        <h3 className="text-lg font-bold tracking-[-0.04em] text-slate-900">
                          {step.title}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className={`w-8 h-8 rounded-full ${step.bgColor} flex items-center justify-center`}
                      >
                        <Icon className={`h-4 w-4 ${step.textColor}`} />
                      </motion.div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0e85f9] text-white font-semibold shadow-lg shadow-blue-600/25 hover:bg-[#0d7ae8] transition-all"
          >
            Start Your Journey
            <Zap className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}