const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.js",
  use: {
    baseURL: "https://olx.ba",
    headless: false, // I kinda wanna be able to see stuff working...
    slowMo: 500, // Slow down by 500ms to better observe actions
  },
  retries: 1,
});
