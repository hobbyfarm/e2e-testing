import { Page } from '@playwright/test';
import { BasePage } from '.';

/**
 * Home page is a top level page. It contains one subpage: Session Statistics.
 */
export class HomePage extends BasePage {
  constructor(page: Page, username: string) {
    super(page, username);
  }
}
