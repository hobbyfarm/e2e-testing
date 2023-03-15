import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ConfigurationPage extends BasePage {
  private readonly environmentMenuLink: Locator;
  private readonly newButtonLink: Locator;
  private readonly cancelButtonLink: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.environmentMenuLink = page.getByRole('link', { name: 'Environments' });
    this.newButtonLink = page.getByRole('button', { name: 'New' });
    this.cancelButtonLink = page.getByRole('button', { name: 'Cancel' });
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
