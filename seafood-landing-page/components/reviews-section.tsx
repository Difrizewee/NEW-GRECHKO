"use client";

import { Star } from "lucide-react";
import SectionReveal from "./section-reveal";

interface Review {
  name: string;
  city: string;
  date: string;
  ordered: string;
  source: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Елена М.",
    city: "Москва",
    date: "28.01.2026",
    ordered: "Филе форели, Икра красная",
    source: "Сайт",
    text: "Заказывала форель на праздничный стол \u2014 филе было идеально нарезано, вакуумная упаковка без повреждений. Икра \u2014 зерно к зерну, без жидкости, ярко-оранжевая. Курьер приехал вовремя, продукты были холодные. Все гости спрашивали, где покупала.",
    rating: 5,
  },
  {
    name: "Андрей К.",
    city: "Санкт-Петербург",
    date: "15.01.2026",
    ordered: "Икра чёрная осетровая 50 г",
    source: "WhatsApp",
    text: "Икра чёрная \u2014 безупречная. Зёрна крупные, матовые, вкус насыщенный без горечи. Банка стеклянная, плотно закрыта. Доставили из Москвы за сутки, температура при вскрытии контейнера была около +3\u00B0. Теперь заказываю ежемесячно.",
    rating: 5,
  },
  {
    name: "Мария В.",
    city: "Казань",
    date: "05.01.2026",
    ordered: "Креветки королевские, Стейк осетра",
    source: "Сайт",
    text: "Была скептична по поводу доставки морепродуктов в Казань. Получила через 2 дня \u2014 термоконтейнер с хладоэлементами, внутри всё ледяное. Креветки крупные, как заявлено. Осетрина \u2014 стейк ровный, без запаха. Рекомендую.",
    rating: 5,
  },
  {
    name: "Дмитрий С.",
    city: "Москва",
    date: "20.12.2025",
    ordered: "Креветки королевские \u00D72",
    source: "Сайт",
    text: "Креветки королевские \u2014 реально крупные, калибр соответствует описанию. Глазурь минимальная, вес нетто честный. Готовил на гриле \u2014 сочные, мясистые. Доставили за 3 часа после заказа.",
    rating: 5,
  },
  {
    name: "Ольга П.",
    city: "Новосибирск",
    date: "12.12.2025",
    ordered: "Стейк осетра, Форель копчёная",
    source: "Telegram",
    text: "Осетрина великолепная \u2014 стейки ровные, свежие, без костей. Копчёная форель \u2014 золотистая, ароматная, не пересолена. Единственное \u2014 доставка заняла 4 дня вместо заявленных 3, но менеджер предупредил заранее.",
    rating: 4,
  },
  {
    name: "Игорь Л.",
    city: "Екатеринбург",
    date: "03.12.2025",
    ordered: "Форель копчёная, Икра красная",
    source: "WhatsApp",
    text: "Первый заказ \u2014 и сразу впечатлён. Форель копчёная тает во рту, цвет натуральный, без красителей. Икра \u2014 свежая, зёрна упругие. Упаковка продумана до мелочей. Буду постоянным клиентом.",
    rating: 5,
  },
  {
    name: "Наталья Р.",
    city: "Москва",
    date: "25.11.2025",
    ordered: "Подарочный набор (икра + осетрина)",
    source: "Телефон",
    text: "Позвонила, чтобы собрать подарок для партнёров. Менеджер Алексей помог подобрать набор: чёрная икра + стейки осетра + подарочная упаковка. Получилось стильно и вкусно. Партнёры были в восторге. Отдельное спасибо за оперативность.",
    rating: 5,
  },
  {
    name: "Алексей Г.",
    city: "Ростов-на-Дону",
    date: "18.11.2025",
    ordered: "Икра красная 250 г \u00D72",
    source: "Маркетплейс",
    text: "Красная икра \u2014 вкус, какой помню из детства. Зёрна целые, блестящие, без лишней соли. Две банки заказал \u2014 одна для себя, вторая маме. Обе в идеальном состоянии. Теперь только здесь буду брать.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Оценка: ${count} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < count
              ? "text-accent fill-accent"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <SectionReveal id="reviews" className="px-4 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <span className="block text-center text-xs font-medium tracking-widest uppercase text-primary mb-4">
          {"Обратная связь"}
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center text-balance mb-4">
          {"Отзывы клиентов"}
        </h2>
        <p className="text-muted-foreground text-center text-lg max-w-xl mx-auto mb-12 md:mb-16">
          {"Реальные отзывы покупателей со всей России \u2014 с датами, городами и тем, что заказывали"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review) => (
            <div
              key={`${review.name}-${review.date}`}
              className="glass-panel rounded-xl p-5 flex flex-col gap-3"
            >
              <Stars count={review.rating} />
              <p className="text-sm text-foreground/85 leading-relaxed flex-1">
                {`\u00AB${review.text}\u00BB`}
              </p>
              <div className="pt-3 border-t border-border/20 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {review.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {review.date}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{review.city}</span>
                  <span className="text-primary/60">{review.source}</span>
                </div>
                <p className="text-[10px] text-muted-foreground/70 truncate">
                  {"Заказ: "}{review.ordered}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
