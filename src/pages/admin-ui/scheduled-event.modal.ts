import { Locator, Page } from '@playwright/test';
import dayjs from 'dayjs';
import { ScheduledEventModel } from '../../models';

/**
 * Scheduled event modal.
 */
export class ScheduledEventModal {
  private readonly page: Page;
  private readonly accessCodeInput: Locator;
  private readonly closeButton: Locator;
  private readonly descriptionInput: Locator;
  private readonly endDateInput: Locator;
  private readonly finishButton: Locator;
  private readonly nameInput: Locator;
  private readonly nextButton: Locator;
  private readonly selectCourseTitle: Locator;
  private readonly startDateInput: Locator;
  private readonly vmCapacitySimplifiedInput: Locator;
  private readonly vmCapacityTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accessCodeInput = page.getByPlaceholder('Access code');
    this.closeButton = page.getByRole('button', { name: 'Close' }).locator('path');
    this.descriptionInput = page.getByPlaceholder('Event description');
    this.endDateInput = page.getByText('Set End Time');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.nameInput = page.getByPlaceholder('Event name');
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.selectCourseTitle = page.getByRole('heading', { name: 'Select Course(s)' }).getByText('Select Course(s)');
    this.startDateInput = page.getByText('Set Start Time');
    this.vmCapacitySimplifiedInput = page.locator('css=input.clr-input.ng-pristine');
    this.vmCapacityTitle = page.getByRole('heading', { name: 'Select Virtual Machines' });
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
    await this.selectDay(startDate).click();
    await this.selectSlot(startDate).click();
    await this.selectSlot(startDate).click();
    await this.endDateInput.click();
    const endDate = dayjs(event.endDate);
    await this.selectDay(endDate).click();
    await this.selectSlot(endDate).click();
    await this.selectSlot(endDate).click();
    await this.nextButton.click();
    await this.selectCourseTitle.click();
    await this.nextButton.click();
    await this.selectScenario(event.scenario);
    await this.nextButton.click();
    await this.selectEnvironment(event.environment);
    await this.nextButton.click();
    await this.vmCapacityTitle.click();
    await this.vmCapacitySimplifiedInput.click();
    await this.vmCapacitySimplifiedInput.fill('5');
    await this.nextButton.click();
    if (isReadonly) {
      await this.closeButton.click();
    } else {
      await this.finishButton.click();
    }
  }

  private selectDay(inputDate: dayjs.Dayjs): Locator {
    return this.page.getByRole('gridcell', { name: inputDate.format('MMM D, YYYY'), exact: true });
  }

  private selectSlot(inputDate: dayjs.Dayjs): Locator {
    return this.page.getByRole('gridcell', { name: inputDate.format('MMMM D, YYYY h:00 A') });
  }

  private async selectScenario(name?: string) {
    if (name) {
      await this.page.getByRole('row', { name: name }).click(); // makes sure to scroll
      await this.page.getByRole('row', { name: name }).locator('label').click();
    } else {
      await this.page.getByRole('row').first().locator('label').click();
    }
  }

  private async selectEnvironment(name?: string) {
    if (name) {
      await this.page.getByRole('row', { name: name }).click();
      await this.page.getByRole('row', { name: name }).getByRole('gridcell', { name: 'Select' }).click();
      await this.page.getByRole('row', { name: name }).locator('label').click();
    } else {
      await this.page.getByRole('row').first().locator('label').click();
    }
  }
}
