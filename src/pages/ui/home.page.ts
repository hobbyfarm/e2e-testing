import { Locator, Page } from '@playwright/test';
import { BasePage } from '.';

/**
 * Home page is a top level page.
 */
export class HomePage extends BasePage {
  private readonly headingTitle: Locator;
  private readonly noScenarioNotification: Locator;
  private readonly startScenarioButton: Locator;
  private readonly vmProvisioningNotification: Locator;
  private readonly beginScenarioButton: Locator;
  private readonly finishButton: Locator;

  constructor(page: Page, headerTitle: string, username: string) {
    super(page, headerTitle, username);
    this.headingTitle = page.getByRole('heading', { name: 'Select a scenario' });
    this.noScenarioNotification = page.locator('div').filter({ hasText: 'No scenarios or courses found.' }).nth(2);
    this.startScenarioButton = page.getByRole('button', { name: 'Start Scenario' });
    this.vmProvisioningNotification = page.getByText('Virtual machines are being provisioned on-demand, this may take a few moments...');
    this.beginScenarioButton = page.getByRole('button', { name: 'Begin Scenario' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
  }

  async StartScenario(eventName: string): Promise<HomePage> {
    await this.headingTitle.click();
    if (await this.noScenarioNotification.isVisible()) {
      // hack: should refresh by itself
      await this.page.waitForTimeout(10000);
      await this.page.locator('body').press('F5');
      await this.noScenarioNotification.waitFor({state: 'hidden'});
    }
    await this.startScenarioButton.click();
    await this.vmProvisioningNotification.click();
    await this.vmProvisioningNotification.waitFor({ state: 'hidden', timeout: 36000000}); // 10 minutes
    await this.page.getByRole('cell').first().click();
    await this.page.getByText('running').first().click();
    await this.beginScenarioButton.click();
    await this.finishButton.click();
    await this.page.getByRole('heading', { name: 'Are you sure you want to finish?' }).click();
    await this.page.getByRole('dialog', { name: 'Are you sure you want to finish?' }).getByRole('button', { name: 'Finish' }).click();
    return this;
  }
}
