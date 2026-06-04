import * as Notifications from 'expo-notifications';

export type NotificationHandlerCallbacks = {
  onForegroundNotification: (notification: Notifications.Notification) => void;
  onNotificationTap: (taskId: string) => void;
};

// Creates listeners and returns a cleanup function.
export function setupNotificationHandlers(callbacks: NotificationHandlerCallbacks): () => void {
  const foregroundSubscription = Notifications.addNotificationReceivedListener((notification) => {
    callbacks.onForegroundNotification(notification);
  });

  const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data as Record<string, unknown> | undefined;
    const taskIdRaw = data?.taskId;

    if (typeof taskIdRaw === 'string' && taskIdRaw.length > 0) {
      callbacks.onNotificationTap(taskIdRaw);
      return;
    }

    // Fallback: attempt to read a taskId-like string from payload.
    const maybe = response.notification.request.content.data?.taskId;
    if (typeof maybe === 'string') {
      callbacks.onNotificationTap(maybe);
    }
  });

  return () => {
    foregroundSubscription.remove();
    responseSubscription.remove();
  };
}

