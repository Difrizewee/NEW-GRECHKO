"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";

import { useRequest } from "./request-context";

export default function RequestPanel() {
  const {
    items,
    updateQty,
    removeItem,
    clearItems,
    totalItems,
    totalPrice,
    isPanelOpen,
    openPanel,
    closePanel,
  } = useRequest();

  const [animateIn, setAnimateIn] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (!isPanelOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isPanelOpen]);

  useEffect(() => {
    if (isPanelOpen) {
      setAnimateIn(true);
      const t = window.setTimeout(() => setAnimateIn(false), 900);
      return () => window.clearTimeout(t);
    }
  }, [isPanelOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isPanelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPanelOpen, closePanel]);

  // Focus first focusable when open
  useEffect(() => {
    if (!isPanelOpen) return;
    const t = window.setTimeout(() => {
      const el = panelRef.current?.querySelector<HTMLElement>(
        "button, a, input, textarea, select"
      );
      el?.focus();
    }, 30);
    return () => window.clearTimeout(t);
  }, [isPanelOpen]);

  const requestSummary = useMemo(
    () => items.map((i) => `${i.name} \u00D7${i.qty}`).join(", "),
    [items]
  );

  return (
    <>
      {/* Floating quick-access (mobile / after scroll) */}
      <button
        onClick={openPanel}
        className="fixed bottom-6 right-6 z-40 sm:hidden inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
        aria-label={`Открыть заявку. Позиции: ${totalItems}`}
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="text-sm font-medium">{totalItems}</span>
      </button>

      {isPanelOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={closePanel}
            aria-hidden
          />

          <div
            ref={panelRef}
            className="ml-auto h-full w-full max-w-md bg-background/95 border-l border-border/30 shadow-2xl flex flex-col relative overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Ваша заявка"
          >
            {/* Wave wipe */}
            {animateIn && (
              <div
                className="pointer-events-none absolute inset-0 wave-wipe"
                aria-hidden
              />
            )}

            {/* Header */}
            <div className="p-5 border-b border-border/40 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {"Ваша заявка"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {items.length === 0
                    ? "Добавьте позиции из каталога"
                    : `Позиции: ${totalItems} • Предпросмотр: ${requestSummary}`}
                </p>
              </div>
              <button
                onClick={closePanel}
                className="p-2 rounded-md hover:bg-secondary/60 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-auto p-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-base font-medium text-foreground">
                    {"Заявка пока пустая"}
                  </p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {
                      "Добавьте позиции — затем отправьте заявку, и менеджер подтвердит наличие и рассчитает доставку."
                    }
                  </p>
                  <a
                    href="#products"
                    onClick={closePanel}
                    className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:brightness-110 transition-all"
                  >
                    {"Перейти к каталогу"}
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border/40 bg-card/60 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.unit}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 rounded-md hover:bg-secondary/60 transition-colors"
                          aria-label="Удалить"
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-lg border border-border/40 bg-background/50">
                          <button
                            className="p-2 hover:bg-secondary/60 transition-colors rounded-l-lg"
                            onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                            aria-label="Уменьшить"
                          >
                            <Minus className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <span className="px-3 text-sm text-foreground">
                            {item.qty}
                          </span>
                          <button
                            className="p-2 hover:bg-secondary/60 transition-colors rounded-r-lg"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            aria-label="Увеличить"
                          >
                            <Plus className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          {new Intl.NumberFormat("ru-RU").format(item.qty * item.price)}{" "}
                          {"₽"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-border/40">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  {"Итого (предварительно)"}
                </span>
                <span className="text-lg font-semibold text-foreground">
                  {new Intl.NumberFormat("ru-RU").format(totalPrice)}{" "}
                  {"₽"}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={clearItems}
                  disabled={items.length === 0}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border/40 bg-secondary/40 text-secondary-foreground px-4 py-3 text-sm font-medium hover:bg-secondary/70 transition-colors disabled:opacity-50 disabled:hover:bg-secondary/40"
                >
                  <Trash2 className="w-4 h-4" />
                  {"Очистить"}
                </button>
                <a
                  href="#order"
                  onClick={closePanel}
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-3 text-sm font-medium transition-all hover:brightness-110 ${
                    items.length === 0 ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  {"Отправить"}
                </a>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {
                  "Это заявка, а не автоматический заказ. Итоговая сумма может измениться после подтверждения наличия и выбора партии."
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
