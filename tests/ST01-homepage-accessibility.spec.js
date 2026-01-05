const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { dismissConsentIfPresent } = require("../utils/consent");

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await dismissConsentIfPresent(page);
});

test("ST01 - Homepage Accessibility @smoke", async ({ page }) => {
  const home = new HomePage(page);

  const start = Date.now();
  await home.open();
  await dismissConsentIfPresent(page);

  await home.assertPageIsUp();
  const loadMs = Date.now() - start;

  expect(loadMs).toBeLessThan(5000);
});
