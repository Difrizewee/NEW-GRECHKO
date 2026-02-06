"use client";

import RequestPanel from "./request-panel";
import { useRequest } from "./request-context";

export default function RequestPanelWrapper() {
  const { items, updateQty, removeItem, clearItems } = useRequest();

  return (
    <RequestPanel
      items={items}
      onUpdateQty={updateQty}
      onRemove={removeItem}
      onClear={clearItems}
    />
  );
}
