const { test } = require("@playwright/test");
const { dismissConsentIfPresent } = require("../utils/consent");
const { HomePage } = require("../pages/HomePage");
const { SearchResultsPage } = require("../pages/SearchResultsPage");

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await dismissConsentIfPresent(page);
});

test('FT08 - "Novo" Filter @functional', async ({ page }) => {
  const home = new HomePage(page);
  const results = new SearchResultsPage(page);

  await home.open();
  await dismissConsentIfPresent(page);

  await home.search("Televizor");
  await dismissConsentIfPresent(page);

  await results.applyConditionNovo();
  await results.assertNoKoristenoVisible();
});
