import { Locator, Page } from '@playwright/test';
import dayjs from 'dayjs';
import { ScheduledEventModel } from '../../models';

/**
 * Scheduled event modal.
 */
export class ScheduledEventModal {
  private readonly page: Page;
  private readonly nameInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly accessCodeInput: Locator;
  private readonly nextButton: Locator;
  private readonly startDateInput: Locator;
  private readonly endDateInput: Locator;
  private readonly selectCourseTitle: Locator;
  private readonly finishButton: Locator;
  private readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Event name');
    this.descriptionInput = page.getByPlaceholder('Event description');
    this.accessCodeInput = page.getByPlaceholder('Access code');
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.startDateInput = page.getByText('Set Start Time');
    this.endDateInput = page.getByText('Set End Time');
    this.selectCourseTitle = page.getByRole('heading', { name: 'Select Course(s)' }).getByText('Select Course(s)');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.closeButton = page.getByRole('button', { name: 'Close' }).locator('path');
  }

  public async create(event: ScheduledEventModel, isReadonly = false) {
    await this.nameInput.click();
    await this.nameInput.fill(event.name);
    await this.nameInput.press('Tab');
    await this.descriptionInput.fill('End-2-end testing purpose');
    await this.descriptionInput.press('Tab');
    await this.accessCodeInput.fill(event.accessCode);
    // TODO: manage this additional fields
    // await page.getByText('Restricted Bind', { exact: true }).click();
    // await page.getByText('On Demand', { exact: true }).click();
    // await page.getByText('Printable', { exact: true }).click();
    await this.nextButton.click();
    await this.startDateInput.click();
    const startDate = dayjs(event.startDate);
    await this.page.getByRole('gridcell', { name: startDate.format('MMMM D, YYYY') }).click(); // see https://day.js.org/docs/en/display/format
    await this.page.getByRole('gridcell', { name: startDate.format('MMMM D, YYYY h:00 A') }).click();
    await this.page.getByRole('gridcell', { name: startDate.format('MMMM D, YYYY h:00 A') }).click();
    await this.endDateInput.click();
    const endDate = dayjs(event.endDate);
    await this.page.getByRole('gridcell', { name: endDate.format('MMMM D, YYYY') }).click();
    await this.page.getByRole('gridcell', { name: endDate.format('MMMM D, YYYY h:00 A') }).click();
    await this.page.getByRole('gridcell', { name: endDate.format('MMMM D, YYYY h:00 A') }).click();
    await this.nextButton.click();
    await this.selectCourseTitle.click();
    await this.nextButton.click();
    if (event.scenario) {
      await this.page.getByRole('row', { name: event.scenario }).click(); // makes sure to scroll
      await this.page.getByRole('row', { name: event.scenario }).locator('label').click();
    } else {
      await this.page.getByRole('row').first().locator('label').click();
    }
    await this.nextButton.click();
    if (event.environment) {
      await this.page.getByRole('row', { name: event.environment }).click();
      await this.page.getByRole('row', { name: event.environment }).getByRole('gridcell', { name: 'Select' }).click();
      await this.page.getByRole('row', { name: event.environment }).locator('label').click();
    } else {
      await this.page.getByRole('row').first().locator('label').click();
    }
    await this.nextButton.click();
    await this.page.getByRole('heading', { name: 'Select Course(s)' }).click();
    await this.page.locator('.clr-input').fill('5');
    await this.nextButton.click();
    if (isReadonly) {
      await this.closeButton.click();
    } else {
      await this.finishButton.click();
    }
  }
}
