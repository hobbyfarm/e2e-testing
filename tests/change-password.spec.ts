import { test, expect } from '@playwright/test';
import { LoginPage  as UILoginPage } from '../src/pages/ui';
import { SettingsPage } from '../src/pages/ui';
let password1 = process.env.HOBBYFARM_ADMIN_UI_PWD;
let password2 = process.env.HOBBYFARM_ADMIN_UI_PWD_TEST;

test('PasswordChange', async({ page }) => {
  let loginPage = new UILoginPage(page);
  let settingsPage = new SettingsPage(page);
  await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
  await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await settingsPage.openPasswordChangeTest(password1 as string, password2 as string);
  await expect(page.getByText('password changed. Logging you out...')).toHaveText('password changed. Logging you out...');
  await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD_TEST as string);
  await settingsPage.openPasswordChangeBack(password1 as string, password2 as string);
})
