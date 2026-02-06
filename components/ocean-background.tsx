"use client";

import { useEffect, useRef, useState } from "react";

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(p);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

/* Particles — gentle upward drifting dots */
function Particles({ progress }: { progress: number }) {
  const count = Math.floor(12 + progress * 8);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const left = ((i * 37 + 13) % 100);
        const delay = (i * 1.7) % 10;
        const duration = 12 + (i % 5) * 3;
        const size = 2 + (i % 3);
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              bottom: "-10px",
              width: size,
              height: size,
              background: `hsla(180, 55%, 60%, ${0.2 + progress * 0.15})`,
              animation: `float-up ${duration}s ${delay}s linear infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/* Surface caustics — light rays visible near top */
function Caustics({ progress }: { progress: number }) {
  const opacity = Math.max(0, 0.35 - progress * 1.2);
  if (opacity < 0.02) return null;
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        animation: "caustics 8s ease-in-out infinite",
        background: `
          radial-gradient(ellipse 600px 200px at 30% 15%, hsla(190, 60%, 70%, 0.15), transparent),
          radial-gradient(ellipse 400px 150px at 70% 10%, hsla(180, 50%, 65%, 0.12), transparent),
          radial-gradient(ellipse 300px 100px at 50% 20%, hsla(195, 55%, 75%, 0.1), transparent)
        `,
      }}
    />
  );
}

/* Marine life silhouettes — SVG shapes at different depths */
function MarineLife({ progress }: { progress: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Surface: small fish school */}
      {progress < 0.35 && (
        <svg
          className="absolute"
          style={{
            top: "12%",
            opacity: Math.max(0, 0.15 - progress * 0.5),
            animation: "fish-school 25s linear infinite",
          }}
          width="180"
          height="60"
          viewBox="0 0 180 60"
          fill="none"
        >
          <path
            d="M10 30 Q20 20 30 30 Q20 40 10 30Z"
            fill="hsla(200, 30%, 70%, 0.4)"
          />
          <path
            d="M40 20 Q50 10 60 20 Q50 30 40 20Z"
            fill="hsla(200, 30%, 70%, 0.35)"
          />
          <path
            d="M50 40 Q60 30 70 40 Q60 50 50 40Z"
            fill="hsla(200, 30%, 70%, 0.3)"
          />
          <path
            d="M80 25 Q90 15 100 25 Q90 35 80 25Z"
            fill="hsla(200, 30%, 70%, 0.3)"
          />
          <path
            d="M100 42 Q110 32 120 42 Q110 52 100 42Z"
            fill="hsla(200, 30%, 70%, 0.25)"
          />
          <path
            d="M130 18 Q140 8 150 18 Q140 28 130 18Z"
            fill="hsla(200, 30%, 70%, 0.25)"
          />
          <path
            d="M140 38 Q150 28 160 38 Q150 48 140 38Z"
            fill="hsla(200, 30%, 70%, 0.2)"
          />
        </svg>
      )}

      {/* Mid-depth: jellyfish */}
      {progress > 0.2 && progress < 0.7 && (
        <>
          <svg
            className="absolute"
            style={{
              top: "40%",
              left: "15%",
              opacity: Math.min(0.12, (progress - 0.2) * 0.3),
              animation: "jellyfish-drift 12s ease-in-out infinite",
            }}
            width="60"
            height="90"
            viewBox="0 0 60 90"
            fill="none"
          >
            <ellipse
              cx="30"
              cy="25"
              rx="25"
              ry="20"
              fill="hsla(190, 50%, 60%, 0.3)"
            />
            <path
              d="M15 40 Q18 60 12 85"
              stroke="hsla(190, 50%, 60%, 0.2)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M25 42 Q28 65 22 88"
              stroke="hsla(190, 50%, 60%, 0.18)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M35 42 Q32 65 38 88"
              stroke="hsla(190, 50%, 60%, 0.18)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M45 40 Q42 60 48 85"
              stroke="hsla(190, 50%, 60%, 0.2)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <svg
            className="absolute"
            style={{
              top: "55%",
              right: "10%",
              opacity: Math.min(0.1, (progress - 0.25) * 0.25),
              animation: "jellyfish-drift 15s 3s ease-in-out infinite",
            }}
            width="45"
            height="70"
            viewBox="0 0 45 70"
            fill="none"
          >
            <ellipse
              cx="22"
              cy="18"
              rx="18"
              ry="15"
              fill="hsla(280, 30%, 60%, 0.2)"
            />
            <path
              d="M10 30 Q14 48 8 65"
              stroke="hsla(280, 30%, 60%, 0.15)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M22 32 Q20 50 24 68"
              stroke="hsla(280, 30%, 60%, 0.12)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M34 30 Q30 48 36 65"
              stroke="hsla(280, 30%, 60%, 0.15)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </>
      )}

      {/* Mid-depth: stingray silhouette */}
      {progress > 0.35 && progress < 0.75 && (
        <svg
          className="absolute"
          style={{
            top: "50%",
            opacity: Math.min(0.08, (progress - 0.35) * 0.2),
            animation: "drift-left 35s 5s linear infinite",
          }}
          width="200"
          height="80"
          viewBox="0 0 200 80"
          fill="none"
        >
          <path
            d="M100 10 Q140 5 180 30 Q140 35 100 40 Q60 35 20 30 Q60 5 100 10Z"
            fill="hsla(210, 25%, 45%, 0.15)"
          />
          <path
            d="M100 40 Q102 55 105 75"
            stroke="hsla(210, 25%, 45%, 0.12)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      )}

      {/* Deep: sea turtle */}
      {progress > 0.4 && progress < 0.8 && (
        <svg
          className="absolute"
          style={{
            top: "62%",
            opacity: Math.min(0.08, (progress - 0.4) * 0.2),
            animation: "drift-right 40s 8s linear infinite",
          }}
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="none"
        >
          <ellipse
            cx="60"
            cy="40"
            rx="35"
            ry="25"
            fill="hsla(170, 20%, 40%, 0.15)"
          />
          <ellipse
            cx="60"
            cy="40"
            rx="28"
            ry="20"
            fill="hsla(170, 20%, 35%, 0.1)"
          />
          <path
            d="M28 30 Q15 20 8 25"
            stroke="hsla(170, 20%, 40%, 0.12)"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M92 30 Q105 20 112 25"
            stroke="hsla(170, 20%, 40%, 0.12)"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M32 52 Q20 60 15 58"
            stroke="hsla(170, 20%, 40%, 0.1)"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M88 52 Q100 60 105 58"
            stroke="hsla(170, 20%, 40%, 0.1)"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="95" cy="35" r="6" fill="hsla(170, 20%, 40%, 0.08)" />
        </svg>
      )}

      {/* Deep ocean: anglerfish glow */}
      {progress > 0.65 && (
        <div
          className="absolute"
          style={{
            top: "78%",
            left: "20%",
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "hsla(180, 80%, 65%, 0.4)",
            opacity: Math.min(0.4, (progress - 0.65) * 1.2),
            animation: "pulse-glow 4s ease-in-out infinite",
            boxShadow: "0 0 30px 10px hsla(180, 80%, 65%, 0.15)",
          }}
        />
      )}

      {/* Deep ocean: squid silhouette */}
      {progress > 0.7 && (
        <svg
          className="absolute"
          style={{
            top: "85%",
            right: "20%",
            opacity: Math.min(0.07, (progress - 0.7) * 0.25),
            animation: "drift-left 45s 10s linear infinite",
          }}
          width="80"
          height="140"
          viewBox="0 0 80 140"
          fill="none"
        >
          <ellipse
            cx="40"
            cy="35"
            rx="22"
            ry="30"
            fill="hsla(250, 20%, 40%, 0.2)"
          />
          <path d="M25 60 Q22 90 15 130" stroke="hsla(250, 20%, 40%, 0.12)" strokeWidth="1.5" fill="none" />
          <path d="M32 62 Q30 95 25 130" stroke="hsla(250, 20%, 40%, 0.1)" strokeWidth="1.2" fill="none" />
          <path d="M40 65 Q40 98 40 132" stroke="hsla(250, 20%, 40%, 0.1)" strokeWidth="1.2" fill="none" />
          <path d="M48 62 Q50 95 55 130" stroke="hsla(250, 20%, 40%, 0.1)" strokeWidth="1.2" fill="none" />
          <path d="M55 60 Q58 90 65 130" stroke="hsla(250, 20%, 40%, 0.12)" strokeWidth="1.5" fill="none" />
        </svg>
      )}

      {/* Deep ocean: whale silhouette (very subtle) */}
      {progress > 0.8 && (
        <svg
          className="absolute"
          style={{
            bottom: "8%",
            opacity: Math.min(0.05, (progress - 0.8) * 0.25),
            animation: "whale 60s 15s linear infinite",
          }}
          width="350"
          height="100"
          viewBox="0 0 350 100"
          fill="none"
        >
          <path
            d="M30 60 Q80 20 175 25 Q270 30 320 55 Q310 70 280 75 Q250 78 175 75 Q100 72 60 70 Q40 68 30 60Z"
            fill="hsla(210, 30%, 30%, 0.12)"
          />
          <path
            d="M320 55 Q335 42 350 35 Q345 55 330 65 Q325 62 320 55Z"
            fill="hsla(210, 30%, 30%, 0.1)"
          />
          <circle cx="80" cy="48" r="3" fill="hsla(210, 30%, 25%, 0.08)" />
        </svg>
      )}

      {/* Bioluminescent dots in deep section */}
      {progress > 0.6 &&
        Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`bio-${i}`}
            className="absolute rounded-full"
            style={{
              top: `${70 + (i * 17) % 25}%`,
              left: `${10 + (i * 23) % 80}%`,
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              background: `hsla(${180 + i * 15}, 70%, 65%, 0.25)`,
              opacity: Math.min(0.3, (progress - 0.6) * 0.75),
              animation: `pulse-glow ${3 + i}s ${i * 0.5}s ease-in-out infinite`,
            }}
          />
        ))}
    </div>
  );
}

export default function OceanBackground() {
  const progress = useScrollProgress();
  const containerRef = useRef<HTMLDivElement>(null);

  /* Build depth gradient: surface → mid → deep */
  const surfaceColor = `hsl(205, 55%, ${22 - progress * 14}%)`;
  const midColor = `hsl(212, 50%, ${14 - progress * 8}%)`;
  const deepColor = `hsl(220, 45%, ${8 - progress * 3}%)`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{
        background: `linear-gradient(180deg, ${surfaceColor} 0%, ${midColor} 50%, ${deepColor} 100%)`,
      }}
    >
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <Caustics progress={progress} />
      <Particles progress={progress} />
      <MarineLife progress={progress} />
    </div>
  );
}
