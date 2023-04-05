import { Locator, Page, expect } from '@playwright/test';

export class SettingsPage {
  private accessCode: string = 'e2e-testing' + Math.random();
  readonly page: Page;
  readonly profilMAC: Locator;
  readonly profilACField: Locator;
  readonly manageAccessCodesInput: Locator;
  readonly profilAAC: Locator;
  readonly profilSAAC: Locator;
  readonly profilErrorAC: Locator;
  readonly profilDelete: Locator;
  readonly profilClose: Locator;
  readonly profilSave: Locator;
  readonly profilSettings: Locator;
  readonly profilFontSizeField: Locator;
  readonly profilFontSize: Locator;
  readonly profilChangePassword: Locator;
  readonly profilOldPassword: Locator;
  readonly profilNewPassword: Locator;
  readonly profilNewPasswordAgain: Locator;
  readonly profilChangePasswordB: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profilMAC = page.getByRole('menuitem', { name: 'Manage Access Codes' });
    this.profilAAC = page.getByRole('button', { name: 'Add Access Code' });
    this.profilACField = page.getByLabel('Access Code', { exact: true });
    this.manageAccessCodesInput = page.getByLabel('Access Code', { exact: true });
    this.profilSAAC = page.getByRole('button', { name: 'Save & Activate' });
    this.profilErrorAC = page.getByText('error adding access code');
    this.profilDelete = page.getByRole('button', { name: 'Delete' });
    this.profilClose = page.getByText('Close');
    this.profilSave = page.getByRole('button', { name: 'Save' });
    this.profilSettings = page.getByRole('menuitem', { name: 'Settings' });
    this.profilFontSizeField = page.getByLabel('Font-Size');
    this.profilFontSize = page.getByLabel('Font-Size');
    this.profilChangePassword = page.getByRole('menuitem', { name: 'Change Password' });
    this.profilOldPassword = page.getByLabel('Old Password');
    this.profilNewPassword = page.getByLabel('New Password').nth(0);
    this.profilNewPasswordAgain = page.getByLabel('New Password Again');
    this.profilChangePasswordB = page.getByRole('button', { name: 'Change Password' });
  }

  async openProfil(user: string) {
    await this.page.getByRole('button', { name: user as string }).click();
  }

  async openProfilMAC() { //Profil ManageAccessCodes
    await this.profilMAC.click();
  }

  async openProfilAAC() { // Profil AddAccessCode
    await this.profilAAC.click();
  }

  async openProfilACField() { // Profil AccessCodeFeld
    await this.profilACField.click();
  }

  async accessCodeInput() {
    await this.manageAccessCodesInput.fill(this.accessCode);
  }

  async openProfilSAAC() { // Profil Save&ActivateAccessCode
    await this.profilSAAC.click();
  }

  async openErrorAC() {
    await this.profilErrorAC.click();
  }

  async openDelete() {
    await this.profilDelete.click();
  }

  async openClose() {
    await this.profilClose.click();
  }

  async openProfilSettings() {
    await this.profilSettings.click();
  }

  async openFontSizeField() {
    await this.profilFontSizeField.click();
  }

  async openProfilFontSizeUp() {
    await this.profilFontSize.press('ArrowUp');
  }

  async openProfilFontSizeDown() {
    await this.profilFontSize.press('ArrowDown');
  }

  async openProfilSave() {
    await this.profilSave.click();
  }

  async openProfilChangePassword() {
    await this.profilChangePassword.click();
  }

  async openProfilOldPasswordField() {
    await this.profilOldPassword.click();
  }

  async openProfilOldPasswordInput(oldPassword: string) {
    await this.profilOldPassword.fill(oldPassword);
  }

  async openProfilNewPasswordField() {
    await this.profilNewPassword.click();
  }

  async openProfilNewPasswordInput(newPassword: string) {
    await this.profilNewPassword.fill(newPassword);
  }

  async openProfilNewPasswordAgainField() {
    await this.profilNewPasswordAgain.click();
  }

  async openProfilNewPasswordAgainInput(newPasswordAgain: string) {
    await this.profilNewPasswordAgain.fill(newPasswordAgain);
  }

  async openProfilChangePasswordB() {
    await this.profilChangePasswordB.click();
  }

  async openAccessCodeAddSaveDelete(user: string): Promise<SettingsPage> {
    await this.openProfil(user as string);
    await this.openProfilMAC();
    await this.openProfilAAC();
    await this.openProfilACField();
    await this.accessCodeInput();
    await this.openProfilSAAC();
    await expect(this.page.getByText(this.accessCode + ' added.')).toHaveText(this.accessCode + ' added.' as string);
    await expect(this.page.getByRole('gridcell', { name: this.accessCode })).toHaveText(this.accessCode as string);
    await this.page.getByRole('row', { name: 'Available actions ' + this.accessCode + ' No associated event' }).getByRole('button', { name: 'Available actions' }).locator('svg').click();
    await this.openDelete();
    await this.openClose();
    return new SettingsPage(this.page);
  }

  async openAccessCodeUnique(user: string): Promise<SettingsPage> {
    await this.openProfil(user as string);
    await this.openProfilMAC();
    await this.openProfilAAC();
    await this.openProfilACField();
    await this.accessCodeInput();
    await this.openProfilSAAC();
    await expect(this.page.getByText('Add Access Code')).toHaveText('Add Access Code' as string);
    await this.openProfilAAC();
    await this.openProfilAAC();
    await this.openProfilACField();
    await this.accessCodeInput();
    await this.openProfilSAAC();
    await this.openErrorAC();
    await expect(this.page.getByRole('gridcell', { name: this.accessCode })).toHaveText(this.accessCode as string);
    await this.page.getByRole('row', { name: 'Available actions ' + this.accessCode + ' No associated event' }).getByRole('button', { name: 'Available actions' }).locator('svg').click();
    await this.openDelete();
    await this.openClose();
    return new SettingsPage(this.page);
  }

  async openSettingsChangeFontSize(user: string): Promise<SettingsPage> {
    await this.openProfil(user as string);
    await this.openProfilSettings();
    await this.openFontSizeField();
    await this.openProfilFontSizeUp();
    await this.openProfilSave();
    await this.openProfil(user as string);
    await this.openProfilSettings();
    await this.openFontSizeField();
    await this.openProfilFontSizeDown();
    await this.openProfilSave();
    return new SettingsPage(this.page);
  }

  async openPasswordChangeTest(user: string, oldPassword: string, newPassword: string): Promise<SettingsPage> {
    await this.openProfil(user as string);
    await this.openProfilChangePassword();
    await this.openProfilOldPasswordField();
    await this.openProfilOldPasswordInput(oldPassword as string);
    await this.openProfilNewPasswordField();
    await this.openProfilNewPasswordInput(newPassword as string);
    await this.openProfilNewPasswordAgainField();
    await this.openProfilNewPasswordAgainInput(newPassword as string);
    await this.openProfilChangePasswordB();
    return new SettingsPage(this.page);
  }

  async openPasswordChangeBack(user: string, oldPassword: string, newPassword: string): Promise<SettingsPage> {
    await this.openProfil(user as string);
    await this.openProfilChangePassword();
    await this.openProfilOldPasswordField();
    await this.openProfilOldPasswordInput(newPassword as string);
    await this.openProfilNewPasswordField();
    await this.openProfilNewPasswordInput(oldPassword as string);
    await this.openProfilNewPasswordAgainField();
    await this.openProfilNewPasswordAgainInput(oldPassword as string);
    await this.openProfilChangePasswordB();
    return new SettingsPage(this.page);
  }
}
