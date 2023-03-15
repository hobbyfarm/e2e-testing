import { Page } from '@playwright/test';
import { BasePage } from './index';

export class DashboardPage extends BasePage {
  constructor(page: Page, username: string) {
    super(page, username);
  }
}
