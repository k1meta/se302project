// tests/ST02-login-navigation.spec.js
const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { LoginPage } = require("../pages/LoginPage");
const { dismissConsentIfPresent } = require("../utils/consent");

test.beforeEach(async ({ page }) => {
  // Open homepage and close cookie/consent banner if it appears
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await dismissConsentIfPresent(page);
});

test("ST02 - Login Navigation @smoke", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);

  // Ensure we start from homepage (baseURL + home.open)
  await home.open();
  await dismissConsentIfPresent(page);

  // Navigate to login using robust helper
  await home.goToLogin();
  await dismissConsentIfPresent(page);

  // Assert that the login page is opened and the form is visible
  await login.assertOpened();
});
