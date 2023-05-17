import { expect, Locator, Page } from '@playwright/test';
import { HomePage } from '.';

/**
 * Login page is a single page.
 */
export class LoginPage {
  readonly page: Page;
  readonly emailAddressInput: Locator;
  readonly loginButton: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddressInput = page.getByPlaceholder('Email Address');
    this.loginButton = page.getByRole('button', { name: 'LOGIN' });
    this.passwordInput = page.getByPlaceholder('Password');
  }

  async goto(url: string, expertedUrlParams?: string) {
    await this.page.goto(url);
    await expect(this.page).toHaveURL(`${url}${expertedUrlParams}`);
  }

  async fillCredentials(username: string, password: string): Promise<LoginPage> {
    await this.emailAddressInput.fill(username);
    await this.passwordInput.fill(password);
    return this;
  }

  async submit(headerTitle: string, username: string): Promise<HomePage> {
    await this.loginButton.click();
    return new HomePage(this.page, headerTitle, username);
  }

  async fillCredentialsAndSubmit(headerTitle: string, username: string, password: string): Promise<HomePage> {
    await this.fillCredentials(username, password);
    return this.submit(headerTitle, username);
  }
}
