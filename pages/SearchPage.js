const { expect } = require("@playwright/test");

class SearchPage {
  constructor(page) {
    this.page = page;
    
    // Re-use or redefine search input locator strategy
    this.searchInput = page.locator('input[type="search"]').or(page.locator('input[placeholder*="traži" i]')).first();

    this.suggestionItems = page.getByRole('listitem').filter({ hasText: 'samsung' }).first();

    // Search results - using main element and links inside it
    this.resultsList = page.locator('main');
    this.resultItems = page.locator('main').getByRole('link').filter({ hasText: /artikal|iphone|samsung|telefon/i }).or(page.locator('main a[href*="artikal"]'));
    
    // Filters
    this.minPriceInput = page.getByPlaceholder(/od/i).first();
    this.maxPriceInput = page.getByPlaceholder(/do/i).first();
    this.filterButton  = page.getByText(/cijena/i).first();
    this.refreshResultsButton = page.getByRole('button', { name: 'img Osvježi rezultate' });

  }

  async performSearch(keyword) {
    await this.searchInput.fill(keyword);
    await Promise.all([
        this.page.waitForNavigation(),
        this.searchInput.press('Enter'),
    ]);
  }

  async typeSearchQuery(query) {
    await this.searchInput.click();
    await this.searchInput.type(query);
  }

  async assertSuggestionVisible() {
    await expect(this.suggestionItems.first()).toBeVisible(); 
  }

  async assertFirstResultContains(keyword) {
    // Wait for results to load
    await this.resultItems.first().waitFor({ state: 'visible', timeout: 10000 });
    
    // Check first three results contain the keyword
    const count = await this.resultItems.count();
    const itemsToCheck = Math.min(3, count);
    
    for (let i = 0; i < itemsToCheck; i++) {
      const itemText = await this.resultItems.nth(i).textContent();
      expect(itemText.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async setPriceFilter(min, max) {
    await Promise.all([
        //this.page.waitForNavigation(),
        await this.filterButton.click(),
    ]);
    if (min) await this.minPriceInput.click();
    await this.minPriceInput.type(min.toString());
    if (max) await this.maxPriceInput.click();
    await this.maxPriceInput.type(max.toString());
    await this.refreshResultsButton.click();
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
    // Get the first article link
    const firstLink = this.page.locator('main a[href*="/artikal/"]').first();
    await firstLink.waitFor({ state: 'visible', timeout: 10000 });

    // Extract title from the link's accessible name or nested heading
    const title = await firstLink.locator('h1, h2, h3, [class*="title"]').first().textContent();

    await firstLink.click();
    await this.page.waitForNavigation();
    //await this.page.waitForLoadState('networkidle');

    return title.trim();
}
}

module.exports = { SearchPage };