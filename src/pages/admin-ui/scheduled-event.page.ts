import { Locator, Page } from '@playwright/test';
import { BasePage, ScheduledEventModal } from '.';
import { ScheduledEventModel } from '../../models';

/**
 * Scheduled Event page is a top level page.
 */
export class ScheduledEventPage extends BasePage {
  private readonly headingTitle: Locator;
  private readonly newButton: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.headingTitle = page.getByRole('heading', { name: 'Scheduled Events' });
    this.newButton = page.getByRole('button', { name: 'New' });
  }

  async create(event: ScheduledEventModel, isNow = false): Promise<ScheduledEventPage> {
    await this.headingTitle.click();
    await this.newButton.click();
    const eventModal = new ScheduledEventModal(this.page);
    await eventModal.create(event);
    await this.page.getByRole('row', { name: event.name }).click();
    if (isNow) {
      // makes sure the event is set to In Progress
      await this.page.getByRole('gridcell', { name: 'In Progress' }).click();
    }
    return this;
  }

  async delete(eventName: string): Promise<ScheduledEventPage> {
    await this.headingTitle.click();
    await this.page.getByRole('gridcell', { name: eventName }).click();
    await this.page.getByRole('row', { name: eventName }).getByRole('button', { name: 'Available actions' }).click();
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await this.page.getByRole('heading', { name: 'Confirm Delete' }).click();
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await this.page.locator('button.close').locator('svg').click();
    // hack: the page should refresh itself
    await this.page.locator('body').press('F5');
    await this.page.getByRole('gridcell', { name: eventName }).waitFor({state: 'hidden'});
    return this;
  }
}
