import { Locator, Page } from '@playwright/test';
import { BasePage, ContentManagementPage } from '.';

export class CoursePage extends ContentManagementPage {
  readonly page: Page;
  readonly newCourseButton: Locator;
  readonly saveButtonLink: Locator;
  readonly cancelButtonLink: Locator;
  readonly courseLink: Locator;
  readonly newCourseName: Locator;
  readonly newCourseDescription: Locator;
  readonly newCourseKeepaliveDuration: Locator;
  readonly newCoursePauseDuration: Locator;
  readonly newCoursePauseable: Locator;
  readonly newCourseKeepVM: Locator;
  readonly selectCourse: Locator;
  readonly deleteCourseButton: Locator;
  readonly deleteConfirm: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.page = page;
    this.courseLink = page.getByRole('link', { name: 'Courses' });
    this.newCourseButton = page.getByRole('button', { name: 'New Course' });
    this.newCourseName = page.getByRole('textbox', { name: 'Name' });
    this.newCourseDescription = page.getByRole('textbox', { name: 'Description' });
    this.newCourseKeepaliveDuration = page.getByLabel('Keepalive Duration');
    this.newCoursePauseDuration = page.getByLabel('Pause Duration');
    this.newCoursePauseable = page.getByText('Pauseable');
    this.newCourseKeepVM = page.getByText('Keep VM');
    this.saveButtonLink = page.getByRole('button', { name: 'Save' });
    this.cancelButtonLink = page.getByRole('button', { name: 'Cancel' });
    this.selectCourse = page.getByRole('gridcell', { name: 'Select' }).getByRole('radio');
    this.deleteCourseButton = page.getByRole('button', { name: 'Delete' });
    this.deleteConfirm = page.getByRole('dialog', { name: 'Delete Confirmation' }).getByRole('button', { name: 'Delete' });
  }

  async openNewCourseModalAndSave(name: string, description: string, keepaliveduration: string, pauseduration: string): Promise<ContentManagementPage> {
    await this.courseLink.click();
    let coursePage = new CoursePage(this.page, name);
    await this.newCourseName.fill(name);
    await this.newCourseDescription.fill(description);
    await this.newCourseKeepaliveDuration.fill(keepaliveduration);
    await this.newCoursePauseDuration.fill(pauseduration);
    await this.newCoursePauseable.click();
    await this.newCourseKeepVM.click();
    await this.saveButtonLink.click();
    return await coursePage.openNewCourseModalAndSave(name, description, keepaliveduration, pauseduration);
  }

  async deleteCourse() {
    await this.selectCourse.dispatchEvent('click');
    await this.deleteCourseButton.dispatchEvent('click');
    await this.deleteConfirm.dispatchEvent('click');
  }
}
