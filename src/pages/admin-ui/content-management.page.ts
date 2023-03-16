import { Page } from '@playwright/test';
import { BasePage } from '.';

export class ContentManagementPage extends BasePage {
  constructor(page: Page, username: string) {
    super(page, username);
  }
}
