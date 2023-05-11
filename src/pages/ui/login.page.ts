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

  async goto(url: string, expertedUrlParams?: string) {
    await this.page.goto(url);
    // @since chart release 2.0.8 (hobbyfarm/admin-ui:v2.0.3)
    await expect(this.page).toHaveURL(`${url}${expertedUrlParams ?? '/login?returnUrl=%2Fapp%2Fhome'}`);
  }

  async fillCredentialsAndSubmit(headerTitle: string, emailAddress: string, password: string): Promise<HomePage> {
    await this.emailAddressInput.fill(emailAddress);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    return new HomePage(this.page, headerTitle, emailAddress);
  }
}
