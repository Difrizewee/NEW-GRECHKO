"use client";

import {
  FileCheck,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import SectionReveal from "./section-reveal";

const documents = [
  {
    icon: FileCheck,
    title: "Ветеринарные свидетельства",
    description:
      "Каждая партия сопровождается ветеринарным свидетельством (форма 2 или 4), подтверждающим безопасность и происхождение продукции. Документы оформляются через систему \u00AB\u041C\u0435\u0440\u043A\u0443\u0440\u0438\u0439\u00BB.",
    status: "Предоставляем по запросу",
  },
  {
    icon: FileText,
    title: "Декларации соответствия ТР ЕАЭС",
    description:
      "Продукция соответствует техническим регламентам Таможенного союза: ТР ЕАЭС 040/2016 (безопасность рыбной продукции) и ТР ТС 021/2011 (безопасность пищевой продукции).",
    status: "Все декларации актуальны",
  },
  {
    icon: ClipboardCheck,
    title: "Протоколы входного контроля",
    description:
      "При приёмке каждой партии проверяем: температуру (термометром), целостность упаковки, органолептические показатели (запах, цвет, текстура), маркировку и сроки годности.",
    status: "Каждая партия",
  },
  {
    icon: ShieldCheck,
    title: "Прослеживаемость партий",
    description:
      "Каждый заказ привязан к конкретной партии поставщика. Вы всегда можете уточнить: дату производства/заморозки, регион/ферму происхождения и номер ветеринарного документа.",
    status: "Полный трек от поставщика",
  },
];

export default function DocumentsSection() {
  return (
    <SectionReveal id="documents" className="px-4 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <span className="block text-center text-xs font-medium tracking-widest uppercase text-primary mb-4">
          {"Прозрачность и доверие"}
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center text-balance mb-4">
          {"Документация и прослеживаемость"}
        </h2>
        <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-12 md:mb-16">
          {"Мы не скрываем ничего. Каждая партия документирована, каждый этап \u2014 под контролем. Запросите документы \u2014 предоставим."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {documents.map((doc) => (
            <div
              key={doc.title}
              className="glass-panel rounded-2xl p-6 md:p-7 flex gap-5 group hover:border-primary/15 transition-colors"
            >
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <doc.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground mb-1.5">
                  {doc.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {doc.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary/80">
                  <ShieldCheck className="w-3 h-3" />
                  {doc.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA for documents */}
        <div className="mt-8 text-center">
          <a
            href="#order"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            {"Запросить документы на конкретную партию"}
          </a>
        </div>
      </div>
    </SectionReveal>
  );
}
