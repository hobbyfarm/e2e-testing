import { Locator, Page } from '@playwright/test';
import { BasePage } from '.';

/**
 * Configuration page is a top level page. It contains three subpages: Environments, VM Templates, Roles.
 */
export class ConfigurationPage extends BasePage {
  private readonly cancelButtonLink: Locator;
  private readonly environmentMenuLink: Locator;
  private readonly newButtonLink: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.cancelButtonLink = page.getByRole('button', { name: 'Cancel' });
    this.environmentMenuLink = page.getByRole('link', { name: 'Environments' });
    this.newButtonLink = page.getByRole('button', { name: 'New' });
  }

  async openNewEnvironmentModal(): Promise<ConfigurationPage> {
    await this.environmentMenuLink.click();
    await this.newButtonLink.click();
    return this;
  }

  async cancelModal(): Promise<ConfigurationPage> {
    await this.cancelButtonLink.click();
    return this;
  }
}
