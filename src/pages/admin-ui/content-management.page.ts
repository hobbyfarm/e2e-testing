import { Page } from '@playwright/test';
import { BasePage, ScenarioPage, CoursePage } from '.';

export class ContentManagementPage extends BasePage {
  readonly page: Page;

  constructor(page: Page, username: string) {
    super(page, username)
    this.page = page;
  }

  async openNewCourseModalAndSaveAndDelete(courseName: string, description: string, keepaliveduration: string, pauseduration: string): Promise<ContentManagementPage> {
    let coursePage = new CoursePage(this.page);
    await coursePage.openNewCourseForm();
    await coursePage.fillNewCourseForm(courseName, description, keepaliveduration, pauseduration);
    await coursePage.saveNewCourseForm();
    await coursePage.deleteCourse();
    return new ContentManagementPage(this.page, this.username);
  }

  async openNewScenarioModalAndSave(scenarioName: string, description: string, keepaliveduration: string, pauseduration: string): Promise<ContentManagementPage> {
    let scenarioPage = new ScenarioPage(this.page);
    await scenarioPage.openNewScenarioForm();
    await scenarioPage.fillNewScenarioForm(scenarioName, description, keepaliveduration, pauseduration);
    await scenarioPage.saveNewScenarioForm();
    return new ContentManagementPage(this.page, this.username);
  }
}
