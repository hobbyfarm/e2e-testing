import { Page } from '@playwright/test';
import { BasePage, ScenarioPage, CoursePage } from '.';

export class ContentManagementPage extends BasePage {
  readonly page: Page;

  constructor(page: Page, username: string) {
    super(page, username);
    this.page = page;
  }

  async openNewCourseModalAndSaveAndDelete(courseName: string, description: string, keepaliveDuration: string, pauseDuration: string): Promise<ContentManagementPage> {
    const coursePage = new CoursePage(this.page);
    await coursePage.openNewCourseForm();
    await coursePage.fillNewCourseForm(courseName, description, keepaliveDuration, pauseDuration);
    await coursePage.saveNewCourseForm();
    await coursePage.deleteCourse();
    return new ContentManagementPage(this.page, this.username);
  }

  async openNewScenarioModalAndSave(scenarioName: string, description: string, keepaliveDuration: string, pauseDuration: string): Promise<ContentManagementPage> {
    const scenarioPage = new ScenarioPage(this.page);
    await scenarioPage.openNewScenarioForm();
    await scenarioPage.fillNewScenarioForm(scenarioName, description, keepaliveDuration, pauseDuration);
    await scenarioPage.saveNewScenarioForm();
    return new ContentManagementPage(this.page, this.username);
  }
}
