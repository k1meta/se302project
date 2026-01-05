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
    
    // Added locator for the Submit button
    this.submitBtn = page
      .getByRole('button', { name: /prijavi|login/i })
      .or(page.locator('button[type="submit"]'));
      
    // Error message locators for validation steps
    this.globalError = page.getByText(/neispravni podaci|pogrešna lozinka/i);
    this.validationError = page.getByText(/obavezno polje|email je obavezan/i);

  }

  async assertOpened() {
    await expect(this.page).toHaveURL(/\/login|\/profil\/prijava/i, { timeout: 10000 });
    await expect(this.title).toBeVisible({ timeout: 10000 });
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
  }

  // Checks only the url and not the fields themselves.
  async assertOpenedUrl() {
    await expect(this.page).toHaveURL(/\/login|\/profil\/prijava/i, { timeout: 10000 });
    await expect(this.title).toBeVisible({ timeout: 10000 });
  }

  // Helper to fill form and click submit
  async attemptLogin(user, pass) {
    if (user) await this.username.fill(user);
    if (pass) await this.password.fill(pass);
    await this.submitBtn.click();
  }

  async assertLoginFailed() {
    await expect(this.globalError).toBeVisible();
    // Ensure we are still on the login page (not redirected)
    await expect(this.page).toHaveURL(/login|prijava/i); 
  }

  async assertValidationError() {
    await expect(this.validationError).toBeVisible();
  }
}

module.exports = { LoginPage };
