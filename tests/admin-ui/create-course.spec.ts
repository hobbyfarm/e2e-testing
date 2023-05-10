import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/admin-ui';

test('Create new course', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(process.env.HOBBYFARM_ADMIN_UI_URL as string);
  const homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  const contentManagementPage = await homePage.openContentManagementPage();
  await contentManagementPage.openNewCourseModalAndSave(`testname ${new Date().toLocaleString('en-GB', { timeZone: 'UTC' })}`, 'testdescription', '15', '2');
  await contentManagementPage.logout();
});
