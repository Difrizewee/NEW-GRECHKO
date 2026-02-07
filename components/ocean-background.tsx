"use client";

import React, { useMemo } from "react";

export default function OceanBackground() {
  // Particles are precomputed once for stability.
  const particles = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => {
      // Deterministic pseudo-random based on index
      const seed = (i * 9301 + 49297) % 233280;
      const rnd = seed / 233280;
      const left = (rnd * 100).toFixed(2);
      const size = (6 + (i % 5) * 3).toString();
      const delay = (i * 0.37).toFixed(2);
      const duration = (12 + (i % 7) * 4).toString();
      return { left, size, delay, duration };
    });
  }, []);

  const rays = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      left: `${5 + i * 9}%`,
      height: `${45 + (i % 4) * 10}%`,
      delay: `${i * 0.6}s`,
      duration: `${18 + (i % 5) * 5}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 ocean-env" aria-hidden>
      {/* Base depth gradient (scene-controlled via CSS vars) */}
      <div className="absolute inset-0 ocean-gradient" />

      {/* Soft caustics */}
      <div className="absolute inset-0 ocean-caustics" />

      {/* Contours / isobaths */}
      <div className="absolute inset-0 ocean-contours" />

      {/* Tech grid (used in cold-chain scene) */}
      <div className="absolute inset-0 ocean-grid" />

      {/* Light rays (hero only) */}
      <div className="absolute inset-0 ocean-rays">
        {rays.map((r, idx) => (
          <span
            key={idx}
            className="ocean-ray"
            style={{
              left: r.left,
              height: r.height,
              animationDelay: r.delay,
              animationDuration: r.duration,
            }}
          />
        ))}
      </div>

      {/* Rare particles */}
      <div className="absolute inset-0 ocean-particles">
        {particles.map((p, idx) => (
          <span
            key={idx}
            className="ocean-particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Marine silhouettes (subtle) */}
      <div className="absolute inset-0 ocean-marine">
        <svg
          className="ocean-jelly"
          width="220"
          height="180"
          viewBox="0 0 220 180"
          fill="none"
        >
          <g opacity="0.85">
            <path
              d="M112 44c32 0 58 20 58 45 0 18-13 34-32 41-6 2-11 2-26 2s-20 0-26-2c-19-7-32-23-32-41 0-25 26-45 58-45Z"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.5"
            />
            <path d="M82 129c-8 12-14 22-18 35" stroke="currentColor" strokeWidth="1" opacity="0.35" />
            <path d="M100 131c-3 14-5 24-3 40" stroke="currentColor" strokeWidth="1" opacity="0.35" />
            <path d="M120 131c2 14 2 26 8 40" stroke="currentColor" strokeWidth="1" opacity="0.35" />
            <path d="M138 129c8 12 13 22 17 35" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          </g>
        </svg>

        <svg
          className="ocean-school"
          width="420"
          height="120"
          viewBox="0 0 420 120"
          fill="none"
        >
          <g opacity="0.65">
            {Array.from({ length: 14 }).map((_, i) => (
              <path
                key={i}
                d={`M${20 + i * 28} ${60 + (i % 3) * 6}c10-8 20-8 30 0-10 8-20 8-30 0Z`}
                fill="currentColor"
                opacity={0.05 + (i % 5) * 0.02}
              />
            ))}
          </g>
        </svg>

        <svg
          className="ocean-whale"
          width="520"
          height="220"
          viewBox="0 0 520 220"
          fill="none"
        >
          <path
            d="M60 140c40-60 140-92 240-76 66 10 118 42 142 86 10 18 16 36 18 52-18-10-34-22-48-36-22 26-64 42-114 42-64 0-128-22-170-56-16 12-36 20-68 24Z"
            fill="currentColor"
            opacity="0.06"
          />
        </svg>
      </div>

      {/* Grain */}
      <div className="absolute inset-0 ocean-grain" />

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  );
}
