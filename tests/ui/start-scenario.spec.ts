import { test } from '@playwright/test';
import dayjs from 'dayjs';
import { UiFlow } from './ui.flow';

test('Start a scenario @notci', async ({ page }) => {
  const currentDate = dayjs().startOf('hour');
  const event = {
    name: process.env.HOBBYFARM_EVENT_NAME as string ?? `Fake event ${dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS')}`,
    accessCode: process.env.HOBBYFARM_EVENT_ACCESS_CODE as string ?? `e2e-testing-${Math.random()}`,
    startDate: process.env.HOBBYFARM_EVENT_START ? new Date(process.env.HOBBYFARM_EVENT_START as string) : currentDate.toDate(),
    endDate: process.env.HOBBYFARM_EVENT_END ? new Date(process.env.HOBBYFARM_EVENT_END as string) : currentDate.add(2, 'hour').toDate(),
    scenario: process.env.HOBBYFARM_EVENT_SCENARIO as string,
    environment: process.env.HOBBYFARM_EVENT_ENVIRONMENT as string
  };

  // starts the scenario
  let homePage = await UiFlow.login(page);
  homePage = await homePage.addAccessCode(event.accessCode);
  homePage = await homePage.StartScenario(event.name);
  homePage = await homePage.deleteAccessCode(event.accessCode);
  await homePage.logout();
});
