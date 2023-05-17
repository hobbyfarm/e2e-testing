import { Locator, Page, expect } from '@playwright/test';
import { ConfigurationPage, ContentManagementPage, DashboardPage, HomePage, LoginPage, ScheduledEventPage, UserPage } from '.';

export class BasePage {
  protected readonly page: Page;
  protected readonly username: string;
  private readonly aboutModalLink: Locator;
  private readonly cancelButton: Locator;
  private readonly closeButton: Locator;
  private readonly configurationMenuLink: Locator;
  private readonly contentManagementMenuLink: Locator;
  private readonly dashboardMenuLink: Locator;
  private readonly homeMenuLink: Locator;
  private readonly logoutButton: Locator;
  private readonly logoutModalLink: Locator;
  private readonly profileMenuLink: Locator;
  private readonly scheduledEventMenuLink: Locator;
  private readonly userMenuLink: Locator;

  constructor(page: Page, username: string) {
    this.page = page;
    this.username = username;
    this.aboutModalLink = page.getByRole('menuitem', { name: 'About' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.closeButton = page.getByRole('button', { name: 'Close' }).locator('svg');
    this.configurationMenuLink = page.getByRole('link', { name: 'Configuration' });
    this.contentManagementMenuLink = page.getByRole('link', { name: 'Content Management' });
    this.dashboardMenuLink = page.getByRole('link', { name: 'Dashboards' });
    this.homeMenuLink = page.getByRole('link', { name: 'Home' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.logoutModalLink = page.getByRole('menuitem', { name: 'Logout' });
    this.profileMenuLink = page.getByRole('button', { name: username });
    this.scheduledEventMenuLink = page.getByRole('link', { name: 'Scheduled Events' });
    this.userMenuLink = page.getByRole('link', { name: 'Users' });
  }

  async openHomePage(): Promise<HomePage> {
    await this.homeMenuLink.click();
    return new HomePage(this.page, this.username);
  }

  async openDashboardPage(): Promise<DashboardPage> {
    await this.dashboardMenuLink.click();
    return new DashboardPage(this.page, this.username);
  }

  async openScheduledEventPage(): Promise<ScheduledEventPage> {
    await this.scheduledEventMenuLink.click();
    return new ScheduledEventPage(this.page, this.username);
  }

  async openContentManagementPage(): Promise<ContentManagementPage> {
    await this.contentManagementMenuLink.click();
    return new ContentManagementPage(this.page, this.username);
  }

  async openUserPage(): Promise<UserPage> {
    await this.userMenuLink.click();
    return new UserPage(this.page, this.username);
  }

  async openConfigurationPage(): Promise<ConfigurationPage> {
    await this.configurationMenuLink.click();
    return new ConfigurationPage(this.page, this.username);
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

  async waitForTopLevelMenu(): Promise<BasePage> {
    await expect(this.homeMenuLink).toBeVisible();
    await expect(this.contentManagementMenuLink).toBeVisible();
    return this;
  }

  async logout(): Promise<LoginPage> {
    await this.profileMenuLink.click();
    await this.logoutModalLink.click();
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
