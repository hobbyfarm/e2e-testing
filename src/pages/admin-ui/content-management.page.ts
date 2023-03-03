import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ContentManagementPage extends BasePage {
  constructor(page: Page, username: string) {
    super(page, username);
  }
}
