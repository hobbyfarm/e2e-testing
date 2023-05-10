import { Locator, Page } from '@playwright/test';

export class SettingModal {
  readonly page: Page;
  readonly saveButton: Locator;
  readonly terminalLink: Locator;
  readonly terminalThemeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.terminalLink = page.getByRole('tab', { name: 'Terminal' });
    this.terminalThemeLink = page.getByRole('tab', { name: 'Terminal Theme' });
  }
}
