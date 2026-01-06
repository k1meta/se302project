const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { LoginPage } = require("../pages/LoginPage");
const { CloudFlarePage } = require("../pages/CloudFlarePage");

test("FT03 - Empty Input Login @functional", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const cloudFlarePage = new CloudFlarePage(page);
  await cloudFlarePage.handleCloudFlareIfPresent();


  await home.open();
  await home.rejectCookies();

  await home.goToLogin();
  
  // Leave email and password fields blank (pass null/empty string) and try to submit
  await login.attemptLogin("", "");

  // Verify Validation Message appears
  await login.assertValidationError_EmptyInputLogin();
});