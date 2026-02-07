"use client";

import { Clock, Mail, PhoneCall } from "lucide-react";

import { SITE } from "@/config/site";

export default function FooterSection() {
  return (
    <footer className="px-4 py-12 md:py-16 border-t border-border/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <span className="font-display text-xl text-foreground mb-3 block">{SITE.brand}</span>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {"Премиальные морепродукты с доставкой по Москве и всей России. Отгрузка со склада в Москве."}
            </p>
            <p className="text-xs text-muted-foreground">{"Самовывоза нет. Только курьерская доставка."}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">{"Навигация"}</h4>
            <ul className="space-y-2">
              {[
                { label: "Каталог", href: "#categories" },
                { label: "Лучшее", href: "#products" },
                { label: "Холодовая цепь", href: "#cold-chain" },
                { label: "Доставка", href: "#delivery" },
                { label: "Документы", href: "#documents" },
                { label: "Отзывы", href: "#reviews" },
                { label: "FAQ", href: "#faq" },
                { label: "Заявка", href: "#order" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">{"Контакты"}</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneCall className="w-4 h-4 text-primary shrink-0" />
                <a href={`tel:${SITE.phoneHref}`} className="hover:text-primary transition-colors">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-primary transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{SITE.workHours}</span>
              </li>
            </ul>
            <div className="mt-4 space-y-1.5">
              <a
                href={SITE.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {`Telegram: ${SITE.telegramHandle}`}
              </a>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {`WhatsApp: ${SITE.whatsappDisplay}`}
              </a>
              <a
                href={SITE.vkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {`VK: ${SITE.vkDisplay}`}
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">{"Информация"}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {"Политика конфиденциальности"}
                </a>
              </li>
              <li>
                <a href="#offer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {"Публичная оферта"}
                </a>
              </li>
              <li>
                <a href="#returns" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {"Условия возврата"}
                </a>
              </li>
              <li>
                <a href="#requisites" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {"Реквизиты"}
                </a>
              </li>
            </ul>
            <div className="mt-4 pt-3 border-t border-border/20">
              <p className="text-xs text-muted-foreground leading-relaxed">{SITE.requisitesShort}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">{SITE.copyright}</p>
          <p className="text-xs text-muted-foreground">
            {"Все фотографии продуктов являются примерами подачи. Внешний вид продукции может отличаться."}
          </p>
        </div>
      </div>
    </footer>
  );
}
