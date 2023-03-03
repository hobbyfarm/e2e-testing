import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './index';

export class ScheduledEventPage extends BasePage {
  constructor(page: Page, username: string) {
    super(page, username);
  }
}
