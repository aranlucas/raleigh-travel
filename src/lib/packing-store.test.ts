import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { createPackingStore, PACKING_STORAGE_KEY } from "./packing-store";

const cleanups: (() => void)[] = [];

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
});

afterEach(() => {
  for (const cleanup of cleanups.splice(0)) {
    cleanup();
  }
  vi.unstubAllGlobals();
});

function externalChange(key: string | null, value: string | null, storage = window.localStorage) {
  if (key === null) {
    storage.clear();
  } else if (value === null) {
    storage.removeItem(key);
  } else {
    storage.setItem(key, value);
  }
  window.dispatchEvent(new StorageEvent("storage", { key, newValue: value, storageArea: storage }));
}

test("failed writes keep the newest state despite an older readable saved value", () => {
  window.localStorage.setItem(PACKING_STORAGE_KEY, '["tops"]');
  const store = createPackingStore();
  const save = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new DOMException("Storage full", "QuotaExceededError");
  });

  store.toggle("pants");
  expect([...store.getSnapshot()]).toEqual(["tops", "pants"]);
  store.toggle("tops");
  expect([...store.getSnapshot()]).toEqual(["pants"]);
  expect(window.localStorage.getItem(PACKING_STORAGE_KEY)).toBe('["tops"]');

  save.mockRestore();
  store.toggle("socks");
  expect([...store.getSnapshot()]).toEqual(["pants", "socks"]);
  expect(window.localStorage.getItem(PACKING_STORAGE_KEY)).toBe('["pants","socks"]');
});

test("an inaccessible localStorage getter leaves the checklist usable in memory", () => {
  vi.spyOn(window, "localStorage", "get").mockImplementation(() => {
    throw new DOMException("Blocked", "SecurityError");
  });
  const store = createPackingStore();
  store.toggle("tops");
  store.toggle("pants");
  store.toggle("tops");
  expect([...store.getSnapshot()]).toEqual(["pants"]);
});

test("failed reads preserve the last accepted snapshot", () => {
  const store = createPackingStore();
  store.toggle("tops");
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new DOMException("Blocked", "SecurityError");
  });
  expect([...store.getSnapshot()]).toEqual(["tops"]);
  store.toggle("pants");
  expect([...store.getSnapshot()]).toEqual(["tops", "pants"]);
});

test.each(["broken json", "null", '{"tops":true}', "42"])(
  "normalizes malformed or non-array storage: %s",
  (raw) => {
    window.localStorage.setItem(PACKING_STORAGE_KEY, raw);
    const store = createPackingStore();
    expect([...store.getSnapshot()]).toEqual([]);
    store.toggle("pants");
    expect([...store.getSnapshot()]).toEqual(["pants"]);
  },
);

test("normalizes duplicates, unknown IDs, and invalid values with a stable snapshot", () => {
  window.localStorage.setItem(PACKING_STORAGE_KEY, '["tops","tops","unknown",null,1,"pants"]');
  const store = createPackingStore();
  const snapshot = store.getSnapshot();
  expect([...snapshot]).toEqual(["tops", "pants"]);
  expect(store.getSnapshot()).toBe(snapshot);
  store.toggle("unknown");
  expect(store.getSnapshot()).toBe(snapshot);
});

test("same-tab subscribers see accepted changes and stop receiving updates after unsubscribe", () => {
  const store = createPackingStore();
  const first = vi.fn<() => void>();
  const second = vi.fn<() => void>();
  const unsubscribeFirst = store.subscribe(first);
  const unsubscribeSecond = store.subscribe(second);
  cleanups.push(unsubscribeFirst, unsubscribeSecond);

  store.toggle("tops");
  expect(first).toHaveBeenCalledTimes(1);
  expect(second).toHaveBeenCalledTimes(1);
  unsubscribeFirst();
  store.toggle("pants");
  expect(first).toHaveBeenCalledTimes(1);
  expect(second).toHaveBeenCalledTimes(2);
  expect([...store.getSnapshot()]).toEqual(["tops", "pants"]);
});

test("cross-tab updates replace the snapshot, ignoring unrelated keys and session storage", () => {
  const store = createPackingStore();
  const onChange = vi.fn<() => void>();
  cleanups.push(store.subscribe(onChange));
  externalChange("other-key", '["tops"]');
  externalChange(PACKING_STORAGE_KEY, '["tops"]', window.sessionStorage);
  expect(onChange).not.toHaveBeenCalled();
  expect([...store.getSnapshot()]).toEqual([]);

  externalChange(PACKING_STORAGE_KEY, '["pants"]');
  expect(onChange).toHaveBeenCalledTimes(1);
  expect([...store.getSnapshot()]).toEqual(["pants"]);
});

test.each([PACKING_STORAGE_KEY, null])(
  "cross-tab removal or clear resets even an unsaved fallback (%s)",
  (key) => {
    const store = createPackingStore();
    cleanups.push(store.subscribe(() => {}));
    store.toggle("tops");
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage full", "QuotaExceededError");
    });
    store.toggle("pants");
    expect([...store.getSnapshot()]).toEqual(["tops", "pants"]);

    externalChange(key, null);
    expect([...store.getSnapshot()]).toEqual([]);
    store.toggle("socks");
    expect([...store.getSnapshot()]).toEqual(["socks"]);
  },
);

test("removing storage while unsubscribed does not resurrect the old saved state", () => {
  const store = createPackingStore();
  store.toggle("tops");
  window.localStorage.removeItem(PACKING_STORAGE_KEY);
  expect([...store.getSnapshot()]).toEqual([]);
});

test("changes made while unsubscribed also replace an unsaved fallback", () => {
  const store = createPackingStore();
  store.toggle("tops");
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new DOMException("Storage full", "QuotaExceededError");
  });
  store.toggle("pants");
  window.localStorage.removeItem(PACKING_STORAGE_KEY);
  expect([...store.getSnapshot()]).toEqual([]);
});

test("the first readable saved value does not discard changes made while storage was blocked", () => {
  const storage = window.localStorage;
  const access = vi.spyOn(window, "localStorage", "get").mockImplementation(() => {
    throw new DOMException("Blocked", "SecurityError");
  });
  const store = createPackingStore();
  store.toggle("tops");
  access.mockRestore();
  expect([...store.getSnapshot()]).toEqual(["tops"]);
  store.toggle("pants");
  expect(storage.getItem(PACKING_STORAGE_KEY)).toBe('["tops","pants"]');
});

test("the server snapshot is stable and needs no browser", () => {
  vi.stubGlobal("window", null);
  const store = createPackingStore();
  const snapshot = store.getServerSnapshot();
  expect([...snapshot]).toEqual([]);
  expect(store.getServerSnapshot()).toBe(snapshot);
});
