import { Page } from '@playwright/test';
import { HomePage, LoginPage } from '../../src/pages/ui';

export class UiFlow {
  public static async login(page: Page): Promise<HomePage> {
    const loginPage = new LoginPage(page);
    // @since chart release 2.0.8 (hobbyfarm/admin-ui:v2.0.3)
    const expertedLoginUrlParams = process.env.HOBBYFARM_ADMIN_UI_VERSION as string >= '2.0.8'
      ? '/login?returnUrl=%2Fapp%2Fhome'
      : '/login';
    await loginPage.goto(process.env.HOBBYFARM_UI_URL as string, expertedLoginUrlParams);
    return await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string,
      process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  }
}
