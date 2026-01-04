const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");

test("ST05 - Footer Integrity (Pomoć link) @smoke", async ({ page }) => {
  const home = new HomePage(page);

  await home.open();
  await home.openFooterHelp();
});
