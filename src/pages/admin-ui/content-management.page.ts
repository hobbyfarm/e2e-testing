import { Locator, Page } from '@playwright/test';
import { BasePage, ScenarioPage, CoursePage } from '.';

/**
 * Content Management page is a top level page. It contains two subpages: Scenarios, Courses.
 */
export class ContentManagementPage extends BasePage {
  private readonly courseLink: Locator;
  readonly scenarioLink: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.courseLink = page.getByRole('link', { name: 'Courses' });
    this.scenarioLink = page.getByRole('link', { name: 'Scenarios' });
  }

  async openNewCourseModalAndSave(courseName: string, description: string, keepaliveDuration: string, pauseDuration: string): Promise<ContentManagementPage> {
    await this.courseLink.click();
    const coursePage = new CoursePage(this.page, this.username);
    await coursePage.openNewCourseForm();
    await coursePage.fillNewCourseForm(courseName, description, keepaliveDuration, pauseDuration);
    await coursePage.saveNewCourseForm();
    return new ContentManagementPage(this.page, this.username);
  }

  async openNewScenarioModalAndSave(scenarioName: string, description: string, keepaliveDuration: string, pauseDuration: string): Promise<ContentManagementPage> {
    await this.scenarioLink.click();
    const scenarioPage = new ScenarioPage(this.page, this.username);
    await scenarioPage.openNewScenarioForm();
    await scenarioPage.fillNewScenarioForm(scenarioName, description, keepaliveDuration, pauseDuration);
    await scenarioPage.saveNewScenarioForm();
    return new ContentManagementPage(this.page, this.username);
  }
}
