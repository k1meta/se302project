const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { CloudFlarePage } = require("../pages/CloudFlarePage");

test("ST03 - Search Bar Presence @smoke", async ({ page }) => {
  const home = new HomePage(page);
  const cloudFlarePage = new CloudFlarePage(page);
  await cloudFlarePage.handleCloudFlareIfPresent();


  await home.open();
  await home.rejectCookies();

  await home.focusSearch();
});