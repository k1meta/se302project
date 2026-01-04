const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { LoginPage } = require("../pages/LoginPage");

test("ST02 - Login Navigation @smoke", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);

  await home.open();
  await home.goToLogin();
  await login.assertOpened();
});
