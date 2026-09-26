"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const initialPoint =
    typeof window !== "undefined"
      ? { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      : { x: 0, y: 0 };

  const targetRef = useRef(initialPoint);
  const currentRef = useRef(initialPoint);
  const hoverRef = useRef(false);
  const isBlueBgRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) return;

    const checkBackground = (x: number, y: number) => {
      let el = document.elementFromPoint(x, y);
      let isBlue = false;
      let isHover = false;

      while (el && el !== document.body && el !== document.documentElement) {
        if (
          el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          el.getAttribute("role") === "button" ||
          el.classList.contains("cursor-hover")
        ) {
          isHover = true;
        }

        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;

        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (match) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            const a = match[4] !== undefined ? parseFloat(match[4]) : 1;

            if (a > 0.1) {
              if (b > 150 && b > r + 30 && b > g) {
                isBlue = true;
                break;
              }
              if (a > 0.8) {
                break;
              }
            }
          }
        }
        el = el.parentElement;
      }

      hoverRef.current = isHover;
      isBlueBgRef.current = isBlue;
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      visibleRef.current = true;
      checkBackground(event.clientX, event.clientY);
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
    };

    let animationFrameId: number;

    const tick = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.22;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.22;

      const isBlue = isBlueBgRef.current;
      const isHover = hoverRef.current;
      const isVisible = visibleRef.current;

      if (outerRef.current) {
        outerRef.current.style.opacity = isVisible ? "1" : "0";
        outerRef.current.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%) scale(${isHover ? 1.8 : 1})`;

        if (isBlue) {
          outerRef.current.style.borderColor = "rgba(255, 255, 255, 0.9)";
          outerRef.current.style.backgroundColor = "rgba(255, 255, 255, 0.18)";
          outerRef.current.style.boxShadow = "0 0 30px rgba(255, 255, 255, 0.4)";
        } else {
          outerRef.current.style.borderColor = "rgba(14, 133, 249, 0.8)";
          outerRef.current.style.backgroundColor = "rgba(14, 133, 249, 0.05)";
          outerRef.current.style.boxShadow = "0 0 30px rgba(14, 133, 249, 0.22)";
        }
      }

      if (innerRef.current) {
        innerRef.current.style.opacity = isVisible ? "1" : "0";
        innerRef.current.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%) scale(${isHover ? 1.35 : 1})`;

        if (isBlue) {
          innerRef.current.style.backgroundColor = "#ffffff";
          innerRef.current.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.95)";
        } else {
          innerRef.current.style.backgroundColor = "#0e85f9";
          innerRef.current.style.boxShadow = "0 0 20px rgba(14, 133, 249, 0.9)";
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border border-[#0e85f9]/80 bg-[#0e85f9]/5 backdrop-blur-[1px] shadow-[0_0_30px_rgba(14,133,249,0.22)] transition-colors duration-150 ease-out md:block"
      />
      <div
        ref={innerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-2.5 w-2.5 rounded-full bg-[#0e85f9] shadow-[0_0_20px_rgba(14,133,249,0.9)] transition-colors duration-150 ease-out md:block"
      />
    </>
  );
}

