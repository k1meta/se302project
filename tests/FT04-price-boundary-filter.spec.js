const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { SearchPage } = require("../pages/SearchPage");

test("FT04 - Price Boundary Filter @functional", async ({ page }) => {
  const home = new HomePage(page);
  const search = new SearchPage(page);

  await home.open();
  await home.rejectCookies();

  // 1. Search "Laptop"
  await search.performSearch("Laptop");

  // 2. Set Min: 500, Max: 1500
  await search.setPriceFilter(500, 1500);

  // 3. Verify Refresh and Price Range
  await search.assertPricesWithinRange(500, 1500);
});