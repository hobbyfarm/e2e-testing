import { Locator, Page, expect } from '@playwright/test';

export class SettingsPage {
  private accessCode: string = 'e2e-testing' + Math.random();
  private accessCodeLearnPage = 'schulungsentwicklung';
  private fontSize = 14;
  private fontSizeNew = this.fontSize+1;
  readonly page: Page;
  readonly buttonNext: Locator;
  readonly buttonPrev: Locator;
  readonly buttonPause: Locator;
  readonly buttonDelete: Locator;
  readonly buttonSave: Locator;
  readonly buttonClose: Locator;
  readonly buttonContinue: Locator;
  readonly buttonSelectAvailableActions: Locator;
  readonly textClose: Locator;
  readonly roleProgressbar: Locator;
  readonly profileMAC: Locator;
  readonly profileACField: Locator;
  readonly manageAccessCodesInput: Locator;
  readonly profileAAC: Locator;
  readonly profileSAAC: Locator;
  readonly profileErrorAC: Locator;
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
  readonly learnPageStartScenario: Locator;
  readonly learnPageRunningScenario: Locator;
  readonly learnPageBeginScenario: Locator;
  readonly learnPageFinish: Locator;
  readonly learnPageFinishSure: Locator;
  readonly learnPageResumeScenario: Locator;
  readonly learnPageCloseScenario: Locator;
  readonly learnPageTerminateSession: Locator;
  readonly learnPageShellConnect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonNext = page.getByRole('button', { name: 'Next' });
    this.buttonPrev = page.getByRole('button', { name: 'Prev' });
    this.buttonPause = page.getByRole('button', { name: 'Pause' });
    this.buttonDelete = page.getByRole('button', { name: 'Delete' });
    this.buttonSave = page.getByRole('button', { name: 'Save' });
    this.buttonClose = page.getByRole('button', { name: 'Close' });
    this.buttonContinue = page.getByRole('button', { name: 'Continue' });
    this.buttonSelectAvailableActions = page.getByRole('button', { name: 'Available actions' }).locator('svg');
    this.textClose = page.getByText('Close');
    this.roleProgressbar = page.getByRole('progressbar');
    this.profileMAC = page.getByRole('menuitem', { name: 'Manage Access Codes' });
    this.profileAAC = page.getByRole('button', { name: 'Add Access Code' });
    this.profileACField = page.getByLabel('Access Code', { exact: true });
    this.manageAccessCodesInput = page.getByLabel('Access Code', { exact: true });
    this.profileSAAC = page.getByRole('button', { name: 'Save & Activate' });
    this.profileErrorAC = page.getByText('error adding access code');
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
    this.learnPageStartScenario = page.locator('app-scenario-card').filter({ hasText: 'Docker Intro Introduction to the docker engine, containers, images and isolation' }).getByRole('button', { name: 'Start Scenario' });
    this.learnPageRunningScenario = page.getByRole('cell', { name: 'running' });
    this.learnPageBeginScenario = page.getByRole('button', { name: 'Begin Scenario' });
    this.learnPageFinish = page.locator('#step-navigator').getByRole('button', { name: 'Finish' });
    this.learnPageFinishSure = page.getByRole('dialog', { name: 'Are you sure you want to finish?' }).getByRole('button', { name: 'Finish' });
    this.learnPageResumeScenario = page.getByRole('button', { name: 'Resume Scenario' });
    this.learnPageCloseScenario = page.getByRole('button', { name: 'Close Scenario' });
    this.learnPageTerminateSession = page.getByRole('button', { name: 'Terminate Session' });
    this.learnPageShellConnect = page.getByRole('cell', { name: 'Shell Status: Connected' });
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

  async accessCodeInputLearnPage() {
    await this.manageAccessCodesInput.fill(this.accessCodeLearnPage);
  }

  async openProfileSAAC() { // profile Save&ActivateAccessCode
    await this.profileSAAC.click();
  }

  async openErrorAC() {
    await this.profileErrorAC.click();
  }

  async openButtonDelete() {
    await this.buttonDelete.click();
  }

