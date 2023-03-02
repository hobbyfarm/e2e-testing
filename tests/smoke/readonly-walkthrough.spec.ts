import { test, expect } from '@playwright/test';

test('HobbyFarm Admin UI walkthrough readonly smoke test', async ({ page }) => {
  await page.goto(process.env.HOBBYFARM_ADMIN_UI_URL as string);
  await expect(page).toHaveURL(`${process.env.HOBBYFARM_ADMIN_UI_URL}/login`);
  await page.getByPlaceholder('Email Address').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByRole('button', { name: 'admin' }).click();
  await page.getByRole('menuitem', { name: 'About' }).click();
  await page.getByRole('button', { name: 'Close' }).locator('svg').click();
  await page.getByRole('button', { name: 'admin' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Dashboards' }).click();
  await page.getByRole('link', { name: 'Scheduled Events' }).click();
  await page.getByRole('link', { name: 'Content Management' }).click();
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByRole('link', { name: 'Configuration' }).click();
  await page.getByRole('link', { name: 'Environments' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('button', { name: 'admin' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.getByPlaceholder('Email Address').click();
});
