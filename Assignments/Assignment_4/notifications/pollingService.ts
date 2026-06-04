import { scheduleImmediateNotification } from './scheduleHelpers';
import { fetchPendingNotifications } from '../services/api';
const POLL_INTERVAL_MS = 30_000;


let pollingInterval: ReturnType<typeof setInterval> | null = null;

// Start polling the backend every POLL_INTERVAL_MS milliseconds.
// Checks for server-queued notifications and delivers them as local notifications.
export const startPolling = (deviceId: string): void => {
  if (pollingInterval !== null) {
    return;
  }

  console.log('[Polling] Started for device:', deviceId);

  pollingInterval = setInterval(async () => {
    try {
      const notifications = await fetchPendingNotifications(deviceId);

      if (notifications.length > 0) {
        console.log(`[Polling] Received ${notifications.length} notification(s) from server`);
      }

      for (const notif of notifications) {
        await scheduleImmediateNotification(notif.title, notif.body, notif.data ?? {});
      }
    } catch (error) {
      console.warn('[Polling] Error fetching notifications:', error);
    }
  }, POLL_INTERVAL_MS);
};

// Stop polling - call this on app unmount or when going to background.
export const stopPolling = (): void => {
  if (pollingInterval !== null) {
    clearInterval(pollingInterval);
    pollingInterval = null;
    console.log('[Polling] Stopped');
  }
};

// Check if polling is currently active.
export const isPolling = (): boolean => pollingInterval !== null;
