"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  GripHorizontal,
  Heart,
  MessageCircle,
  MoreVertical,
  Play,
  RotateCcw,
  Search,
  Send,
  Shuffle,
  TrendingUp,
} from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";
import logo from "@/public/logo.png";

type AnimationControls = ReturnType<typeof useAnimation>;

const WORDS = ["Create", "Shoot", "Scale"];

const TYPE_SPEED = 90;
const DELETE_SPEED = 50;
const HOLD_TIME = 1200;

function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    if (!isDeleting && text === current) {
      const holdTimer = setTimeout(() => setIsDeleting(true), HOLD_TIME);
      return () => clearTimeout(holdTimer);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const step = setTimeout(
      () => {
        setText((prev) =>
          isDeleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1)
        );
      },
      isDeleting ? DELETE_SPEED : TYPE_SPEED
    );

    return () => clearTimeout(step);
  }, [text, isDeleting, wordIndex, words]);

  return { word: words[wordIndex], text };
}

// Playable Card Component
interface PlayableCardProps {
  id: string;
  className: string;
  parallax: { x: number; y: number };
  depth: number;
  initialRotate?: number;
  bounceDelay?: number;
  bounceDuration?: number;
  dragConstraintsRef: React.RefObject<HTMLElement | null>;
  zIndex: number;
  isMoved: boolean;
  controls: AnimationControls;
  onBringToFront: (id: string) => void;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string) => void;
  children: React.ReactNode;
}

