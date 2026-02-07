"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

export type RequestItem = {
  id: string;
  name: string;
  unit: string; // e.g. "500 г \u00B1 30 г"
  price: number;
  qty: number;
};

interface RequestContextValue {
  items: RequestItem[];

  addItem: (item: Omit<RequestItem, "qty">, opts?: { openPanel?: boolean }) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;

  /** For UI feedback */
  recentlyAdded: { id: string; name: string } | null;

  /** Panel control */
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;

  /** Derived */
  totalItems: number;
  totalPrice: number;
}

const RequestContext = createContext<RequestContextValue | null>(null);

export function RequestProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<RequestContextValue["recentlyAdded"]>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.price, 0),
    [items]
  );

  const openPanel = useCallback(() => setIsPanelOpen(true), []);
  const closePanel = useCallback(() => setIsPanelOpen(false), []);
  const togglePanel = useCallback(() => setIsPanelOpen((v) => !v), []);

  const addItem = useCallback(
    (item: Omit<RequestItem, "qty">, opts?: { openPanel?: boolean }) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [...prev, { ...item, qty: 1 }];
      });

      setRecentlyAdded({ id: item.id, name: item.name });
      window.setTimeout(() => setRecentlyAdded(null), 1200);

      // Premium feedback: toast + optional open panel
      toast.success("Добавлено в заявку", {
        description: item.name,
        duration: 1400,
      });

      if (opts?.openPanel) setIsPanelOpen(true);
    },
    []
  );

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
      value={{
        items,
        addItem,
        updateQty,
        removeItem,
        clearItems,
        recentlyAdded,
        isPanelOpen,
        openPanel,
        closePanel,
        togglePanel,
        totalItems,
        totalPrice,
      }}
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
