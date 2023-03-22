import { expect } from '@playwright/test';
import { binding, given, then, when } from 'cucumber-tsflow';
import { BaseStepDefinition } from '../../../src/execution-flow/base.step-definition';
import { SessionContext } from '../../../src/execution-flow/session.context';
import { HomePage, LoginPage } from '../../../src/pages/admin-ui';

@binding([SessionContext])
export class UserAuthStepDefinition extends BaseStepDefinition {
  public constructor(protected sessionContext: SessionContext) {
    super(sessionContext);
  }

  @given(/I am on the HobbyFarm Admin UI login page/)
  public async givenLoginPageIsOpened(): Promise<void> {
    const loginPage = new LoginPage(this.sessionContext.page ?? (() => { throw new Error('page is null'); })());
    await loginPage.goto(process.env.HOBBYFARM_ADMIN_UI_URL as string);
    this.sessionContext.current = loginPage;
  }

  @when(/I enter my valid username and password/)
  public async whenValidUserNameAndPasswordAreEntered(): Promise<void> {
    expect(this.sessionContext.current).toBeInstanceOf(LoginPage);
    await (this.sessionContext.current as LoginPage).fillCredentials(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  }

  @when(/click the login button/)
  public async whenLoginButtonIsClicked(): Promise<void> {
    expect(this.sessionContext.current).toBeInstanceOf(LoginPage);
    const homePage = await (this.sessionContext.current as LoginPage).submit(process.env.HOBBYFARM_ADMIN_UI_USR as string);
    this.sessionContext.current = homePage;
  }

  @then(/I should be redirected to HobbyFarm Admin UI home page/)
  public thenHomePageIsDisplayed(): void {
    expect(this.sessionContext.current).toBeInstanceOf(HomePage);
  }
}