function PlayableCard({
  id,
  className,
  parallax,
  depth,
  initialRotate = 0,
  bounceDelay = 0,
  bounceDuration = 3.2,
  dragConstraintsRef,
  zIndex,
  isMoved,
  controls,
  onBringToFront,
  onDragStart,
  onDragEnd,
  children,
}: PlayableCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={className}
      style={{
        zIndex,
        transform: `translate3d(${parallax.x * depth}px, ${parallax.y * depth}px, 0)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      <motion.div
        drag
        dragConstraints={dragConstraintsRef}
        dragElastic={0.15}
        dragMomentum={true}
        dragTransition={{
          bounceStiffness: 280,
          bounceDamping: 24,
          power: 0.15,
          timeConstant: 200,
        }}
        animate={controls}
        initial={{ x: 0, y: 0, rotate: initialRotate }}
        onPointerDown={() => onBringToFront(id)}
        onDragStart={() => onDragStart(id)}
        onDragEnd={() => onDragEnd(id)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          scale: 1.025,
          transition: { duration: 0.18, ease: "easeOut" },
        }}
        whileDrag={{
          scale: 1.06,
          cursor: "grabbing",
          boxShadow: "0 30px 60px -12px rgba(15, 23, 42, 0.3)",
          transition: { duration: 0.1 },
        }}
        className="group relative cursor-grab active:cursor-grabbing select-none touch-none"
      >
        {/* Subtle drag hint indicator on hover */}
        <div
          className={`pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full bg-slate-900/85 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-white shadow-md backdrop-blur-sm transition-all duration-200 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          <GripHorizontal className="h-3 w-3 text-blue-400" />
          <span>Drag to move</span>
        </div>

        {/* Inner idle bounce animation (active only until card is moved) */}
        <motion.div
          animate={isMoved ? { y: 0 } : { y: [0, -10, 0] }}
          transition={
            isMoved
              ? { duration: 0.3 }
              : {
                  duration: bounceDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: bounceDelay,
                }
          }
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { text } = useTypewriter(WORDS);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Stacking z-indices for each playable card
  const [zIndices, setZIndices] = useState<Record<string, number>>({
    photo: 10,
    stats: 20,
    instagram: 25,
    reel: 30,
  });
  const [topZ, setTopZ] = useState(35);
  const [isDraggingAny, setIsDraggingAny] = useState(false);
  const [movedCards, setMovedCards] = useState<Record<string, boolean>>({});
  const hasInteracted = Object.values(movedCards).some(Boolean);

  // Micro-interactions
  const [isLikedInsta, setIsLikedInsta] = useState(false);
  const [isLikedReel, setIsLikedReel] = useState(false);
  const [isPlayingReel, setIsPlayingReel] = useState(false);

  // Framer Motion Animation Controls for programmatic movements (Reset / Scramble)
  const photoControls = useAnimation();
  const statsControls = useAnimation();
  const instaControls = useAnimation();
  const reelControls = useAnimation();

  const bringToFront = (id: string) => {
    setTopZ((prev) => {
      const next = prev + 1;
      setZIndices((cur) => ({ ...cur, [id]: next }));
      return next;
    });
  };

  const handleDragStart = (id: string) => {
    setIsDraggingAny(true);
    bringToFront(id);
    setMovedCards((prev) => ({ ...prev, [id]: true }));
  };

  const handleDragEnd = (_id: string) => {
    setIsDraggingAny(false);
  };

  const handleReset = async () => {
    setMovedCards({});
    await Promise.all([
      photoControls.start({
        x: 0,
        y: 0,
        rotate: -2,
        scale: 1,
        transition: { type: "spring", stiffness: 240, damping: 22 },
      }),
      statsControls.start({
        x: 0,
        y: 0,
        rotate: 1.5,
        scale: 1,
        transition: { type: "spring", stiffness: 240, damping: 22 },
      }),
      instaControls.start({
        x: 0,
        y: 0,
        rotate: -3,
        scale: 1,
        transition: { type: "spring", stiffness: 240, damping: 22 },
      }),
      reelControls.start({
        x: 0,
        y: 0,
        rotate: 3,
        scale: 1,
        transition: { type: "spring", stiffness: 240, damping: 22 },
      }),
    ]);
  };

  const handleScramble = async () => {
    setMovedCards({
      photo: true,
      stats: true,
      instagram: true,
      reel: true,
    });

    const randomBetween = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    await Promise.all([
      photoControls.start({
        x: randomBetween(-70, 50),
        y: randomBetween(-40, 50),
        rotate: randomBetween(-10, 8),
        transition: { type: "spring", stiffness: 220, damping: 18 },
      }),
      statsControls.start({
        x: randomBetween(-40, 70),
        y: randomBetween(-60, 40),
        rotate: randomBetween(-12, 12),
        transition: { type: "spring", stiffness: 240, damping: 18 },
      }),
      instaControls.start({
        x: randomBetween(-60, 60),
        y: randomBetween(-40, 70),
        rotate: randomBetween(-12, 10),
        transition: { type: "spring", stiffness: 230, damping: 18 },
      }),
      reelControls.start({
        x: randomBetween(-50, 70),
        y: randomBetween(-50, 50),
        rotate: randomBetween(-8, 12),
        transition: { type: "spring", stiffness: 250, damping: 18 },
      }),
    ]);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (isDraggingAny) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: x * 32, y: y * 26 });
  };

  const handleMouseLeave = () => setParallax({ x: 0, y: 0 });

  // For logo fallback
  const logoSrc: string =
    typeof logo === "string"
      ? logo
      : (logo as { src?: string })?.src || "/logo.png";
  const effectiveParallax = isDraggingAny ? { x: 0, y: 0 } : parallax;

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden bg-[#f4f8fb] pt-10 md:pt-16 min-h-screen"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <ParticleBackground />
      </div>

      {/* Overlay gradients - adjusted to allow particles to shine through */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(244,248,251,0.3)_60%,rgba(244,248,251,0.8)_100%)]" />

      <div
        className="pointer-events-none absolute left-1/2 top-16 h-[520px] w-[520px] -translate-x-[60%] rounded-full bg-blue-100/40 blur-3xl"
        style={{
          transform: `translate3d(${effectiveParallax.x * 0.7}px, ${effectiveParallax.y * 0.7}px, 0) translateX(-60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute right-[-8%] top-20 h-[420px] w-[420px] rounded-full bg-sky-100/50 blur-3xl"
        style={{
          transform: `translate3d(${effectiveParallax.x * 0.9}px, ${effectiveParallax.y * 0.9}px, 0)`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-24 bg-gradient-to-t from-[#f4f8fb] via-[#f4f8fb]/70 to-transparent" />

      <div className="relative z-20 mx-auto max-w-[1240px] px-3 pb-20 md:px-4 md:pb-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          {/* LEFT: COPY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-7"
            style={{
              transform: `translate3d(${effectiveParallax.x * 0.15}px, ${effectiveParallax.y * 0.1}px, 0)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
                Digital Marketing Agency
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex min-h-[3.6rem] flex-wrap items-center text-[3.1rem] font-black leading-[0.9] tracking-[-0.06em] text-slate-900 md:min-h-[4.9rem] md:text-[4.8rem]"
            >
              <span className="text-slate-900">We&nbsp;</span>
              <span className="text-[#0e85f9]">{text}</span>
              <span className="text-[#0e85f9]">.</span>
              <span className="ml-1 inline-block h-[0.8em] w-[3px] animate-pulse bg-[#0e85f9] align-middle" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="max-w-[460px] text-lg leading-8 text-slate-600"
            >
              From content production to performance marketing, we help
              brands grow with strategy, creativity, and results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="flex flex-wrap items-center pt-2"
            >
              <motion.a
                href="/work"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-full border-2 border-[#0e85f9] bg-white px-7 py-3.5 text-base font-semibold text-slate-800 shadow-[0_10px_24px_rgba(14,133,249,0.08)] transition-all hover:bg-blue-50"
              >
                View Works
                <ArrowRight className="ml-2 h-4 w-4 text-[#0e85f9]" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT: PLAYABLE VISUAL COMPOSITION */}
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            {/* Interactive Canvas Controls Bar - Clean Text (no capsule, no icon) */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
              <p className="text-xs font-medium text-slate-500">
                <span className="font-semibold text-slate-800">Playable Deck</span>
                <span className="mx-1.5 text-slate-300">•</span>
                <span>Drag & rearrange cards</span>
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleScramble}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-xs backdrop-blur-md hover:border-blue-300 hover:text-blue-600 active:scale-95 transition-all cursor-pointer"
                  title="Scramble cards randomly"
                >
                  <Shuffle className="h-3 w-3 text-blue-500" />
                  <span>Scramble</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!hasInteracted}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold shadow-xs backdrop-blur-md transition-all active:scale-95 ${
                    hasInteracted
                      ? "border-blue-400 bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
                      : "border-slate-200/60 bg-white/50 text-slate-300 cursor-not-allowed"
                  }`}
                  title="Reset cards to original layout"
                >
                  <RotateCcw
                    className={`h-3 w-3 ${
                      hasInteracted ? "text-blue-600" : "text-slate-300"
                    }`}
                  />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="relative h-[560px] w-full"
            >
              {/* Connecting arc */}
              <svg
                className="pointer-events-none absolute -left-4 top-6 hidden h-[420px] w-[420px] text-slate-200 md:block"
                viewBox="0 0 420 420"
                fill="none"
              >
                <path
                  d="M40 260 A 220 220 0 0 1 300 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="2 6"
                />
              </svg>
              <span className="absolute left-2 top-2 h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_0_5px_rgba(14,133,249,0.15)]" />

              {/* CARD 1: Main studio photo */}
              <PlayableCard
                id="photo"
                className="absolute left-6 top-8 w-[76%]"
                parallax={effectiveParallax}
                depth={0.25}
                initialRotate={-2}
                bounceDelay={0}
                bounceDuration={4}
                dragConstraintsRef={heroRef}
                zIndex={zIndices.photo}
                isMoved={!!movedCards.photo}
                controls={photoControls}
                onBringToFront={bringToFront}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="overflow-hidden rounded-[1.4rem] border-4 border-white shadow-[0_30px_60px_rgba(15,23,42,0.16)]"
                >
                  <img
                    draggable={false}
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"
                    alt="Behind the scenes of a brand photoshoot"
                    className="aspect-[4/3] w-full object-cover select-none pointer-events-none"
                  />
                </motion.div>
              </PlayableCard>

              {/* CARD 2: Performance overview card */}
              <PlayableCard
                id="stats"
                className="absolute right-0 top-0 w-[220px]"
                parallax={effectiveParallax}
                depth={0.55}
                initialRotate={1.5}
                bounceDelay={0.3}
                bounceDuration={3}
                dragConstraintsRef={heroRef}
                zIndex={zIndices.stats}
                isMoved={!!movedCards.stats}
                controls={statsControls}
                onBringToFront={bringToFront}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <motion.div
                  initial={{ opacity: 0, y: -14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.55, type: "spring" }}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Performance Overview
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-2xl font-black text-slate-900">
                    +126%
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-xs text-slate-400">Growth in 30 Days</p>
                  <svg
                    viewBox="0 0 140 40"
                    className="mt-2 h-8 w-full text-blue-500"
                  >
                    <polyline
                      points="0,32 20,26 40,30 60,18 80,22 100,8 120,14 140,4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </PlayableCard>

              {/* CARD 3: Instagram post card */}
              <PlayableCard
                id="instagram"
                className="absolute bottom-16 left-0 w-[46%]"
                parallax={effectiveParallax}
                depth={0.4}
                initialRotate={-3}
                bounceDelay={0.6}
                bounceDuration={3.6}
                dragConstraintsRef={heroRef}
                zIndex={zIndices.instagram}
                isMoved={!!movedCards.instagram}
                controls={instaControls}
                onBringToFront={bringToFront}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.6 }}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_46px_rgba(15,23,42,0.14)]"
                >
                  <div className="flex items-center gap-2 px-3 py-2.5">
                    <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white text-[9px] font-bold text-white">
                      <img
                        draggable={false}
                        src={logoSrc}
                        alt="Saro logo"
                        width={20}
                        height={20}
                        className="h-full w-full object-contain pointer-events-none select-none"
                      />
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      saro.media
                    </span>
                  </div>
                  <img
                    draggable={false}
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                    alt="Product photography for social media"
                    className="aspect-square w-full object-cover select-none pointer-events-none"
                  />
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-2.5 text-slate-700">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLikedInsta(!isLikedInsta);
                        }}
                        className="transition-transform active:scale-125 cursor-pointer"
                        title="Like post"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            isLikedInsta
                              ? "fill-red-500 text-red-500"
                              : "text-slate-700 hover:text-red-500"
                          }`}
                        />
                      </button>
                      <MessageCircle className="h-4 w-4" />
                      <Send className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="px-3 pb-3 text-[11px] font-semibold text-slate-700">
                    {isLikedInsta ? "2,351 likes" : "2,350 likes"}
                  </p>
                </motion.div>
              </PlayableCard>

              {/* CARD 4: Phone reel card */}
              <PlayableCard
                id="reel"
                className="absolute bottom-0 right-8 w-[46%]"
                parallax={effectiveParallax}
                depth={0.6}
                initialRotate={3}
                bounceDelay={0.15}
                bounceDuration={3.3}
                dragConstraintsRef={heroRef}
                zIndex={zIndices.reel}
                isMoved={!!movedCards.reel}
                controls={reelControls}
                onBringToFront={bringToFront}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.48, duration: 0.6 }}
                  className="overflow-hidden rounded-[1.6rem] border-4 border-white bg-slate-900 shadow-[0_28px_50px_rgba(15,23,42,0.22)]"
                >
                  <div className="relative">
                    <img
                      draggable={false}
                      src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
                      alt="Videographer filming a reel"
                      className="aspect-[9/16] w-full object-cover opacity-90 select-none pointer-events-none"
                    />
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 pt-3 text-white">
                      <span className="text-xs font-semibold">Reels</span>
                      <Search className="h-3.5 w-3.5" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlayingReel(!isPlayingReel);
                        }}
                        className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all active:scale-90 cursor-pointer ${
                          isPlayingReel
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40"
                            : "bg-white/25 hover:bg-white/40 text-white"
                        }`}
                        title={isPlayingReel ? "Pause reel" : "Play reel"}
                      >
                        <Play
                          className={`h-4 w-4 fill-white text-white ${
                            isPlayingReel ? "animate-pulse" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <div className="absolute right-2 bottom-14 flex flex-col items-center gap-3 text-white">
                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsLikedReel(!isLikedReel);
                          }}
                          className="transition-transform active:scale-125 cursor-pointer"
                        >
                          <Heart
                            className={`h-4 w-4 transition-colors ${
                              isLikedReel
                                ? "fill-red-500 text-red-500"
                                : "text-white"
                            }`}
                          />
                        </button>
                        <span className="text-[9px]">
                          {isLikedReel ? "3.3k" : "3.2k"}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-[9px]">56</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <Send className="h-4 w-4" />
                        <span className="text-[9px]">142</span>
                      </div>
                      <MoreVertical className="h-4 w-4" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-6 text-white">
                      <div className="flex items-center gap-1.5">
                        <span className="flex h-3.5 w-3.5 items-center justify-center overflow-hidden rounded-full bg-white/80">
                          <img
                            draggable={false}
                            src={logoSrc}
                            alt="Saro logo"
                            width={14}
                            height={14}
                            className="h-full w-full object-contain pointer-events-none select-none"
                          />
                        </span>
                        <span className="text-[10px] font-semibold">
                          saro.media
                        </span>
                      </div>
                      <p className="mt-1 text-[9px] text-white/80">
                        Creative content that connects.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </PlayableCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}