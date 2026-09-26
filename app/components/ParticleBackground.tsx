"use client";

import { useEffect, useRef, useCallback, memo } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  proximity: number;
  baseX: number;
  baseY: number;
  drift: number;
  size: number;
}

interface Pointer {
  x: number;
  y: number;
  active: boolean;
}

const CONFIG = {
  PARTICLE_COUNT: 85,
  GRID_SIZE: 65,
  MAX_SPEED: 0.8,
  MOUSE_RADIUS: 200,
  HOVER_MAX_SPEED: 2.0,
  RESIZE_DEBOUNCE_MS: 100,
  WAVE_AMPLITUDE: 18,
  WAVE_SPEED: 0.02,
  PARTICLE_MIN_RADIUS: 2.0,
  PARTICLE_MAX_RADIUS: 3.8,
  CONNECTION_DISTANCE: 135,
  OPACITY_MIN: 0.5,
  OPACITY_MAX: 0.98,
} as const;

export const ParticleBackground = memo(function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<Pointer>({ x: 0, y: 0, active: false });
  const animationFrameRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const timeRef = useRef(0);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMountedRef = useRef(true);

  const initParticles = useCallback((width: number, height: number): Particle[] => {
    const baseCount = Math.min(Math.max(Math.floor((width * height) / 11000), 65), 110);
    const cols = Math.ceil(Math.sqrt(baseCount * (width / (height || 1))));
    const rows = Math.ceil(baseCount / cols);
    const total = cols * rows;

    const spacingX = width / (cols + 1);
    const spacingY = height / (rows + 1);

    return Array.from({ length: total }, (_, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const baseX = spacingX * (col + 1) + (Math.random() - 0.5) * 35;
      const baseY = spacingY * (row + 1) + (Math.random() - 0.5) * 35;

      return {
        x: baseX,
        y: baseY,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 
          (CONFIG.PARTICLE_MAX_RADIUS - CONFIG.PARTICLE_MIN_RADIUS) + 
          CONFIG.PARTICLE_MIN_RADIUS,
        phase: Math.random() * Math.PI * 2,
        proximity: 0,
        baseX,
        baseY,
        drift: Math.random() * Math.PI * 2,
        size: Math.random() * 1.5 + 0.8,
      };
    });
  }, []);

  const renderGridToOffscreen = useCallback((width: number, height: number, dpr: number) => {
    if (!gridCanvasRef.current) {
      gridCanvasRef.current = document.createElement("canvas");
    }
    
    const gridCanvas = gridCanvasRef.current;
    gridCanvas.width = Math.round(width * dpr);
    gridCanvas.height = Math.round(height * dpr);

    const gridCtx = gridCanvas.getContext("2d");
    if (!gridCtx) return;

    gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    gridCtx.scale(dpr, dpr);

    gridCtx.strokeStyle = "rgba(14, 133, 249, 0.08)";
    gridCtx.lineWidth = 0.8;

    const gridSize = CONFIG.GRID_SIZE;
    
    for (let x = 0; x <= width; x += gridSize) {
      gridCtx.beginPath();
      gridCtx.moveTo(x, 0);
      gridCtx.lineTo(x, height);
      gridCtx.stroke();
    }
    
    for (let y = 0; y <= height; y += gridSize) {
      gridCtx.beginPath();
      gridCtx.moveTo(0, y);
      gridCtx.lineTo(width, y);
      gridCtx.stroke();
    }
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isMountedRef.current) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    
    // Fallback to window dimensions if parent rect is transiently 0 in certain browsers
    const width = Math.max(Math.floor(rect.width) || (typeof window !== "undefined" ? window.innerWidth : 1200), 300);
    const height = Math.max(Math.floor(rect.height) || (typeof window !== "undefined" ? window.innerHeight : 800), 300);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    const prev = dimensionsRef.current;
    if (particlesRef.current.length === 0 || prev.width === 0) {
      particlesRef.current = initParticles(width, height);
    } else if (prev.width !== width || prev.height !== height) {
      const scaleX = width / prev.width;
      const scaleY = height / prev.height;
      particlesRef.current.forEach((p) => {
        p.baseX *= scaleX;
        p.baseY *= scaleY;
        p.x *= scaleX;
        p.y *= scaleY;
      });
    }

    dimensionsRef.current = { width, height };
    renderGridToOffscreen(width, height, dpr);
  }, [initParticles, renderGridToOffscreen]);

  const debouncedResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(() => {
      handleResize();
    }, CONFIG.RESIZE_DEBOUNCE_MS);
  }, [handleResize]);

  const handlePointerMove = useCallback((event: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientX: number;
    let clientY: number;

    if ("touches" in event && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      return;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const active = x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50;

    pointerRef.current = {
      x,
      y,
      active,
    };
  }, []);

  const handlePointerLeave = useCallback(() => {
    pointerRef.current.active = false;
  }, []);

  const drawConnections = useCallback((
    ctx: CanvasRenderingContext2D,
    particles: Particle[]
  ) => {
    const maxDistance = CONFIG.CONNECTION_DISTANCE;
    const maxDistanceSq = maxDistance * maxDistance;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistanceSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const alpha = 0.25 * (1 - dist / maxDistance);
          
          ctx.strokeStyle = `rgba(14, 133, 249, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }, []);

  const render = useCallback(() => {
    if (!isMountedRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      animationFrameRef.current = requestAnimationFrame(render);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      animationFrameRef.current = requestAnimationFrame(render);
      return;
    }

    const { width, height } = dimensionsRef.current;
    const particles = particlesRef.current;
    const pointer = pointerRef.current;
    const time = timeRef.current;

    if (!width || !height || particles.length === 0) {
      animationFrameRef.current = requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);
    
    // Draw pre-rendered offscreen grid with 1:1 physical pixel matrix
    if (gridCanvasRef.current) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(gridCanvasRef.current, 0, 0);
      ctx.restore();
    }

    const mouseRadiusSq = CONFIG.MOUSE_RADIUS * CONFIG.MOUSE_RADIUS;
    const waveAmplitude = CONFIG.WAVE_AMPLITUDE;
    const waveSpeed = CONFIG.WAVE_SPEED;

    // Update particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      const targetX = p.baseX + Math.sin(time * waveSpeed + p.phase + p.drift) * waveAmplitude;
      const targetY = p.baseY + Math.cos(time * waveSpeed * 1.1 + p.phase + p.drift) * waveAmplitude * 0.8;

      p.vx += (targetX - p.x) * 0.035;
      p.vy += (targetY - p.y) * 0.035;

      p.vx += Math.cos(time * 0.05 + p.phase) * 0.03;
      p.vy += Math.sin(time * 0.04 + p.phase) * 0.03;

      let proximity = 0;

      if (pointer.active) {
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseRadiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const ratio = 1 - dist / CONFIG.MOUSE_RADIUS;
          const force = ratio * ratio;
          const nx = dx / dist;
          const ny = dy / dist;

          proximity = Math.max(0, ratio);
          p.vx -= nx * 1.4 * force;
          p.vy -= ny * 1.4 * force;
        }
      }

      p.proximity = proximity;

      const maxSpeed = CONFIG.MAX_SPEED + (CONFIG.HOVER_MAX_SPEED - CONFIG.MAX_SPEED) * proximity;
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;

      const margin = 40;
      if (p.x < -margin) p.x = width + margin;
      if (p.x > width + margin) p.x = -margin;
      if (p.y < -margin) p.y = height + margin;
      if (p.y > height + margin) p.y = -margin;
    }

    drawConnections(ctx, particles);

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const proximity = p.proximity;
      const radius = p.radius * (1 + proximity * 1.3);
      const opacity = CONFIG.OPACITY_MIN + (CONFIG.OPACITY_MAX - CONFIG.OPACITY_MIN) * proximity;

      if (proximity > 0.05) {
        const glowRadius = radius * 4.5;
        const glow = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, glowRadius
        );
        glow.addColorStop(0, `rgba(14, 133, 249, ${0.45 * proximity})`);
        glow.addColorStop(1, "rgba(14, 133, 249, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = `rgba(14, 133, 249, ${opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (pointer.active) {
      const glow = ctx.createRadialGradient(
        pointer.x, pointer.y, 0,
        pointer.x, pointer.y, CONFIG.MOUSE_RADIUS
      );
      glow.addColorStop(0, "rgba(14, 133, 249, 0.18)");
      glow.addColorStop(0.5, "rgba(14, 133, 249, 0.06)");
      glow.addColorStop(1, "rgba(14, 133, 249, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, CONFIG.MOUSE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }

    timeRef.current += 1;
    animationFrameRef.current = requestAnimationFrame(render);
  }, [drawConnections]);

  useEffect(() => {
    isMountedRef.current = true;

    // Execute initial resize and force first frame draw immediately
    handleResize();
    render();

    // ResizeObserver for reliable cross-browser container sizing
    let resizeObserver: ResizeObserver | null = null;
    const canvas = canvasRef.current;
    if (canvas && canvas.parentElement && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(canvas.parentElement);
    }

    // Backup timers for layout shifts & font loading
    const t1 = setTimeout(handleResize, 50);
    const t2 = setTimeout(handleResize, 300);

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      isMountedRef.current = false;
      cancelAnimationFrame(animationFrameRef.current);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      clearTimeout(t1);
      clearTimeout(t2);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, [handleResize, debouncedResize, handlePointerMove, handlePointerLeave, render]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
});