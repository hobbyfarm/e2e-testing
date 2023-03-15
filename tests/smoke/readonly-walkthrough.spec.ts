import { test, expect } from '@playwright/test';
import { LoginPage as AdminUILoginPage } from '../../src/pages/admin-ui/index';
import { LoginPage as UILoginPage } from '../../src/pages/ui/login.page';

test('HobbyFarm Admin UI walkthrough readonly smoke test', async ({ page }) => {
  let loginPage = new AdminUILoginPage(page);
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

test('HobbyFarm UI walkthrough readonly smoke test', async ({ page }) => {
  let loginPage = new UILoginPage(page);
  await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
  let homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await homePage.displayAboutModal();
  await homePage.displayLogoutModal();
  await homePage.openHomePage();
  loginPage = await homePage.logout();
});
