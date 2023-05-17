import { test } from '@playwright/test';
import { UiFlow } from './ui.flow';

test('Add an access code', async ({ page }) => {
  const accessCode = process.env.HOBBYFARM_EVENT_ACCESS_CODE as string ?? `e2e-testing-${Math.random()}`;
  let homePage = await UiFlow.login(page);
  homePage = await homePage.addAccessCode(accessCode);
  await homePage.logout();
});

test('Add an access code and activate', async ({ page }) => {
  const accessCode = process.env.HOBBYFARM_EVENT_ACCESS_CODE as string ?? `e2e-testing-${Math.random()}`;
  let homePage = await UiFlow.login(page);
  homePage = await homePage.addAccessCodeAndValidate(accessCode);
  await homePage.logout();
});

test('Delete an access code that has just been added', async ({ page }) => {
  const accessCode = process.env.HOBBYFARM_EVENT_ACCESS_CODE as string ?? `e2e-testing-${Math.random()}`;
  let homePage = await UiFlow.login(page);
  homePage = await homePage.addAccessCode(accessCode);
  homePage = await homePage.deleteAccessCode(accessCode);
  await homePage.logout();
});
