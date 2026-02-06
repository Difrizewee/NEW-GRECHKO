"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { RequestItem } from "./request-panel";

interface RequestContextValue {
  items: RequestItem[];
  addItem: (item: Omit<RequestItem, "qty">) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  /** Returns true if the item was just added (for animation feedback) */
  recentlyAdded: string | null;
}

const RequestContext = createContext<RequestContextValue | null>(null);

export function RequestProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);

  const addItem = useCallback((item: Omit<RequestItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setRecentlyAdded(item.id);
    setTimeout(() => setRecentlyAdded(null), 1200);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <RequestContext.Provider
      value={{ items, addItem, updateQty, removeItem, clearItems, recentlyAdded }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequest() {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequest must be used within RequestProvider");
  return ctx;
}
