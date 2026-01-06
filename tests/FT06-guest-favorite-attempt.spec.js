const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { ListingPage } = require("../pages/ListingPage");
const { CloudFlarePage } = require("../pages/CloudFlarePage");

test("FT06 - Guest Favorite Attempt @functional", async ({ page }) => {
  const home = new HomePage(page);
  const listing = new ListingPage(page);
  const cloudFlarePage = new CloudFlarePage(page);
  await cloudFlarePage.handleCloudFlareIfPresent();


  await home.open();
  await home.rejectCookies();

  await home.openFirstListingFromHome();

  await listing.attemptFavorite();
  await listing.assertRedirectedToLogin();
});
