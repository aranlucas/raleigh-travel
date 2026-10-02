import { PACKING_GROUPS } from "./packing";

export const PACKING_STORAGE_KEY = "raleigh-packing-lucas-2026-10-02-v1";

const itemIds = new Set(PACKING_GROUPS.flatMap((group) => group.items.map((item) => item.id)));
const emptySnapshot: ReadonlySet<string> = new Set();

function readPackedItems(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === "string" && itemIds.has(id)))]
      : [];
  } catch {
    return [];
  }
}

/** A failed save stays authoritative until a successful save or a newer cross-tab update. */
export function createPackingStore() {
  let packed = emptySnapshot;
  let serialized = "[]";
  let memoryOnly = false;
  let persisted: string | null | undefined;
  const listeners = new Set<() => void>();

  function accept(items: readonly string[]) {
    const next = JSON.stringify(items);
    if (next !== serialized) {
      serialized = next;
      packed = new Set(items);
    }
  }

  function getSnapshot(): ReadonlySet<string> {
    try {
      const raw = window.localStorage.getItem(PACKING_STORAGE_KEY);
      // Detect changes made while there were no subscribers, without replaying an old saved value.
      const changedElsewhere = persisted !== undefined && raw !== persisted;
      persisted = raw;
      if (!memoryOnly || changedElsewhere) {
        memoryOnly = false;
        accept(readPackedItems(raw));
      }
    } catch {
      // A failed read keeps the latest accepted snapshot, including a successful prior save.
    }
    return packed;
  }

  function notify() {
    for (const listener of listeners) {
      listener();
    }
  }

  function onStorage(
    event: Readonly<{ key: string | null; newValue: string | null; storageArea: unknown }>,
  ) {
    if (event.key !== null && event.key !== PACKING_STORAGE_KEY) {
      return;
    }
    try {
      if (event.storageArea !== window.localStorage) {
        return;
      }
    } catch {
      return;
    }
    // Cross-tab changes are newer intent. Removal and clear explicitly reset memory too.
    memoryOnly = false;
    persisted = event.newValue;
    accept(readPackedItems(event.newValue));
    notify();
  }

  function subscribe(listener: () => void) {
    if (listeners.size === 0) {
      window.addEventListener("storage", onStorage);
    }
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        window.removeEventListener("storage", onStorage);
      }
    };
  }

  function toggle(id: string) {
    if (!itemIds.has(id)) {
      return;
    }
    const items = new Set(getSnapshot());
    if (items.has(id)) {
      items.delete(id);
    } else {
      items.add(id);
    }
    accept([...items]);
    try {
      window.localStorage.setItem(PACKING_STORAGE_KEY, serialized);
      persisted = serialized;
      memoryOnly = false;
    } catch {
      memoryOnly = true;
    }
    notify();
  }

  return { subscribe, getSnapshot, getServerSnapshot: () => emptySnapshot, toggle };
}

// Construction and the server snapshot never access browser storage.
export const packingStore = createPackingStore();
