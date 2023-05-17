import { Locator, Page } from '@playwright/test';

/**
 * Profile setting modal.
 */
export class ProfileSettingModal {
  private readonly page: Page;
  // TODO: update UI to be able to grab this checkbox
  // readonly ctrEnabledInput: Locator;
  private readonly fontSizeInput: Locator;
  private readonly saveButton: Locator;
  private readonly terminalLink: Locator;
  private readonly terminalThemeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fontSizeInput = page.getByLabel('Font-Size');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.terminalLink = page.getByRole('tab', { name: 'Terminal', exact: true });
    this.terminalThemeLink = page.getByRole('tab', { name: 'Terminal Theme' });
  }

  public async updateTerminalSettings(fontSize: number) {
    await this.terminalLink.click();
    await this.fontSizeInput.click();
    await this.fontSizeInput.fill(fontSize.toString());
    await this.saveButton.click();
  }

  public async updateTerminalTheme(theme: string) {
    await this.terminalThemeLink.click();
    await this.page.getByRole('tabpanel', { name: 'Terminal Theme' }).locator('div').filter({ hasText: theme }).nth(1).click();
    await this.saveButton.click();
  }
}
