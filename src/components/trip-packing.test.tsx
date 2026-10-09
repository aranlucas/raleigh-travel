import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { PACKING_STORAGE_KEY } from "@/lib/packing-store";

import { TripPacking } from "./trip-packing";

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("No network in packing test")));
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

function checkbox(label: string): HTMLInputElement {
  return screen.getByRole<HTMLInputElement>("checkbox", { name: label });
}

test("a failed save does not undo checkbox changes or the packed count", () => {
  window.localStorage.setItem(PACKING_STORAGE_KEY, '["tops"]');
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new DOMException("Storage full", "QuotaExceededError");
  });
  const { container } = render(<TripPacking />);

  expect(checkbox("5 lightweight tops").checked).toBe(true);
  fireEvent.click(checkbox("2 lightweight pants"));
  expect(checkbox("2 lightweight pants").checked).toBe(true);
  expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("2 of 18 packed");

  fireEvent.click(checkbox("5 lightweight tops"));
  expect(checkbox("5 lightweight tops").checked).toBe(false);
  expect(checkbox("2 lightweight pants").checked).toBe(true);
  expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("1 of 18 packed");

  act(() => {
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
