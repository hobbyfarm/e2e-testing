import { test } from '@playwright/test';
import { LoginPage  as UILoginPage } from '../src/pages/admin-ui';
import { scheduledEventPage } from '../src/pages/admin-ui';

test('scheduledEvent', async({ page }) => {
  let loginPage = new UILoginPage(page);
  const scheduledEventsPage = new scheduledEventPage(page);
  await loginPage.goto(process.env.HOBBYFARM_ADMIN_UI_URL as string);
  const homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await scheduledEventsPage.scheduledEventsAdd();
  loginPage = await homePage.logout();
});
