// pages/LoginPage.js
const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;

    this.username = page
      .getByLabel(/korisničko ime|korisnicko ime|email/i)
      .or(page.locator('input[type="text"], input[type="email"]').first());

    // Target only the real password input, not the "forgot password" link
    this.password = page
      .locator('input[type="password"][name="password"]').first()
      .or(page.getByLabel(/šifra|sifra/i));

    this.title = page.getByText(/prijava/i).first();
  }

  async assertOpened() {
    await expect(this.page).toHaveURL(/\/login|\/profil\/prijava/i, { timeout: 10000 });
    await expect(this.title).toBeVisible({ timeout: 10000 });
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
  }
}

module.exports = { LoginPage };
