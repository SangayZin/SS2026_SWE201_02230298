import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface PermissionBannerProps {
  onOpenSettings: () => void;
}

export default function PermissionBanner({ onOpenSettings }: PermissionBannerProps) {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Notifications are disabled</Text>
      <Text style={styles.body}>Grant permission to schedule reminders and receive task alerts.</Text>
      <Pressable onPress={onOpenSettings} style={styles.button}>
        <Text style={styles.buttonText}>Open Settings</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#fff7ed',
    borderColor: '#fdba74',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#9a3412',
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: '#7c2d12',
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 4,
    backgroundColor: '#ea580c',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
