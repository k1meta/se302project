const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { SearchResultsPage } = require("../pages/SearchResultsPage");
const { CloudFlarePage } = require("../pages/CloudFlarePage");

test("FT07 - Vozila sort: Lowest Price @functional", async ({ page }) => {
  const home = new HomePage(page);
  const results = new SearchResultsPage(page);
  const cloudFlarePage = new CloudFlarePage(page);
  await cloudFlarePage.handleCloudFlareIfPresent();


  await home.open();
  await home.rejectCookies();
  await results.openVozilaCategory();
  await results.sortByLowestPrice();
  await results.assertFirstTwoPricesAscending();
});
