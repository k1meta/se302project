# SE302 Project - OLX.ba Automation Suite

This repository contains an automated testing suite for **OLX.ba**, developed using **Playwright** and **Node.js**. The project utilizes the **Page Object Model (POM)** design pattern to ensure maintainability, scalability, and code reusability .

## 📋 Table of Contents

* [Project Overview](https://www.google.com/search?q=%23project-overview)
* [Prerequisites](https://www.google.com/search?q=%23prerequisites)
* [Installation](https://www.google.com/search?q=%23installation)
* [Project Structure](https://www.google.com/search?q=%23project-structure)
* [Test Coverage](https://www.google.com/search?q=%23test-coverage)
* [Configuration](https://www.google.com/search?q=%23configuration)
* [Running Tests](https://www.google.com/search?q=%23running-tests)

## 🚀 Project Overview

This automation framework is designed to verify critical workflows on the OLX.ba platform. It includes both **Smoke Tests** (system health checks) and **Functional Tests** (user workflow verification). The suite handles real-world web automation challenges, including:

* **Cookie/Consent Dialogs:** Automated dismissal of privacy banners .
* **CloudFlare Challenges:** Basic handling logic for CloudFlare interstitials .
* **Dynamic Elements:** Handling of skeletons, lazy loading, and popups .

## 🛠 Prerequisites

Ensure you have the following installed on your machine:

* **Node.js** (v14 or higher recommended)
* **npm** (Node Package Manager)

## 📥 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/k1meta/se302project.git
cd se302project

```


2. **Install dependencies:**
Run the following command to install the project dependencies defined in `package.json` :
```bash
npm install

```


3. **Install Playwright browsers:**
Download the necessary browser binaries :
```bash
npx playwright install

```



## 📂 Project Structure

The project follows a modular Page Object Model structure:

```
├── pages/                  # Page Objects (Locators & Methods)
[cite_start]│   ├── HomePage.js         # Landing page interactions [cite: 17]
[cite_start]│   ├── LoginPage.js        # Authentication handling [cite: 59]
[cite_start]│   ├── SearchPage.js       # Search results and filtering [cite: 70]
[cite_start]│   ├── ListingPage.js      # Individual item details [cite: 49]
│   └── ...
├── tests/                  # Test Specifications (.spec.js)
[cite_start]│   ├── FTxx-...spec.js     # Functional Tests [cite: 3]
[cite_start]│   └── STxx-...spec.js     # Smoke Tests [cite: 4]
├── utils/                  # Utilities
[cite_start]│   └── consent.js          # GDPR/Cookie consent handling [cite: 608]
[cite_start]├── playwright.config.js    # Global configuration [cite: 6]
[cite_start]└── package.json            # Dependencies and scripts [cite: 5]

```

## 🧪 Test Coverage

The suite is divided into Smoke Tests (ST) and Functional Tests (FT).

### Smoke Tests (System Health)

| ID | Test Name | Description | Source |
| --- | --- | --- | --- |
| **ST01** | Homepage Accessibility | Verifies the page loads within acceptable time limits. |  |
| **ST02** | Login Navigation | Checks navigation to the login page via UI elements. |  |
| **ST03** | Search Bar Presence | Ensures the search input is visible and focusable. |  |
| **ST04** | Category List Load | Verifies that category items load correctly on the home page. |  |
| **ST05** | Footer Integrity | Validates that footer links (e.g., Help/Pomoć) are functional. |  |

### Functional Tests (User Workflows)

| ID | Test Name | Description | Source |
| --- | --- | --- | --- |
| **FT01** | Keyword Search | Validates search functionality for specific terms (e.g., "iPhone 15"). |  |
| **FT02** | Invalid Login | Verifies error handling for incorrect credentials. |  |
| **FT03** | Empty Input Login | Verifies validation errors for empty login fields. |  |
| **FT04** | Price Filter | Checks filtering results within a specific price range (Min/Max). |  |
| **FT05** | Detail Redirection | Ensures clicking a result redirects to the correct item page. |  |
| **FT06** | Guest Favorite | Verifies guests are redirected to login when clicking favorites. |  |
| **FT07** | Sort: Lowest Price | Validates the "Najniža cijena" sorting logic. |  |
| **FT08** | "Novo" Filter | Ensures the "New" condition filter excludes used items. |  |
| **FT09** | Search Suggestion | Checks if the autocomplete dropdown appears while typing. |  |
| **FT10** | Seller Profile | Verifies navigation to a seller's profile page. |  |

## ⚙️ Configuration

The `playwright.config.js` is configured with the following defaults for debugging and stability :

* **Base URL:** `https://olx.ba`
* **Headless Mode:** `false` (Tests run in a visible browser window).
* **SlowMo:** `500ms` (Actions are slowed down for better visibility).
* **Retries:** 1 (Failed tests are retried once).

## 🏃 Running Tests

### Run All Tests

To execute the entire suite:

```bash
npx playwright test

```

### Run Specific Test File

To run a single test file (recommended for debugging) :

```bash
npx playwright test ./tests/FT01-keyword-search.spec.js

```

### Run by Tag

Tests are tagged with `@smoke` and `@functional` within the code.

```bash
# Run only smoke tests
npx playwright test --grep "@smoke"

# Run only functional tests
npx playwright test --grep "@functional"

```

### View Reports

Playwright generates an HTML report after execution. To view it:

```bash
npx playwright show-report

```
