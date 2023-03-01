import { test, expect } from '@playwright/test';

test('HobbyFarm walkthrough readonly smoke test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
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
