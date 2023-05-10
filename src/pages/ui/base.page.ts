import { Locator, Page } from '@playwright/test';
import { HomePage, LoginPage } from '.';
import { SettingModal } from './setting.modal';

export class BasePage {
  private readonly page: Page;
  private readonly headerTitle: string;
  private readonly username: string;
  private readonly homeMenuLink: Locator;
  private readonly profileMenuLink: Locator;
  private readonly aboutModalLink: Locator;
  private readonly settingModalLink: Locator;
  private readonly logoutModalLink: Locator;
  private readonly closeButton: Locator;
  private readonly cancelButton: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page, headerTitle: string, username: string) {
    this.page = page;
    this.headerTitle = headerTitle;
    this.username = username;
    this.homeMenuLink = page.getByRole('link', { name: headerTitle });
    this.profileMenuLink = page.getByRole('button', { name: username });
    this.aboutModalLink = page.getByRole('menuitem', { name: 'About' });
    this.settingModalLink = page.getByRole('menuitem', { name: 'Settings' });
    this.closeButton = page.getByRole('button', { name: 'Close' }).locator('svg');
    this.logoutModalLink = page.getByRole('menuitem', { name: 'Logout' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });

  }

  async openHomePage(): Promise<HomePage> {
    await this.homeMenuLink.click();
    return new HomePage(this.page, this.headerTitle, this.username);
  }

  async displayAboutModal(): Promise<BasePage> {
    await this.profileMenuLink.click();
    await this.aboutModalLink.click();
    await this.closeButton.click();
    return this;
  }

  async displayLogoutModal(): Promise<BasePage> {
    await this.profileMenuLink.click();
    await this.logoutModalLink.click();
    await this.cancelButton.click();
    return this;
  }

  async updateTerminalSettings(fontSize: number, isCtrEnabled: boolean): Promise<BasePage> {
    await this.profileMenuLink.click();
    await this.settingModalLink.click();
    const settingModal = new SettingModal(this.page);
    // TODO
    return this;
  }

  async updateTerminalTheme(theme: string): Promise<BasePage> {
    await this.profileMenuLink.click();
    await this.settingModalLink.click();
    const settingModal = new SettingModal(this.page);
    // TODO
    return this;
  }

  async logout(): Promise<LoginPage> {
    await this.profileMenuLink.click();
    await this.logoutModalLink.click();
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
