import { test } from '@playwright/test';
import dayjs from 'dayjs';
import { AdminUiFlow } from '../admin-ui/admin-ui.flow';
import { UiFlow } from '../ui/ui.flow';

test('Create an event and start a scenario @smoke @notci', async ({ page }) => {
  const currentDate = dayjs().startOf('hour');
  const event = {
    name: `Fake event ${dayjs().format()}`,
    accessCode: `e2e-testing-${Math.random()}`,
    startDate: currentDate.toDate(),
    endDate: currentDate.add(2, 'hour').toDate(),
    scenario: process.env.HOBBYFARM_EVENT_SCENARIO as string,
    environment: process.env.HOBBYFARM_EVENT_ENVIRONMENT as string
  };
  const adminHomePage = await AdminUiFlow.login(page);
  const scheduledEventPage = await adminHomePage.openScheduledEventPage();
  await scheduledEventPage.create(event, true);
  await scheduledEventPage.logout();
  let homePage = await UiFlow.login(page);
  homePage = await homePage.addAccessCode(event.accessCode);
  homePage = await homePage.StartScenario(event.name);
  homePage = await homePage.deleteAccessCode(event.accessCode);
  await homePage.logout();
});
