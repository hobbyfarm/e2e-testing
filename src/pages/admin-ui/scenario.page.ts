import { Locator, Page } from '@playwright/test';

export class ScenarioPage {
  readonly page: Page;
  readonly newScenarioButton: Locator;
  readonly saveButtonLink: Locator;
  readonly cancelButtonLink: Locator;
  readonly scenarioLink: Locator;
  readonly newScenarioName: Locator;
  readonly newScenarioDescription: Locator;
  readonly newScenarioKeepaliveDuration: Locator;
  readonly newScenarioPauseDuration: Locator;

  constructor(page: Page) {
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

  async openNewScenarioForm (): Promise<ScenarioPage> {
    await this.scenarioLink.click();
    await this.newScenarioButton.click();
    return new ScenarioPage(this.page);
  }

  async fillNewScenarioForm(scenarioName: string, description: string, keepaliveduration: string, pauseduration: string): Promise<ScenarioPage> {
    await this.newScenarioName.fill(scenarioName);
    await this.newScenarioDescription.fill(description);
    await this.newScenarioKeepaliveDuration.fill(keepaliveduration);
    await this.newScenarioPauseDuration.fill(pauseduration);
    return new ScenarioPage(this.page);
  }

  async saveNewScenarioForm(): Promise<ScenarioPage> {
    await this.saveButtonLink.click();
    return new ScenarioPage(this.page);
  }
}
