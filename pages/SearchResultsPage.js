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
    this.sortirajTrigger = page
      .getByRole("button", { name: /sortiraj/i })
      .or(page.getByRole("link", { name: /sortiraj/i }))
      .first();

    // 2) "Najniža cijena" option could appear as: option/menuitem/button/label/text
    // (kept broad because OLX renders this differently depending on layout)
    this.lowestPriceChoice = page
      .getByRole("option", { name: /najniža cijena|najniza cijena/i })
      .or(page.getByRole("menuitem", { name: /najniža cijena|najniza cijena/i }))
      .or(page.getByRole("radio", { name: /najniža cijena|najniza cijena/i }))
      .or(page.getByRole("button", { name: /najniža cijena|najniza cijena/i }))
      .or(page.getByText(/najniža cijena|najniza cijena/i).first());
  }

  async openVozilaCategory() {
    await this.page.goto("/pretraga?category_id=1", { waitUntil: "domcontentloaded" });
    await dismissConsentIfPresent(this.page);
    await expect(this.listingCards.first()).toBeVisible({ timeout: 10000 });
  }

  async sortByLowestPrice() {
    // Cookie overlay can pop up anytime and block clicks
    await dismissConsentIfPresent(this.page);

    // Make sure Sortiraj exists (this is the key fix)
    await expect(this.sortirajTrigger).toBeVisible({ timeout: 10000 });
    await this.sortirajTrigger.click();
    await dismissConsentIfPresent(this.page);

    // Choose "Najniža cijena"
    await expect(this.lowestPriceChoice).toBeVisible({ timeout: 10000 });
    await this.lowestPriceChoice.click();

    await this.page.waitForLoadState("domcontentloaded");
  }

  async assertFirstTwoPricesAscending() {
    await expect.poll(() => this.cardPrices.count(), { timeout: 10000 }).toBeGreaterThan(1);

    const p1 = await this.cardPrices.nth(0).innerText();
    const p2 = await this.cardPrices.nth(1).innerText();

    const toNumber = (s) =>
      Number((s.match(/[\d.,]+/)?.[0] || "0").replace(/\./g, "").replace(",", "."));

    expect(toNumber(p1)).toBeLessThanOrEqual(toNumber(p2));
  }

 async applyConditionNovo() {
  const { dismissConsentIfPresent } = require("../utils/consent");
  await dismissConsentIfPresent(this.page);

  // 1) Open filters panel if it exists (mobile layouts)
  const openFilters = this.page
    .getByRole("button", { name: /filteri oglasa|filtriraj oglase|filteri|filtriraj/i })
    .or(this.page.getByText(/filteri oglasa|filtriraj oglase/i).first())
    .first();

  if (await openFilters.isVisible().catch(() => false)) {
    await openFilters.click();
    await dismissConsentIfPresent(this.page);
  }

  const stanjeHeading = this.page.getByText(/stanje/i).first();
  if (await stanjeHeading.count()) {
    await stanjeHeading.scrollIntoViewIfNeeded();
  }

  const novoOption = this.page
    .getByRole("checkbox", { name: /novo/i })
    .or(this.page.getByRole("radio", { name: /novo/i }))
    .or(this.page.getByRole("button", { name: /novo/i }))
    .first();

  await novoOption.waitFor({ state: "visible", timeout: 10000 });
  await dismissConsentIfPresent(this.page);
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
