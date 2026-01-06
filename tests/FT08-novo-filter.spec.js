const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { SearchResultsPage } = require("../pages/SearchResultsPage");
const { CloudFlarePage } = require("../pages/CloudFlarePage");

test('FT08 - "Novo" Filter @functional', async ({ page }) => {
  const home = new HomePage(page);
  const results = new SearchResultsPage(page);
  const cloudFlarePage = new CloudFlarePage(page);
  await cloudFlarePage.handleCloudFlareIfPresent();


  await home.open();
  await home.rejectCookies();

  await home.search("Televizor");

  await results.applyConditionNovo();
  await results.assertNoKoristenoVisible();
});
