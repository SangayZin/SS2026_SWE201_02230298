import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import NotificationToggle from '../components/NotificationToggle';
import type { Task } from '../types';
import { getTaskById, loadTasks, saveTasks } from '../services/taskStorage';
import { cancelTaskReminder, scheduleTaskReminder } from '../notifications/scheduleHelpers';
import type { RootStackParamList, SharedScreenProps } from '../navigation/AppNavigator';

type TaskDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'TaskDetail'> & SharedScreenProps;

export default function TaskDetailScreen({ navigation, route }: TaskDetailScreenProps) {
  const isFocused = useIsFocused();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const loadTask = async (): Promise<void> => {
    setLoading(true);
    try {
      const storedTask = await getTaskById(route.params.taskId);
      setTask(storedTask ?? null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      void loadTask();
    }
  }, [isFocused, route.params.taskId]);

  const handleToggleNotification = async (nextValue: boolean): Promise<void> => {
    if (!task) {
      return;
    }

    setIsToggling(true);

    try {
      const nextTask = { ...task };

      if (nextValue) {
        const reminderTime = new Date(new Date(nextTask.dueDate).getTime() - 10 * 60 * 1000);

        if (reminderTime.getTime() <= Date.now()) {
          throw new Error('This task is due too soon for a 10 minute reminder.');
        }

        const notificationId = await scheduleTaskReminder(nextTask);
        nextTask.notificationEnabled = true;
        nextTask.notificationId = notificationId;
      } else {
        if (nextTask.notificationId) {
          await cancelTaskReminder(nextTask.notificationId);
        }

        nextTask.notificationEnabled = false;
        delete nextTask.notificationId;
      }

      const allTasks = await loadTasks();
      const updatedTasks = allTasks.map((existingTask) => (existingTask.id === nextTask.id ? nextTask : existingTask));
      await saveTasks(updatedTasks);
      setTask(nextTask);
      setFeedbackMessage(nextValue ? 'Reminder enabled.' : 'Reminder disabled.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to update reminder.';
      setFeedbackMessage(message);
      Alert.alert('Reminder update failed', message);
      await loadTask();
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Task details</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#0f766e" />
        ) : task ? (
          <View style={styles.content}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.meta}>Due: {new Date(task.dueDate).toLocaleString()}</Text>
            <Text style={styles.description}>{task.description || 'No description provided.'}</Text>
            <NotificationToggle
              value={task.notificationEnabled}
              isLoading={isToggling}
              disabled={isToggling}
              onValueChange={(nextValue) => {
                void handleToggleNotification(nextValue);
              }}
            />
            {feedbackMessage ? <Text style={styles.feedback}>{feedbackMessage}</Text> : null}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Task not found</Text>
            <Text style={styles.emptyBody}>The task may have been removed. Return to the home screen and create or select another task.</Text>
            <Pressable onPress={() => navigation.navigate('Home')} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Back to Home</Text>
            </Pressable>
          </View>
        )}
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
    gap: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#0f766e',
  },
  content: {
    gap: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#082f49',
  },
  meta: {
    color: '#0f766e',
    fontSize: 14,
    fontWeight: '700',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#334155',
  },
  feedback: {
    fontSize: 13,
    color: '#0f172a',
  },
  emptyState: {
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  emptyBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
  },
  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#0f766e',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
});
