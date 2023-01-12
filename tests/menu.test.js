import { test, expect } from '@playwright/test';

test('Top level hamburger menu works', async ({ page }) => {
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
  await expect(page).toHaveScreenshot('settings.png');

  //Navigating to record page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Record' }).click();
  await expect(page.getByText('No records to display')).toBeVisible();
  //Record page has loaded
  await expect(page).toHaveScreenshot('record.png');

  //Navigating to process page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Process' }).click();
  await expect(page.getByRole('button', { name: 'Select Process' })).toBeVisible();
  //Process page has loaded
  await expect(page).toHaveScreenshot('process.png');

  //Navigating to analyze page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Analyze' }).click();
  await expect(page.getByRole('button', { name: 'Select Records' })).toBeVisible();
  //Analyze page has loaded
  await expect(page).toHaveScreenshot('analyze.png');

  //Navigating to transfer page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Transfer' }).click();
  await expect(page.getByRole('button', { name: 'Select Records' })).toBeVisible();
  let minVersionText = page.getByText('Minimum compatible version');
  //Transfer page has loaded
  await expect(page).toHaveScreenshot('transfer.png', { mask: [minVersionText] });

  //Navigating to wiki page
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Wiki' }).click();
  let wikiText = page.getByText('Offline ready KSS Wiki. Data is synced from wiki.koronis.cc.');
  await expect(wikiText).toBeVisible();
  //Wiki page has loaded
  await expect(page).toHaveScreenshot('wiki.png', { mask: [wikiText] });
});

test('Top level url routing works', async ({ page }) => {
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
  await expect(page).toHaveScreenshot('settings.png');

  //Navigating to record page
  await page.goto('/#/record/view');
  await expect(page.getByText('No records to display')).toBeVisible();
  //Record page has loaded
  await expect(page).toHaveScreenshot('record.png');

  //Navigating to process page
  await page.goto('/#/process/edit');
  await expect(page.getByRole('button', { name: 'Select Process' })).toBeVisible();
  //Process page has loaded
  await expect(page).toHaveScreenshot('process.png');

  //Navigating to analyze page
  await page.goto('/#/analyze/record/metric');
  await expect(page.getByRole('button', { name: 'Select Records' })).toBeVisible();
  //Analyze page has loaded
  await expect(page).toHaveScreenshot('analyze.png');

  //Navigating to transfer page
  await page.goto('/#/transfer/qrcode/send');
  await expect(page.getByRole('button', { name: 'Select Records' })).toBeVisible();
  let minVersionText = page.getByText('Minimum compatible version');
  //Transfer page has loaded
  await expect(page).toHaveScreenshot('transfer.png', { mask: [minVersionText] });

  //Navigating to wiki page
  await page.goto('/#/wiki');
  let wikiText = page.getByText('Offline ready KSS Wiki. Data is synced from wiki.koronis.cc.');
  await expect(wikiText).toBeVisible();
  //Wiki page has loaded
  await expect(page).toHaveScreenshot('wiki.png', { mask: [wikiText] });
});
