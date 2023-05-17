import { Page } from '@playwright/test';
import { HomePage, LoginPage } from '../../src/pages/admin-ui';

export class AdminUiFlow {
  public static async openLoginPage(page: Page): Promise<LoginPage> {
    const loginPage = new LoginPage(page);
    await loginPage.goto(process.env.HOBBYFARM_ADMIN_UI_URL as string);
    return loginPage;
  }

  public static async login(page: Page): Promise<HomePage> {
    const loginPage = await AdminUiFlow.openLoginPage(page);
    return await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  }
}
