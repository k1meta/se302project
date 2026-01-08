const { test, expect } = require("@playwright/test");
const { dismissConsentIfPresent } = require("../utils/consent");

test.beforeEach(async ({ page }) => {
  await page.goto("/pretraga?category_id=1", { waitUntil: "domcontentloaded" });
  await dismissConsentIfPresent(page);
});

test("FT07 - Vozila sort: Lowest Price @functional", async ({ page }) => {
  // Wait for listings to load
  await expect(page.locator('a[href^="/artikal/"]').first()).toBeVisible({ timeout: 10000 });

  // Click on "Sortiraj" button
  const sortirajButton = page.getByText('Sortiraj', { exact: true }).first();
  await expect(sortirajButton).toBeVisible({ timeout: 10000 });
  await sortirajButton.click();

  // Select "Najniža" option
  const najnizaOption = page.getByRole("button", { name: /Najniža/i }).first();
  await expect(najnizaOption).toBeVisible({ timeout: 10000 });
  await najnizaOption.click();

  // Verify sort was applied - the button should now show "Cijena: Najniža"
  await expect(page.getByText(/Cijena:\s*Najniža/i)).toBeVisible({ timeout: 15000 });
});
