const { expect } = require("@playwright/test");

class ListingPage {
  constructor(page) {
    this.page = page;

    this.heartButton = page
      .locator('button[aria-label*="srce" i], button[aria-label*="favorite" i], button[title*="srce" i], button[title*="favorite" i]')
      .first();

    this.heartFallback = page.getByRole("button", { name: /srce|favorite/i }).first();

    this.listingTitle = page.locator('h1').first();

    // "Prikaži broj telefona" button
    this.showPhoneBtn = page.getByRole('button', { name: /prikaži broj|prikazi broj/i })
      .or(page.getByText(/prikaži broj/i));

    this.phoneText = page.locator('.phone-number, .contact-number');
  }

  async attemptFavorite() {
    if ((await this.heartButton.count()) > 0) {
      await this.heartButton.click();
    } else {
      await this.heartFallback.click();
    }
  }

  async assertRedirectedToLogin() {
    await expect(this.page).toHaveURL(/\/login|\/profil\/prijava/i, { timeout: 10000 });
  }

  async assertTitleMatches(expectedTitle) {
    await expect(this.listingTitle).toBeVisible();
    const actualTitle = await this.listingTitle.textContent();
    expect(actualTitle.trim()).toBe(expectedTitle);
  }

  async clickOnSellerProfile() { // The comma is an or here.
    await this.page.locator('a[href^="/shops/"][href*="/aktivni"], a[href^="/profil/"][href*="/aktivni"]').first().click();
  }

  async assertSellerProfile() {
    await expect(this.page).toHaveURL(/\/(shops|profil)\/.+\/aktivni/);
  }
}

module.exports = { ListingPage };
