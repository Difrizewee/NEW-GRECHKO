"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Info, Plus } from "lucide-react";
import SectionReveal from "./section-reveal";
import { useRequest } from "./request-context";
import RippleButton from "./ripple-button";

interface Product {
  id: string;
  name: string;
  image: string;
  imageNote?: string; // "Пример подачи" label for AI images
  origin: string;
  condition: string;
  caliber?: string;
  batch: string;
  shelfLife: string;
  storage: string;
  packaging: string;
  allergens: string;
  documents: string;
  weight: string;
  weightNote?: string;
  price: number;
  pricePerUnit: string;
  available: boolean;
  category: string;
}

const products: Product[] = [
  {
    id: "trout-fillet-500",
    name: "Филе форели охлаждённое",
    image: "/placeholder.svg",
    imageNote: "Пример подачи",
    origin: "Карелия, аквакультура",
    condition: "Охлаждённое",
    batch: "Партия от 03.02.2026",
    shelfLife: "5 суток с даты производства",
    storage: "0...+4 \u00B0C",
    packaging: "Вакуумная упаковка",
    allergens: "Рыба",
    documents: "Вет. свидетельство, декларация ТР ЕАЭС",
    weight: "500 г \u00B1 30 г",
    weightNote: "Если фактический вес отличается, сумма корректируется пропорционально",
    price: 1290,
    pricePerUnit: "2 580 \u20BD/кг",
    available: true,
    category: "Форель",
  },
  {
    id: "king-shrimp-1kg",
    name: "Креветки королевские",
    image: "/placeholder.svg",
    imageNote: "Пример подачи",
    origin: "Аргентина, дикий вылов",
    condition: "Замороженное",
    caliber: "L2 (16/20 шт./кг)",
    batch: "Партия от 20.01.2026",
    shelfLife: "12 месяцев с даты заморозки",
    storage: "-18 \u00B0C и ниже",
    packaging: "Пакет, ледяная глазурь 5 %",
    allergens: "Ракообразные",
    documents: "Вет. свидетельство, декларация ТР ЕАЭС",
    weight: "1 кг (нетто без глазури)",
    price: 2490,
    pricePerUnit: "2 490 \u20BD/кг",
    available: true,
    category: "Креветки",
  },
  {
    id: "black-caviar-50",
    name: "Икра чёрная осетровая",
    image: "/placeholder.svg",
    imageNote: "Пример подачи",
    origin: "Вологда, аквакультура (осётр)",
    condition: "Охлаждённое",
    caliber: "Зерно 2.8–3.2 мм, малосольная",
    batch: "Партия от 28.01.2026",
    shelfLife: "90 суток с даты производства",
    storage: "-2...+2 \u00B0C",
    packaging: "Стеклянная банка, вакуум",
    allergens: "Рыба",
    documents: "Вет. свидетельство, декларация ТР ЕАЭС, CITES (при необходимости)",
    weight: "50 г",
    price: 8900,
    pricePerUnit: "178 000 \u20BD/кг",
    available: true,
    category: "Икра",
  },
  {
    id: "sturgeon-steak-400",
    name: "Стейк осетра охлаждённый",
    image: "/placeholder.svg",
    imageNote: "Пример подачи",
    origin: "Вологда, аквакультура",
    condition: "Охлаждённое",
    batch: "Партия от 02.02.2026",
    shelfLife: "5 суток с даты производства",
    storage: "0...+4 \u00B0C",
    packaging: "Вакуумная упаковка",
    allergens: "Рыба",
    documents: "Вет. свидетельство, декларация ТР ЕАЭС",
    weight: "400 г \u00B1 30 г",
    weightNote: "Если фактический вес отличается, сумма корректируется пропорционально",
    price: 2190,
    pricePerUnit: "5 475 \u20BD/кг",
    available: true,
    category: "Осётр",
  },
  {
    id: "red-caviar-250",
    name: "Икра красная лососёвая",
    image: "/placeholder.svg",
    imageNote: "Пример подачи",
    origin: "Камчатка, дикий вылов (горбуша)",
    condition: "Охлаждённое",
    caliber: "1 сорт, зерно 4–5 мм",
    batch: "Партия от 15.01.2026",
    shelfLife: "8 месяцев с даты производства",
    storage: "-4...+2 \u00B0C",
    packaging: "Жестяная банка, вакуум",
    allergens: "Рыба",
    documents: "Вет. свидетельство, декларация ТР ЕАЭС",
    weight: "250 г",
    price: 3490,
    pricePerUnit: "13 960 \u20BD/кг",
    available: true,
    category: "Икра",
  },
  {
    id: "smoked-trout-350",
    name: "Форель холодного копчения",
    image: "/placeholder.svg",
    imageNote: "Пример подачи",
    origin: "Карелия, аквакультура",
    condition: "Охлаждённое",
    batch: "Партия от 01.02.2026",
    shelfLife: "30 суток с даты производства",
    storage: "0...+4 \u00B0C",
    packaging: "Вакуумная упаковка",
    allergens: "Рыба. Продукт копчения",
    documents: "Вет. свидетельство, декларация ТР ЕАЭС",
    weight: "350 г \u00B1 25 г",
    weightNote: "Если фактический вес отличается, сумма корректируется пропорционально",
    price: 1690,
    pricePerUnit: "4 829 \u20BD/кг",
    available: true,
    category: "Форель",
  },
];

