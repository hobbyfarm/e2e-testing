import { Page } from '@playwright/test';
import { BasePage } from '.';

export class UserPage extends BasePage {
  constructor(page: Page, headerTitle: string, username: string) {
    super(page, headerTitle, username);
  }
}
