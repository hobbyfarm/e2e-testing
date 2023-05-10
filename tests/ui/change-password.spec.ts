import { test, expect } from '@playwright/test';
import { LoginPage  as UILoginPage } from '../../src/pages/ui';
import { SettingsPage } from '../../src/pages/ui';
const user = process.env.HOBBYFARM_ADMIN_UI_USR;
const oldPassword = process.env.HOBBYFARM_ADMIN_UI_PWD;
const newPassword = process.env.HOBBYFARM_ADMIN_UI_PWD_NEW;

test('PasswordChange', async({ page }) => {
  const loginPage = new UILoginPage(page);
  const settingsPage = new SettingsPage(page);
  await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
  await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await settingsPage.openPasswordChangeTest(user as string, oldPassword as string, newPassword as string);
  await expect(page.getByText('password changed. Logging you out...')).toHaveText('password changed. Logging you out...');
  await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD_NEW as string);
  await settingsPage.openPasswordChangeBack(user as string, oldPassword as string, newPassword as string);
});
