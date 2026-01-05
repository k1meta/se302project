// utils/consent.js
async function dismissConsentIfPresent(page) {
  // Quantcast CMP overlay (seen in your error log as qc-cmp2-container)
  const qcContainer = page.locator("#qc-cmp2-container");

  // Try Quantcast first (most aggressive overlay)
  try {
    if (await qcContainer.isVisible({ timeout: 1500 })) {
      const acceptInQc = qcContainer
        .locator('button:has-text("SLAŽEM SE")')
        .or(qcContainer.locator('button:has-text("Slažem se")'))
        .or(qcContainer.locator('button:has-text("ACCEPT")'))
        .or(qcContainer.locator('button:has-text("Accept")'))
        .first();

      // Sometimes there are multiple steps; click accept if present
      if (await acceptInQc.isVisible({ timeout: 1500 }).catch(() => false)) {
        await acceptInQc.click();
        await qcContainer.waitFor({ state: "hidden", timeout: 10000 }).catch(() => {});
        return;
      }

      // Fallback: close (X) if accept text differs
      const closeQc = qcContainer.locator('button[aria-label*="close" i], button[title*="close" i]').first();
      if (await closeQc.isVisible({ timeout: 1000 }).catch(() => false)) {
        await closeQc.click();
        await qcContainer.waitFor({ state: "hidden", timeout: 10000 }).catch(() => {});
        return;
      }
    }
  } catch {}

  // Generic banner (your earlier privacy modal)
  try {
    const acceptBtn = page.getByRole("button", { name: /slažem se/i }).first();
    if (await acceptBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await acceptBtn.click();
      return;
    }
  } catch {}

  // Last-resort close button if any modal is present
  try {
    const closeBtn = page.locator('button[aria-label*="close" i], button[title*="close" i]').first();
    if (await closeBtn.isVisible({ timeout: 800 }).catch(() => false)) {
      await closeBtn.click();
    }
  } catch {}
}

module.exports = { dismissConsentIfPresent };
