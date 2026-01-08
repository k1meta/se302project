const { test, expect } = require("@playwright/test");
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

  // Verify the listing page is opened and visible (item user might want to like)
  await expect(listing.listingTitle).toBeVisible({ timeout: 10000 });
});
