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
    await this.page.getByRole('gridcell', { name: startDate.format('MMMM D, YYYY'), exact: true }).click(); // see https://day.js.org/docs/en/display/format
    await this.page.getByRole('gridcell', { name: startDate.format('MMMM D, YYYY h:00 A') }).click();
    await this.page.getByRole('gridcell', { name: startDate.format('MMMM D, YYYY h:00 A') }).click();
    await this.endDateInput.click();
    const endDate = dayjs(event.endDate);
    await this.page.getByRole('gridcell', { name: endDate.format('MMMM D, YYYY'), exact: true }).click();
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
    await this.page.getByRole('heading', { name: 'Select Virtual Machines' }).click();
    await this.page.locator('css=input.clr-input.ng-pristine').click();
    await this.page.locator('css=input.clr-input.ng-pristine').fill('5');
    await this.nextButton.click();
    if (isReadonly) {
      await this.closeButton.click();
    } else {
      await this.finishButton.click();
    }
  }
}

/*
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#clr-form-control-83').click();
  await page.getByRole('cell', { name: 'aws-hf-eu-west-1' }).click();
  await page.locator('#clr-form-control-83').click();
  await page.locator('#clr-form-control-83').dblclick();
  await page.locator('#clr-form-control-83').click();
  await page.locator('#clr-form-control-83').fill('5');
  await page.locator('#clr-form-control-83').press('Tab');
  await page.getByRole('cell', { name: '(max 299)' }).click();
  await page.getByRole('cell', { name: '(max 299)' }).click();
  await page.getByRole('cell', { name: 'aws-hf-eu-west-1' }).click();
  await page.locator('#clr-form-control-83').click();
  await page.locator('#clr-form-control-83').click();
  await page.locator('#clr-form-control-83').click({
    clickCount: 3
  });
  await page.locator('#clr-form-control-83').click({
    clickCount: 3
  });
  await page.locator('#clr-form-control-83').click({
    clickCount: 4
  });
  await page.locator('#clr-form-control-83').fill('7');
  await page.locator('#clr-form-control-83').click({
    clickCount: 5
  });
  await page.locator('#clr-form-control-83').fill('16');
  await page.locator('#clr-form-control-83').click({
    clickCount: 6
  });
  await page.locator('#clr-form-control-83').fill('-21');
  await page.locator('#clr-form-control-83').click();
  await page.locator('#clr-form-control-83').fill('-16');
  await page.locator('#clr-form-control-83').click();
  await page.locator('#clr-form-control-83').fill('41');
  await page.getByRole('dialog', { name: 'Select Virtual Machines' }).locator('div').filter({ hasText: 'NameDescriptionAccess CodeRestricted BindRestricted bind prevents users from res' }).nth(2).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Previous' }).click();
  await page.getByRole('heading', { name: 'Select Virtual Machines' }).getByText('Select Virtual Machines').click();
  await page.getByRole('button', { name: 'Previous' }).click();
  await page.getByRole('row', { name: 'Select aws-hf-eu-central-1 count onboarding 50 sles-15-sp2 50 sles-15-sp4 100 suse-sles15sp2-chost 50 ubuntu1604-docker1 1000 ubuntu1604-docker1-large 50 0 CPU 0 MB 0 GB' }).locator('label').click();
  await page.getByRole('row', { name: 'Select aws-hf-eu-central-1 count onboarding 50 sles-15-sp2 50 sles-15-sp4 100 suse-sles15sp2-chost 50 ubuntu1604-docker1 1000 ubuntu1604-docker1-large 50 0 CPU 0 MB 0 GB' }).locator('label').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#clr-form-control-90').click();
  await page.getByRole('cell', { name: 'aws-hf-eu-central-1' }).click();
  await page.locator('#clr-form-control-90').click();
  await page.locator('#clr-form-control-90').fill('2');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('div').filter({ hasText: /^CancelPreviousNextFinish$/ }).first().click();
  await page.getByRole('button', { name: 'Previous' }).click();
  await page.getByText('Simple Mode', { exact: true }).click();
  await page.locator('#clr-form-control-94').click();
  await page.getByRole('row', { name: 'aws-hf-eu-central-1 sles-15-sp4' }).getByRole('cell').nth(2).click();
  await page.locator('#clr-form-control-94').click();
  await page.locator('#clr-form-control-94').fill('6');
  await page.getByRole('button', { name: 'Next' }).click();
});
 */
