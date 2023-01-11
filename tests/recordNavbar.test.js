import { test, expect } from '@playwright/test';

test('Record page navbar works', async ({ page }) => {
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

  //Navigating to record page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Record' }).click();
  await expect(page.getByText('No records to display')).toBeVisible();
  //Record page has loaded

  //Checking match info page
  await page.getByRole('button', { name: 'Record' }).click();
  await expect(page.getByRole('heading', { name: 'Edit Match Information' })).toBeVisible();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'Match DateMatch Date' }).nth(2)).toBeVisible();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'Match NumberMatch NumberRequired' }).nth(2)).toBeVisible();
  await expect(page.getByText('AllianceBlueRed')).toBeVisible();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'Robot Team NumberRobot Team NumberRequired' }).nth(2)).toBeVisible();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'Match TypeTestMatch Type' }).nth(2)).toBeVisible();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'CommentsComments' }).nth(2)).toBeVisible();
  await page.getByRole('button').first().click();
  //Navigated to recording page
  await expect(page).toHaveScreenshot('recorder.png');
});

test('Record page url routing works', async ({ page }) => {
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

  //Navigating to record page
  await page.goto('/#/record/view');
  await expect(page.getByText('No records to display')).toBeVisible();
  //Record page has loaded

  //Checking match info page
  await page.goto('/#/record/record');
  await expect(page.getByRole('heading', { name: 'Edit Match Information' })).toBeVisible();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'Match DateMatch Date' }).nth(2)).toBeVisible();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'Match NumberMatch NumberRequired' }).nth(2)).toBeVisible();
  await expect(page.getByText('AllianceBlueRed')).toBeVisible();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'Robot Team NumberRobot Team NumberRequired' }).nth(2)).toBeVisible();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'Match TypeTestMatch Type' }).nth(2)).toBeVisible();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'CommentsComments' }).nth(2)).toBeVisible();
  await page.getByRole('button').first().click();
  //Navigated to recording page
  await expect(page).toHaveScreenshot('recorder.png');
});
