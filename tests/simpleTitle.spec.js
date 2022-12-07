import { test, expect } from '@playwright/test';

test('Homepage has title', async ({ page }) => {
  await page.goto('/', { timeout: 1 * 60 * 1000 });
  await expect(page).toHaveTitle(/KSS/);
});
