import { Locator, Page } from '@playwright/test';
import { BasePage } from '.';

/**
 * Scenario page is a sub-page of Content Management page.
 */
export class ScenarioPage extends BasePage {
  readonly descriptionInput: Locator;
  readonly keepAliveDurationInput: Locator;
  readonly nameInput: Locator;
  readonly newScenarioButton: Locator;
  readonly pauseDurationInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.keepAliveDurationInput = page.getByLabel('Keepalive Duration');
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.newScenarioButton = page.getByRole('button', { name: 'New Scenario' });
    this.pauseDurationInput = page.getByLabel('Pause Duration');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async openNewScenarioForm(): Promise<ScenarioPage> {
    await this.newScenarioButton.click();
    return this;
  }

  async fillNewScenarioForm(scenarioName: string, description: string, keepaliveduration: string, pauseduration: string): Promise<ScenarioPage> {
    await this.nameInput.fill(scenarioName);
    await this.descriptionInput.fill(description);
    await this.keepAliveDurationInput.fill(keepaliveduration);
    await this.pauseDurationInput.fill(pauseduration);
    return this;
  }

  async saveNewScenarioForm(): Promise<ScenarioPage> {
    await this.saveButton.click();
    return this;
  }
}
