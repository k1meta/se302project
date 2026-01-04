const { expect } = require("@playwright/test");

class HomePage {
  constructor(page) {
    this.page = page;

    // Homepage contains "Kategorije" [page:1]
    this.kategorije = page
      .getByRole("button", { name: /kategorije/i })
      .or(page.getByRole("link", { name: /kategorije/i }))
      .or(page.getByText(/kategorije/i).first());

    this.searchInput = page
      .locator('input[type="search"]')
      .or(page.locator('input[placeholder*="pretra" i]'))
      .or(page.locator('input[placeholder*="traži" i]'))
      .or(page.locator('input[name*="search" i]'))
      .first();

    this.prijavaLink = page.getByRole("link", { name: /prijava/i });
    this.profilLink = page
      .getByRole("link", { name: /profil/i })
      .or(page.getByText(/profil/i).first());

    this.pomocLink = page
      .getByRole("link", { name: /pomoć/i })
      .or(page.getByRole("link", { name: /pomoc/i }));

    this.categoryItems = page.locator(
      [
        'a:has-text("Vozila")',
        'a:has-text("Nekretnine")',
        'a:has-text("Tehnika")',
        'a[href*="kategor" i]',
      ].join(",")
    );
  }

  async open() {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
  }

  async assertPageIsUp() {
    await expect(this.kategorije).toBeVisible({ timeout: 10000 });
    await expect(this.page).not.toHaveURL(/404|error/i);
  }

  async goToLogin() {
    if (await this.prijavaLink.count()) {
      await this.prijavaLink.first().click();
      return;
    }
    if (await this.profilLink.count()) await this.profilLink.first().click();
    await this.page.getByRole("link", { name: /prijava/i }).first().click();
  }

  async focusSearch() {
    await expect(this.searchInput).toBeVisible({ timeout: 10000 });
    await this.searchInput.click();
    await expect(this.searchInput).toBeEnabled();
    await expect(this.searchInput).toBeFocused();
  }

  async openCategories() {
    await expect(this.kategorije).toBeVisible({ timeout: 10000 });
    await this.kategorije.click();
  }

  async assertCategoriesLoaded(minCount = 5) {
    await expect(this.categoryItems).toHaveCountGreaterThan(minCount - 1, {
      timeout: 10000,
    });
  }

  async openFooterHelp() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(this.pomocLink).toBeVisible({ timeout: 10000 });
    await this.pomocLink.click();
    await expect(this.page).toHaveURL(/pomoc\.olx\.ba|olx\.ba/i, { timeout: 10000 });
  }
}

module.exports = { HomePage };
