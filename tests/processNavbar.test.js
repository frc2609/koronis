import { test, expect } from '@playwright/test';

test('Process page navbar works', async ({ page }) => {
  //Waiting for homepage to load
  await page.goto('/', { timeout: 1 * 60 * 1000 });
  await page.evaluate(() => { return new Promise(r => { window.addEventListener('syncend', () => { r(); }); window.setTimeout(r, 10 * 60 * 1000); }); });
  //Homepage has loaded

  //Navigating to settings page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page.getByRole('button', { name: 'Clear All Data' })).toBeVisible();
  //Settings page has loaded
  await page.locator('label:has-text("Current Year") ~ div > div').click();
  await page.getByRole('option', { name: '1 Test' }).click();

  //Navigating to process page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Process' }).click();
  await expect(page.getByRole('button', { name: 'Select Process' })).toBeVisible();
  //Process page has loaded

  //Navigated to execute page
  await page.getByRole('button', { name: 'Execute' }).click();
  await expect(page.getByRole('button', { name: 'Select Process' })).toBeVisible();
  //Execute page has loaded
  await expect(page).toHaveScreenshot('execute.png');
});

test('Process page url routing works', async ({ page }) => {
  //Waiting for homepage to load
  await page.goto('/', { timeout: 1 * 60 * 1000 });
  await expect(page.getByRole('heading', { name: 'Getting Started!' })).toBeVisible({ timeout: 1 * 60 * 1000 });
  await page.evaluate(() => { return new Promise(r => { window.addEventListener('syncend', () => { r(); }); window.setTimeout(r, 10 * 60 * 1000); }); });
  await expect(page.locator('[aria-label="sync-status"]')).toBeHidden({ timeout: 5 * 60 * 1000 });
  //Homepage has loaded

  //Navigating to settings page
  await page.goto('/#/settings');
  await expect(page.getByRole('button', { name: 'Clear All Data' })).toBeVisible();
  //Settings page has loaded
  await page.locator('label:has-text("Current Year") ~ div > div').click();
  await page.getByRole('option', { name: '1 Test' }).click();

  //Navigating to process page
  await page.goto('/#/process/edit');
  await expect(page.getByRole('button', { name: 'Select Process' })).toBeVisible();
  //Process page has loaded

  //Navigated to execute page
  await page.goto('/#/process/execute');
  await expect(page.getByRole('button', { name: 'Select Process' })).toBeVisible();
  //Execute page has loaded
  await expect(page).toHaveScreenshot('execute.png');
});
