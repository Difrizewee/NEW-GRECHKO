"use client";

import { ShoppingCart, ClipboardList, PhoneCall } from "lucide-react";

export default function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden">
      <div className="glass-panel border-t border-border/30 px-4 py-2.5">
        <nav className="flex items-center justify-around max-w-md mx-auto" aria-label="Мобильная навигация">
          <a
            href="#categories"
            className="flex flex-col items-center gap-1 py-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-[10px] font-medium">{"Каталог"}</span>
          </a>
          <a
            href="#order"
            className="flex flex-col items-center gap-1 py-1 px-6 -mt-4 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-[10px] font-medium">{"Заявка"}</span>
          </a>
          <a
            href="tel:+74951234567"
            className="flex flex-col items-center gap-1 py-1 text-muted-foreground hover:text-accent transition-colors"
          >
            <PhoneCall className="w-5 h-5" />
            <span className="text-[10px] font-medium">{"Звонок"}</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
