const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { SearchPage } = require("../pages/SearchPage");
const { ListingPage } = require("../pages/ListingPage");

test("FT10 - Reveal Seller Phone @functional", async ({ page }) => {
  const home = new HomePage(page);
  const search = new SearchPage(page);
  const listing = new ListingPage(page);

  await home.open();
  await home.rejectCookies();

  // 1. Open any ad (Search -> Click)
  await search.performSearch("Telefon");
  await search.clickFirstResult();

  // 2. Click "Prikaži broj telefona"
  await listing.revealPhone();

  // Pass/Fail is handled inside revealPhone assertion
});