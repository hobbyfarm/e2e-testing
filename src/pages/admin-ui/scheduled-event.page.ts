import { Locator, Page } from '@playwright/test';
import { BasePage, ScheduledEventModal } from '.';
import { ScheduledEventModel } from '../../models';

/**
 * Scheduled Event page is a top level page.
 */
export class ScheduledEventPage extends BasePage {
  private readonly deleteButton: Locator;
  private readonly deleteConfirmationTitle: Locator;
  private readonly headingTitle: Locator;
  private readonly newButton: Locator;
  private readonly popupCloseButton: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.deleteConfirmationTitle = page.getByRole('heading', { name: 'Confirm Delete' });
    this.headingTitle = page.getByRole('heading', { name: 'Scheduled Events' });
    this.newButton = page.getByRole('button', { name: 'New' });
    this.popupCloseButton = page.locator('button.close').locator('svg');
  }

  async create(event: ScheduledEventModel, isNow = false): Promise<ScheduledEventPage> {
    await this.headingTitle.click();
    await this.newButton.click();
    const eventModal = new ScheduledEventModal(this.page);
    await eventModal.create(event);
    await this.page.getByRole('row', { name: event.name }).click();
    if (isNow) {
      // hack: the page should refresh itself
      await this.page.waitForTimeout(5000);
      await this.page.reload();
      await this.page.getByRole('row', { name: event.name }).getByRole('gridcell', { name: 'In Progress' }).click();
    }
    return this;
  }

  async delete(eventName: string): Promise<ScheduledEventPage> {
    await this.headingTitle.click();
    await this.page.getByRole('gridcell', { name: eventName }).click();
    await this.page.getByRole('row', { name: eventName }).getByRole('button', { name: 'Available actions' }).click();
    await this.deleteButton.click();
    await this.deleteConfirmationTitle.click();
    await this.deleteButton.click();
    await this.popupCloseButton.click();
    await this.headingTitle.click();
    // hack: the page should refresh itself
    await this.page.waitForTimeout(1000);
    await this.page.reload();
    await this.page.getByRole('gridcell', { name: eventName }).waitFor({state: 'hidden'});
    return this;
  }
}
