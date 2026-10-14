import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { resolveWeather } from "@/lib/weather-service";

const now = new Date("2026-10-02T12:00:00Z");

const validDaily = {
  daily: {
    time: ["2026-10-02"],
    temperature_2m_max: [23],
    temperature_2m_min: [12],
  },
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

test.each(["2026-09-01T12:00:00Z", "2026-10-07T12:00:00Z"])(
  "does not request forecasts outside the live forecast window: %s",
  async (date) => {
    const fetcher = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetcher);

    const days = await resolveWeather(new Date(date));

    expect(days).toHaveLength(5);
    expect(fetcher).not.toHaveBeenCalled();
  },
);

test("a valid first response returns forecasts without scheduling a retry", async () => {
  const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json(validDaily));
  vi.stubGlobal("fetch", fetcher);

  const days = await resolveWeather(now);

  expect(days[0]?.status).toBe("forecast");
  expect(days[0]?.forecast?.maxC).toBe(23);
  expect(days[1]?.status).toBe("unavailable");
  expect(fetcher).toHaveBeenCalledTimes(1);
  expect(vi.getTimerCount()).toBe(0);
});

test("a failed request waits 250 ms and retries sequentially once", async () => {
  const firstRequest = Promise.withResolvers<Response>();

  const fetcher = vi
    .fn<typeof fetch>()
    .mockReturnValueOnce(firstRequest.promise)
    .mockResolvedValueOnce(Response.json(validDaily));

  vi.stubGlobal("fetch", fetcher);

  const result = resolveWeather(now);
  await vi.advanceTimersByTimeAsync(1000);
  expect(fetcher).toHaveBeenCalledTimes(1);

  firstRequest.reject(new Error("Offline"));
  await vi.advanceTimersByTimeAsync(249);
  expect(fetcher).toHaveBeenCalledTimes(1);
  await vi.advanceTimersByTimeAsync(1);

  expect((await result)[0]?.forecast?.maxC).toBe(23);
  expect(fetcher).toHaveBeenCalledTimes(2);
  expect(vi.getTimerCount()).toBe(0);
});

test.each([
  Response.json({ error: "Unavailable" }, { status: 503 }),
  Response.json({ wrong: "shape" }),
  Response.json({ daily: { time: [] } }),
])("HTTP, invalid-payload, and empty-forecast errors each allow one retry", async (response) => {
  const fetcher = vi
    .fn<typeof fetch>()
    .mockResolvedValueOnce(response)
    .mockResolvedValueOnce(Response.json(validDaily));

  vi.stubGlobal("fetch", fetcher);

  const result = resolveWeather(now);
  await vi.advanceTimersByTimeAsync(250);

  expect((await result)[0]?.status).toBe("forecast");
  expect(fetcher).toHaveBeenCalledTimes(2);
});

test("two failed requests reject without a third attempt", async () => {
  const failure = new Error("Offline");
  const fetcher = vi.fn<typeof fetch>().mockRejectedValue(failure);
  vi.stubGlobal("fetch", fetcher);

  await expect(
    Promise.all([resolveWeather(now), vi.advanceTimersByTimeAsync(250)]),
  ).rejects.toThrow("Forecast unavailable");
  await vi.advanceTimersByTimeAsync(1000);

  expect(fetcher).toHaveBeenCalledTimes(2);
  expect(vi.getTimerCount()).toBe(0);
});
