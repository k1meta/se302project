// pages/SearchResultsPage.js
const { expect } = require("@playwright/test");
const { dismissConsentIfPresent } = require("../utils/consent");

class SearchResultsPage {
  constructor(page) {
    this.page = page;

    this.listingCards = page.locator('a[href^="/artikal/"]');

    // Prices in listing cards (best effort)
    this.cardPrices = this.listingCards.locator(':text-matches("KM", "i")');

    // 1) SORT button/link must be explicitly "Sortiraj" (avoid Filtriraj)
this.sortirajTrigger = page.getByText('Sortiraj').or(page.locator('div:nth-child(2) > .flex.flex-row > .h-4'));

    // 2) "Najniža cijena" option could appear as: option/menuitem/button/label/text
      this.lowestPriceChoice = page.getByRole('button', { name: 'Najniža' });
  }

  async openVozilaCategory() {
    await this.page.goto("/pretraga?category_id=1", { waitUntil: "domcontentloaded" });
    await expect(this.listingCards.first()).toBeVisible({ timeout: 10000 });
  }

  async sortByLowestPrice() {
    // Cookie overlay can pop up anytime and block clicks

    // Make sure Sortiraj exists (this is the key fix)
    //await expect(this.sortirajTrigger).toBeVisible({ timeout: 30000 });
    await this.sortirajTrigger.first().click();

    // Choose "Najniža cijena"
    //await expect(this.lowestPriceChoice).toBeVisible({ timeout: 30000 });
    await this.lowestPriceChoice.click();

    await this.page.waitForLoadState("domcontentloaded");
  }

  async assertFirstTwoPricesAscending() {
    await expect.poll(() => this.cardPrices.count(), { timeout: 30000 }).toBeGreaterThan(1);

    const p1 = await this.cardPrices.nth(0).innerText();
    const p2 = await this.cardPrices.nth(1).innerText();

    const toNumber = (s) =>
      Number((s.match(/[\d.,]+/)?.[0] || "0").replace(/\./g, "").replace(",", "."));

    expect(toNumber(p1)).toBeLessThanOrEqual(toNumber(p2));
  }

  async applyConditionNovo() {
    // 1) Open filters dropdown (explicit corrected text) or fallback to the previous mobile button if present
    const filterToggle = this.page
      .getByText('Filteri oglasa')
      .first();

    const openFiltersFallback = this.page.getByText('Filteri oglasa').first();
    await openFiltersFallback.click({ force:true });

    // 3) Locate the "Novo" button and click it (use role=button per your note)
    const novoOption = this.page
      .getByRole('button', { name: /^novo$/i })
      .first();

    // Wait until visible then click
    await expect(novoOption).toBeVisible({ timeout: 20000 });
    await novoOption.click();
  }

  async assertNoKoristenoVisible() {
    // Important: only check inside listing cards so we don’t match the filter option "Korišteno" itself
    const koristenoInCards = this.page
      .locator('a[href^="/artikal/"]')
      .getByText(/korišteno|koristeno/i);

    await expect(koristenoInCards).toHaveCount(0, { timeout: 10000 });
  }
}

module.exports = { SearchResultsPage };
