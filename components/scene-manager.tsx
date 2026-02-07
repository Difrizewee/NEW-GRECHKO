"use client";

import { useEffect } from "react";

type SceneName = "hero" | "catalog" | "cold" | "proof" | "service" | "clean";

type SceneConfig = {
  scene: SceneName;
  vars: Record<string, string>;
};

const SCENE_BY_SECTION: Array<{ id: string; scene: SceneName }> = [
  { id: "hero", scene: "hero" },
  { id: "categories", scene: "catalog" },
  { id: "products", scene: "catalog" },
  { id: "cold-chain", scene: "cold" },
  { id: "documents", scene: "proof" },
  { id: "reviews", scene: "service" },
  { id: "delivery", scene: "service" },
  { id: "faq", scene: "service" },
  { id: "order", scene: "clean" },
];

const SCENES: Record<SceneName, SceneConfig> = {
  hero: {
    scene: "hero",
    vars: {
      "--ocean-top": "hsl(214 60% 14%)",
      "--ocean-mid": "hsl(214 58% 10%)",
      "--ocean-deep": "hsl(214 65% 6%)",
      "--ocean-caustics": "0.34",
      "--ocean-grain": "0.06",
      "--ocean-particles": "0.12",
      "--ocean-contours": "0.08",
      "--ocean-grid": "0.00",
    },
  },
  catalog: {
    scene: "catalog",
    vars: {
      "--ocean-top": "hsl(206 62% 18%)",
      "--ocean-mid": "hsl(214 55% 9%)",
      "--ocean-deep": "hsl(214 65% 6%)",
      "--ocean-caustics": "0.38",
      "--ocean-grain": "0.055",
      "--ocean-particles": "0.10",
      "--ocean-contours": "0.07",
      "--ocean-grid": "0.00",
    },
  },
  cold: {
    scene: "cold",
    vars: {
      "--ocean-top": "hsl(214 58% 13%)",
      "--ocean-mid": "hsl(214 58% 9%)",
      "--ocean-deep": "hsl(214 70% 6%)",
      "--ocean-caustics": "0.26",
      "--ocean-grain": "0.05",
      "--ocean-particles": "0.06",
      "--ocean-contours": "0.08",
      "--ocean-grid": "0.12",
    },
  },
  proof: {
    scene: "proof",
    vars: {
      "--ocean-top": "hsl(214 55% 12%)",
      "--ocean-mid": "hsl(214 60% 8%)",
      "--ocean-deep": "hsl(214 75% 5%)",
      "--ocean-caustics": "0.22",
      "--ocean-grain": "0.055",
      "--ocean-particles": "0.05",
      "--ocean-contours": "0.10",
      "--ocean-grid": "0.03",
    },
  },
  service: {
    scene: "service",
    vars: {
      "--ocean-top": "hsl(214 52% 12%)",
      "--ocean-mid": "hsl(214 60% 8%)",
      "--ocean-deep": "hsl(214 75% 5%)",
      "--ocean-caustics": "0.18",
      "--ocean-grain": "0.05",
      "--ocean-particles": "0.03",
      "--ocean-contours": "0.06",
      "--ocean-grid": "0.00",
    },
  },
  clean: {
    scene: "clean",
    vars: {
      "--ocean-top": "hsl(214 50% 10%)",
      "--ocean-mid": "hsl(214 62% 7%)",
      "--ocean-deep": "hsl(214 80% 5%)",
      "--ocean-caustics": "0.10",
      "--ocean-grain": "0.045",
      "--ocean-particles": "0.00",
      "--ocean-contours": "0.00",
      "--ocean-grid": "0.00",
    },
  },
};

function applyScene(scene: SceneName) {
  const root = document.documentElement;
  root.dataset.scene = scene;
  const cfg = SCENES[scene];
  for (const [k, v] of Object.entries(cfg.vars)) {
    root.style.setProperty(k, v);
  }
}

export default function SceneManager() {
  useEffect(() => {
    // Initial scene
    applyScene("hero");

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.target || !(e.target as HTMLElement).id) continue;
          ratios.set((e.target as HTMLElement).id, e.intersectionRatio);
        }

        // Pick the section with the highest visible ratio
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, r] of ratios) {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }

        if (!bestId) return;
        const mapping = SCENE_BY_SECTION.find((s) => s.id === bestId);
        if (!mapping) return;

        const current = document.documentElement.dataset.scene as SceneName | undefined;
        if (current !== mapping.scene) {
          applyScene(mapping.scene);
        }
      },
      {
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
        rootMargin: "-10% 0px -55% 0px",
      }
    );

    const targets: HTMLElement[] = [];
    for (const t of SCENE_BY_SECTION) {
      const el = document.getElementById(t.id);
      if (el) {
        targets.push(el);
        ratios.set(t.id, 0);
        observer.observe(el);
      }
    }

    return () => {
      targets.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return null;
}
