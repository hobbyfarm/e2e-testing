import { expect } from '@playwright/test';
import { binding, given, then, when } from 'cucumber-tsflow';
import { BaseStepDefinition } from '../../../src/execution-flow/base.step-definition';
import { SessionContext } from '../../../src/execution-flow/session.context';
import { BasePage, HomePage, LoginPage } from '../../../src/pages/ui';

@binding([SessionContext])
export class UserAuthStepDefinition extends BaseStepDefinition {
  public constructor(protected sessionContext: SessionContext) {
    super(sessionContext);
  }

  @given(/I am on the UI login page/, 'UI', 100000)
  public async givenLoginPageIsOpened(): Promise<void> {
    const loginPage = new LoginPage(this.sessionContext.page ?? (() => { throw new Error('page is null'); })());
    await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
    this.sessionContext.current = loginPage;
  }

  @when(/I enter my valid UI username and password/, 'UI')
  public async whenValidUserNameAndPasswordAreEntered(): Promise<void> {
    const homePage = await (this.sessionContext.current as LoginPage).fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
    this.sessionContext.current = homePage;
  }

  @then(/I should be redirected to the UI home page/, 'UI')
  public thenHomePageIsDisplayed(): void {
    expect(this.sessionContext.current).toBeInstanceOf(HomePage);
  }

  @when(/the UI user is logged in the UI/)
  public async givenUserIsLoggedIn(): Promise<void> {
    const loginPage = new LoginPage(this.sessionContext.page ?? (() => { throw new Error('page is null'); })());
    await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
    const homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
    this.sessionContext.current = homePage;
  }

  @when(/the UI user clicks on the logout button/, 'UI')
  public async givenLogoutButtonIsClicked(): Promise<void> {
    expect(this.sessionContext.current).toBeInstanceOf(BasePage);
    const loginPage = await (this.sessionContext.current as HomePage).logout();
    this.sessionContext.current = loginPage;
  }

  @then(/the UI user is logged out from the application/, 'UI')
  public async thenUserIsLoggedOut(): Promise<void> {
    expect(this.sessionContext.current).toBeInstanceOf(LoginPage);
  }

  @then(/the UI user is redirected to the login page/, 'UI')
  public async thenUserIsRedirectedToLoginPage(): Promise<void> {
    expect(this.sessionContext.current).toBeInstanceOf(LoginPage);
  }
}
