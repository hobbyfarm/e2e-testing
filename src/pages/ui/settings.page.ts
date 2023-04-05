import { Locator, Page, expect } from '@playwright/test';

export class SettingsPage {
  private accessCode: string = 'e2e-testing' + Math.random();
  private fontSize: number = 14;
  private fontSizeNew: number = this.fontSize+1;
  readonly page: Page;
  readonly profileMAC: Locator;
  readonly profileACField: Locator;
  readonly manageAccessCodesInput: Locator;
  readonly profileAAC: Locator;
  readonly profileSAAC: Locator;
  readonly profileErrorAC: Locator;
  readonly profileDelete: Locator;
  readonly profileClose: Locator;
  readonly profileSave: Locator;
  readonly profileSettings: Locator;
  readonly profileFontSizeField: Locator;
  readonly profileFontSize: Locator;
  readonly profileChangePassword: Locator;
  readonly profileOldPassword: Locator;
  readonly profileNewPassword: Locator;
  readonly profileNewPasswordAgain: Locator;
  readonly profileChangePasswordB: Locator;
  readonly profileTerminalTheme: Locator;
  readonly profileTerminalThemeNew: Locator;
  readonly profileTerminalThemeOld: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileMAC = page.getByRole('menuitem', { name: 'Manage Access Codes' });
    this.profileAAC = page.getByRole('button', { name: 'Add Access Code' });
    this.profileACField = page.getByLabel('Access Code', { exact: true });
    this.manageAccessCodesInput = page.getByLabel('Access Code', { exact: true });
    this.profileSAAC = page.getByRole('button', { name: 'Save & Activate' });
    this.profileErrorAC = page.getByText('error adding access code');
    this.profileDelete = page.getByRole('button', { name: 'Delete' });
    this.profileClose = page.getByText('Close');
    this.profileSave = page.getByRole('button', { name: 'Save' });
    this.profileSettings = page.getByRole('menuitem', { name: 'Settings' });
    this.profileFontSizeField = page.getByLabel('Font-Size');
    this.profileFontSize = page.getByLabel('Font-Size');
    this.profileChangePassword = page.getByRole('menuitem', { name: 'Change Password' });
    this.profileOldPassword = page.getByLabel('Old Password');
    this.profileNewPassword = page.getByLabel('New Password').nth(0);
    this.profileNewPasswordAgain = page.getByLabel('New Password Again');
    this.profileChangePasswordB = page.getByRole('button', { name: 'Change Password' });
    this.profileTerminalTheme = page.getByRole('tab', { name: 'Terminal Theme' });
    this.profileTerminalThemeNew = page.locator('div:nth-child(2) > .theme-preview-radio-box > .theme-preview-container > .theme-preview-terminal');
    this.profileTerminalThemeOld = page.locator('.theme-preview-terminal').first();
  }

  async openProfile(user: string) {
    await this.page.getByRole('button', { name: user as string }).click();
  }

  async openProfileMAC() { //profile ManageAccessCodes
    await this.profileMAC.click();
  }

  async openProfileAAC() { // profile AddAccessCode
    await this.profileAAC.click();
  }

  async openProfileACField() { // profile AccessCodeFeld
    await this.profileACField.click();
  }

  async accessCodeInput() {
    await this.manageAccessCodesInput.fill(this.accessCode);
  }

  async openProfileSAAC() { // profile Save&ActivateAccessCode
    await this.profileSAAC.click();
  }

  async openErrorAC() {
    await this.profileErrorAC.click();
  }

  async openDelete() {
    await this.profileDelete.click();
  }

  async openClose() {
    await this.profileClose.click();
  }

  async openProfileSettings() {
    await this.profileSettings.click();
  }

  async openProfileFontSizeField() {
    await this.profileFontSizeField.click();
  }

  async openProfileFillFontSize() {
    await this.profileFontSize.fill(this.fontSize.toString());
  }

  async openProfileFontSizeUp() {
    await this.profileFontSize.press('ArrowUp');
  }

  async openProfileFontSizeDown() {
    await this.profileFontSize.press('ArrowDown');
  }

  async openProfileSave() {
    await this.profileSave.click();
  }

  async openProfileChangePassword() {
    await this.profileChangePassword.click();
  }

  async openProfileOldPasswordField() {
    await this.profileOldPassword.click();
  }

  async openProfileOldPasswordInput(oldPassword: string) {
    await this.profileOldPassword.fill(oldPassword);
  }

  async openProfileNewPasswordField() {
    await this.profileNewPassword.click();
  }

  async openProfileNewPasswordInput(newPassword: string) {
    await this.profileNewPassword.fill(newPassword);
  }

  async openProfileNewPasswordAgainField() {
    await this.profileNewPasswordAgain.click();
  }

  async openProfileNewPasswordAgainInput(newPasswordAgain: string) {
    await this.profileNewPasswordAgain.fill(newPasswordAgain);
  }

  async openProfileChangePasswordB() {
    await this.profileChangePasswordB.click();
  }

  async openProfileTerminalTheme() {
    await this.profileTerminalTheme.click();
  }

  async openProfileTerminalThemeNew() {
    await this.profileTerminalThemeNew.click();
  }

  async openProfileTerminalThemeOld() {
    await this.profileTerminalThemeOld.click();
  }

  async openAccessCodeAddSaveDelete(user: string): Promise<SettingsPage> {
    await this.openProfile(user as string);
    await this.openProfileMAC();
    await this.openProfileAAC();
    await this.openProfileACField();
    await this.accessCodeInput();
    await this.openProfileSAAC();
    await expect(this.page.getByText(this.accessCode + ' added.')).toHaveText(this.accessCode + ' added.' as string);
    await expect(this.page.getByRole('gridcell', { name: this.accessCode })).toHaveText(this.accessCode as string);
    await this.page.getByRole('row', { name: 'Available actions ' + this.accessCode + ' No associated event' }).getByRole('button', { name: 'Available actions' }).locator('svg').click();
    await this.openDelete();
    await this.openClose();
    return new SettingsPage(this.page);
  }

  async openAccessCodeUnique(user: string): Promise<SettingsPage> {
    await this.openProfile(user as string);
    await this.openProfileMAC();
    await this.openProfileAAC();
    await this.openProfileACField();
    await this.accessCodeInput();
    await this.openProfileSAAC();
    await expect(this.page.getByText('Add Access Code')).toHaveText('Add Access Code' as string);
    for (let i = 0; i < 10; i++) {
      await this.openProfileAAC();
    }
    await this.openProfileACField();
    await this.accessCodeInput();
    await this.openProfileSAAC();
    await this.openErrorAC();
    await expect(this.page.getByRole('gridcell', { name: this.accessCode })).toHaveText(this.accessCode as string);
    await this.page.getByRole('row', { name: 'Available actions ' + this.accessCode + ' No associated event' }).getByRole('button', { name: 'Available actions' }).locator('svg').click();
    await this.openDelete();
    await this.openClose();
    return new SettingsPage(this.page);
  }

  async openSettingsChangeFontSize(user: string): Promise<SettingsPage> {
    await this.openProfile(user as string);
    await this.openProfileSettings();
    await this.openProfileFontSizeField();
    await this.openProfileFillFontSize();
    await this.openProfileFontSizeUp();
    await this.openProfileSave();
    await this.openProfile(user as string);
    await this.openProfileSettings();
    await expect(this.page.getByLabel('Font-Size')).toHaveValue(this.fontSizeNew.toString());
    await expect(this.page.locator('clr-checkbox-wrapper label')).toBeChecked();
    await this.openProfileFontSizeField();
    await this.openProfileFontSizeDown();
    await this.openProfileSave();
    return new SettingsPage(this.page);
  }

  async openPasswordChangeTest(user: string, oldPassword: string, newPassword: string): Promise<SettingsPage> {
    await this.openProfile(user as string);
    await this.openProfileChangePassword();
    await this.openProfileOldPasswordField();
    await this.openProfileOldPasswordInput(oldPassword as string);
    await this.openProfileNewPasswordField();
    await this.openProfileNewPasswordInput(newPassword as string);
    await this.openProfileNewPasswordAgainField();
    await this.openProfileNewPasswordAgainInput(newPassword as string);
    await this.openProfileChangePasswordB();
    return new SettingsPage(this.page);
  }

  async openPasswordChangeBack(user: string, oldPassword: string, newPassword: string): Promise<SettingsPage> {
    await this.openProfile(user as string);
    await this.openProfileChangePassword();
    await this.openProfileOldPasswordField();
    await this.openProfileOldPasswordInput(newPassword as string);
    await this.openProfileNewPasswordField();
    await this.openProfileNewPasswordInput(oldPassword as string);
    await this.openProfileNewPasswordAgainField();
    await this.openProfileNewPasswordAgainInput(oldPassword as string);
    await this.openProfileChangePasswordB();
    return new SettingsPage(this.page);
  }

  async openSettingsChangeTheme(user: string): Promise<SettingsPage> { //Change Terminal Theme
    await this.openProfile(user as string);
    await this.openProfileSettings();
    await this.openProfileTerminalTheme();
    await this.openProfileTerminalThemeNew();
    await this.openProfileSave();
    await this.openProfile(user as string);
    await this.openProfileSettings();
    await expect(this.page.locator('div:nth-child(2) > .theme-preview-radio-box > .theme-preview-container > .theme-preview-terminal')).toBeChecked();
    await this.openProfileTerminalThemeOld();
    await expect(this.page.locator('div:nth-child(1) > .theme-preview-radio-box > .theme-preview-container > .theme-preview-terminal')).toBeChecked();
    await this.openProfileSave();
    return new SettingsPage(this.page);
  }
}
