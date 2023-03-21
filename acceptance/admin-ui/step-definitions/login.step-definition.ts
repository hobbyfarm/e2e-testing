// import { expect } from '@playwright/test';
import { chromium, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { after, before, binding, given, then, when } from 'cucumber-tsflow';
import { SessionContext } from '../../../src/execution-flow/session.context';
import { LoginPage } from '../../../src/pages/admin-ui';

@binding([SessionContext])
export class LoginSteps {
  public constructor(protected sessionContext: SessionContext) { }

  // Runs before each scenarios with tag `@requireTempDir` with 2 seconds of timeout
  @before('@WebApp')
  public async beforeAllWebAppScenarios(): Promise<void> {
    dotenv.config();
    const browser = await chromium.launch();
    this.sessionContext.browser = browser;
    const context = await browser.newContext();
    this.sessionContext.browserContext = context;
    this.sessionContext.page = await context.newPage();
  }

  @given(/I am on the HobbyFarm Admin UI login page/)
  public async givenLoginPageIsOpened(): Promise<void> {
    const loginPage = new LoginPage(this.sessionContext.page ?? (() => { throw new Error('page is null'); })());
    await loginPage.goto(process.env.HOBBYFARM_ADMIN_UI_URL as string);
    this.sessionContext.current = loginPage;
  }

  @when(/I enter my valid username and password/)
  public whenValidUserNameAndPasswordAreEntered(): void {
    expect(this.sessionContext.current).toBeInstanceOf(LoginPage);
    // TODO
  }

  @when(/click the login button/)
  public whenLoginButtonIsClicked(): void {
    // TODO
  }

  @then(/I should be redirected to HobbyFarm Admin UI home page/)
  public thenHomePageIsDisplayed(): void {
    // TODO
  }

  @after('@WebApp')
  public async afterAllWebAppScenarios(): Promise<void> {
    await (this.sessionContext.browserContext ?? (() => { throw new Error('browserContext is null'); })()).close();
    await (this.sessionContext.browser ?? (() => { throw new Error('browser is null'); })()).close();
  }
}
