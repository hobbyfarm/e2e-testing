import { Page } from '@playwright/test';
import { BasePage } from '.';

export class HomePage extends BasePage {
  constructor(page: Page, uiName: string, username: string) {
    super(page, uiName, username);
  }
}
