"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionReveal from "./section-reveal";

const categories = [
  {
    title: "Форель",
    description: "Свежая и слабосолёная — нежный вкус северных рек",
    image: "/images/trout.jpg",
  },
  {
    title: "Креветки",
    description: "Королевские и тигровые — прямо с ледяных вод",
    image: "/images/shrimp.jpg",
  },
  {
    title: "Икра",
    description: "Чёрная и красная — безупречное качество зерна",
    image: "/images/caviar.jpg",
  },
  {
    title: "Осетрина",
    description: "Царская рыба — благородный вкус премиум-класса",
    image: "/images/sturgeon.jpg",
  },
];

export default function CategoriesSection() {
  return (
    <SectionReveal id="categories" className="px-4 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center text-balance mb-4">
          {"Наши категории"}
        </h2>
        <p className="text-muted-foreground text-center text-lg max-w-xl mx-auto mb-12 md:mb-16">
          {"Только проверенные поставщики и безупречная свежесть каждого продукта"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href="#products"
              className="group glass-panel rounded-2xl overflow-hidden flex flex-col transition-all hover:scale-[1.02] hover:border-primary/20"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-xl text-foreground mb-1.5">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {cat.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary font-medium group-hover:gap-2.5 transition-all">
                  {"Смотреть"}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
