# Playwright Automation Assignment - Noventiq

This repository contains the automated test suite for validating the login functionality on `https://practicetestautomation.com/practice-test-login/`.

The framework uses:
- Playwright test runner (`@playwright/test`)
- ECMAScript module JavaScript (`type": "module"` in `package.json`)
- Page Object Model (POM) design pattern
- HTML reporter and built-in Playwright diagnostics (`trace`, `screenshot`)

## Repository Structure

- `package.json` - project metadata, scripts, and dependencies
- `playwright.config.js` - Playwright configuration file
- `tests/` - test spec files
- `pages/` - reusable page object classes
- `README.md` - this documentation
- `tsconfig.json` - TypeScript compiler settings included for optional TS support

## Prerequisites

Install the following before running tests:
- Node.js 18+ (or compatible modern Node version)
- npm (bundled with Node.js)

## Setup Instructions

1. Open a terminal in the project root.

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browser binaries:
```bash
npx playwright install chromium
```

> Note: This repo currently runs tests in JavaScript modules, but the workspace includes `tsconfig.json` for optional TypeScript compatibility.

## Run Tests

### Run all tests
```bash
npx playwright test
```

### Run tests with the list reporter
```bash
npx playwright test --reporter=list
```

### Run a single test file
```bash
npx playwright test tests/login.spec.js
```

### View the Playwright HTML report
```bash
npx playwright show-report
```

### Run Playwright in headed mode
```bash
npx playwright test --headed
```

### Run Playwright in debug mode
```bash
npx playwright test --debug
```

## Project Configuration

### `package.json`
- `type": "module"` enables ES module imports
- `scripts.test` runs `playwright test`
- `devDependencies` include `@playwright/test` and `typescript`

### `playwright.config.js`
Key configuration values:
- `testDir: './tests'` — location of test files
- `fullyParallel: true` — allows tests in different files to run in parallel
- `reporter: 'html'` — generates HTML report by default
- `use.trace: 'on-first-retry'` — captures trace only when a test is retried
- `use.screenshot: 'only-on-failure'` — captures screenshots only on failure
- `projects` configured for Chromium desktop browser

### `tsconfig.json`
- contains TypeScript compiler options
- currently not required for JavaScript execution
- useful if TypeScript support or conversion is added later

## Framework Design

### Page Object Model (POM)
The framework uses a page object class in `pages/LoginPage.js`:
- encapsulates selectors and actions for the login page
- keeps test files clean and reusable
- centralizes locator updates if the UI changes

### Current Page Object: `pages/LoginPage.js`
Selectors and actions contained in this class:
- `navigate()` - opens login page URL
- `login(username, password)` - fills credentials and submits form
- `verifySuccessMessage(expectedMessage)` - asserts success message text
- `verifyErrorMessage(expectedMessage)` - asserts error message text

### Test Suite: `tests/login.spec.js`
Contains validation scenarios:
- `TC-01` - successful login with valid credentials
- `TC-02` - post-login URL verification
- `TC-06` - invalid username error message
- `TC-07` - invalid password error message

All tests share a `beforeEach` hook for page initialization and navigation.

## Supported Test Flow

1. Playwright launches Chromium
2. `LoginPage.navigate()` opens the login page
3. Test executes login flow using page object methods
4. Results are asserted and reported
5. If a failure occurs, screenshot or trace may be captured per config

## How to Add New Tests

1. Create a new test file under `tests/`
2. Import `test` from `@playwright/test`
3. Import page object: `import { LoginPage } from '../pages/LoginPage.js';`
4. Add a new `test()` block or `test.describe()` group
5. Use `LoginPage` methods to drive actions and assertions

## Troubleshooting

### Common issues
- `TypeError: Unknown file extension ".ts"`:
  - Ensure `playwright.config.js` exists and remove stale `.ts` config files
- `No tests found`:
  - Confirm test files are named with `.js` or supported extension and are located under `tests/`
- `npm install` fails:
  - Delete `node_modules` and `package-lock.json`, then reinstall

### Useful commands
```bash
npx playwright install
npx playwright test --debug
npx playwright show-report
```

## Notes

- This project currently targets the Chromium browser via Playwright.
- The test suite is intentionally small and specifically validates login page behavior.
- Since the project is configured as an ES module, imports include `.js` extensions.
- If you want TypeScript-based tests, convert `tests/` and `pages/` files to `.ts` and update Playwright config accordingly.
