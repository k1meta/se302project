const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;

    // Login page has these fields/text [page:0]
    this.username = page
      .getByLabel(/korisničko ime|korisnicko ime|email/i)
      .or(page.locator('input[type="text"], input[type="email"]').first());

    this.password = page
      .getByLabel(/šifra|sifra|password/i)
      .or(page.locator('input[type="password"]').first());

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
