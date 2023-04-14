import { Locator, Page, expect } from '@playwright/test';

export class scheduledEventPage {
  private eventName = 'e2eTest';
  private eventAccessCode = 'etwoetestcode'; //For Pipeline "schulungsentwicklung" in settingsPage

  readonly page: Page;
  readonly linkScheduledEvents: Locator;
  readonly buttonNew: Locator;
  readonly buttonNext: Locator;
  readonly buttonPre: Locator;
  readonly buttonFinish: Locator;
  readonly buttonDelete: Locator;
  readonly buttonStartNow: Locator;
  readonly buttonTerminateIn: Locator;
  readonly placeholderEventName: Locator;
  readonly placeholderEventDescription: Locator;
  readonly placeholderAccessCode: Locator;
  readonly selectScenario: Locator;
  readonly selectEnvironment: Locator;
  readonly selectEvent: Locator;
  readonly numberOfUsers: Locator;
  readonly cellScheduling: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkScheduledEvents = page.getByRole('link', { name: 'Scheduled Events' });
    this.buttonNew = page.getByRole('button', { name: 'New' });
    this.buttonNext = page.getByRole('button', { name: 'Next' });
    this.buttonPre = page.getByRole('button', { name: 'Previous' });
    this.buttonFinish = page.getByRole('button', { name: 'Finish' });
    this.buttonDelete = page.getByRole('button', { name: 'Delete' });
    this.buttonStartNow = page.getByRole('button', { name: 'Start now' });
    this.buttonTerminateIn = page.getByRole('button', { name: 'Terminate in' });
    this.placeholderEventName = page.getByPlaceholder('Event name');
    this.placeholderEventDescription = page.getByPlaceholder('Event description');
    this.placeholderAccessCode = page.getByPlaceholder('Access code');
    this.selectScenario = page.getByRole('row', { name: 'Select Select s-xm5aeqx2ae e2e-testing e2e-testingNew' }).locator('label'); //Works with e2e-testing scenario, not in pipeline
    //this.selectScenario = page.getByRole('gridcell', { name: 'Select Select' }).locator('label'); //PipelineSetting
    this.selectEnvironment = page.getByRole('gridcell', { name: 'Select Select' }).locator('label');
    //TODO selectEvent contains changing date
    this.selectEvent = page.getByRole('row', { name: 'Available actions e2etest Arne April 14, 2023 at 9:52:29 AM GMT+2 April 21, 2023 at 9:52:34 AM GMT+2 ...loading In Progress' }).getByRole('button', { name: 'Available actions' }).locator('svg');
    this.numberOfUsers = page.locator('#clr-form-control-10');
    this.cellScheduling = page.getByRole('cell', { name: 'scheduling' });
  }

  async addEvent() {
    await this.linkScheduledEvents.click();
    await this.linkScheduledEvents.click();
    await this.buttonNew.click()
    await this.placeholderEventName.click();
    await this.placeholderEventName.fill(this.eventName);
    await this.placeholderEventDescription.click();
    await this.placeholderEventDescription.fill(this.eventName);
    await this.placeholderAccessCode.click();
    await this.placeholderAccessCode.fill(this.eventAccessCode);
    await this.buttonNext.click();
    await this.buttonStartNow.click();
    await this.buttonTerminateIn.click();
    await this.buttonNext.click();
    await this.buttonNext.click();
    await this.selectScenario.click();
    await this.buttonNext.click();
    await this.selectEnvironment.click();
    await this.buttonNext.click();
    await this.page.locator('#clr-form-control-*').click(); //TODO The * is a placeholder for an changing ID, needs to be ignored
    await this.page.locator('#clr-form-control-*').fill('1'); //TODO
    await this.buttonNext.click();
    await expect(this.page.getByRole('row', { name: `Name e2eTest*` }).getByRole('cell', { name: `e2eTest*` })).toBeVisible();
    await expect(this.page.getByRole('row', { name: `Description e2eTest*` }).getByRole('cell', { name: `e2eTest*` })).toBeVisible();
    await this.cellScheduling.click();
    await this.buttonPre.click();
    await this.buttonNext.click();
    await this.buttonFinish.click();
  }

  async deleteEvent() {
    await this.linkScheduledEvents.click();
    await this.selectEvent.click();
    await this.buttonDelete.click();
    await this.buttonDelete.click();
  }

  async scheduledEventsAdd(): Promise<scheduledEventPage> {
    this.addEvent();
    return new scheduledEventPage(this.page);
  }

  async scheduledEventsDelete(): Promise<scheduledEventPage> {
    this.deleteEvent();
    return new scheduledEventPage(this.page);
  }
}
