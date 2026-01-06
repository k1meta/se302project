// tests/ST02-login-navigation.spec.js
const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { LoginPage } = require("../pages/LoginPage");
const { CloudFlarePage } = require("../pages/CloudFlarePage");

test("ST02 - Login Navigation @smoke", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const cloudFlarePage = new CloudFlarePage(page);
  // Handle CloudFlare if it appears
  await cloudFlarePage.handleCloudFlareIfPresent();


  // Ensure we start from homepage (baseURL + home.open)
  await home.open();
  await home.rejectCookies();

  // Navigate to login using robust helper
  await home.goToLogin();

  // Assert that the login page is opened and the form is visible
  await login.assertOpened();
});