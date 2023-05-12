import { test } from '@playwright/test';
import { AdminUiFlow } from './admin-ui.flow';

test('Create a new course', async ({ page }) => {
  const homePage = await AdminUiFlow.login(page);
  const contentManagementPage = await homePage.openContentManagementPage();
  await contentManagementPage.openNewCourseModalAndSave(`testname ${new Date().toLocaleString('en-GB', { timeZone: 'UTC' })}`, 'testdescription', '15', '2');
  await contentManagementPage.logout();
});
