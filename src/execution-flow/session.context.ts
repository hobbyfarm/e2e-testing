import { Browser, BrowserContext, Page } from '@playwright/test';

export class SessionContext {
  page: Page | null = null;
  browser: Browser | null = null;
  browserContext: BrowserContext | null = null;
  current: unknown;
}
