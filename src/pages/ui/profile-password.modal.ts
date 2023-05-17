import { Locator, Page } from '@playwright/test';

/**
 * Profile password modal.
 */
export class ProfilePasswordModal {
  private readonly confirmationNotification: Locator;
  private readonly newPasswordConfirmationInput: Locator;
  private readonly newPasswordInput: Locator;
  private readonly oldPasswordInput: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    this.confirmationNotification = page.getByText('password changed. Logging you out...');
    this.newPasswordConfirmationInput = page.getByLabel('New Password Again');
    this.newPasswordInput = page.getByLabel('New Password', { exact: true });
    this.oldPasswordInput = page.getByLabel('Old Password');
    this.saveButton = page.getByRole('button', { name: 'Change Password' });
  }

  public async changePassword(currentPassword: string, newPassword: string) {
    await this.oldPasswordInput.click();
    await this.oldPasswordInput.fill(currentPassword);
    await this.newPasswordInput.click();
    await this.newPasswordInput.fill(newPassword);
    await this.newPasswordConfirmationInput.click();
    await this.newPasswordConfirmationInput.fill(newPassword);
    await this.saveButton.click();
    await this.confirmationNotification.waitFor({ state: 'hidden' });
  }
}
