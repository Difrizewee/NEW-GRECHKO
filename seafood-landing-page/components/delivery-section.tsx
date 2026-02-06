"use client";

import { useState } from "react";
import {
  MapPin,
  Truck,
  Clock,
  CreditCard,
  Gift,
  AlertCircle,
  ThermometerSnowflake,
  ChevronRight,
  Calculator,
} from "lucide-react";
import SectionReveal from "./section-reveal";

const cities: Record<string, { days: string; costFrom: string }> = {
  "Москва": { days: "В день заказа", costFrom: "Бесплатно от 5 000 \u20BD" },
  "Московская область": { days: "1 день", costFrom: "от 400 \u20BD" },
  "Санкт-Петербург": { days: "1\u20132 дня", costFrom: "от 600 \u20BD" },
  "Казань": { days: "2\u20133 дня", costFrom: "от 800 \u20BD" },
  "Нижний Новгород": { days: "1\u20132 дня", costFrom: "от 650 \u20BD" },
  "Екатеринбург": { days: "2\u20134 дня", costFrom: "от 900 \u20BD" },
  "Новосибирск": { days: "3\u20135 дней", costFrom: "от 1 100 \u20BD" },
  "Ростов-на-Дону": { days: "2\u20133 дня", costFrom: "от 750 \u20BD" },
  "Краснодар": { days: "2\u20133 дня", costFrom: "от 800 \u20BD" },
  "Сочи": { days: "2\u20134 дня", costFrom: "от 900 \u20BD" },
};

export default function DeliverySection() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [calcResult, setCalcResult] = useState<{ days: string; costFrom: string } | null>(null);
  const [calcError, setCalcError] = useState(false);

  function handleCalc() {
    const trimmed = selectedCity.trim();
    const found = Object.entries(cities).find(
      ([city]) => city.toLowerCase() === trimmed.toLowerCase()
    );
    if (found) {
      setCalcResult(found[1]);
      setCalcError(false);
    } else {
      setCalcResult(null);
      setCalcError(true);
    }
  }

  return (
    <SectionReveal id="delivery" className="px-4 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <span className="block text-center text-xs font-medium tracking-widest uppercase text-primary mb-4">
          {"Логистика"}
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center text-balance mb-4">
          {"Доставка и оплата"}
        </h2>
        <p className="text-muted-foreground text-center text-lg max-w-xl mx-auto mb-12 md:mb-16">
          {"Быстро, надёжно и с полным контролем температуры на каждом этапе"}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Moscow */}
          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {"Москва и МО"}
              </h3>
            </div>
            <ul className="space-y-3.5 text-sm text-foreground/80 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>
                  {"Доставка в день заказа при оформлении до 14:00. Доступны утренние (9\u201313), дневные (13\u201318) и вечерние (18\u201322) слоты."}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>
                  {"Курьерская доставка в термосумках. Бесплатно при заказе от 5 000 \u20BD. До 5 000 \u20BD \u2014 390 \u20BD."}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CreditCard className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>
                  {"Оплата: банковские карты (Visa, MasterCard, \u041C\u0418\u0420), наличные курьеру, безналичный расчёт для юрлиц (с НДС)."}
                </span>
              </li>
            </ul>
          </div>

          {/* Russia */}
          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {"По всей России"}
              </h3>
            </div>
            <ul className="space-y-3.5 text-sm text-foreground/80 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>
                  {"Отправка в течение 24 часов после подтверждения. Срок зависит от региона: 1\u20135 рабочих дней. Трек-номер \u2014 в день отправки."}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>
                  {"Доставка через СДЭК или ПЭК. Термоконтейнер + хладоэлементы. Удержание температуры \u2014 до 48 часов."}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CreditCard className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>
                  {"Стоимость зависит от веса и региона. Минимальный заказ для региональной доставки \u2014 от 3 000 \u20BD."}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Delivery calculator */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <Calculator className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              {"Рассчитать доставку"}
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setCalcResult(null);
                  setCalcError(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleCalc()}
                placeholder="Введите город (например: Казань)"
                className="w-full rounded-lg bg-secondary/50 border border-border text-foreground px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                list="city-suggestions"
              />
              <datalist id="city-suggestions">
                {Object.keys(cities).map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>
            <button
              type="button"
              onClick={handleCalc}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium transition-all hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
            >
              {"Рассчитать"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {calcResult && (
            <div className="rounded-lg bg-primary/5 border border-primary/15 p-4 flex flex-col sm:flex-row gap-4 sm:gap-8 animate-in fade-in duration-200">
              <div>
                <span className="text-xs text-muted-foreground">{"Ориентировочный срок"}</span>
                <p className="text-base font-semibold text-foreground">{calcResult.days}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">{"Стоимость"}</span>
                <p className="text-base font-semibold text-foreground">{calcResult.costFrom}</p>
              </div>
              <p className="text-xs text-muted-foreground self-end sm:ml-auto">
                {"Точная стоимость рассчитывается менеджером при подтверждении заказа"}
              </p>
            </div>
          )}
          {calcError && (
            <div className="rounded-lg bg-destructive/5 border border-destructive/15 p-4 flex items-start gap-3 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/80">
                {"Город не найден в списке быстрого расчёта. Свяжитесь с нами \u2014 рассчитаем индивидуально по телефону или через форму заявки."}
              </p>
            </div>
          )}
        </div>

        {/* Thermal box + Gift + Delay policy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <ThermometerSnowflake className="w-5 h-5 text-primary" />
              <h4 className="text-sm font-semibold text-foreground">
                {"Термоупаковка"}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"Пенополистирольный контейнер + хладоэлементы (сухой лёд или гелевые аккумуляторы). Внутренняя температура 0\u2026+6 \u00B0C до 48 часов. Для дальних регионов \u2014 усиленная изоляция."}
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <Gift className="w-5 h-5 text-accent" />
              <h4 className="text-sm font-semibold text-foreground">
                {"Подарочная упаковка"}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"Оформляем подарочные наборы: фирменная коробка, лента, вложение-открытка. Стоимость \u2014 от 500 \u20BD. Срок подготовки \u2014 1 день. Уточняйте при оформлении заявки."}
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <AlertCircle className="w-5 h-5 text-muted-foreground" />
              <h4 className="text-sm font-semibold text-foreground">
                {"Задержка доставки"}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"Если доставка задерживается по нашей вине \u2014 мы компенсируем: скидка на следующий заказ или полный возврат стоимости доставки. Уведомляем о статусе по SMS."}
            </p>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
