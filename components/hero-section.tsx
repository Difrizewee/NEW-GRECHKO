"use client";

import { ArrowDown, Waves, ShieldCheck } from "lucide-react";

import { SITE } from "@/config/site";
import RippleButton from "@/components/ripple-button";

export default function HeroSection() {
  function diveToContent() {
    // Trigger a short "dive" transition for the background
    const root = document.documentElement;
    root.dataset.dive = "1";
    window.setTimeout(() => {
      delete root.dataset.dive;
    }, 1400);

    const target = document.getElementById("products");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="hero" className="relative min-h-[92vh] md:min-h-screen">
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-32 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-primary/90 mb-6">
            <Waves className="w-4 h-4" />
            {"Премиальные морепродукты"}
          </span>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] text-balance mb-6">
            {SITE.brand}
            <span className="block text-2xl md:text-3xl lg:text-4xl text-muted-foreground mt-3">
              {"Консьерж-доставка форели, креветок, икры и осетрины по России"}
            </span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            {"Вы выбираете позиции и отправляете заявку. Менеджер подтверждает наличие, подбирает лучшую партию и согласует доставку и оплату."}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-7 py-3.5 text-base font-medium hover:brightness-110 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              {"Собрать заказ"}
            </a>

            <RippleButton
              type="button"
              onClick={diveToContent}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/40 bg-secondary/25 text-foreground px-7 py-3.5 text-base font-medium hover:bg-secondary/35 transition-all"
            >
              <ArrowDown className="w-4 h-4" />
              {"Вглубь"}
            </RippleButton>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel rounded-2xl p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {"Контроль"}
              </div>
              <div className="text-sm text-foreground/90 leading-relaxed">
                {"Холодовая цепь, термоупаковка, входной контроль каждой партии."}
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {"Документы"}
              </div>
              <div className="text-sm text-foreground/90 leading-relaxed">
                {"Вет. свидетельства, декларации ТР ЕАЭС, прослеживаемость партий."}
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {"Связь"}
              </div>
              <div className="text-sm text-foreground/90 leading-relaxed">
                {"Телефон и мессенджеры: быстро уточним бюджет, сроки и пожелания."}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary/80" />
            <span>
              {"Работаем по Москве и регионам. "}
              {SITE.workHours}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-muted-foreground/80">
        <div className="text-[10px] uppercase tracking-[0.3em]">
          {"Погружение"}
        </div>
        <div className="w-px h-10 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
}
