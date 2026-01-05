const { expect } = require("@playwright/test");

class ListingPage {
  constructor(page) {
    this.page = page;
    
    this.listingTitle = page.locator('h1').first();
    
    // "Prikaži broj telefona" button
    this.showPhoneBtn = page.getByRole('button', { name: /prikaži broj|prikazi broj/i })
      .or(page.getByText(/prikaži broj/i));
      
    this.phoneText = page.locator('.phone-number, .contact-number');
  }

  async assertTitleMatches(expectedTitle) {
    await expect(this.listingTitle).toBeVisible();
    const actualTitle = await this.listingTitle.textContent();
    expect(actualTitle.trim()).toBe(expectedTitle);
  }

  async revealPhone() {
    await this.showPhoneBtn.first().click();
    // Wait for text to change from "Show" to digits
    // Assuming the button text gets replaced or a new element appears
    await expect(this.showPhoneBtn).not.toBeVisible(); // assuming button hides or changes state
    // Or check that text contains digits
    const locator = this.page.getByText(/\d{3}/).first(); // rough heuristic for phone
    await expect(locator).toBeVisible();
  }
}

module.exports = { ListingPage };