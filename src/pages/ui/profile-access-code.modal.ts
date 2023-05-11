import { Locator, Page } from '@playwright/test';

/**
 * Profile access code modal.
 */
export class ProfileAccessCodeModal {
  private readonly page: Page;
  private readonly addAccessCodeButton: Locator;
  private readonly accessCodeInput: Locator;
  private readonly saveButton: Locator;
  private readonly saveAndActivateButton: Locator;
  private readonly closeButton: Locator;
  private readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addAccessCodeButton = page.getByRole('button', { name: 'Add Access Code' });
    this.accessCodeInput = page.getByLabel('Access Code', { exact: true });
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    this.saveAndActivateButton = page.getByRole('button', { name: 'Save & Activate' });
    this.closeButton = page.getByText('Close');
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
  }

  public async addAccessCode(accessCode: string) {
    await this.addAccessCodeButton.click();
    await this.accessCodeInput.click();
    await this.accessCodeInput.fill(accessCode);
    await this.saveButton.click();
    await this.page.getByText(`${accessCode} added.`).waitFor({state: 'hidden'});
    await this.closeButton.click();
  }

  public async addAccessCodeAndValidate(accessCode: string) {
    await this.addAccessCodeButton.click();
    await this.accessCodeInput.click();
    await this.accessCodeInput.fill(accessCode);
    await this.saveAndActivateButton.click();
    await this.page.getByText(`${accessCode} added.`).waitFor({state: 'hidden'});
    await this.closeButton.click();
  }

  public async deleteAccessCode(accessCode: string) {
    await this.page.getByRole('row', { name: `Available actions ${accessCode} No associated event` }).getByRole('button', { name: 'Available actions' }).locator('svg').click();
    await this.deleteButton.click();
    await this.closeButton.click();
  }
}
