"use client";

import {
  ShieldCheck,
  Scale,
  PackageCheck,
  PhoneCall,
  ChevronDown,
  FileCheck,
} from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, text: "Контроль качества" },
  { icon: Scale, text: "Честный вес" },
  { icon: PackageCheck, text: "Термоупаковка" },
  { icon: FileCheck, text: "Документы на партию" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center"
    >
      {/* Top navigation bar */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5 md:px-12" aria-label="Основная навигация">
        <span className="text-foreground font-display text-lg tracking-wide">
          OceanDelux
        </span>
        <div className="flex items-center gap-6">
          <a
            href="#categories"
            className="hidden md:inline text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {"Каталог"}
          </a>
          <a
            href="#delivery"
            className="hidden md:inline text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {"Доставка"}
          </a>
          <a
            href="#faq"
            className="hidden md:inline text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {"FAQ"}
          </a>
          <a
            href="tel:+74951234567"
            className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span className="hidden sm:inline">+7 (495) 123-45-67</span>
          </a>
        </div>
      </nav>

      {/* Main headline */}
      <div className="max-w-4xl mx-auto">
        <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary mb-6">
          {"Форель \u00B7 Креветки \u00B7 Икра \u00B7 Осетрина"}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground text-balance mb-6">
          {"Премиальные морепродукты с доставкой по России"}
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          {"Консьерж-сервис: вы собираете заявку \u2014 мы подтверждаем наличие, подбираем лучшую партию и организуем доставку в термоупаковке."}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="#products"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3.5 text-base font-medium transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
          >
            {"Собрать заказ"}
          </a>
          <a
            href="#order"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary/50 text-secondary-foreground px-8 py-3.5 text-base font-medium transition-all hover:bg-secondary hover:scale-[1.02] active:scale-[0.98]"
          >
            {"Отправить заявку"}
          </a>
        </div>

        {/* Trust bullets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
          {trustItems.map((item) => (
            <div
              key={item.text}
              className="glass-panel rounded-xl px-4 py-4 flex flex-col items-center gap-2.5"
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground/80">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground animate-bounce">
        <span className="text-xs tracking-wider uppercase">{"Вглубь"}</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
