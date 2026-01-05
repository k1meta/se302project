const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { SearchPage } = require("../pages/SearchPage");

test("FT09 - Search Suggestion @functional", async ({ page }) => {
  const home = new HomePage(page);
  const search = new SearchPage(page);

  await home.open();
  await home.rejectCookies();

  // 1. Type "Sams"
  await search.typeSearchQuery("Sams");

  // 2. Wait 1 second (handled inside the assert method mostly, but explicit here per test steps)
  await page.waitForTimeout(1000);

  // 3. Verify dropdown
  await search.assertSuggestionsVisible();
});