function ProductCard({ product }: { product: Product }) {
  const { addItem, recentlyAdded } = useRequest();
  const justAdded = recentlyAdded?.id === product.id;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        {product.imageNote && (
          <span className="absolute top-3 left-3 text-[10px] text-foreground/60 bg-background/50 backdrop-blur-sm rounded px-2 py-0.5">
            {product.imageNote}
          </span>
        )}
        <span className="absolute top-3 right-3 text-[10px] font-medium text-primary bg-primary/10 backdrop-blur-sm rounded px-2 py-0.5">
          {product.condition}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-foreground leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Key specs - always visible */}
        <div className="space-y-1.5 mb-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
            <span>{product.origin}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
            <span>{product.weight}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
            <span>{product.packaging}</span>
          </div>
          {product.caliber && (
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
              <span>{product.caliber}</span>
            </div>
          )}
        </div>

        {/* Expandable details */}
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mb-3 self-start"
        >
          <Info className="w-3 h-3" />
          {showDetails ? "Свернуть" : "Подробнее"}
        </button>

        {showDetails && (
          <div className="space-y-1.5 mb-3 text-xs text-muted-foreground rounded-lg bg-secondary/20 p-3 animate-in fade-in duration-200">
            <p>
              <span className="text-foreground/70">{"Хранение: "}</span>
              {product.storage}
            </p>
            <p>
              <span className="text-foreground/70">{"Срок годности: "}</span>
              {product.shelfLife}
            </p>
            <p>
              <span className="text-foreground/70">{"Партия: "}</span>
              {product.batch}
            </p>
            <p>
              <span className="text-foreground/70">{"Аллергены: "}</span>
              {product.allergens}
            </p>
            <p>
              <span className="text-foreground/70">{"Документы: "}</span>
              {product.documents}
            </p>
            {product.weightNote && (
              <p className="text-[10px] text-muted-foreground/70 pt-1 border-t border-border/20">
                {product.weightNote}
              </p>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-3 border-t border-border/15">
          <div>
            <span className="text-xl font-semibold text-foreground">
              {product.price.toLocaleString("ru-RU")}
              {" \u20BD"}
            </span>
            <span className="block text-[10px] text-muted-foreground mt-0.5">
              {product.pricePerUnit}
            </span>
          </div>
          <RippleButton
            type="button"
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                unit: product.weight,
                price: product.price,
              })
            }
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-all active:scale-[0.97] ${
              justAdded
                ? "bg-primary/20 text-primary"
                : "bg-primary text-primary-foreground hover:brightness-110 hover:scale-[1.02]"
            }`}
            aria-label={`Добавить ${product.name} в заявку`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">{"Добавлено"}</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">{"В заявку"}</span>
              </>
            )}
          </RippleButton>
        </div>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = ["Форель", "Креветки", "Икра", "Осётр"];
  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <SectionReveal id="products" className="px-4 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center text-balance mb-4">
          {"Лучшие предложения"}
        </h2>
        <p className="text-muted-foreground text-center text-lg max-w-xl mx-auto mb-10">
          {"Каждая позиция прошла экспертный отбор. Добавляйте в заявку \u2014 менеджер подтвердит наличие и оформит доставку."}
        </p>

        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            {"Все"}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
