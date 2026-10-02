import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { PACKING_STORAGE_KEY } from "@/lib/packing-store";

import { TripPacking } from "./trip-packing";

vi.mock("./use-live-weather", () => ({
  useLiveWeather: () => ({ weather: null, loading: false, error: null }),
}));

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

async function update(action: () => void) {
  await act(() => {
    action();
    return Promise.resolve();
  });
}

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  window.localStorage.clear();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await update(() => {
    root.unmount();
  });
  container.remove();
  vi.unstubAllGlobals();
});

function checkbox(label: string): HTMLInputElement {
  const input = container.querySelector<HTMLInputElement>(`label[aria-label="${label}"] input`);
  if (input === null) {
    throw new Error(`Missing checkbox: ${label}`);
  }
  return input;
}

test("a failed save does not undo checkbox changes or the packed count", async () => {
  window.localStorage.setItem(PACKING_STORAGE_KEY, '["tops"]');
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new DOMException("Storage full", "QuotaExceededError");
  });
  await update(() => {
    root.render(<TripPacking />);
  });

  expect(checkbox("5 lightweight tops").checked).toBe(true);
  await update(() => {
    checkbox("2 lightweight pants").click();
  });
  expect(checkbox("2 lightweight pants").checked).toBe(true);
  expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("2 of 18 packed");

  await update(() => {
    checkbox("5 lightweight tops").click();
  });
  expect(checkbox("5 lightweight tops").checked).toBe(false);
  expect(checkbox("2 lightweight pants").checked).toBe(true);
  expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("1 of 18 packed");

  await update(() => {
    window.localStorage.removeItem(PACKING_STORAGE_KEY);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: PACKING_STORAGE_KEY,
        newValue: null,
        storageArea: window.localStorage,
      }),
    );
  });
  expect(checkbox("2 lightweight pants").checked).toBe(false);
  expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("0 of 18 packed");
});
