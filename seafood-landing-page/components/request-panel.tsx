"use client";

import { X, Send, Minus, Plus, ClipboardList, Trash2 } from "lucide-react";
import { useState } from "react";

export interface RequestItem {
  id: string;
  name: string;
  weight: string;
  price: number;
  qty: number;
}

interface RequestPanelProps {
  items: RequestItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function RequestPanel({
  items,
  onUpdateQty,
  onRemove,
  onClear,
}: RequestPanelProps) {
  const [open, setOpen] = useState(false);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (items.length === 0) return null;

  return (
    <>
      {/* Floating badge trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 z-40 flex items-center gap-2.5 rounded-xl bg-primary text-primary-foreground pl-4 pr-5 py-3 shadow-lg shadow-primary/20 transition-all hover:scale-[1.03] active:scale-[0.97]"
        aria-label={`Ваш заказ: ${totalItems} позиций`}
      >
        <ClipboardList className="w-5 h-5" />
        <span className="text-sm font-medium">
          {"Ваш заказ"}
        </span>
        <span className="ml-1 min-w-[22px] h-[22px] rounded-full bg-primary-foreground text-primary text-xs font-bold flex items-center justify-center">
          {totalItems}
        </span>
      </button>

      {/* Slide-over panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Закрыть панель заказа"
          />

          {/* Panel */}
          <div className="relative w-full max-w-md glass-panel border-l border-border/30 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-primary" />
                {"Ваша заявка"}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-secondary/30 p-4 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.weight}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      aria-label={`Удалить ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}
                        className="w-7 h-7 rounded-lg bg-secondary/50 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                        aria-label="Уменьшить"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium text-foreground w-6 text-center">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 rounded-lg bg-secondary/50 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                        aria-label="Увеличить"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {(item.price * item.qty).toLocaleString("ru-RU")}
                      {" \u20BD"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border/20 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {"Предварительная сумма:"}
                </span>
                <span className="text-lg font-semibold text-foreground">
                  {totalPrice.toLocaleString("ru-RU")}
                  {" \u20BD"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {"Итоговая сумма может быть скорректирована при весовом расхождении. Менеджер свяжется для подтверждения заказа и согласования доставки."}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClear}
                  className="rounded-lg border border-border bg-transparent text-muted-foreground px-4 py-2.5 text-sm transition-all hover:text-foreground hover:border-foreground/30"
                >
                  {"Очистить"}
                </button>
                <a
                  href="#order"
                  onClick={() => setOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium transition-all hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  {"Отправить заявку"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
