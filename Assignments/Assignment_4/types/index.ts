export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  notificationEnabled: boolean;
  notificationId?: string;
}

export interface PushTokenRecord {
  token: string;
  deviceId: string;
  registeredAt: string;
}

export type NotificationPermissionState = 'undetermined' | 'granted' | 'denied';

export interface NotificationPayloadData {
  taskId?: string;
  screen?: 'TaskDetail';
  [key: string]: unknown;
}
