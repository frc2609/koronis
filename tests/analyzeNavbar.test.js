import { test, expect } from '@playwright/test';

test('Analyze page navbar works', async ({ page }) => {
  //Waiting for homepage to load
  await page.goto('/', { timeout: 1 * 60 * 1000 });
  await expect(page.getByRole('heading', { name: 'Getting Started!' })).toBeVisible({ timeout: 1 * 60 * 1000 });
  await page.waitForEvent('syncend');
  await expect(page.locator('[aria-label="sync-status"]')).toBeHidden({ timeout: 5 * 60 * 1000 });
  //Homepage has loaded

  //Navigating to settings page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page.getByRole('button', { name: 'Clear All Data' })).toBeVisible();
  //Settings page has loaded
  await page.locator('label:has-text("Current Year") ~ div > div').click();
  await page.getByRole('option', { name: '1 Test' }).click();

  //Navigating to analyze page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Analyze' }).click();
  await expect(page.getByRole('button', { name: 'Select Records' })).toBeVisible();
  //Analyze page has loaded

  //Navigated to team page
  await page.getByRole('button', { name: 'Team' }).click();
  await expect(page.getByRole('button', { name: 'Select Process' })).toBeVisible();
  //Team page has loaded
  await expect(page).toHaveScreenshot('team.png');
});

test('Analyze page url routing works', async ({ page }) => {
  //Waiting for homepage to load
  await page.goto('/', { timeout: 1 * 60 * 1000 });
  await expect(page.getByRole('heading', { name: 'Getting Started!' })).toBeVisible({ timeout: 1 * 60 * 1000 });
  await page.waitForEvent('syncend');
  await expect(page.locator('[aria-label="sync-status"]')).toBeHidden({ timeout: 5 * 60 * 1000 });
  //Homepage has loaded

  //Navigating to settings page
  await page.goto('/#/settings');
  await expect(page.getByRole('button', { name: 'Clear All Data' })).toBeVisible();
  //Settings page has loaded
  await page.locator('label:has-text("Current Year") ~ div > div').click();
  await page.getByRole('option', { name: '1 Test' }).click();

  //Navigating to analyze page
  await page.goto('/#/analyze/record/metric');
  await expect(page.getByRole('button', { name: 'Select Records' })).toBeVisible();
  //Analyze page has loaded

  //Navigated to team page
  await page.goto('/#/analyze/team/metric');
  await expect(page.getByRole('button', { name: 'Select Process' })).toBeVisible();
  //Team page has loaded
  await expect(page).toHaveScreenshot('team.png');
});
