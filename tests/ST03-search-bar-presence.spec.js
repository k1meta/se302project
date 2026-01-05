const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { dismissConsentIfPresent } = require("../utils/consent");

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await dismissConsentIfPresent(page);
});

test("ST03 - Search Bar Presence @smoke", async ({ page }) => {
  const home = new HomePage(page);

  await home.open();
  await dismissConsentIfPresent(page);

  await home.focusSearch();
});
