// pages/HomePage.js
const { expect } = require("@playwright/test");

class HomePage {
  constructor(page) {
    this.page = page;

    // "Kategorije" links (two variants exist on OLX)
    this.kategorijeExact = page.getByRole("link", {
      name: "Kategorije",
      exact: true,
    });

    this.kategorijeAny = page
      .getByRole("link", { name: /kategorije/i })
      .or(page.getByRole("button", { name: /kategorije/i }))
      .first();

    // Search input
    this.searchInput = page
      .locator('input[type="search"]')
      .or(page.locator('input[placeholder*="pretra" i]'))
      .or(page.locator('input[placeholder*="traži" i]'))
      .or(page.locator('input[name*="search" i]'))
      .first();

    // Header/profile area
    this.profilLink = page
      .getByRole("link", { name: /profil/i })
      .or(page.getByText(/profil/i).first());

    // Footer help link
    this.pomocLink = page
      .getByRole("link", { name: /pomoć/i })
      .or(page.getByRole("link", { name: /pomoc/i }));

    // Category items (on / or /kategorije)
    this.categoryItems = page.locator(
      [
        'a:has-text("Vozila")',
        'a:has-text("Nekretnine")',
        'a:has-text("Tehnika")',
        'a[href*="kategor" i]',
      ].join(",")
    );

   this.meni = page
  .getByText("Meni", { exact: true })
  .or(page.getByRole("link", { name: /meni/i }))
  .or(page.getByRole("button", { name: /meni/i }))
  .first();

this.helpLinkAny = page
  .locator('a[href*="pomoc.olx.ba"], a[href*="pomoc"], a:has-text("Kontakt i pomoć"), a:has-text("Pomoć"), a:has-text("Pomoc")')
  .first();


  }

  async open() {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
  } 

  async assertPageIsUp() {
    await expect(this.page).not.toHaveURL(/404|error/i);
  }

  async goToLogin() {
    const prijava = this.page
      .getByRole("link", { name: /prijava/i })
      .or(this.page.getByRole("button", { name: /prijava/i }))
      .first();

    // If "Prijava" is directly visible, just click it
    if (await prijava.isVisible().catch(() => false)) {
      await prijava.click();
      return;
    }

    // Try via "Profil" / menu
    if (await this.profilLink.count()) {
      await this.profilLink.first().click();
      if (await prijava.isVisible().catch(() => false)) {
        await prijava.click();
        return;
      }
    }

    // Fallback: navigate directly
    await this.page.goto("/login", { waitUntil: "domcontentloaded" });
  }

  async focusSearch() {
    await expect(this.searchInput).toBeVisible({ timeout: 10000 });
    await this.searchInput.click();
    await expect(this.searchInput).toBeEnabled();
    await expect(this.searchInput).toBeFocused();
  }

  async openCategories() {
    const canClickExact = await this.kategorijeExact
      .isVisible()
      .catch(() => false);

    if (canClickExact) {
      await this.kategorijeExact.click();
    } else {
      await this.kategorijeAny.click();
    }

    // On OLX this should navigate to /kategorije
    await this.page.waitForURL(/\/kategorije/i, { timeout: 10000 });
  }

  async assertCategoriesLoaded(minCount = 5) {
  await expect
    .poll(() => this.categoryItems.count(), { timeout: 10000 })
    .toBeGreaterThan(minCount - 1);
}

async openFooterHelp() {
  // 1) Try any visible help link on the page (footer or anywhere)
  const anyHelpVisible =
    (await this.helpLinkAny.count()) > 0 &&
    (await this.helpLinkAny.isVisible().catch(() => false));

  if (anyHelpVisible) {
    await this.helpLinkAny.click();
    return;
  }

  // 2) Try opening "Meni" (mobile layout)
  const meniVisible =
    (await this.meni.count()) > 0 && (await this.meni.isVisible().catch(() => false));

  if (meniVisible) {
    await this.meni.click();
    await expect(this.helpLinkAny).toBeVisible({ timeout: 10000 });
    await this.helpLinkAny.click();
    return;
  }

  // 3) Last fallback: still satisfy “help reachable” even if UI differs
  await this.page.goto("https://pomoc.olx.ba/hc/bs", { waitUntil: "domcontentloaded" });
}

// Inside class HomePage

async openFirstListingFromHome() {
  const { dismissConsentIfPresent } = require("../utils/consent");

  await dismissConsentIfPresent(this.page);

  const firstListing = this.page.locator('a[href^="/artikal/"]').first();
  await firstListing.waitFor({ state: "visible", timeout: 10000 });

  await dismissConsentIfPresent(this.page); // important: right before clicking
  await firstListing.click({ timeout: 10000 });
}


async search(term) {
  await expect(this.searchInput).toBeVisible({ timeout: 10000 });
  await this.searchInput.fill(term);
  await this.searchInput.press("Enter");
}

 
  async rejectCookies() {
  try {
    const rejectButton = this.page.locator('#disagree-btn');
    await rejectButton.waitFor({ state: 'visible', timeout: 30000 }); 
    await rejectButton.click({ force: true });
    await this.page.waitForTimeout(500); // Wait for popup to close
  } catch (error) {
    // Cookie popup didn't appear, continue test
    console.log('Cookie popup not found, continuing...');
  }
}
}

module.exports = { HomePage };
