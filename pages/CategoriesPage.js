// pages/CategoriesPage.js
const { expect } = require("@playwright/test");
const { dismissConsentIfPresent } = require("../utils/consent");

class CategoriesPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("/kategorije", { waitUntil: "domcontentloaded" });
    await dismissConsentIfPresent(this.page);
  }

  async openCategoryByName(nameRegex) {
    await dismissConsentIfPresent(this.page);

    const categoryLink = this.page.getByRole("link", { name: nameRegex }).first();
    await expect(categoryLink).toBeVisible({ timeout: 10000 });

    // Critical: banner can re-appear right before click
    await dismissConsentIfPresent(this.page);
    await categoryLink.click({ timeout: 10000 });

    // Wait for navigation to results
    await this.page.waitForLoadState("domcontentloaded");
  }
}

module.exports = { CategoriesPage };
