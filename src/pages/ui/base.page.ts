import { Locator, Page } from '@playwright/test';
import { HomePage, LoginPage, UserPage } from '.';

export class BasePage {
  private readonly page: Page;
  private readonly homeMenuLink: Locator;
  private readonly userMenuLink: Locator;
  private readonly profileMenuLink: Locator;
  private readonly aboutModalLink: Locator;
  private readonly logoutModalLink: Locator;
  private readonly closeButton: Locator;
  private readonly cancelButton: Locator;
  private readonly logoutButton: Locator;
  private readonly username: string;
  private readonly headerTitle: string;

  constructor(page: Page, headerTitle: string, username: string) {
    this.page = page;
    this.headerTitle = headerTitle;
    this.username = username;
    this.homeMenuLink = page.getByRole('link', { name: headerTitle });
    this.userMenuLink = page.getByRole('link', { name: 'Users' });
    this.profileMenuLink = page.getByRole('button', { name: username });
    this.aboutModalLink = page.getByRole('menuitem', { name: 'About' });
    this.closeButton = page.getByRole('button', { name: 'Close' }).locator('svg');
    this.logoutModalLink = page.getByRole('menuitem', { name: 'Logout' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async openHomePage(): Promise<HomePage> {
    await this.homeMenuLink.click();
    return new HomePage(this.page, this.headerTitle, this.username);
  }

  async openUserPage(): Promise<UserPage> {
    await this.userMenuLink.click();
    return new UserPage(this.page, this.headerTitle, this.username);
  }

  async displayAboutModal() {
    await this.profileMenuLink.click();
    await this.aboutModalLink.click();
    await this.closeButton.click();
  }

  async displayLogoutModal() {
    await this.profileMenuLink.click();
    await this.logoutModalLink.click();
    await this.cancelButton.click();
  }

  async logout(): Promise<LoginPage> {
    await this.profileMenuLink.click();
    await this.logoutModalLink.click();
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
