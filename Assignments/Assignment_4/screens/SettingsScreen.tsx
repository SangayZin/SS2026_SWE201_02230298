import React, { useState } from 'react';
import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, SharedScreenProps } from '../navigation/AppNavigator';

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'> & SharedScreenProps;

function formatPermissionLabel(permissionState: SharedScreenProps['permissionState']): string {
  if (permissionState === 'granted') {
    return 'Notifications: Granted ';
  }

  if (permissionState === 'denied') {
    return 'Notifications: Denied ';
  }

  return 'Notifications: Not requested';
}

export default function SettingsScreen({ permissionState, bootstrapLoading, onRefreshNotifications }: SettingsScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [remoteStatus, setRemoteStatus] = useState('');

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    try {
      await onRefreshNotifications();
      setRemoteStatus('Notification permission refreshed.');
    } catch (error) {
      setRemoteStatus(error instanceof Error ? error.message : 'Unable to refresh notification setup.');
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Notification Settings</Text>
        <Text style={styles.permissionLabel}>{formatPermissionLabel(permissionState)}</Text>
        <Text style={styles.description}>
          Use this screen to refresh permission state and open the operating system settings page.
        </Text>

        {bootstrapLoading || refreshing ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color="#0f766e" />
            <Text style={styles.loadingText}>Working on notification setup...</Text>
          </View>
        ) : null}

        <View style={styles.buttonColumn}>
          <Pressable onPress={() => void handleRefresh()} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Refresh Notification State</Text>
          </Pressable>
          <Pressable onPress={() => void Linking.openSettings()} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Open System Settings</Text>
          </Pressable>
        </View>

        {remoteStatus ? <Text style={styles.feedback}>{remoteStatus}</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#082f49',
  },
  permissionLabel: {
    color: '#0f766e',
    fontSize: 15,
    fontWeight: '800',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    color: '#155e75',
    flex: 1,
  },
  buttonColumn: {
    gap: 10,
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: '#0f766e',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontWeight: '800',
  },
  feedback: {
    fontSize: 13,
    color: '#0f172a',
    marginTop: 4,
  },
});
