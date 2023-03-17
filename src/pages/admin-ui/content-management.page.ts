import { Locator, Page } from '@playwright/test';
import { BasePage, ScenarioPage, CoursePage } from '.';

export class ContentManagementPage extends BasePage {

  constructor(page: Page, username: string) {
    super(page, username);
  }

  async openNewCourseModalAndSaveAndDelete(courseName: string, description: string, keepaliveduration: string, pauseduration: string): Promise<ContentManagementPage> {
    let coursePage = new CoursePage(this.page, courseName);
    await coursePage.openNewCourseForm();
    await coursePage.fillNewCourseForm(courseName, description, keepaliveduration, pauseduration);
    await coursePage.saveNewCourseForm();
    await coursePage.deleteCourse();
    return await this.openNewCourseModalAndSaveAndDelete(courseName, description, keepaliveduration, pauseduration);
  }

  async openNewScenarioModalAndSave(scenarioName: string, description: string, keepaliveduration: string, pauseduration: string): Promise<ContentManagementPage> {
    let scenarioPage = new ScenarioPage(this.page, scenarioName);
    await scenarioPage.openNewScenarioForm();
    await scenarioPage.fillNewScenarioForm(scenarioName, description, keepaliveduration, pauseduration);
    await scenarioPage.saveNewScenarioForm();
    return await this.openNewScenarioModalAndSave(scenarioName, description, keepaliveduration, pauseduration);
  }
}