  async openTextClose() {
    await this.textClose.click();
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

  async openButtonSave() {
    await this.buttonSave.click();
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

  async openLearnPageStartScenario() {
    await this.learnPageStartScenario.click();
  }

  async openLearnPageRunningScenario() {
    await this.learnPageRunningScenario.click();
  }

  async openLearnPageBeginScenario() {
    await this.learnPageBeginScenario.click();
  }

  async openButtonNext() {
    await this.buttonNext.click();
  }

  async openButtonPrev() {
    await this.buttonPrev.click();
  }

  async openButtonPause() {
    await this.buttonPause.click();
  }

  async openButtonClose() {
    await this.buttonClose.click();
  }

  async openButtonContinue() {
    await this.buttonContinue.click();
  }

  async openLearnPageFinish() {
    await this.learnPageFinish.click();
  }

  async openLearnPageFinishSure() {
    await this.learnPageFinishSure.click();
  }

  async openLearnPageAccessCodeSelect() {
    await this.buttonSelectAvailableActions.click();
  }

  async openRoleProgressbar() {
    await this.roleProgressbar.click();
  }

  async openLearnPageResumeScenario() {
    await this.learnPageResumeScenario.click();
  }

  async openLearnPageCloseScenario() {
    await this.learnPageCloseScenario.click();
  }

  async openLearnPageTerminateSession() {
    await this.learnPageTerminateSession.click();
  }

  async openLearnPageShellConnect() {
    await this.learnPageShellConnect.click();
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
    await this.openButtonDelete();
    await expect(this.page.getByRole('gridcell', { name: this.accessCode })).toBeHidden();
    await this.openTextClose();
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
    await this.openButtonDelete();
    await expect(this.page.getByRole('gridcell', { name: this.accessCode })).toBeHidden();
    await this.openTextClose();
    return new SettingsPage(this.page);
  }

  async openSettingsChangeFontSize(user: string): Promise<SettingsPage> {
    await this.openProfile(user as string);
    await this.openProfileSettings();
    await this.openProfileFontSizeField();
    await this.openProfileFillFontSize();
    await this.openProfileFontSizeUp();
    await this.openButtonSave();
    await this.openProfile(user as string);
    await this.openProfileSettings();
    await expect(this.page.getByLabel('Font-Size')).toHaveValue(this.fontSizeNew.toString());
    await expect(this.page.locator('clr-checkbox-wrapper label')).toBeChecked();
    await this.openProfileFontSizeField();
    await this.openProfileFontSizeDown();
    await this.openButtonSave();
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
    await this.openButtonSave();
    await this.openProfile(user as string);
    await this.openProfileSettings();
    await expect(this.page.locator('div:nth-child(2) > .theme-preview-radio-box > .theme-preview-container > .theme-preview-terminal')).toBeChecked();
    await this.openProfileTerminalThemeOld();
    await expect(this.page.locator('div:nth-child(1) > .theme-preview-radio-box > .theme-preview-container > .theme-preview-terminal')).toBeChecked();
    await this.openButtonSave();
    return new SettingsPage(this.page);
  }

  async startAndTerminateScenario(user: string): Promise<SettingsPage> { //test fails with several AccessCodes in AccessCodeManager
    await this.openProfile(user as string);
    await this.openProfileMAC();
    await this.openProfileAAC();
    await this.openProfileACField();
    await this.accessCodeInputLearnPage();
    await this.openProfileSAAC();
    await this.openTextClose();
    await this.openLearnPageStartScenario();
    await this.openLearnPageRunningScenario();
    await this.openLearnPageBeginScenario();
    for (let i=0; i<6; i++) {
      await this.openButtonNext();
    }
    await this.openButtonPrev();
    await this.openButtonPrev();
    await expect(this.page.getByRole('heading', { name: '5. Container Run' })).toHaveText('5. Container Run');
    await this.openLearnPageShellConnect();
    await expect(this.page.locator('canvas').nth(3)).toBeVisible();
    await this.openButtonPause();
    await this.openLearnPageResumeScenario();
    await this.openButtonClose();
    await this.openLearnPageCloseScenario();
    await this.openButtonContinue();
    await this.openButtonClose();
    await this.openLearnPageCloseScenario();
    await this.openLearnPageTerminateSession();
    await expect(this.page.getByRole('button', { name: 'Terminate Session' })).toBeDisabled();
    await this.openProfile(user as string);
    await this.openProfileMAC();
    await this.openLearnPageAccessCodeSelect();
    await this.openButtonDelete();
    await this.openTextClose();
    return new SettingsPage(this.page);
  }

  async startAndFinishScenario(user: string): Promise<SettingsPage> { //test fails with several AccessCodes in AccessCodeManager
    await this.openProfile(user as string);
    await this.openProfileMAC();
    await this.openProfileAAC();
    await this.openProfileACField();
    await this.accessCodeInputLearnPage();
    await this.openProfileSAAC();
    await this.openTextClose();
    await this.openLearnPageStartScenario();
    await this.openLearnPageRunningScenario();
    await this.openLearnPageBeginScenario();
    for (let i=0; i<6; i++) {
      await this.openButtonNext();
    }
    await this.openButtonPrev();
    await this.openButtonNext();
    await expect(this.page.getByRole('heading', { name: '7. Terminology' })).toHaveText('7. Terminology');
    await this.openLearnPageShellConnect();
    await expect(this.page.locator('canvas').nth(3)).toBeVisible();
    await this.openButtonPause();
    await this.openLearnPageResumeScenario();
    await this.openLearnPageFinish();
    await this.openLearnPageFinishSure();
    await this.openLearnPageTerminateSession();
    await expect(this.page.getByRole('button', { name: 'Terminate Session' })).toBeDisabled();
    await this.openProfile(user as string);
    await this.openProfileMAC();
    await this.openLearnPageAccessCodeSelect();
    await this.openButtonDelete();
    await this.openTextClose();
    return new SettingsPage(this.page);
  }
}
