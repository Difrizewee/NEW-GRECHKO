"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";

import SectionReveal from "./section-reveal";

const categories = [
  {
    title: "Форель",
    subtitle: "Охлаждённая и копчёная",
    image: "/placeholder.svg",
  },
  {
    title: "Креветки",
    subtitle: "Дикий вылов и премиум калибр",
    image: "/placeholder.svg",
  },
  {
    title: "Икра",
    subtitle: "Красная и чёрная",
    image: "/placeholder.svg",
  },
  {
    title: "Осетрина",
    subtitle: "Стейки и деликатесы",
    image: "/placeholder.svg",
  },
];

export default function CategoriesSection() {
  return (
    <SectionReveal id="categories" className="px-4 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <span className="block text-center text-xs font-medium tracking-widest uppercase text-primary mb-4">
          {"Разделы"}
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center text-balance mb-4">
          {"Категории"}
        </h2>
        <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-12 md:mb-16">
          {"Выберите категорию — соберите заявку. Менеджер подтвердит наличие и предложит лучшую партию."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href="#products"
              className="group relative overflow-hidden rounded-2xl glass-panel border border-border/20 hover:border-primary/30 transition-all"
            >
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover opacity-55 group-hover:opacity-70 group-hover:scale-[1.03] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              </div>
              <div className="relative z-10 p-6 flex flex-col justify-between h-56">
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cat.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-primary/80 group-hover:text-primary transition-colors">
                  {"Смотреть"}
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
