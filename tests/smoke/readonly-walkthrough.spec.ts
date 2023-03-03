import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/admin-ui/index';

test('HobbyFarm Admin UI walkthrough readonly smoke test', async ({ page }) => {
  let loginPage = new LoginPage(page);
  await loginPage.goto(process.env.HOBBYFARM_ADMIN_UI_URL as string);
  let homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await homePage.displayAboutModal();
  await homePage.displayLogoutModal();
  homePage = await homePage.openHomePage();
  let dashboardPage = await homePage.openDashboardPage();
  let scheduledEventPage = await dashboardPage.openScheduledEventPage();
  let contentManagementPage = await scheduledEventPage.openContentManagementPage();
  let userPage = await contentManagementPage.openUserPage();
  let configurationPage = await userPage.openConfigurationPage();
  await configurationPage.openNewEnvironmentModal();
  await configurationPage.cancelModal();
  loginPage = await configurationPage.logout();
});
