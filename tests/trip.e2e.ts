import { test } from "@e2e-dev/web";
import { expect } from "e2e";

// Fixed response: journeys must not depend on the calendar or a live weather provider.
const archivedWeather = {
  refreshedAt: "2026-11-06T12:00:00Z",
  days: ["2026-10-02", "2026-10-03", "2026-10-04", "2026-10-05", "2026-10-06"].map((isoDate) => ({
    isoDate,
    leadDays: -30,
    forecast: null,
    status: "past",
    liveForecastOpens: null,
  })),
};

test("packing survives reload, navigation and unchecking", async ({ app, screen, browser }) => {
  await browser.route("**/api/weather", async (route) => {
    await route.fulfill({ json: archivedWeather });
  });
  await app.open("/packing");
  await expect(screen.getByText(/No trip forecast is available/)).toBeVisible();
  const tops = screen.getByRole("checkbox", "5 lightweight tops");
  const pants = screen.getByRole("checkbox", "2 lightweight pants");
  await expect(tops).not.toBeChecked();
  await tops.tap();
  await pants.tap();
  await expect(screen.getByText("2 of 18 packed")).toBeVisible();
  await browser.reload();
  await expect(tops).toBeChecked();
  await expect(pants).toBeChecked();
  await expect(screen.getByText(/No trip forecast is available/)).toBeVisible();
  await screen.getByRole("link", "Day by day", { exact: true }).tap();
  await expect(screen.getByRole("tablist", "Trip day")).toBeVisible();
  await screen.getByRole("link", "Packing", { exact: true }).tap();
  await expect(tops).toBeChecked();
  await tops.tap();
  await browser.reload();
  await expect(tops).not.toBeChecked();
  await expect(pants).toBeChecked();
  await expect(screen.getByText("1 of 18 packed")).toBeVisible();
});

test("deep-linked day supports keyboard selection and resets activity filters", async ({
  app,
  screen,
  browser,
}) => {
  await browser.route("**/api/weather", async (route) => {
    await route.fulfill({ json: archivedWeather });
  });
  await app.open("/#monday");
  const monday = browser.locator("#tab-monday");
  await expect(monday).toHaveAttribute("aria-selected", "true");
  await expect(screen.getByRole("tabpanel")).toContainText("Monday, October 5");
  await screen.getByRole("button", "Study", { exact: true }).tap();
  await expect(screen.getByRole("button", "Study", { exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await monday.press("ArrowRight");
  await expect(browser).toHaveURL("/#tuesday");
  await expect(browser.locator("#tab-tuesday")).toHaveAttribute("aria-selected", "true");
  await expect(screen.getByRole("button", "All plans", { exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(screen.getByRole("tabpanel")).toContainText("Tuesday, October 6");
  await browser.reload();
  await expect(browser.locator("#tab-tuesday")).toHaveAttribute("aria-selected", "true");
});
