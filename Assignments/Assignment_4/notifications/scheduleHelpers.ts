import * as Notifications from 'expo-notifications';
import type { NotificationPayloadData, Task } from '../types';
import { NOTIFICATION_CHANNEL_ID } from '../constants/config';

// Schedule a one-off local notification for a task reminder.
// Returns the notification id.
export async function scheduleTaskReminder(task: Task): Promise<string> {
  // Task.dueDate is ISO string.
  const dueMs = new Date(task.dueDate).getTime();

  // Remind 10 minutes before due date.
  const reminderMs = dueMs - 10 * 60 * 1000;

  // If reminder time is in the past, do not schedule.
  if (reminderMs <= Date.now()) {
    throw new Error('This task is due too soon to schedule a reminder.');
  }

  const triggerDate = new Date(reminderMs);

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Task reminder',
      body: task.title ?? 'You have a task coming up.',
      data: {
        taskId: task.id,
        screen: 'TaskDetail',
      } satisfies NotificationPayloadData,
      sound: true,
      categoryIdentifier: 'task-reminder',
    },
    trigger: triggerDate as unknown as Notifications.NotificationTriggerInput,
  });


  return notificationId;
}

export async function cancelTaskReminder(notificationId: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

export async function scheduleImmediateNotification(
  title: string,
  body: string,
  data: NotificationPayloadData = {},
): Promise<string> {
  // Immediate notification: schedule for "now".
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
      categoryIdentifier: 'task-reminder',
    },
    trigger: null as unknown as Notifications.NotificationTriggerInput,
  });


  // Ensure channel for Android.
  if (NOTIFICATION_CHANNEL_ID) {
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
      name: 'Task reminders',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return notificationId;
}

