const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { SearchPage } = require("../pages/SearchPage");

test("FT01 - Keyword Search @functional", async ({ page }) => {
  const home = new HomePage(page);
  const search = new SearchPage(page);

  // 1. Navigate to Homepage (pre-condition implicit or explicit)
  await home.open();

  // 1.5 Reject Cookies if the popup appears
  await home.rejectCookies();

  // 2. Type "iPhone 15" and Enter
  await search.performSearch("iPhone 15");

  // 3. Verify results
  await search.assertFirstResultContains("iPhone");
});