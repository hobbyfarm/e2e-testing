import { Page } from '@playwright/test';
import { HomePage, LoginPage } from '../../src/pages/ui';

export class UiFlow {
  public static async openLoginPage(page: Page): Promise<LoginPage> {
    const loginPage = new LoginPage(page);
    const expertedLoginUrlParams = process.env.HOBBYFARM_UI_VERSION as string >= '2.0.2'
      ? '/login?returnUrl=%2Fapp%2Fhome'
      : '/login';
    await loginPage.goto(process.env.HOBBYFARM_UI_URL as string, expertedLoginUrlParams);
    return loginPage;
  }

  public static async login(page: Page): Promise<HomePage> {
    const loginPage = await UiFlow.openLoginPage(page);
    return await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string,
      process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  }
}
