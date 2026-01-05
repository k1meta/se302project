const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");

test("ST03 - Search Bar Presence @smoke", async ({ page }) => {
  const home = new HomePage(page);

  await home.open();
  await home.focusSearch();
});
