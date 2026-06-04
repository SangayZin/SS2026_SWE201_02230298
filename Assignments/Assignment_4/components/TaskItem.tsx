import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Task } from '../types';
import NotificationToggle from './NotificationToggle';

interface TaskItemProps {
  task: Task;
  onPress: () => void;
  onToggleNotification: (enabled: boolean) => void;
  isUpdating?: boolean;
}

function formatDueDate(dueDate: string): string {
  return new Date(dueDate).toLocaleString();
}

export default function TaskItem({ task, onPress, onToggleNotification, isUpdating = false }: TaskItemProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.headerRow}>
        <View style={styles.titleColumn}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.subtitle}>{formatDueDate(task.dueDate)}</Text>
        </View>
      </View>
      <Text numberOfLines={2} style={styles.description}>
        {task.description || 'No description provided.'}
      </Text>
      <View style={styles.toggleRow}>
        <NotificationToggle
          value={task.notificationEnabled}
          isLoading={isUpdating}
          disabled={isUpdating}
          onValueChange={onToggleNotification}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    gap: 12,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleColumn: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#042f2e',
  },
  subtitle: {
    fontSize: 13,
    color: '#0f766e',
  },
  description: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  toggleRow: {
    marginTop: 4,
  },
});
