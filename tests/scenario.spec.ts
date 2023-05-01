import { test } from '@playwright/test';
import { LoginPage  as AdminUILoginPage } from '../src/pages/admin-ui';
import { LoginPage  as UILoginPage } from '../src/pages/ui';
import { scheduledEventPage, ContentManagementPage } from '../src/pages/admin-ui';
import { SettingsPage } from '../src/pages/ui';
const user = process.env.HOBBYFARM_ADMIN_UI_USR;

test('scenario-scheduledEvent', async({ page }) => {
  let adminLoginPage = new AdminUILoginPage(page);
  const scheduledEventsPage = new scheduledEventPage(page);
  const contentManagementPage = new ContentManagementPage(page, user as string);
  await adminLoginPage.goto(process.env.HOBBYFARM_ADMIN_UI_URL as string);
  const adminHomePage = await adminLoginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await contentManagementPage.openContentManagementScenarios();
  const scenarioName = await contentManagementPage.openContentManagementNewScenario();
  await scheduledEventsPage.scheduledEventsAdd(scenarioName);
  adminLoginPage = await adminHomePage.logout();
  let loginPage = new UILoginPage(page);
  const settingsPage = new SettingsPage(page);
  await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
  const homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await settingsPage.startAndTerminateScenario(user as string);
  await settingsPage.startAndFinishScenario(user as string);
  loginPage = await homePage.logout();
});
/*
- add a new scenario in admin-ui/contentManagement
- add a scheduled event in admin-ui/scheduledEvent
- start and finish/terminate scenario in ui/settings
*/