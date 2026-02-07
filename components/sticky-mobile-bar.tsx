"use client";

import { PhoneCall, ShoppingBag, ChevronUp } from "lucide-react";

import { SITE } from "@/config/site";
import { useRequest } from "@/components/request-context";
import RippleButton from "@/components/ripple-button";

export default function StickyMobileBar() {
  const { totalItems, openPanel } = useRequest();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden">
      <div className="bg-background/80 backdrop-blur-md border-t border-border/20 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <a
            href={`tel:${SITE.phoneHref}`}
            className="flex items-center gap-2 text-sm font-medium text-primary"
          >
            <PhoneCall className="w-4 h-4" />
            {"Позвонить"}
          </a>

          <RippleButton
            type="button"
            onClick={openPanel}
            className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:brightness-110 transition-all"
            aria-label={`Открыть заявку. Позиции: ${totalItems}`}
          >
            <ShoppingBag className="w-4 h-4" />
            {"Заявка"}
            <span className="ml-1 inline-flex items-center justify-center min-w-[26px] h-6 px-2 rounded-full bg-primary-foreground/15 text-primary-foreground text-xs font-semibold">
              {totalItems}
            </span>
            <ChevronUp className="w-4 h-4 opacity-80" />
          </RippleButton>
        </div>
      </div>
    </div>
  );
}
