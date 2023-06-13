import { expect } from '@playwright/test';
import { binding, given, then, when } from 'cucumber-tsflow';
import { BaseStepDefinition } from '../../../src/execution-flow/base.step-definition';
import { SessionContext } from '../../../src/execution-flow/session.context';
import { BasePage, HomePage, LoginPage } from '../../../src/pages/admin-ui';
import { AdminUiFlow } from '../../../tests/admin-ui/admin-ui.flow';

@binding([SessionContext])
export class UserAuthStepDefinition extends BaseStepDefinition {
  public constructor(protected sessionContext: SessionContext) {
    super(sessionContext);
  }

  @given(/I am on the login page/, { tag: '@AdminUI' })
  public async givenLoginPageIsOpened(): Promise<void> {
    const loginPage = await AdminUiFlow.openLoginPage(this.sessionContext.page ?? (() => { throw new Error('page is null'); })());
    this.sessionContext.current = loginPage;
  }

  @when(/I enter a valid username and password/, { tag: '@AdminUI' })
  public async whenValidUserNameAndPasswordAreEntered(): Promise<void> {
    expect(this.sessionContext.current).toBeInstanceOf(LoginPage);
    await (this.sessionContext.current as LoginPage).fillCredentials(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  }

  @when(/I click on the login button/, { tag: '@AdminUI' })
  public async whenLoginButtonIsClicked(): Promise<void> {
    expect(this.sessionContext.current).toBeInstanceOf(LoginPage);
    const homePage = await (this.sessionContext.current as LoginPage).submit(process.env.HOBBYFARM_ADMIN_UI_USR as string);
    this.sessionContext.current = homePage;
  }

  @then(/I should be redirected to the home page/, '@AdminUI')
  public thenHomePageIsDisplayed(): void {
    expect(this.sessionContext.current).toBeInstanceOf(HomePage);
  }

  @given(/I am logged in/, { tag: '@AdminUI' })
  public async givenUserIsLoggedIn(): Promise<void> {
    const homePage = await AdminUiFlow.login(this.sessionContext.page ?? (() => { throw new Error('page is null'); })());
    this.sessionContext.current = homePage;
  }

  @when(/I click on the logout button/, { tag: '@AdminUI' })
  public async givenLogoutButtonIsClicked(): Promise<void> {
    expect(this.sessionContext.current).toBeInstanceOf(BasePage);
    const loginPage = await (this.sessionContext.current as HomePage).logout();
    this.sessionContext.current = loginPage;
  }

  @then(/I am logged out from the application/, '@AdminUI')
  public async thenUserIsLoggedOut(): Promise<void> {
    expect(this.sessionContext.current).toBeInstanceOf(LoginPage);
  }

  @then(/I am redirected to the login page/, '@AdminUI')
  public async thenUserIsRedirectedToLoginPage(): Promise<void> {
    expect(this.sessionContext.current).toBeInstanceOf(LoginPage);
  }
}
