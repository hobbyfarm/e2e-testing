import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class UserPage extends BasePage {
  constructor(page: Page, username: string) {
    super(page, username);
  }
}
