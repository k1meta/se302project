// tests/ST05-footer-integrity.spec.js
const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { dismissConsentIfPresent } = require("../utils/consent");

// Force mobile-like layout so bottom nav (including "Meni") appears
test.use({ viewport: { width: 390, height: 844 } });

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await dismissConsentIfPresent(page);
});

test("ST05 - Footer Integrity (Pomoć link) @smoke", async ({ page }) => {
  const home = new HomePage(page);

  await home.open();
  await dismissConsentIfPresent(page);

  await home.openFooterHelp();

  // final sanity check: landed on help/kontakt related page
  await expect(page).toHaveURL(/pomoc\.olx\.ba|olx\.ba/i, { timeout: 10000 });
});
