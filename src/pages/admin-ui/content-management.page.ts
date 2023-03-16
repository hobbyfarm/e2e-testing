import { Locator, Page } from '@playwright/test';
import { BasePage } from '.';

export class ContentManagementPage extends BasePage {
  readonly newCourseButton: Locator;
  readonly newScenarioButton: Locator;
  readonly saveButtonLink: Locator;
  readonly cancelButtonLink: Locator;
  readonly courseLink: Locator;
  readonly scenarioLink: Locator;
  readonly newCourseName: Locator;
  readonly newCourseDescription: Locator;
  readonly newCourseKeepaliveDuration: Locator;
  readonly newCoursePauseDuration: Locator;
  readonly newCoursePauseable: Locator;
  readonly newCourseKeepVM: Locator;
  readonly newScenarioName: Locator;
  readonly newScenarioDescription: Locator;
  readonly newScenarioKeepaliveDuration: Locator;
  readonly newScenarioPauseDuration: Locator;
  readonly selectCourse: Locator;
  readonly deleteCourseButton: Locator;
  readonly deleteConfirm: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.courseLink = page.getByRole('link', { name: 'Courses' });
    this.newCourseButton = page.getByRole('button', { name: 'New Course' });
    this.newCourseName = page.getByRole('textbox', { name: 'Name' });
    this.newCourseDescription = page.getByRole('textbox', { name: 'Description' });
    this.newCourseKeepaliveDuration = page.getByLabel('Keepalive Duration');
    this.newCoursePauseDuration = page.getByLabel('Pause Duration');
    this.newCoursePauseable = page.getByText('Pauseable');
    this.newCourseKeepVM = page.getByText('Keep VM');
    this.scenarioLink = page.getByRole('link', { name: 'Scenarios' });
    this.newScenarioButton = page.getByRole('button', { name: 'New Scenario' });
    this.newScenarioName = page.getByRole('textbox', { name: 'Name' });
    this.newScenarioDescription = page.getByRole('textbox', { name: 'Description' });
    this.newScenarioKeepaliveDuration = page.getByLabel('Keepalive Duration');
    this.newScenarioPauseDuration = page.getByLabel('Pause Duration');
    this.saveButtonLink = page.getByRole('button', { name: 'Save' });
    this.cancelButtonLink = page.getByRole('button', { name: 'Cancel' });
    this.saveButtonLink = page.getByRole('button', { name: 'Save' });
    this.cancelButtonLink = page.getByRole('button', { name: 'Cancel' });
    this.selectCourse = page.getByRole('gridcell', { name: 'Select' }).getByRole('radio');
    this.deleteCourseButton = page.getByRole('button', { name: 'Delete' });
    this.deleteConfirm = page.getByRole('dialog', { name: 'Delete Confirmation' }).getByRole('button', { name: 'Delete' });
  }

  async OpenNewCourseModalAndSave(name: string, description: string, keepaliveduration: string, pauseduration: string): Promise<ContentManagementPage> {
    await this.courseLink.click();
    await this.newCourseButton.click();
    await this.newCourseName.fill(name);
    await this.newCourseDescription.fill(description);
    await this.newCourseKeepaliveDuration.fill(keepaliveduration);
    await this.newCoursePauseDuration.fill(pauseduration);
    await this.newCoursePauseable.click();
    await this.newCourseKeepVM.click();
    await this.saveButtonLink.click();
    return this;
  }

  async OpenNewScenarioModalAndSave(name: string, description: string, keepaliveduration: string, pauseduration: string): Promise<ContentManagementPage> {
    await this.scenarioLink.click();
    await this.newScenarioButton.click();
    await this.newScenarioName.fill(name);
    await this.newScenarioDescription.fill(description);
    await this.newScenarioKeepaliveDuration.fill(keepaliveduration);
    await this.newScenarioPauseDuration.fill(pauseduration);
    await this.saveButtonLink.click();
    return this;
  }

  async deleteCourse() {
    await this.selectCourse.dispatchEvent('click');
    await this.deleteCourseButton.dispatchEvent('click');
    await this.deleteConfirm.dispatchEvent('click');
  }
}
