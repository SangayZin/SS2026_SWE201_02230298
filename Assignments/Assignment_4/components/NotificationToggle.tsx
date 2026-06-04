import React from 'react';
import { ActivityIndicator, StyleSheet, Switch, Text, View } from 'react-native';

interface NotificationToggleProps {
  value: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onValueChange: (nextValue: boolean) => void;
}

export default function NotificationToggle({ value, disabled = false, isLoading = false, onValueChange }: NotificationToggleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{value ? 'Reminder on' : 'Reminder off'}</Text>
      {isLoading ? (
        <ActivityIndicator size="small" color="#0f766e" />
      ) : (
        <Switch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          trackColor={{ false: '#d1d5db', true: '#99f6e4' }}
          thumbColor={value ? '#0f766e' : '#f9fafb'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: '#134e4a',
    fontWeight: '600',
  },
});
