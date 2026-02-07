"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

type RippleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  rippleClassName?: string;
};

export default function RippleButton({
  children,
  className,
  onClick,
  rippleClassName,
  ...props
}: RippleButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);

  function spawnRipple(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = cn("ripple", rippleClassName);
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    el.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 750);
  }

  return (
    <button
      ref={ref}
      {...props}
      onClick={(e) => {
        spawnRipple(e);
        onClick?.(e);
      }}
      className={cn("relative overflow-hidden", className)}
    >
      {children}
    </button>
  );
}
