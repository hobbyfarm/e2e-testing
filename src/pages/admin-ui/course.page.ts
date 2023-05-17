import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '.';

/**
 * Course page is a sub-page of Content Management page.
 */
export class CoursePage extends BasePage {
  private readonly creationNotification: Locator;
  private readonly descriptionInput: Locator;
  private readonly deleteButton: Locator;
  private readonly deleteDialog: Locator;
  private readonly keepAliveDurationInput: Locator;
  private readonly keepVMCheckbox: Locator;
  private readonly nameInput: Locator;
  private readonly newCourseButton: Locator;
  private readonly pauseableCheckbox: Locator;
  private readonly pauseDurationInput: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.creationNotification = page.getByText('Course created');
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.deleteDialog = page.getByRole('dialog', { name: 'Delete Confirmation' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.keepAliveDurationInput = page.getByLabel('Keepalive Duration');
    this.keepVMCheckbox = page.getByText('Keep VM');
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.newCourseButton = page.getByRole('button', { name: 'New Course' });
    this.pauseableCheckbox = page.getByText('Pauseable');
    this.pauseDurationInput = page.getByLabel('Pause Duration');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async openNewCourseForm(): Promise<CoursePage> {
    await this.newCourseButton.click();
    return this;
  }

  async fillNewCourseForm(courseName: string, description: string, keepaliveduration: string, pauseduration: string): Promise<CoursePage> {
    await this.nameInput.fill(courseName);
    await this.descriptionInput.fill(description);
    await this.keepAliveDurationInput.fill(keepaliveduration);
    await this.pauseDurationInput.fill(pauseduration);
    await this.pauseableCheckbox.check();
    await this.keepVMCheckbox.check();
    return this;
  }

  async saveNewCourseForm(): Promise<CoursePage> {
    await this.saveButton.click();
    await this.creationNotification.waitFor({ state: 'hidden' });
    return this;
  }

  // TODO (Bertrand 2023-03-23): investigate this method as it was not working in the CI pipeline and my computer
  async deleteCourse(name: string): Promise<CoursePage> {
    await this.page.getByRole('row', { name: name }).locator('label').click();
    await this.deleteButton.click();
    await expect(this.deleteDialog).toBeVisible();
    await this.deleteButton.click();
    return this;
  }
}
