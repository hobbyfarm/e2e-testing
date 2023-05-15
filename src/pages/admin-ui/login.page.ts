import { expect, Locator, Page } from '@playwright/test';
import { HomePage } from '.';

/**
 * Login page is a single page.
 */
export class LoginPage {
  readonly page: Page;
  readonly emailAddressInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddressInput = page.getByPlaceholder('Email Address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'LOGIN' });
  }

  async goto(url: string) {
    await this.page.goto(url);
    await expect(this.page).toHaveURL(`${url}/login`);
  }

  async fillCredentials(username: string, password: string): Promise<LoginPage> {
    await this.emailAddressInput.fill(username);
    await this.passwordInput.fill(password);
    return this;
  }

  async submit(username: string): Promise<HomePage> {
    await this.loginButton.click();
    const homePage = new HomePage(this.page, username);
    await homePage.waitForTopLevelMenu();
    await homePage.openHomePage();
    return homePage;
  }

  async fillCredentialsAndSubmit(username: string, password: string): Promise<HomePage> {
    await this.fillCredentials(username, password);
    return await this.submit(username);
  }
}
