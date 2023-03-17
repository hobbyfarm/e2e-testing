import { test } from '@playwright/test';
import { LoginPage, ScenarioPage } from '../src/pages/admin-ui';

test('create new scenario', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.goto(process.env.HOBBYFARM_ADMIN_UI_URL as string);
    let homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
    let contentManagementPage = await homePage.openContentManagementPage();
    await contentManagementPage.openNewScenarioModalAndSave('testname' as string, 'testdescription' as string, '15' as string, '2' as string);
    loginPage = await homePage.logout();
});
