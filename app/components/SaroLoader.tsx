"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/public/logo.png";

export function SaroLoader({ duration = 1200 }: { duration?: number }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(false), duration);
    return () => window.clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f5f7fb]/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-500/15 blur-2xl" />
          <Image
            src={logo}
            alt="Saro Logo"
            width={260}
            height={86}
            priority
            className="relative h-14 w-auto object-contain drop-shadow-[0_12px_26px_rgba(37,99,235,0.18)] md:h-18"
          />
        </div>

        <div className="flex items-center gap-2.5">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-bounce"
              style={{
                animationDelay: `${dot * 120}ms`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
