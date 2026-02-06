"use client";

import Image from "next/image";
import {
  Anchor,
  ThermometerSnowflake,
  PackageCheck,
  Truck,
  ShieldCheck,
  ArrowDown,
} from "lucide-react";
import SectionReveal from "./section-reveal";

const chainSteps = [
  {
    icon: Anchor,
    temp: "0...+2 \u00B0C",
    title: "Вылов / Приёмка",
    description:
      "Продукция поступает от проверенных поставщиков. Входной контроль: температура, органолептика, документы. Партии с отклонениями отклоняются.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: ThermometerSnowflake,
    temp: "-2...+2 \u00B0C",
    title: "Хранение на складе",
    description:
      "Охлаждённая продукция хранится в камерах при 0...+4 \u00B0C. Замороженная \u2014 при -18 \u00B0C. Температурные логгеры фиксируют режим 24/7.",
    color: "text-sky-400",
    bgColor: "bg-sky-400/10",
  },
  {
    icon: PackageCheck,
    temp: "0...+4 \u00B0C",
    title: "Упаковка",
    description:
      "Вакуумная упаковка или контейнер в зависимости от продукта. Маркировка: дата, партия, условия хранения, срок годности.",
    color: "text-teal-400",
    bgColor: "bg-teal-400/10",
  },
  {
    icon: Truck,
    temp: "0...+6 \u00B0C",
    title: "Доставка",
    description:
      "Термоконтейнеры с хладоэлементами. Время удержания температуры \u2014 до 48 часов. Москва \u2014 в день заказа, регионы \u2014 1\u20135 дней.",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: ShieldCheck,
    temp: "0...+4 \u00B0C",
    title: "Вручение",
    description:
      "Курьер передаёт заказ лично. Вы проверяете целостность упаковки и температуру. При претензиях \u2014 решение в течение 24 часов.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
];

export default function ColdChainSection() {
  return (
    <SectionReveal id="cold-chain" className="px-4 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        {/* Hero header with image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16 md:mb-20">
          <div>
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary mb-4">
              {"Контроль температуры"}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-balance mb-5">
              {"Холодовая цепь: от океана до вашего стола"}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {"Ни одного разрыва температурного режима. Каждый этап контролируется: датчики, логгеры, протоколы приёмки. Вы получаете продукт такой свежести, словно он только что из воды."}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="glass-panel rounded-xl px-4 py-3 text-center">
                <span className="block text-2xl font-semibold text-primary">{"5"}</span>
                <span className="text-xs text-muted-foreground">{"этапов контроля"}</span>
              </div>
              <div className="glass-panel rounded-xl px-4 py-3 text-center">
                <span className="block text-2xl font-semibold text-primary">{"24/7"}</span>
                <span className="text-xs text-muted-foreground">{"мониторинг"}</span>
              </div>
              <div className="glass-panel rounded-xl px-4 py-3 text-center">
                <span className="block text-2xl font-semibold text-primary">{"48 ч"}</span>
                <span className="text-xs text-muted-foreground">{"удержание t\u00B0"}</span>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/cold-chain.jpg"
              alt="Термоупаковка и контроль температуры"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </div>

        {/* Chain infographic */}
        <div className="relative">
          {/* Vertical connection line (desktop) */}
          <div className="hidden md:block absolute left-[39px] top-8 bottom-8 w-px bg-gradient-to-b from-primary/30 via-sky-400/20 to-emerald-400/30" />

          <div className="space-y-6 md:space-y-0">
            {chainSteps.map((step, idx) => (
              <div key={step.title} className="relative flex gap-5 md:gap-8 items-start md:py-6">
                {/* Step number + icon */}
                <div className="relative flex flex-col items-center shrink-0">
                  <div
                    className={`w-[54px] h-[54px] md:w-[60px] md:h-[60px] rounded-2xl ${step.bgColor} flex items-center justify-center relative z-10`}
                  >
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  {idx < chainSteps.length - 1 && (
                    <ArrowDown className="w-4 h-4 text-border/40 mt-2 md:hidden" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 glass-panel rounded-xl p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-muted-foreground">
                      {`0${idx + 1}`}
                    </span>
                    <span className="h-px flex-1 bg-border/20" />
                    <span className={`text-xs font-mono font-medium ${step.color}`}>
                      {step.temp}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
