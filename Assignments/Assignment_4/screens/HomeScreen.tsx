import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PermissionBanner from '../components/PermissionBanner';
import TaskItem from '../components/TaskItem';
import type { NotificationPermissionState, Task } from '../types';
import { loadTasks, saveTasks } from '../services/taskStorage';
import { cancelTaskReminder, scheduleTaskReminder } from '../notifications/scheduleHelpers';
import type { RootStackParamList, SharedScreenProps } from '../navigation/AppNavigator';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'> & SharedScreenProps;

function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((leftTask, rightTask) => new Date(leftTask.dueDate).getTime() - new Date(rightTask.dueDate).getTime());
}

function formatPermissionLabel(permissionState: NotificationPermissionState): string {
  if (permissionState === 'granted') {
    return 'Notifications: Granted ';
  }

  if (permissionState === 'denied') {
    return 'Notifications: Denied ';
  }

  return 'Notifications: Not requested';
}

function buildDueDate(dateInput: string, timeInput: string): Date | null {
  const candidateDate = new Date(`${dateInput}T${timeInput}:00`);

  if (Number.isNaN(candidateDate.getTime())) {
    return null;
  }

  return candidateDate;
}

export default function HomeScreen({ navigation, permissionState, bootstrapLoading, onRefreshNotifications }: HomeScreenProps) {
  const isFocused = useIsFocused();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [submittingTask, setSubmittingTask] = useState(false);
  const [pendingToggleTaskId, setPendingToggleTaskId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');

  const refreshTasks = async (): Promise<void> => {
    setLoadingTasks(true);
    try {
      const storedTasks = await loadTasks();
      setTasks(sortTasks(storedTasks));
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      void refreshTasks();
    }
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      void onRefreshNotifications();
    });

    return unsubscribe;
  }, [navigation, onRefreshNotifications]);

  const handleCreateTask = async (): Promise<void> => {
    if (!title.trim()) {
      setFeedbackMessage('Enter a task title before saving.');
      return;
    }

    const dueDate = buildDueDate(dateInput.trim(), timeInput.trim());

    if (!dueDate) {
      setFeedbackMessage('Use a valid date and time, such as 2026-06-01 and 14:30.');
      return;
    }

    if (dueDate.getTime() <= Date.now()) {
      setFeedbackMessage('Pick a future due date and time.');
      return;
    }

    setSubmittingTask(true);

    try {
      const nextTask: Task = {
        id: `${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate.toISOString(),
        notificationEnabled: false,
      };

      const nextTasks = sortTasks([nextTask, ...tasks]);
      await saveTasks(nextTasks);
      setTasks(nextTasks);
      setTitle('');
      setDescription('');
      setDateInput('');
      setTimeInput('');
      setFeedbackMessage('Task saved successfully.');
    } catch (error) {
      setFeedbackMessage(error instanceof Error ? error.message : 'Unable to save the task.');
    } finally {
      setSubmittingTask(false);
    }
  };

  const handleToggleNotification = async (task: Task, nextValue: boolean): Promise<void> => {
    setPendingToggleTaskId(task.id);

    try {
      const nextTasks = tasks.map((existingTask) => ({ ...existingTask }));
      const targetTaskIndex = nextTasks.findIndex((existingTask) => existingTask.id === task.id);

      if (targetTaskIndex < 0) {
        throw new Error('Task not found.');
      }

      const updatedTask = { ...nextTasks[targetTaskIndex] };

      if (nextValue) {
        const reminderTime = new Date(new Date(updatedTask.dueDate).getTime() - 10 * 60 * 1000);

        if (reminderTime.getTime() <= Date.now()) {
          throw new Error('This task is due too soon to schedule a reminder 10 minutes before it.');
        }

        const notificationId = await scheduleTaskReminder(updatedTask);
        updatedTask.notificationEnabled = true;
        updatedTask.notificationId = notificationId;
      } else {
        if (updatedTask.notificationId) {
          await cancelTaskReminder(updatedTask.notificationId);
        }

        updatedTask.notificationEnabled = false;
        delete updatedTask.notificationId;
      }

      nextTasks[targetTaskIndex] = updatedTask;
      const sortedTasks = sortTasks(nextTasks);
      await saveTasks(sortedTasks);
      setTasks(sortedTasks);
      setFeedbackMessage(nextValue ? 'Reminder enabled and scheduled.' : 'Reminder disabled and canceled.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to update the reminder.';
      setFeedbackMessage(message);
      Alert.alert('Reminder update failed', message);
      await refreshTasks();
    } finally {
      setPendingToggleTaskId(null);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.title}>Task Reminder</Text>
          <Text style={styles.subtitle}>Create tasks, schedule reminders, and open the detail view from notifications.</Text>
          <Text style={styles.permissionLabel}>{formatPermissionLabel(permissionState)}</Text>
          <Pressable onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>Open Settings</Text>
          </Pressable>
        </View>

        {bootstrapLoading ? (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="small" color="#0f766e" />
            <Text style={styles.loadingText}>Requesting notification permission...</Text>
          </View>
        ) : null}

        {permissionState === 'denied' ? <PermissionBanner onOpenSettings={() => navigation.navigate('Settings')} /> : null}

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Create Task</Text>
          <TextInput
            placeholder="Task title"
            placeholderTextColor="#64748b"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Task description"
            placeholderTextColor="#64748b"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.multilineInput]}
            multiline
          />
          <View style={styles.row}>
            <TextInput
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#64748b"
              value={dateInput}
              onChangeText={setDateInput}
              style={[styles.input, styles.rowInput]}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="HH:MM"
              placeholderTextColor="#64748b"
              value={timeInput}
              onChangeText={setTimeInput}
              style={[styles.input, styles.rowInput]}
              autoCapitalize="none"
            />
          </View>
          <Pressable onPress={() => void handleCreateTask()} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} disabled={submittingTask}>
            {submittingTask ? <ActivityIndicator size="small" color="#ffffff" /> : <Text style={styles.primaryButtonText}>Save Task</Text>}
          </Pressable>
          {feedbackMessage ? <Text style={styles.feedback}>{feedbackMessage}</Text> : null}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <Pressable onPress={() => void onRefreshNotifications()} style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Refresh permissions</Text>
          </Pressable>
        </View>

        {loadingTasks ? (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="small" color="#0f766e" />
            <Text style={styles.loadingText}>Loading tasks...</Text>
          </View>
        ) : null}

        {!loadingTasks && tasks.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptyBody}>Create a task above to see it listed here.</Text>
          </View>
        ) : null}

        <View style={styles.taskList}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isUpdating={pendingToggleTaskId === task.id}
              onPress={() => navigation.navigate('TaskDetail', { taskId: task.id })}
              onToggleNotification={(nextValue) => {
                void handleToggleNotification(task, nextValue);
              }}
            />
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#0f172a',
    borderRadius: 24,
    padding: 20,
    gap: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
  },
  permissionLabel: {
    color: '#a7f3d0',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  settingsButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#14b8a6',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 4,
  },
  settingsButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  loadingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ecfeff',
    borderRadius: 18,
    padding: 14,
  },
  loadingText: {
    color: '#155e75',
    fontSize: 14,
    flex: 1,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#082f49',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  linkButtonText: {
    color: '#0f766e',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0f172a',
    fontSize: 15,
  },
  multilineInput: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#0f766e',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  pressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 15,
  },
  feedback: {
    fontSize: 13,
    color: '#0f172a',
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 6,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  emptyBody: {
    fontSize: 14,
    color: '#475569',
  },
  taskList: {
    gap: 12,
  },
});
