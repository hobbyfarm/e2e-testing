import { test } from '@playwright/test';
import { UiFlow } from './ui.flow';

test('Change one profile password', async ({ page }) => {
  let homePage = await UiFlow.login(page);
  const loginPage = await homePage.changePassword(process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  // logs in again to validate the password change
  homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string,
    process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await homePage.logout();
});
