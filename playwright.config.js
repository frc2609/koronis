// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 10 * 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5 * 1000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02
    }
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry in CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : '90%',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      'html',
      { open: process.env.CI ? 'never' : 'always' }
    ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true
  },

  /* Configure projects for major browsers */
  projects: [
    /* Test against desktop viewports. */
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          height: 1080,
          width: 1980
        }
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: {
          height: 1080,
          width: 1980
        }
      },
    },
    {
      name: 'Desktop Safari',
      use: {
        ...devices['Desktop Safari'],
        viewport: {
          height: 1080,
          width: 1980
        }
      },
    },

    /* Test against mobile tablet viewports. */
    {
      name: 'Tablet Landscape Chrome',
      use: {
        ...devices['Galaxy Tab S4 landscape'],
      },
    },
    {
      name: 'Tablet Portrait Chrome',
      use: {
        ...devices['Galaxy Tab S4'],
      },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Landscape Chrome',
      use: {
        ...devices['Pixel 5 landscape'],
      },
    },
    {
      name: 'Mobile Portrait Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Landscape Safari',
      use: {
        ...devices['iPhone 12 landscape'],
      },
    },
    {
      name: 'Mobile Portrait Safari',
      use: {
        ...devices['iPhone 12'],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start-test',
    url: 'https://localhost:3000',
    timeout: 10 * 60 * 1000,
    reuseExistingServer: !process.env.CI,
    ignoreHTTPSErrors: true
  },
};

module.exports = config;
