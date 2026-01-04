const { test } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");

test("ST04 - Category List Load @smoke", async ({ page }) => {
  const home = new HomePage(page);

  await home.open();
  await home.openCategories();
  await home.assertCategoriesLoaded(5);

  await page.mouse.wheel(0, 1200);
});
