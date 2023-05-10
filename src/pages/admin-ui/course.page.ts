import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '.';

/**
 * Course page is a sub-page of Content Management page.
 */
export class CoursePage extends BasePage {
  private readonly newCourseButton: Locator;
  private readonly saveButton: Locator;
  private readonly nameInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly keepAliveDurationInput: Locator;
  private readonly pauseDurationInput: Locator;
  private readonly pauseableCheckbox: Locator;
  private readonly keepVMCheckbox: Locator;
  private readonly deleteButton: Locator;
  private readonly deleteDialog: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.newCourseButton = page.getByRole('button', { name: 'New Course' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.keepAliveDurationInput = page.getByLabel('Keepalive Duration');
    this.pauseDurationInput = page.getByLabel('Pause Duration');
    this.pauseableCheckbox = page.getByText('Pauseable');
    this.keepVMCheckbox = page.getByText('Keep VM');
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.deleteDialog = page.getByRole('dialog', { name: 'Delete Confirmation' });
  }

  async openNewCourseForm (): Promise<CoursePage> {
    await this.newCourseButton.click();
    return this;
  }

  async fillNewCourseForm (courseName: string, description: string, keepaliveduration: string, pauseduration: string): Promise<CoursePage> {
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
