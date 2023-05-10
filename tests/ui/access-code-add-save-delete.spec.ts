import { test } from '@playwright/test';
import { LoginPage  as UILoginPage } from '../../src/pages/ui';
import { SettingsPage } from '../../src/pages/ui';
const user = process.env.HOBBYFARM_ADMIN_UI_USR;

test('AccessCode', async ({ page }) => {
  let loginPage = new UILoginPage(page);
  const settingsPage = new SettingsPage(page);
  await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
  const homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await settingsPage.openAccessCodeAddSaveDelete(user as string);
  loginPage = await homePage.logout();
});
