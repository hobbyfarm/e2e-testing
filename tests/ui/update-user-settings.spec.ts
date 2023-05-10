import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/ui';

test('Change user terminal settings', async({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
  const homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  homePage.updateTerminalSettings(15, false);
  homePage.updateTerminalSettings(14, true);
  await homePage.logout();
});

test('Change user terminal theme', async({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
  const homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  homePage.updateTerminalTheme('Dichromatic');
  homePage.updateTerminalTheme('Default Hobbyfarm Terminal');
  await homePage.logout();
});
