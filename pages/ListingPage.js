// pages/ListingPage.js
const { expect } = require("@playwright/test");

class ListingPage {
  constructor(page) {
    this.page = page;

    this.heartButton = page
      .locator('button[aria-label*="srce" i], button[aria-label*="favorite" i], button[title*="srce" i], button[title*="favorite" i]')
      .first();

    this.heartFallback = page.getByRole("button", { name: /srce|favorite/i }).first();
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
}

module.exports = { ListingPage };
