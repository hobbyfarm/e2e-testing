import { test } from '@playwright/test';
import { AdminUiFlow } from './admin-ui.flow';

test('Schedule an event', async ({ page }) => {
  const eventName = process.env.HOBBYFARM_EVENT_NAME as string ?? `Dummy event ${new Date().toLocaleString('en-GB', { timeZone: 'UTC' })}`;
  const accessCode = `e2e-testing-${Math.random()}`;
  const startDate = new Date(process.env.HOBBYFARM_EVENT_START as string) ?? new Date();
  const endDate = new Date(process.env.HOBBYFARM_EVENT_END as string) ?? new Date();
  const environment = process.env.HOBBYFARM_EVENT_ENVIRONMENT as string;
  const homePage = await AdminUiFlow.login(page);
  const scheduledEventPage = await homePage.openScheduledEventPage();
  await scheduledEventPage.create(eventName, accessCode, startDate, endDate, environment);
  await scheduledEventPage.logout();
});

test('Delete an event', async ({ page }) => {
  const eventName = process.env.HOBBYFARM_EVENT_NAME as string ?? `Dummy event ${new Date().toLocaleString('en-GB', { timeZone: 'UTC' })}`;
  const homePage = await AdminUiFlow.login(page);
  const scheduledEventPage = await homePage.openScheduledEventPage();
  await scheduledEventPage.delete(eventName);
  await scheduledEventPage.logout();
});
