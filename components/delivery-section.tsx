"use client";

import { useMemo, useState } from "react";
import { Calculator, Truck, Clock, MapPin, Info } from "lucide-react";

import SectionReveal from "./section-reveal";

type DeliveryMode = "courier" | "cdek" | "transport";

const cities = [
  "Москва",
  "Санкт-Петербург",
  "Казань",
  "Екатеринбург",
  "Новосибирск",
  "Нижний Новгород",
  "Ростов-на-Дону",
  "Краснодар",
  "Самара",
  "Воронеж",
  "Пермь",
  "Уфа",
  "Челябинск",
  "Волгоград",
  "Красноярск",
  "Омск",
  "Тюмень",
  "Иркутск",
  "Хабаровск",
  "Владивосток",
];

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

function estimateDelivery(opts: {
  city: string;
  mode: DeliveryMode;
  weightKg: number;
  orderSum: number;
}) {
  const city = opts.city.trim();
  const weightKg = clamp(opts.weightKg, 0.1, 40);
  const orderSum = Math.max(0, opts.orderSum);

  const isMoscow = /^(москва|moscow)$/i.test(city);

  // Base tables are intentionally conservative. This is an approximate estimate.
  const baseByMode = {
    courier: 590,
    cdek: 790,
    transport: 1290,
  } as const;

  const daysByMode = {
    courier: "1\u20132 дня",
    cdek: "2\u20134 дня",
    transport: "3\u20137 дней",
  } as const;

  if (isMoscow) {
    const freeFrom = 5000;
    const cost = orderSum >= freeFrom ? 0 : 390;
    return {
      cost,
      eta: "в день заказа или на следующий день",
      note:
        cost === 0
          ? `Бесплатно по Москве при заказе от ${freeFrom.toLocaleString("ru-RU")} \u20BD.`
          : "Тариф по Москве зависит от района и временного интервала.",
    };
  }

  // Regional coefficient by city recognition (very rough)
  const farCities = ["Хабаровск", "Владивосток", "Иркутск", "Красноярск", "Омск", "Новосибирск"];
  const isFar = farCities.some((c) => city.toLowerCase().includes(c.toLowerCase()));
  const regionK = isFar ? 1.35 : 1.0;

  const base = Math.round(baseByMode[opts.mode] * regionK);
  const over1kg = Math.max(0, weightKg - 1);
  const weightSurcharge = Math.round(over1kg * (opts.mode === "transport" ? 190 : 240));

  return {
    cost: base + weightSurcharge,
    eta: daysByMode[opts.mode],
    note:
      "Оценка ориентировочная. Точную стоимость и окно доставки подтверждает менеджер после согласования города, веса и упаковки.",
  };
}

function ModeTab({
  value,
  label,
  active,
  onClick,
}: {
  value: DeliveryMode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/40"
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export default function DeliverySection() {
  const [city, setCity] = useState("");
  const [mode, setMode] = useState<DeliveryMode>("courier");
  const [weightKg, setWeightKg] = useState<number>(2);
  const [orderSum, setOrderSum] = useState<number>(0);

  const result = useMemo(
    () => estimateDelivery({ city, mode, weightKg, orderSum }),
    [city, mode, weightKg, orderSum]
  );

  return (
    <SectionReveal id="delivery" className="px-4 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-balance mb-4">
            {"Доставка и оплата"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {"Доставляем по Москве и всей России. Сохраняем холодовую цепь: термоконтейнер + хладоэлементы + контроль упаковки."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-foreground">
                  {"Ориентировочный расч\u0451т"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {"Поля видимы сразу (не заглушка)."}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {"Город"}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Например: Москва, Казань, Владивосток"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary/30 border border-border/30 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    list="citylist"
                    autoComplete="off"
                  />
                  <datalist id="citylist">
                    {cities.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {"Вес, кг"}
                  </label>
                  <input
                    type="number"
                    min={0.1}
                    max={40}
                    step={0.1}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value || 0))}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {"Сумма, \u20BD"}
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={orderSum}
                    onChange={(e) => setOrderSum(Number(e.target.value || 0))}
                    placeholder="0"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {"Способ"}
                </label>
                <div className="flex flex-wrap gap-2">
                  <ModeTab
                    value="courier"
                    label="Курьер"
                    active={mode === "courier"}
                    onClick={() => setMode("courier")}
                  />
                  <ModeTab
                    value="cdek"
                    label="CDEK"
                    active={mode === "cdek"}
                    onClick={() => setMode("cdek")}
                  />
                  <ModeTab
                    value="transport"
                    label="Транспортная"
                    active={mode === "transport"}
                    onClick={() => setMode("transport")}
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-primary/5 border border-primary/15 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {"Итог"}
                    </div>
                    <div className="mt-1 text-2xl font-semibold text-foreground">
                      {result.cost.toLocaleString("ru-RU")} {"\u20BD"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {"Срок"}
                    </div>
                    <div className="mt-1 text-sm font-medium text-foreground">
                      {result.eta}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                  <Info className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>{result.note}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl text-foreground">
                  {"Как доставляем"}
                </h3>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {"\u2022 Термоконтейнер + хладоэлементы. Упаковка подбирается под объ\u0451м и маршрут."}
                </p>
                <p>
                  {"\u2022 Каждая партия сопровождается документами и маркировкой. По запросу \u2014 подтверждения качества."}
                </p>
                <p>
                  {"\u2022 Консьерж-процесс: после заявки менеджер уточняет адрес, дату, временное окно, способ оплаты."}
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl text-foreground">
                  {"Оплата"}
                </h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>{"\u2022 Перевод / ссылка на оплату (по согласованию)."}</li>
                <li>{"\u2022 Для крупных заказов \u2014 предоплата и подтверждение наличия."}</li>
                <li>{"\u2022 Итоговая сумма уточняется при подтверждении фактического веса (если применимо)."}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
