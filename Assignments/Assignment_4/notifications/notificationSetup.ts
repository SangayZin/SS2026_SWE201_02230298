import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { NOTIFICATION_CHANNEL_ID } from '../constants/config';

import type { NotificationPermissionState } from '../types';

// Ensure Expo notification config and return a stable app-level permission state.
export async function configureNotificationEnvironment(): Promise<NotificationPermissionState> {
  // Configure default behavior.
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Android channels are required for background/local notifications.
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
      name: 'Task reminders',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#14b8a6',
    });
  }

  const current = await Notifications.getPermissionsAsync();

  if (current.granted) {
    return 'granted';
  }

  if (current.status !== 'denied') {
    const requested = await Notifications.requestPermissionsAsync();
    if (requested.granted) return 'granted';
    return requested.status === 'denied' ? 'denied' : 'undetermined';
  }
  return 'denied';
}

// Call when user explicitly wants permission.
export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
  const res = await Notifications.requestPermissionsAsync();
  if (res.granted) return 'granted';

  return res.status === 'denied' ? 'denied' : 'undetermined';
}


