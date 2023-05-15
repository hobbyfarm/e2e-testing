import { Locator, Page } from '@playwright/test';
import { BasePage } from '.';

/**
 * Scheduled Event page is a top level page.
 */
export class ScheduledEventPage extends BasePage {
  private readonly headingTitle: Locator;
  private readonly newButton: Locator;
  private readonly nameInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly accessCodeInput: Locator;
  private readonly nextButton: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.headingTitle = page.getByRole('heading', { name: 'Scheduled Events' });
    this.newButton = page.getByRole('button', { name: 'New' });
    this.nameInput = page.getByPlaceholder('Event name');
    this.descriptionInput = page.getByPlaceholder('Event description');
    this.accessCodeInput = page.getByPlaceholder('Access code');
    this.nextButton = page.getByRole('button', { name: 'Next' });
  }

  async create(eventName: string, accessCode: string, startDate: Date, endDate: Date, environment?: string): Promise<ScheduledEventPage> {
    await this.headingTitle.click();
    await this.newButton.click();
    await this.nameInput.click();
    await this.nameInput.fill(eventName);
    await this.nameInput.press('Tab');
    await this.descriptionInput.fill('End-2-end testing purpose');
    await this.descriptionInput.press('Tab');
    await this.accessCodeInput.fill(accessCode);
    // await page.getByText('Restricted Bind', { exact: true }).click();
    // await page.getByText('On Demand', { exact: true }).click();
    // await page.getByText('Printable', { exact: true }).click();
    await this.nextButton.click();
    //TODO
    await this.page.getByRole('button', { name: 'Close' }).locator('path').click();
    return this;
  }

  async delete(eventName: string): Promise<ScheduledEventPage> {
    await this.headingTitle.click();
    return this;
  }
}

/*
test('test', async ({ page }) => {
  await page.getByText('Set Start Time').click();
  await page.getByRole('gridcell', { name: 'May 15, 2023' }).click();
  await page.getByRole('gridcell', { name: 'May 15, 2023 9:00 PM' }).click();
  await page.getByRole('gridcell', { name: 'May 15, 2023 9:00 PM' }).click();
  await page.getByText('Set End Time').click();
  await page.getByRole('gridcell', { name: 'May 15, 2023' }).click();
  await page.getByRole('gridcell', { name: 'May 15, 2023 10:00 PM' }).click();
  await page.getByRole('gridcell', { name: 'May 15, 2023 10:00 PM' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('heading', { name: 'Select Course(s)' }).getByText('Select Course(s)').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('row', { name: 'Select s-yqbrbrsjb5 DevOpsDays Geneva \'23 Live workshop' }).locator('label').click();
  await page.getByRole('row', { name: 'Select s-yqbrbrsjb5 DevOpsDays Geneva \'23 Live workshop' }).locator('label').click();
  await page.getByRole('gridcell', { name: 's-yqbrbrsjb5' }).click();
  await page.getByRole('row', { name: 'Select s-yqbrbrsjb5 DevOpsDays Geneva \'23 Live workshop' }).locator('label').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('row', { name: 'Select aws-hf-eu-west-1 count onboarding 400 sles-15-sp2 600 sles-15-sp4 600 suse-sles15sp2-chost 400 ubuntu1604-docker1 1000 ubuntu1604-docker1-large 400 0 CPU 0 MB 0 GB' }).getByRole('gridcell', { name: 'Select' }).click();
  await page.getByRole('row', { name: 'Select aws-hf-eu-west-1 count onboarding 400 sles-15-sp2 600 sles-15-sp4 600 suse-sles15sp2-chost 400 ubuntu1604-docker1 1000 ubuntu1604-docker1-large 400 0 CPU 0 MB 0 GB' }).locator('label').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#clr-form-control-83').click();
  await page.getByRole('cell', { name: '(max 300)' }).click();
  await page.locator('#clr-form-control-83').click();
  await page.locator('#clr-form-control-83').fill('2');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByRole('row', { name: 'Available actions Dummy unique event May 15, 2023 at 9:00:00 PM GMT+2 May 15, 2023 at 10:00:00 PM GMT+2 s-yqbrbrsjb5 In Progress' }).getByRole('button', { name: 'Available actions' }).click();
  await page.getByText('Scheduled Events New Name Not necessary to use this button Start Not necessary t').click();
  await page.getByRole('gridcell', { name: 'Dummy unique event' }).click();
  await page.getByRole('gridcell', { name: 'Dummy unique event' }).click();
  await page.getByRole('row', { name: 'Available actions Dummy unique event May 15, 2023 at 9:00:00 PM GMT+2 May 15, 2023 at 10:00:00 PM GMT+2 s-yqbrbrsjb5 In Progress' }).getByRole('button', { name: 'Available actions' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('heading', { name: 'Confirm Delete' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.goto('https://admin.eu.hobbyfarm.io/events');
  await page.getByRole('heading', { name: 'Scheduled Events' }).click();
  await page.getByText('Scheduled Events New Name Not necessary to use this button Start Not necessary t').click();
  await page.getByRole('link', { name: 'Content Management' }).click();
  await page.getByRole('link', { name: 'Scheduled Events' }).click();
});
 */
