const { test } = require("@playwright/test");
const { dismissConsentIfPresent } = require("../utils/consent");
const { SearchResultsPage } = require("../pages/SearchResultsPage");

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await dismissConsentIfPresent(page);
});

test("FT07 - Vozila sort: Lowest Price @functional", async ({ page }) => {
  const results = new SearchResultsPage(page);

  await results.openVozilaCategory();
  await results.sortByLowestPrice();
  await results.assertFirstTwoPricesAscending();
});
