"use client";

import { useEffect, useMemo, useState } from "react";
import { PhoneCall, ShoppingBag } from "lucide-react";

import { SITE } from "@/config/site";
import { useRequest } from "@/components/request-context";
import RippleButton from "@/components/ripple-button";

const NAV = [
  { label: "Каталог", href: "#products" },
  { label: "Холодовая цепь", href: "#cold-chain" },
  { label: "Документы", href: "#documents" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Доставка", href: "#delivery" },
  { label: "FAQ", href: "#faq" },
];

export default function PremiumHeader() {
  const { totalItems, openPanel, recentlyAdded } = useRequest();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const badgePulseKey = useMemo(
    () => (recentlyAdded ? `${recentlyAdded.id}-${Date.now()}` : ""),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recentlyAdded?.id]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/65 backdrop-blur-xl border-b border-border/25"
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-4 flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* Brand */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
            <span className="font-display text-base font-semibold tracking-tight text-primary">
              {"OD"}
            </span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg md:text-xl font-semibold text-foreground tracking-tight">
              {SITE.brand}
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {"консьерж морепродуктов"}
            </div>
          </div>
        </a>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-5 text-sm text-foreground/80">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="hover:text-foreground transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phoneHref}`}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-secondary/30 transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span className="hidden md:inline">{SITE.phoneDisplay}</span>
          </a>

          <RippleButton
            type="button"
            onClick={openPanel}
            className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:brightness-110 transition-all"
            aria-label={`Открыть заявку. Позиции: ${totalItems}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{"Заявка"}</span>
            <span
              key={badgePulseKey}
              className={`ml-1 inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded-full bg-primary-foreground/15 text-primary-foreground text-xs font-semibold ${
                recentlyAdded ? "badge-pulse" : ""
              }`}
            >
              {totalItems}
            </span>
          </RippleButton>
        </div>
      </div>

      {/* Premium divider line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/25 to-transparent" />
    </header>
  );
}
