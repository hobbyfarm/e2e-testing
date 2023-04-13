import { test } from '@playwright/test';
import { LoginPage  as UILoginPage } from '../src/pages/admin-ui';
import { ContentManagementPage } from '../src/pages/admin-ui';

test('contentManagementScenarioDetails', async({ page }) => {
  let loginPage = new UILoginPage(page);
  const settingsPage = new ContentManagementPage(page);
  await loginPage.goto(process.env.HOBBYFARM_ADMIN_UI_URL as string);
  const homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await settingsPage.contentManagementScenarioDetails();
  loginPage = await homePage.logout();
});
