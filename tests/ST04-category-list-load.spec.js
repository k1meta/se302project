const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { CloudFlarePage } = require("../pages/CloudFlarePage");

test("ST04 - Category List Load @smoke", async ({ page }) => {
  const home = new HomePage(page);
  const cloudFlarePage = new CloudFlarePage(page);
  await cloudFlarePage.handleCloudFlareIfPresent();


  await home.open();
  await home.rejectCookies();

  await home.openCategories();

  await home.assertCategoriesLoaded(5);
  await page.mouse.wheel(0, 1200);
});
