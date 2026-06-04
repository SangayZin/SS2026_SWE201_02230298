import React, { useEffect, useState } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import { configureNotificationEnvironment, requestNotificationPermission } from '../notifications/notificationSetup';
import { setupNotificationHandlers } from '../notifications/notificationHandlers';
import type { NotificationPermissionState } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { startPolling } from '../notifications/pollingService';
import { API_BASE_URL, API_KEY, STORAGE_KEYS } from '../constants/config';

export type RootStackParamList = {
  Home: undefined;
  TaskDetail: { taskId: string };
  Settings: undefined;
};

export interface SharedScreenProps {
  permissionState: NotificationPermissionState;
  bootstrapLoading: boolean;
  onRefreshNotifications: () => Promise<void>;
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [permissionState, setPermissionState] = useState<NotificationPermissionState>('undetermined');
  const [bootstrapLoading, setBootstrapLoading] = useState(true);
  const [foregroundBanner, setForegroundBanner] = useState<{ title: string; body: string } | null>(null);
  const [queuedTaskId, setQueuedTaskId] = useState<string | null>(null);

  const runBootstrap = async (): Promise<void> => {
    setBootstrapLoading(true);

    try {
      let nextPermissionState = await configureNotificationEnvironment();
      if (nextPermissionState === 'undetermined') {
        nextPermissionState = await requestNotificationPermission();
      }
      setPermissionState(nextPermissionState);

      if (nextPermissionState === 'granted') {
        let deviceId = await AsyncStorage.getItem(STORAGE_KEYS.deviceId);
        if (!deviceId) {
          deviceId = `device-${Date.now()}`;
          await AsyncStorage.setItem(STORAGE_KEYS.deviceId, deviceId);
        }
        const tokenData = await Notifications.getExpoPushTokenAsync({
  projectId: "2e2aeea8-8b18-4be5-9716-fd9a6fa098ed"
});
        const token = tokenData.data;
        console.log('[Bootstrap] Push token:', token);
        const res = await fetch(`${API_BASE_URL}/register-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
          body: JSON.stringify({ token, deviceId }),
        });
        console.log('[Bootstrap] Token registered, status:', res.status);
        startPolling(deviceId);
      }
    } catch (err) {
      console.warn('[Bootstrap] Error:', err);
      setPermissionState('denied');
    } finally {
      setBootstrapLoading(false);
    }
  };

  useEffect(() => {
    void runBootstrap();
  }, []);

  useEffect(() => {
    const cleanup = setupNotificationHandlers({
      onForegroundNotification: (notification) => {
        setForegroundBanner({
          title: notification.request.content.title ?? 'Task reminder',
          body: notification.request.content.body ?? 'You have a new notification.',
        });
      },
      onNotificationTap: (taskId) => {
        if (navigationRef.isReady()) {
          navigationRef.navigate('TaskDetail', { taskId });
          return;
        }

        setQueuedTaskId(taskId);
      },
    });

    return cleanup;
  }, []);

  useEffect(() => {
    if (!foregroundBanner) {
      return;
    }

    const timer = setTimeout(() => {
      setForegroundBanner(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [foregroundBanner]);

  useEffect(() => {
    if (queuedTaskId && navigationRef.isReady()) {
      navigationRef.navigate('TaskDetail', { taskId: queuedTaskId });
      setQueuedTaskId(null);
    }
  }, [queuedTaskId]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        void runBootstrap();
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.root}>
      {foregroundBanner ? (
        <View style={styles.foregroundBanner}>
          <Text style={styles.foregroundTitle}>{foregroundBanner.title}</Text>
          <Text style={styles.foregroundBody}>{foregroundBanner.body}</Text>
        </View>
      ) : null}

      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#0f172a' },
            headerTintColor: '#ffffff',
            contentStyle: { backgroundColor: '#f8fafc' },
          }}
        >
          <Stack.Screen name="Home" options={{ title: 'Task Reminder' }}>
            {(screenProps) => (
              <HomeScreen
                {...screenProps}
                permissionState={permissionState}
                bootstrapLoading={bootstrapLoading}
                onRefreshNotifications={runBootstrap}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="TaskDetail" options={{ title: 'Task Details' }}>
            {(screenProps) => (
              <TaskDetailScreen
                {...screenProps}
                permissionState={permissionState}
                bootstrapLoading={bootstrapLoading}
                onRefreshNotifications={runBootstrap}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Settings" options={{ title: 'Settings' }}>
            {(screenProps) => (
              <SettingsScreen
                {...screenProps}
                permissionState={permissionState}
                bootstrapLoading={bootstrapLoading}
                onRefreshNotifications={runBootstrap}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  foregroundBanner: {
    backgroundColor: '#0f766e',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  foregroundTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  foregroundBody: {
    color: '#d1fae5',
    fontSize: 13,
    marginTop: 2,
  },
});
