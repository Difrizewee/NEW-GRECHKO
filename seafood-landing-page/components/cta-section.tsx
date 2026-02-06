"use client";

import React from "react"

import { useState } from "react";
import { PhoneCall, Send, ClipboardList } from "lucide-react";
import SectionReveal from "./section-reveal";
import { useRequest } from "./request-context";

export default function CtaSection() {
  const [submitted, setSubmitted] = useState(false);
  const { items, clearItems } = useRequest();

  const requestSummary = items
    .map((i) => `${i.name} \u00D7${i.qty}`)
    .join(", ");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    clearItems();
  }

  return (
    <SectionReveal id="order" className="px-4 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <span className="block text-center text-xs font-medium tracking-widest uppercase text-primary mb-4">
          {"Оформление"}
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center text-balance mb-4">
          {"Отправить заявку"}
        </h2>
        <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-12 md:mb-16">
          {"Заполните форму \u2014 менеджер свяжется для подтверждения наличия, согласования доставки и оплаты. Это не автоматический заказ, а персональная консьерж-заявка."}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 glass-panel rounded-2xl p-6 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-4">
                  <Send className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {"Заявка отправлена!"}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {"Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа и согласования деталей доставки."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Request summary if items exist */}
                {items.length > 0 && (
                  <div className="rounded-lg bg-primary/5 border border-primary/15 p-4 flex items-start gap-3">
                    <ClipboardList className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">
                        {"Ваша заявка:"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {requestSummary}
                      </p>
                      <input type="hidden" name="request_items" value={requestSummary} />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm text-foreground/80">
                      {"Имя *"}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Ваше имя"
                      className="rounded-lg bg-secondary/50 border border-border text-foreground px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm text-foreground/80">
                      {"Телефон *"}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="+7 (___) ___-__-__"
                      className="rounded-lg bg-secondary/50 border border-border text-foreground px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="city" className="text-sm text-foreground/80">
                    {"Город *"}
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    placeholder="Город доставки"
                    className="rounded-lg bg-secondary/50 border border-border text-foreground px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="comment" className="text-sm text-foreground/80">
                    {"Комментарий к заявке"}
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={3}
                    placeholder="Что хотите заказать, пожелания по доставке, нужна ли подарочная упаковка..."
                    className="rounded-lg bg-secondary/50 border border-border text-foreground px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors resize-none"
                  />
                </div>
                <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 accent-primary" />
                  <span>
                    {"Я согласен(а) на обработку персональных данных в соответствии с "}
                    <a href="#privacy" className="text-primary hover:underline">
                      {"политикой конфиденциальности"}
                    </a>
                  </span>
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-8 py-3.5 text-base font-medium transition-all hover:brightness-110 hover:scale-[1.01] active:scale-[0.99] self-start"
                >
                  <Send className="w-4 h-4" />
                  {"Отправить заявку"}
                </button>
                <p className="text-xs text-muted-foreground">
                  {"Это заявка, а не автоматическая покупка. Менеджер подтвердит наличие, рассчитает доставку и свяжется с вами для согласования."}
                </p>
              </form>
            )}
          </div>

          {/* Phone block */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col items-center text-center flex-1 justify-center">
              <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-5">
                <PhoneCall className="w-7 h-7 text-accent" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {"Предпочитаете по телефону?"}
              </p>
              <a
                href="tel:+74951234567"
                className="text-2xl md:text-3xl font-display font-semibold text-foreground hover:text-primary transition-colors"
              >
                +7 (495) 123-45-67
              </a>
              <p className="text-xs text-muted-foreground mt-3">
                {"Ежедневно 9:00\u201321:00 (МСК)"}
              </p>
            </div>
            <div className="glass-panel rounded-2xl p-5 text-center">
              <p className="text-sm text-foreground/80 leading-relaxed">
                {"Менеджер поможет подобрать набор под бюджет и повод, рассчитает доставку и оформит заявку за вас."}
              </p>
            </div>
            <div className="glass-panel rounded-2xl p-5">
              <h4 className="text-sm font-semibold text-foreground mb-2">
                {"Также пишите нам:"}
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                  {"Telegram: @oceandelux"}
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                  {"WhatsApp: +7 (495) 123-45-67"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
