const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { CloudFlarePage } = require("../pages/CloudFlarePage");

test("ST01 - Homepage Accessibility @smoke", async ({ page }) => {
  const home = new HomePage(page);
  const start = Date.now();
  const cloudFlarePage = new CloudFlarePage(page);
  await cloudFlarePage.handleCloudFlareIfPresent();


  await home.open();
  await home.rejectCookies();

  await home.assertPageIsUp();
  const loadMs = Date.now() - start;

  expect(loadMs).toBeLessThan(20000);
});