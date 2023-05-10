import { Page } from '@playwright/test';
import { BasePage } from '.';

/**
 * Scheduled Event page is a top level page.
 */
export class UserPage extends BasePage {
  constructor(page: Page, username: string) {
    super(page, username);
  }
}
