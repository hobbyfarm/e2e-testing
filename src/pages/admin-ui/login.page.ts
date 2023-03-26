import { expect, Locator, Page } from '@playwright/test';
import { HomePage } from '.';

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

  async fillCredentials(emailAddress: string, password: string): Promise<LoginPage> {
    await this.emailAddressInput.fill(emailAddress);
    await this.passwordInput.fill(password);
    return this;
  }

  async submit(emailAddress: string): Promise<HomePage> {
    await this.loginButton.click();
    return new HomePage(this.page, emailAddress);
  }

  async fillCredentialsAndSubmit(emailAddress: string, password: string): Promise<HomePage> {
    await this.fillCredentials(emailAddress, password);
    return await this.submit(emailAddress);
  }
}
