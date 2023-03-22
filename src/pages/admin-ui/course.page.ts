import { Locator, Page } from '@playwright/test';

export class CoursePage {
  private readonly page: Page;
  private readonly newCourseButton: Locator;
  private readonly saveButtonLink: Locator;
  private readonly cancelButtonLink: Locator;
  private readonly newCourseName: Locator;
  private readonly newCourseDescription: Locator;
  private readonly newCourseKeepaliveDuration: Locator;
  private readonly newCoursePauseDuration: Locator;
  private readonly newCoursePauseable: Locator;
  private readonly newCourseKeepVM: Locator;
  private readonly selectCourse: Locator;
  private readonly deleteCourseButton: Locator;
  private readonly deleteConfirm: Locator;
  private readonly courseLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.courseLink = page.getByRole('link', { name: 'Courses' })
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

  async openNewCourseForm (): Promise<CoursePage> {
    await this.courseLink.click();
    await this.newCourseButton.click();
    return new CoursePage(this.page);
  }

  async fillNewCourseForm (courseName: string, description: string, keepaliveduration: string, pauseduration: string): Promise<CoursePage> {
    await this.newCourseName.fill(courseName);
    await this.newCourseDescription.fill(description);
    await this.newCourseKeepaliveDuration.fill(keepaliveduration);
    await this.newCoursePauseDuration.fill(pauseduration);
    await this.newCoursePauseable.click();
    await this.newCourseKeepVM.click();
    return new CoursePage(this.page);
  }

  async saveNewCourseForm(): Promise<CoursePage> {
    await this.saveButtonLink.click();
    return new CoursePage(this.page);
  }

  async deleteCourse(): Promise<CoursePage> {
    await this.selectCourse.dispatchEvent('click');
    await this.deleteCourseButton.dispatchEvent('click');
    await this.deleteConfirm.dispatchEvent('click');
    return new CoursePage(this.page);
  }
}
