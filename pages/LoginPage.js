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
    
    // Added locator for the Submit button
    this.submitBtn = page
      .getByRole('button', { name: /prijavi|login/i })
      .or(page.locator('button[type="submit"]'));
  }

  async assertOpened() {
    await expect(this.page).toHaveURL(/\/login|\/profil\/prijava/i, { timeout: 30000 });
    await expect(this.title).toBeVisible({ timeout: 30000 });
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
  }

  // Checks only the url and not the fields themselves.
  async assertOpenedUrl() {
    await expect(this.page).toHaveURL(/\/login|\/profil\/prijava/i, { timeout: 30000 });
    await expect(this.title).toBeVisible({ timeout: 30000 });
  }

  // Helper to fill form and click submit
  async attemptLogin(user, pass) {
    if (user) await this.username.type(user);
    if (pass) await this.password.type(pass);
    await this.submitBtn.click();
  }

  async assertValidationError_InvalidLogin() {
    await expect(this.page.getByRole('alert'))
    .toContainText(/podaci nisu tačni/i);
  }

  async assertValidationError_EmptyInputLogin() { 
    await this.page.getByRole('button', { name: /prijavi se/i }).click();
    
    const errorText = this.page.getByText(/obavezno|unesite|required|polje|greška|popunite/i).first();
    const errorElement = this.page.locator('[class*="error"], [class*="invalid"], [role="alert"]').first();
    
    await expect(errorText.or(errorElement)).toBeVisible({ timeout: 5000 });
  }

}

module.exports = { LoginPage };
