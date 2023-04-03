import { test } from '@playwright/test';
import { LoginPage  as UILoginPage } from '../src/pages/ui';
import { SettingsPage } from '../src/pages/ui';
const accessCode = new Date().toLocaleString('en-GB',{ timeZone:'UTC'}) + 'i@8Rhg3njkdgRb';

test('AccessCodeUnique', async({ page }) => {
  let loginPage = new UILoginPage(page);
  const settingsPage = new SettingsPage(page);
  await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
  const homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await settingsPage.openAccessCodeUnique(accessCode as string);
  loginPage = await homePage.logout();
});
