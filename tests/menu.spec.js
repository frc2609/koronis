import { test, expect } from '@playwright/test';

test('Top level hamburger menu works', async ({ page }) => {
  //Waiting for homepage to load
  await page.goto('/', { timeout: 1 * 60 * 1000 });
  await expect(page.getByRole('heading', { name: 'Getting Started!' })).toBeVisible({ timeout: 5 * 60 * 1000 });
  await expect(page.locator('[aria-label="sync-status"]')).toBeHidden({ timeout: 5 * 60 * 1000 });
  //Homepage has loaded

  //Navigating to record page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Record' }).click();
  await expect(page.getByText('No records to display')).toBeVisible();
  //Record page has loaded
  await expect(page).toHaveScreenshot('record.png', { maxDiffPixelRatio: 0.025 });

  //Navigating to process page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Process' }).click();
  await expect(page.getByRole('button', { name: 'Select Process' })).toBeVisible();
  //Process page has loaded
  await expect(page).toHaveScreenshot('process.png', { maxDiffPixelRatio: 0.025 });

  //Navigating to analyze page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Analyze' }).click();
  await expect(page.getByRole('button', { name: 'Select Records' })).toBeVisible();
  //Analyze page has loaded
  await expect(page).toHaveScreenshot('analyze.png', { maxDiffPixelRatio: 0.025 });

  //Navigating to transfer page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Transfer' }).click();
  await expect(page.getByRole('button', { name: 'Select Records' })).toBeVisible();
  //Transfer page has loaded
  await expect(page).toHaveScreenshot('transfer.png', { maxDiffPixelRatio: 0.025 });

  //Navigating to wiki page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Wiki' }).click();
  await expect(page.getByText('Offline ready KSS Wiki. Data is synced from wiki.koronis.cc.')).toBeVisible();
  //Wiki page has loaded
  await expect(page).toHaveScreenshot('wiki.png', { maxDiffPixelRatio: 0.025 });

  //Navigating to settings page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page.getByRole('button', { name: 'Clear All Data' })).toBeVisible();
  //Settings page has loaded
  await expect(page).toHaveScreenshot('settings.png', { maxDiffPixelRatio: 0.025 });
});