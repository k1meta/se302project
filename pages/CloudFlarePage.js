class CloudFlarePage {
  constructor(page) {
    this.page = page;
    this.CloudFlareIframe = page.locator('iframe[src*="challenges.CloudFlare.com"]');
  }

  async handleCloudFlareIfPresent(timeout = 5000) {
    try {
      await this.CloudFlareIframe.waitFor({ state: 'visible', timeout });
      const CloudFlareButton = this.CloudFlareIframe.contentFrame().locator('body');
      await CloudFlareButton.click();
      return true;
    } catch {
      // CloudFlare not present, continue
    }
    return false;
  }
}

module.exports = { CloudFlarePage };
