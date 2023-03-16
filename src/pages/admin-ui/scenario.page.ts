import { Locator, Page } from '@playwright/test';
import { BasePage, ContentManagementPage } from '.';

export class ScenarioPage extends ContentManagementPage {
  readonly page: Page;
  readonly scenarioName: string;
  readonly newScenarioButton: Locator;
  readonly saveButtonLink: Locator;
  readonly cancelButtonLink: Locator;
  readonly scenarioLink: Locator;
  readonly newScenarioName: Locator;
  readonly newScenarioDescription: Locator;
  readonly newScenarioKeepaliveDuration: Locator;
  readonly newScenarioPauseDuration: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.page = page;
    this.scenarioLink = page.getByRole('link', { name: 'Scenarios' });
    this.newScenarioButton = page.getByRole('button', { name: 'New Scenario' });
    this.newScenarioName = page.getByRole('textbox', { name: 'Name' });
    this.newScenarioDescription = page.getByRole('textbox', { name: 'Description' });
    this.newScenarioKeepaliveDuration = page.getByLabel('Keepalive Duration');
    this.newScenarioPauseDuration = page.getByLabel('Pause Duration');
    this.saveButtonLink = page.getByRole('button', { name: 'Save' });
    this.cancelButtonLink = page.getByRole('button', { name: 'Cancel' });
  }

  async openNewScenarioModalAndSave(scenarioName: string, description: string, keepaliveduration: string, pauseduration: string): Promise<ContentManagementPage> {
    await this.scenarioLink.click();
    let scenarioLink = new ScenarioPage(this.page, scenarioName);
    await this.newScenarioName.fill(scenarioName);
    await this.newScenarioDescription.fill(description);
    await this.newScenarioKeepaliveDuration.fill(keepaliveduration);
    await this.newScenarioPauseDuration.fill(pauseduration);
    await this.saveButtonLink.click();
    return await scenarioLink.openNewScenarioModalAndSave(scenarioName, description, keepaliveduration, pauseduration);
  }
}
