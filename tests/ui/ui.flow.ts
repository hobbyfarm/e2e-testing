import { Page } from '@playwright/test';
import { HomePage, LoginPage } from '../../src/pages/ui';

export class UiFlow {
  public static async login(page: Page, expertedUrlParams?: string): Promise<HomePage> {
    const loginPage = new LoginPage(page);
    await loginPage.goto(process.env.HOBBYFARM_UI_URL as string, expertedUrlParams);
    return await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string,
      process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  }
}
