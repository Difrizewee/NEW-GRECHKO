import { Shield, FileText, ClipboardCheck, Stamp } from "lucide-react";

import SectionReveal from "./section-reveal";

function DocPreview({
  title,
  subtitle,
  stampLabel,
}: {
  title: string;
  subtitle: string;
  stampLabel: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/20 bg-secondary/10">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {subtitle}
            </div>
            <div className="mt-1 font-semibold text-foreground">
              {title}
            </div>
          </div>
          <div className="shrink-0 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
            <Stamp className="w-3.5 h-3.5" />
            {stampLabel}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="h-3 rounded bg-white/10" />
          <div className="h-3 rounded bg-white/8" />
          <div className="h-3 rounded bg-white/8" />
          <div className="h-3 rounded bg-white/10" />
          <div className="h-3 rounded bg-white/10" />
          <div className="h-3 rounded bg-white/6" />
          <div className="h-3 rounded bg-white/8" />
          <div className="h-3 rounded bg-white/10" />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-[11px] text-muted-foreground">
            {"Фрагмент (данные скрыты)"}
          </div>
          <div className="text-[11px] text-muted-foreground">
            {"PDF \u00B7 1\u20132 стр."}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      </div>
    </div>
  );
}

export default function DocumentsSection() {
  return (
    <SectionReveal id="documents" className="px-4 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-balance mb-4">
            {"Документы и прослеживаемость"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {"Не просто обещания: подтверждаем качество документами, партиями и хранением. Ниже \u2014 примеры визуальных артефактов (данные скрыты)."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="glass-panel rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-foreground">
                  {"Что вы получаете"}
                </h3>
                <p className="text-muted-foreground">
                  {"Подтверждения по запросу и в составе поставки."}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {"Ветеринарные свидетельства"}
                  </h4>
                  <p className="text-muted-foreground">
                    {"Для каждой партии. С возможностью предоставить номер и скрин/фрагмент при подтверждении заказа."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {"Декларации/сертификаты ТР ЕАЭС"}
                  </h4>
                  <p className="text-muted-foreground">
                    {"Подтверждают соответствие требованиям безопасности пищевой продукции."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Stamp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {"Партия, маркировка, условия хранения"}
                  </h4>
                  <p className="text-muted-foreground">
                    {"Показываем ключевые артефакты: партия, дата, температура, упаковка. Это усиливает доверие на финальном шаге."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <DocPreview
              title="Вет. свидетельство (пример)"
              subtitle="ветеринария"
              stampLabel="подтверждено"
            />
            <DocPreview
              title="Декларация соответствия (пример)"
              subtitle="тр еаэс"
              stampLabel="актуально"
            />
            <DocPreview
              title="Маркировка партии / хранение"
              subtitle="прослеживаемость"
              stampLabel="партия"
            />
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
