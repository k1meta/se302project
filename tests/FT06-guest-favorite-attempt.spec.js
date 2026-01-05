const { test } = require("@playwright/test");
const { dismissConsentIfPresent } = require("../utils/consent");
const { HomePage } = require("../pages/HomePage");
const { ListingPage } = require("../pages/ListingPage");

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await dismissConsentIfPresent(page);
});

test("FT06 - Guest Favorite Attempt @functional", async ({ page }) => {
  const home = new HomePage(page);
  const listing = new ListingPage(page);

  await home.open();
  await dismissConsentIfPresent(page);

  await home.openFirstListingFromHome();
  await dismissConsentIfPresent(page);

  await listing.attemptFavorite();
  await listing.assertRedirectedToLogin();
});
