import { Locator, Page } from '@playwright/test';
import { HomePage, LoginPage, ProfileAccessCodeModal, ProfilePasswordModal, ProfileSettingModal } from '.';

export class BasePage {
  protected readonly page: Page;
  private readonly headerTitle: string;
  private readonly username: string;
  private readonly homeMenuLink: Locator;
  private readonly profileMenuLink: Locator;
  private readonly aboutModalLink: Locator;
  private readonly passwordModalLink: Locator;
  private readonly settingModalLink: Locator;
  private readonly accessCodeModalLink: Locator;
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
    this.passwordModalLink = page.getByRole('menuitem', { name: 'Change Password' });
    this.accessCodeModalLink = page.getByRole('menuitem', { name: 'Manage Access Codes' });
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

  async updateTerminalSettings(fontSize: number): Promise<HomePage> {
    await this.profileMenuLink.click();
    await this.settingModalLink.click();
    const profileSettingModal = new ProfileSettingModal(this.page);
    await profileSettingModal.updateTerminalSettings(fontSize);
    return new HomePage(this.page, this.headerTitle, this.username);
  }

  async updateTerminalTheme(theme: string): Promise<HomePage> {
    await this.profileMenuLink.click();
    await this.settingModalLink.click();
    const profileSettingModal = new ProfileSettingModal(this.page);
    await profileSettingModal.updateTerminalTheme(theme);
    return new HomePage(this.page, this.headerTitle, this.username);
  }

  async changePassword(currentPassword: string): Promise<LoginPage> {
    await this.profileMenuLink.click();
    await this.passwordModalLink.click();
    const profilePasswordModal = new ProfilePasswordModal(this.page);
    await profilePasswordModal.changePassword(currentPassword, currentPassword);
    return new LoginPage(this.page);
  }

  async addAccessCode(accessCode: string): Promise<HomePage> {
    await this.profileMenuLink.click();
    await this.accessCodeModalLink.click();
    const profilePasswordModal = new ProfileAccessCodeModal(this.page);
    await profilePasswordModal.addAccessCode(accessCode);
    return new HomePage(this.page, this.headerTitle, this.username);
  }

  async addAccessCodeAndValidate(accessCode: string): Promise<HomePage> {
    await this.profileMenuLink.click();
    await this.accessCodeModalLink.click();
    const profilePasswordModal = new ProfileAccessCodeModal(this.page);
    await profilePasswordModal.addAccessCodeAndValidate(accessCode);
    return new HomePage(this.page, this.headerTitle, this.username);
  }

  async deleteAccessCode(accessCode: string): Promise<HomePage> {
    await this.profileMenuLink.click();
    await this.accessCodeModalLink.click();
    const profilePasswordModal = new ProfileAccessCodeModal(this.page);
    await profilePasswordModal.deleteAccessCode(accessCode);
    return new HomePage(this.page, this.headerTitle, this.username);
  }

  async logout(): Promise<LoginPage> {
    await this.profileMenuLink.click();
    await this.logoutModalLink.click();
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
