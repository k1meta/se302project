const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { LoginPage } = require("../pages/LoginPage");
const { CloudFlarePage } = require("../pages/CloudFlarePage");

test("FT02 - Invalid Login @functional", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const cloudFlarePage = new CloudFlarePage(page);
  // 0. Handle CloudFlare if it appears
  await cloudFlarePage.handleCloudFlareIfPresent();

  // 1. Navigate to Login Page
  await home.open();
  await home.rejectCookies();
  await home.goToLogin();
  await login.assertOpenedUrl();

  // 2. Input valid email but wrong password & Click Submit
  // (We use the helper method defined in LoginPage)
  await login.attemptLogin("user@example.com", "Wrong123");

  // 3. Verify Error Message and that we weren't redirected
  await login.assertValidationError_InvalidLogin();
});