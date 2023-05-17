import { test } from '@playwright/test';
import dayjs from 'dayjs';
import { AdminUiFlow } from './admin-ui.flow';

test('Schedule an event @notci', async ({ page }) => {
  const currentDate = dayjs().startOf('hour');
  const event = {
    name: process.env.HOBBYFARM_EVENT_NAME as string ?? `Fake event ${dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS')}`,
    accessCode: process.env.HOBBYFARM_EVENT_ACCESS_CODE as string ?? `e2e-testing-${Math.random()}`,
    startDate: process.env.HOBBYFARM_EVENT_START ? new Date(process.env.HOBBYFARM_EVENT_START as string) : currentDate.toDate(),
    endDate: process.env.HOBBYFARM_EVENT_END ? new Date(process.env.HOBBYFARM_EVENT_END as string) : currentDate.add(2, 'hour').toDate(),
    scenario: process.env.HOBBYFARM_EVENT_SCENARIO as string,
    environment: process.env.HOBBYFARM_EVENT_ENVIRONMENT as string
  };
  const homePage = await AdminUiFlow.login(page);
  const scheduledEventPage = await homePage.openScheduledEventPage();
  await scheduledEventPage.create(event);
  await scheduledEventPage.logout();
});

test('Delete an event @notci', async ({ page }) => {
  const eventName = process.env.HOBBYFARM_EVENT_NAME as string ?? `Fake event ${dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS')}`;
  const homePage = await AdminUiFlow.login(page);
  const scheduledEventPage = await homePage.openScheduledEventPage();
  await scheduledEventPage.delete(eventName);
  await scheduledEventPage.logout();
});
