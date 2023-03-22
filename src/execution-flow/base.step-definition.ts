import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';
import { after, before, binding } from 'cucumber-tsflow';
import { SessionContext } from './session.context';

@binding([SessionContext])
export class BaseStepDefinition {
  public constructor(protected sessionContext: SessionContext) { }

  @before('@WebApp')
  public async beforeAllWebAppScenarios(): Promise<void> {
    dotenv.config();
    const browser = await chromium.launch();
    this.sessionContext.browser = browser;
    const context = await browser.newContext();
    this.sessionContext.browserContext = context;
    this.sessionContext.page = await context.newPage();
  }

  @after('@WebApp')
  public async afterAllWebAppScenarios(): Promise<void> {
    await (this.sessionContext.browserContext ?? (() => { throw new Error('browserContext is null'); })()).close();
    await (this.sessionContext.browser ?? (() => { throw new Error('browser is null'); })()).close();
  }
}
