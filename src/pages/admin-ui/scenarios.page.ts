import { expect, Locator, Page } from '@playwright/test';
import { ContentManagementPage } from '.';

export class ScenarioPage {
  readonly page: Page;
  readonly newScenarioButton: Locator;
  readonly saveButtonLink: Locator;
  readonly cancelButtonLink: Locator;

  readonly newScenarioName: Locator;
  readonly newScenarioDescription: Locator;
  readonly newScenarioKeepaliveDuration: Locator;
  readonly newScenarioPauseDuration: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.newScenarioButton = page.getByRole('button', { name: 'New Scenario' });
    this.newScenarioName = page.getByRole('textbox', { name: 'Name' });
    this.newScenarioDescription = page.getByRole('textbox', { name: 'Description' });
    this.newScenarioKeepaliveDuration = page.getByLabel('Keepalive Duration');
    this.newScenarioPauseDuration = page.getByLabel('Pause Duration');
    this.saveButtonLink = page.getByRole('button', { name: 'Save' });
    this.cancelButtonLink = page.getByRole('button', { name: 'Cancel' });
  }

  async goto(url: string) {
    await this.page.goto(`${url}/content/courses`);
    await expect(this.page).toHaveURL(`${url}/content/scenarios`);
  }

  async openNewScenarioModal() {
    await this.newScenarioButton.click();
  }

  async fillScenarioModal(name: string, description: string, keepaliveduration: string, pauseduration: string): Promise<ContentManagementPage> {
    await this.newScenarioName.fill(name);
    await this.newScenarioDescription.fill(description);
    await this.newScenarioKeepaliveDuration.fill(keepaliveduration);
    await this.newScenarioPauseDuration.fill(pauseduration);
    await this.saveButtonLink.click();
    return new ContentManagementPage(this.page, name);
  }
}
