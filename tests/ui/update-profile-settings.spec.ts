import { test } from '@playwright/test';
import { UiFlow } from './ui.flow';

test('Update profile terminal settings', async({ page }) => {
  let homePage = await UiFlow.login(page);
  homePage = await homePage.updateTerminalSettings(15);
  homePage = await homePage.updateTerminalSettings(14);
  await homePage.logout();
});

test('Update profile terminal theme', async({ page }) => {
  let homePage = await UiFlow.login(page);
  homePage = await homePage.updateTerminalTheme('Dichromatic');
  homePage = await homePage.updateTerminalTheme('Default Hobbyfarm Terminal');
  await homePage.logout();
});
