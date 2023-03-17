import { Locator, Page } from '@playwright/test';
import { ContentManagementPage } from '.';

export class CoursePage {
  readonly page: Page;
  readonly newCourseButton: Locator;
  readonly saveButtonLink: Locator;
  readonly cancelButtonLink: Locator;
  readonly newCourseName: Locator;
  readonly newCourseDescription: Locator;
  readonly newCourseKeepaliveDuration: Locator;
  readonly newCoursePauseDuration: Locator;
  readonly newCoursePauseable: Locator;
  readonly newCourseKeepVM: Locator;
  readonly selectCourse: Locator;
  readonly deleteCourseButton: Locator;
  readonly deleteConfirm: Locator;
  readonly courseLink: Locator;

  constructor(page: Page, username: string) {
    this.page = page;
    this.courseLink = page.getByRole('link', { name: 'Courses' });
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

  async openNewCourseForm (): Promise<ContentManagementPage> {
    await this.courseLink.click();
    return await this.openNewCourseForm();
  }

  async fillNewCourseForm (courseName: string, description: string, keepaliveduration: string, pauseduration: string): Promise<ContentManagementPage> {
    await this.newCourseName.fill(courseName);
    await this.newCourseDescription.fill(description);
    await this.newCourseKeepaliveDuration.fill(keepaliveduration);
    await this.newCoursePauseDuration.fill(pauseduration);
    await this.newCoursePauseable.click();
    await this.newCourseKeepVM.click();
    return await this.fillNewCourseForm(courseName, description, keepaliveduration, pauseduration);
  }

  async saveNewCourseForm(): Promise<ContentManagementPage> {
    await this.saveButtonLink.click();
    return await this.saveNewCourseForm();
  }

  async deleteCourse(): Promise<ContentManagementPage> {
    await this.selectCourse.dispatchEvent('click');
    await this.deleteCourseButton.dispatchEvent('click');
    await this.deleteConfirm.dispatchEvent('click');
    return await this.deleteCourse();
  }
}
