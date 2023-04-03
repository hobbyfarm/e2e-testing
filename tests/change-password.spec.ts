import { test, expect } from '@playwright/test';
import { LoginPage  as UILoginPage } from '../src/pages/ui';
import { SettingsPage } from '../src/pages/ui';
let oldPassword = process.env.HOBBYFARM_ADMIN_UI_PWD;
let newPassword = process.env.HOBBYFARM_ADMIN_UI_PWD_NEW;

test('PasswordChange', async({ page }) => {
  let loginPage = new UILoginPage(page);
  let settingsPage = new SettingsPage(page);
  await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
  await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await settingsPage.openPasswordChangeTest(oldPassword as string, newPassword as string);
  await expect(page.getByText('password changed. Logging you out...')).toHaveText('password changed. Logging you out...');
  await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD_NEW as string);
  await settingsPage.openPasswordChangeBack(oldPassword as string, newPassword as string);
})
