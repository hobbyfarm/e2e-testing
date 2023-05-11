import { test } from '@playwright/test';
import { ScheduledEventPage } from '../../src/pages/admin-ui';
import { AuthResource } from '../../src/resources/gargantua';
import { UiFlow } from '../ui/ui.flow';
import { AdminUiFlow } from '../admin-ui/admin-ui.flow';

test('Admin UI walkthrough readonly smoke test', async ({ page }) => {
  let homePage = await AdminUiFlow.login(page);
  await homePage.displayAboutModal();
  await homePage.displayLogoutModal();
  homePage = await homePage.openHomePage();
  let scheduledEventPage: ScheduledEventPage;
  if (process.env.HOBBYFARM_ADMIN_UI_VERSION as string >= '2.0.7') {
    const dashboardPage = await homePage.openDashboardPage();
    scheduledEventPage = await dashboardPage.openScheduledEventPage();
  } else {
    scheduledEventPage = await homePage.openScheduledEventPage();
  }
  const contentManagementPage = await scheduledEventPage.openContentManagementPage();
  const userPage = await contentManagementPage.openUserPage();
  const configurationPage = await userPage.openConfigurationPage();
  await configurationPage.openNewEnvironmentModal();
  await configurationPage.cancelModal();
  await configurationPage.logout();
});

test('UI walkthrough readonly smoke test', async ({ page }) => {
  const homePage = await UiFlow.login(page);
  await homePage.displayAboutModal();
  await homePage.displayLogoutModal();
  await homePage.openHomePage();
  await homePage.logout();
});

test('Gargantua walkthrough readonly smoke test', async ({ request }) => {
  const authResource = new AuthResource(request, process.env.HOBBYFARM_GARGANTUA_URL as string);
  await authResource.login(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
});
