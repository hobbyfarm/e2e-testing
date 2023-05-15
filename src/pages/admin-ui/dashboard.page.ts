import { Page } from '@playwright/test';
import { BasePage } from '.';

/**
 * Dashboard page is a top level page. It contains two subpages: Active Events, Finished Events.
 */
export class DashboardPage extends BasePage {
  constructor(page: Page, username: string) {
    super(page, username);
  }
}
