import { Locator, Page } from '@playwright/test';
import { ConfigurationPage, ContentManagementPage, DashboardPage, HomePage, LoginPage, ScheduledEventPage, UserPage } from '.';

export class BasePage {
  protected readonly page: Page;
  private readonly homeMenuLink: Locator;
  private readonly dashboardMenuLink: Locator;
  private readonly scheduledEventMenuLink: Locator;
  private readonly contentManagementMenuLink: Locator;
  private readonly userMenuLink: Locator;
  private readonly configurationMenuLink: Locator;
  private readonly profileMenuLink: Locator;
  private readonly aboutModalLink: Locator;
  private readonly logoutModalLink: Locator;
  private readonly closeButton: Locator;
  private readonly cancelButton: Locator;
  private readonly logoutButton: Locator;
  private readonly username: string;

  constructor(page: Page, username: string) {
    this.page = page;
    this.username = username;
    this.homeMenuLink = page.getByRole('link', { name: 'Home' });
    this.dashboardMenuLink = page.getByRole('link', { name: 'Dashboards' });
    this.scheduledEventMenuLink = page.getByRole('link', { name: 'Scheduled Events' });
    this.contentManagementMenuLink = page.getByRole('link', { name: 'Content Management' });
    this.userMenuLink = page.getByRole('link', { name: 'Users' });
    this.configurationMenuLink = page.getByRole('link', { name: 'Configuration' });
    this.profileMenuLink = page.getByRole('button', { name: username });
    this.aboutModalLink = page.getByRole('menuitem', { name: 'About' });
    this.closeButton = page.getByRole('button', { name: 'Close' }).locator('svg');
    this.logoutModalLink = page.getByRole('menuitem', { name: 'Logout' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
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
