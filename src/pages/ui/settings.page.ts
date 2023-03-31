import { Locator, Page, expect } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  readonly profilLink: Locator;
  readonly profilMAC: Locator;
  readonly profilACField: Locator;
  readonly manageAccessCodesInput: Locator;
  readonly profilAAC: Locator;
  readonly profilSAAC: Locator;
  readonly profilErrorAC: Locator;
  readonly profilSelectAC: Locator;
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
    this.profilLink = page.getByRole('button', { name: process.env.HOBBYFARM_ADMIN_UI_USR as string });
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

  async openProfil() {
    await this.profilLink.click();
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

  async accessCodeInput(accessCode: string) {
    await this.manageAccessCodesInput.fill(accessCode);
  }

  async openProfilSAAC() { // Profil Save&ActivateAccessCode
    await this.profilSAAC.click();
  }

  async openErrorAC() { // Profil Save&ActivateAccessCode
    await this.profilErrorAC.click();
  }

  async openSelectAC() {
    await this.profilSelectAC.click();
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

  async openAccessCodeAddSaveDelete(accessCode: string): Promise<SettingsPage> {
    await this.openProfil();
    await this.openProfilMAC();
    await this.openProfilAAC();
    await this.openProfilACField();
    await this.accessCodeInput(accessCode as string);
    await this.openProfilSAAC();
    await expect(this.page.getByRole('gridcell', { name: accessCode })).toHaveText(accessCode as string);
    this.page.getByRole('row', { name: 'Available actions ' + accessCode + ' No associated event' }).getByRole('button', { name: 'Available actions' }).locator('svg');
    await this.openDelete();
    await this.openClose();
    return new SettingsPage(this.page);
  }

  async openAccessCodeUnique(accessCode): Promise<SettingsPage> {
    await this.openProfil();
    await this.openProfilMAC();
    await this.openProfilAAC();
    await this.openProfilACField();
    await this.accessCodeInput(accessCode as string);
    await this.openProfilSAAC();
    await this.openProfilAAC();
    await this.openProfilACField();
    await this.accessCodeInput(accessCode as string);
    await this.openProfilSAAC();
    await this.openErrorAC();
    await this.openSelectAC();
    await this.openDelete();
    await this.openClose();
    return new SettingsPage(this.page);
  }

  async openSettingsChangeFontSize(): Promise<SettingsPage> {
    await this.openProfil();
    await this.openProfilSettings();
    await this.openFontSizeField();
    await this.openProfilFontSizeUp();
    await this.openProfilSave();
    await this.openProfil();
    await this.openProfilSettings();
    await this.openFontSizeField();
    await this.openProfilFontSizeDown();
    await this.openProfilSave();
    return new SettingsPage(this.page);
  }

  async openPasswordChangeTest(password1, password2): Promise<SettingsPage> {
    await this.openProfil();
    await this.openProfilChangePassword();
    await this.openProfilOldPasswordField();
    await this.openProfilOldPasswordInput(password1 as string);
    await this.openProfilNewPasswordField();
    await this.openProfilNewPasswordInput(password2 as string);
    await this.openProfilNewPasswordAgainField();
    await this.openProfilNewPasswordAgainInput(password2 as string);
    await this.openProfilChangePasswordB();
    return new SettingsPage(this.page);
  }

  async openPasswordChangeBack(password1, password2): Promise<SettingsPage> {
    await this.openProfil();
    await this.openProfilChangePassword();
    await this.openProfilOldPasswordField();
    await this.openProfilOldPasswordInput(password2 as string);
    await this.openProfilNewPasswordField();
    await this.openProfilNewPasswordInput(password1 as string);
    await this.openProfilNewPasswordAgainField();
    await this.openProfilNewPasswordAgainInput(password1 as string);
    await this.openProfilChangePasswordB();
    return new SettingsPage(this.page);
  }
}
