export interface ScheduledEventModel {
  name: string;
  accessCode: string;
  startDate: Date;
  endDate: Date;
  scenario?: string;
  environment?: string;
}
