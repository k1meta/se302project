const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { LoginPage2 } = require("../pages/LoginPage");

test("FT02 - Invalid Login (Redone) @functional", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  // 1. Navigate to Login Page
  await home.open();
  await HomePage.rejectCookies();
  await home.goToLogin();
  await login.assertOpenedUrl();

  // 2. Input valid email but wrong password & Click Submit
  // (We use the helper method defined in LoginPage)
  await login.attemptLogin("user@example.com", "Wrong123");

  // 3. Verify Error Message and that we weren't redirected
  await login.assertLoginFailed();
});