const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");

test("ST01 - Homepage Accessibility @smoke", async ({ page }) => {
  const home = new HomePage(page);

  const start = Date.now();
  await home.open();
  await home.assertPageIsUp();
  const loadMs = Date.now() - start;

  expect(loadMs).toBeLessThan(5000);
});
