const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { SearchPage } = require("../pages/SearchPage");
const { ListingPage } = require("../pages/ListingPage");
const { CloudFlarePage } = require("../pages/CloudFlarePage");

test("FT10 - Reveal Seller Profile @functional", async ({ page }) => {
  const home = new HomePage(page);
  const search = new SearchPage(page);
  const listing = new ListingPage(page);
  const cloudFlarePage = new CloudFlarePage(page);
  // 0. Handle CloudFlare if it appears
  await cloudFlarePage.handleCloudFlareIfPresent();


  await home.open();
  await home.rejectCookies();

  // 1. Open any ad (Search -> Click)
  await search.performSearch("Telefon");
  await search.clickFirstResult();

  // 2. Click on user profile
  await listing.clickOnSellerProfile();

  // 3. Assert redirection to seller profile page
  await listing.assertSellerProfile();

  // Pass/Fail is handled inside assertSellerProfile assertion
});