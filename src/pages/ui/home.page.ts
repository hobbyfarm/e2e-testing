import { Page } from '@playwright/test';
import { BasePage } from '.';

/**
 * Home page is a top level page.
 */
export class HomePage extends BasePage {
  constructor(page: Page, headerTitle: string, username: string) {
    super(page, headerTitle, username);
  }
}
