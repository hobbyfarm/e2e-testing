import { test } from '@playwright/test';
import { UiFlow } from './ui.flow';

test('Add access code', async({ page }) => {
  const accessCode = `e2e-testing-${Math.random()}`;
  let homePage = await UiFlow.login(page);
  homePage = await homePage.addAccessCode(accessCode);
  await homePage.logout();
});

test('Add access code and activate', async({ page }) => {
  const accessCode = `e2e-testing-${Math.random()}`;
  let homePage = await UiFlow.login(page);
  homePage = await homePage.addAccessCodeAndValidate(accessCode);
  await homePage.logout();
});

test('Delete access code', async({ page }) => {
  const accessCode = `e2e-testing-${Math.random()}`;
  let homePage = await UiFlow.login(page);
  homePage = await homePage.addAccessCode(accessCode);
  homePage = await homePage.deleteAccessCode(accessCode);
  await homePage.logout();
});
