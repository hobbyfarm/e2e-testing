import { test } from '@playwright/test';
import { AdminUiFlow } from './admin-ui.flow';

test('Create new scenario', async ({ page }) => {
  const homePage = await AdminUiFlow.login(page);
  const contentManagementPage = await homePage.openContentManagementPage();
  await contentManagementPage.openNewScenarioModalAndSave(`testname ${new Date().toLocaleString('en-GB', { timeZone: 'UTC' })}`, 'testdescription', '15', '2');
  await homePage.logout();
});
