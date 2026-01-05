const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { LoginPage2 } = require("../pages/LoginPage");

test("FT03 - Empty Input Login (Redone) @functional", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  await home.open();
  await homePage.rejectCookies();
  await home.goToLogin();
  
  // Leave email blank (pass null/empty string) and try to submit
  // We clear the field first just in case of autofill
  await login.username.clear();
  await login.attemptLogin("", "SomePassword123");

  // Verify Validation Message appears
  await login.assertValidationError();
});