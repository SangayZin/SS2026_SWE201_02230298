export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';
export const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? '';

export const STORAGE_KEYS = {
  tasks: '@taskReminder/tasks',
  expoPushToken: '@taskReminder/expoPushToken',
  deviceId: '@taskReminder/deviceId',
};

export const NOTIFICATION_CHANNEL_ID = 'task-reminders';
export const NOTIFICATION_CATEGORY_ID = 'task-reminder-category';
