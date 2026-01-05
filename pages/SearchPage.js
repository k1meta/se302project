const { expect } = require("@playwright/test");

class SearchPage {
  constructor(page) {
    this.page = page;
    
    // Re-use or redefine search input locator strategy
    this.searchInput = page.locator('input[type="search"]')
      .or(page.locator('input[placeholder*="traži" i]'))
      .first();

    // Suggestion dropdown often appears as a list or div under the bar
    this.suggestionsDropdown = page.locator('.autocomplete-dropdown, [role="listbox"], ul.suggestions');
    this.suggestionItems = this.suggestionsDropdown.locator('li, div.suggestion-item');

    // Search results
    this.resultsList = page.locator('div.listing-grid, div.articles-list');
    this.resultItems = page.locator('article, div.card, div.listing-item'); 
    
    // Filters
    this.minPriceInput = page.locator('input[placeholder*="min" i], input[name*="from" i]');
    this.maxPriceInput = page.locator('input[placeholder*="max" i], input[name*="to" i]');
    this.filterButton = page.getByRole('button', { name: /filtriraj|primijeni/i });
  }

  async performSearch(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async typeSearchQuery(query) {
    await this.searchInput.click();
    await this.searchInput.fill(query);
  }

  async assertSuggestionsVisible() {
    // Wait a moment for API response
    await this.page.waitForTimeout(1000); 
    await expect(this.suggestionsDropdown.first()).toBeVisible();
    // Check that we have suggestions containing the text
    // Note: This might need adjustment based on real DOM
    await expect(this.suggestionItems.first()).toBeVisible(); 
  }

  async assertFirstResultContains(keyword) {
    // Get text of first few results
    const firstTitle = await this.resultItems.first().textContent();
    expect(firstTitle.toLowerCase()).toContain(keyword.toLowerCase());
  }

  async setPriceFilter(min, max) {
    if (min) await this.minPriceInput.fill(min.toString());
    if (max) await this.maxPriceInput.fill(max.toString());
    await this.filterButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async assertPricesWithinRange(min, max) {
    // Extract price texts from visible results
    const prices = await this.resultItems.locator('.price, .item-price').allInnerTexts();
    
    for (const priceText of prices) {
      // Remove currency (KM) and formatting to parse number
      const cleanPrice = parseFloat(priceText.replace(/[^0-9,.]/g, '').replace(',', '.'));
      if (!isNaN(cleanPrice)) {
        expect(cleanPrice).toBeGreaterThanOrEqual(min);
        expect(cleanPrice).toBeLessThanOrEqual(max);
      }
    }
  }

  async clickFirstResult() {
    // Return title for verification later
    const titleLocator = this.resultItems.first().locator('h1, h2, .title');
    const title = await titleLocator.textContent();
    await this.resultItems.first().click();
    return title.trim();
  }
}

module.exports = { SearchPage };
