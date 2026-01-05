const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { SearchPage } = require("../pages/SearchPage");
const { ListingPage } = require("../pages/ListingPage");

test("FT05 - Detail Redirection @functional", async ({ page }) => {
  const home = new HomePage(page);
  const search = new SearchPage(page);
  const listing = new ListingPage(page);

  await home.open();
  await home.rejectCookies();

  // 1. Search for something to get results
  await search.performSearch("Bicikl");

  // 2. Click first item and get its title from the list
  const expectedTitle = await search.clickFirstResult();

  // 3. Observe title on new page
  await listing.assertTitleMatches(expectedTitle);
});